import { Container, Graphics, Sprite } from 'pixi.js';
import { COLORS, ENEMY_STATS, PLAYER_CONFIG } from '../core/Constants.js';
import {
  clamp,
  damp,
  distToSegment,
  easeOutCubic,
  lerp,
  rand,
  seededRange as randRange,
} from '../core/MathUtils.js';

export class EnemyManager {
  constructor(textures) {
    this.textures = textures;
    this.container = new Container();
    this.telegraphGraphics = new Graphics();
    this.trailGraphics = new Graphics();
    this.entityLayer = new Container();
    this.container.addChild(this.telegraphGraphics, this.trailGraphics, this.entityLayer);

    this.enemies = [];
    this.spawnTimer = 0.85;
    this.lancerTimer = 5.5;
    this.time = 0;
  }

  reset() {
    this.enemies.length = 0;
    while (this.entityLayer.children.length > 0) {
      const child = this.entityLayer.removeChildAt(this.entityLayer.children.length - 1);
      child.destroy({ children: true });
    }
    this.telegraphGraphics.clear();
    this.trailGraphics.clear();
    this.spawnTimer = 0.85;
    this.lancerTimer = 5.5;
  }

  _createStalker(x, y, speedScale) {
    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowCrimson;
    rim.scale.set(0.46);
    rim.alpha = 0.48;

    const body = new Graphics();
    const tail = new Graphics();
    root.addChild(rim, tail, body);
    this.entityLayer.addChild(root);

    body
      .moveTo(17, 0)
      .quadraticCurveTo(3, -14, -14, -9)
      .quadraticCurveTo(-7, 0, -14, 9)
      .quadraticCurveTo(3, 14, 17, 0)
      .closePath()
      .fill({ color: COLORS.shadowVoid, alpha: 0.96 })
      .stroke({ width: 1.8, color: COLORS.shadowCrimson, alpha: 0.92 });

    body
      .moveTo(4, -4.5)
      .lineTo(10, -2.2)
      .lineTo(5, -1.8)
      .closePath()
      .fill({ color: 0xff5484, alpha: 1 });
    body
      .moveTo(4, 4.5)
      .lineTo(10, 2.2)
      .lineTo(5, 1.8)
      .closePath()
      .fill({ color: 0xff5484, alpha: 1 });

    return {
      kind: 'stalker',
      root,
      rim,
      body,
      tail,
      x,
      y,
      vx: 0,
      vy: 0,
      angle: 0,
      speed: randRange(132, 165) * speedScale,
      turnRate: 2.35,
      radius: 14,
      spawnDelay: 0.65,
      age: 0,
      life: 24,
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
      lungeTimer: randRange(3.0, 5.0),
      lungeCharge: 0,
      lungeActive: 0,
    };
  }

  _createManta(x, y, vx, vy, speedScale) {
    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowViolet;
    rim.scale.set(0.58);
    rim.alpha = 0.42;

    const body = new Graphics();
    root.addChild(rim, body);
    this.entityLayer.addChild(root);

    const enemy = {
      kind: 'manta',
      root,
      rim,
      body,
      x,
      y,
      vx: vx * speedScale,
      vy: vy * speedScale,
      baseAngle: Math.atan2(vy, vx),
      angle: Math.atan2(vy, vx),
      speed: Math.hypot(vx, vy) * speedScale,
      radius: 17,
      spawnDelay: 0.3,
      age: 0,
      life: 16,
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
      trail: [{ x, y }],
    };
    this._drawManta(enemy, 0);
    return enemy;
  }

  _drawManta(e, flap) {
    const wing = 22 + Math.sin(flap) * 5;
    e.body.clear();
    e.body
      .moveTo(18, 0)
      .bezierCurveTo(6, -12, -8, -wing, -15, -wing * 0.72)
      .quadraticCurveTo(-8, 0, -24, 0)
      .quadraticCurveTo(-8, 0, -15, wing * 0.72)
      .bezierCurveTo(-8, wing, 6, 12, 18, 0)
      .closePath()
      .fill({ color: COLORS.shadowVoid, alpha: 0.96 })
      .stroke({ width: 1.8, color: COLORS.shadowViolet, alpha: 0.9 });

    e.body.circle(6, -3.5, 1.8).fill({ color: 0xff6da3, alpha: 0.95 });
    e.body.circle(6, 3.5, 1.8).fill({ color: 0xff6da3, alpha: 0.95 });
  }

  _createSentinel(x, y, vx, vy, speedScale) {
    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowCrimson;
    rim.scale.set(0.68);
    rim.alpha = 0.45;

    const ringSprite = new Sprite(this.textures.ring);
    ringSprite.anchor.set(0.5);
    ringSprite.blendMode = 'add';
    ringSprite.tint = COLORS.shadowCrimson;
    ringSprite.scale.set(0.45);
    ringSprite.alpha = 0.4;

    const shards = new Graphics();
    const core = new Graphics();
    core
      .circle(0, 0, 14)
      .fill({ color: COLORS.shadowVoid, alpha: 0.98 })
      .stroke({ width: 2, color: COLORS.shadowCrimson, alpha: 0.95 });
    core.circle(0, 0, 4.5).fill({ color: 0xff3b72, alpha: 0.95 });

    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const ox = Math.cos(a) * 21;
      const oy = Math.sin(a) * 21;
      shards
        .moveTo(ox + Math.cos(a) * 6, oy + Math.sin(a) * 6)
        .lineTo(ox + Math.cos(a + 2.2) * 5, oy + Math.sin(a + 2.2) * 5)
        .lineTo(ox + Math.cos(a - 2.2) * 5, oy + Math.sin(a - 2.2) * 5)
        .closePath()
        .fill({ color: COLORS.shadowVoid, alpha: 0.95 })
        .stroke({ width: 1.4, color: COLORS.shadowViolet, alpha: 0.9 });
    }

    root.addChild(rim, ringSprite, shards, core);
    this.entityLayer.addChild(root);

    return {
      kind: 'sentinel',
      root,
      rim,
      ringSprite,
      shards,
      core,
      x,
      y,
      vx: vx * speedScale,
      vy: vy * speedScale,
      radius: 20,
      spawnDelay: 0.75,
      age: 0,
      life: 24,
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
      pulseCooldown: randRange(2.4, 3.8),
      pulseCharge: 0,
      pulseWaveAge: -1,
    };
  }

  _createLancer(boundsW, boundsH, player, speedScale, angleOverride = null) {
    const side = Math.floor(rand() * 4);
    let sx = 0;
    let sy = 0;
    if (side === 0) {
      sx = randRange(60, boundsW - 60);
      sy = -20;
    } else if (side === 1) {
      sx = boundsW + 20;
      sy = randRange(60, boundsH - 60);
    } else if (side === 2) {
      sx = randRange(60, boundsW - 60);
      sy = boundsH + 20;
    } else {
      sx = -20;
      sy = randRange(60, boundsH - 60);
    }

    const aimX = player.x + randRange(-45, 45);
    const aimY = player.y + randRange(-45, 45);
    const angle = angleOverride !== null ? angleOverride : Math.atan2(aimY - sy, aimX - sx);
    const endDist = Math.hypot(boundsW, boundsH) + 120;

    const root = new Container();
    root.x = sx;
    root.y = sy;
    root.rotation = angle;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowCrimson;
    rim.scale.set(0.55, 0.28);
    rim.alpha = 0.72;

    const body = new Graphics();
    body
      .moveTo(26, 0)
      .lineTo(-16, -9)
      .lineTo(-8, 0)
      .lineTo(-16, 9)
      .closePath()
      .fill({ color: COLORS.shadowVoid, alpha: 0.98 })
      .stroke({ width: 2, color: 0xff3b78, alpha: 1 });

    root.addChild(rim, body);
    root.visible = false;
    this.entityLayer.addChild(root);

    const speed = 780 * Math.min(1.35, speedScale);
    return {
      kind: 'lancer',
      root,
      rim,
      body,
      startX: sx,
      startY: sy,
      targetX: sx + Math.cos(angle) * endDist,
      targetY: sy + Math.sin(angle) * endDist,
      x: sx,
      y: sy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle,
      speed,
      radius: 12,
      spawnDelay: 1.15,
      age: 0,
      life: 4.5,
      grazeCooldown: 0,
      slowTimer: 0,
      launched: false,
      telegraphedSound: false,
      trail: [],
    };
  }

  spawnEclipseVolley(boundsW, boundsH, player, speedScale, count = 3) {
    for (let i = 0; i < count; i++) {
      const lancer = this._createLancer(boundsW, boundsH, player, speedScale);
      // Slightly stagger volley timing for dramatic sequence
      lancer.spawnDelay = 1.15 + i * 0.16;
      this.enemies.push(lancer);
    }
  }

  _createVortex(x, y, vx, vy, speedScale) {
    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowViolet;
    rim.scale.set(0.95);
    rim.alpha = 0.38;

    const swirl = new Graphics();
    for (let arm = 0; arm < 3; arm++) {
      const baseA = (arm * Math.PI * 2) / 3;
      for (let s = 0; s < 10; s++) {
        const t = s / 9;
        const r = 10 + t * 24;
        const a = baseA + t * 1.65;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (s === 0) swirl.moveTo(px, py);
        else swirl.lineTo(px, py);
      }
      swirl.stroke({ width: 2.0, color: COLORS.shadowViolet, alpha: 0.78, cap: 'round' });
    }

    const core = new Graphics();
    core
      .circle(0, 0, 15)
      .fill({ color: COLORS.shadowVoid, alpha: 0.98 })
      .stroke({ width: 2.0, color: COLORS.shadowViolet, alpha: 0.95 });
    core.circle(0, 0, 5.5).fill({ color: 0x1e0936, alpha: 1 });

    root.addChild(rim, swirl, core);
    this.entityLayer.addChild(root);

    return {
      kind: 'vortex',
      root,
      rim,
      swirl,
      core,
      x,
      y,
      vx: vx * speedScale,
      vy: vy * speedScale,
      radius: 19,
      pullRadius: 230,
      pullStrength: 165,
      spawnDelay: 0.9,
      age: 0,
      life: 21,
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
    };
  }

  _createWarden(x, y, speedScale) {
    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = 0xff7a5c;
    rim.scale.set(0.76);
    rim.alpha = 0.46;

    const shell = new Graphics();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI * 2) / 6;
      const px = Math.cos(a) * 19;
      const py = Math.sin(a) * 19;
      if (i === 0) shell.moveTo(px, py);
      else shell.lineTo(px, py);
    }
    shell.closePath().fill({ color: COLORS.shadowVoid, alpha: 0.98 }).stroke({ width: 2.2, color: 0xff8c5a, alpha: 0.94 });
    shell.circle(0, 0, 7).fill({ color: 0xff3b78, alpha: 0.95 });

    root.addChild(rim, shell);
    this.entityLayer.addChild(root);

    return {
      kind: 'warden',
      root,
      rim,
      shell,
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 21,
      speed: randRange(66, 92) * speedScale,
      spawnDelay: 0.78,
      age: 0,
      life: 26,
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
    };
  }

  _spawnSplitWisps(x, y) {
    for (let k = 0; k < 2; k++) {
      const a = randRange(0, Math.PI * 2) + k * Math.PI;
      const wisp = this._createStalker(x + Math.cos(a) * 14, y + Math.sin(a) * 14, 1.15);
      wisp.angle = a;
      wisp.vx = Math.cos(a) * 185;
      wisp.vy = Math.sin(a) * 185;
      wisp.spawnDelay = 0.28;
      wisp.life = 14;
      wisp.splitWisp = true;
      this._ensureCombatStats(wisp, 0);
      this.enemies.push(wisp);
    }
  }

  _createEclipseCore(boundsW, boundsH, speedScale) {
    const x = boundsW * 0.5 + randRange(-boundsW * 0.18, boundsW * 0.18);
    const y = rand() < 0.5 ? -36 : boundsH + 36;

    const root = new Container();
    root.x = x;
    root.y = y;

    const rim = new Sprite(this.textures.glowSoft);
    rim.anchor.set(0.5);
    rim.blendMode = 'add';
    rim.tint = COLORS.shadowCrimson;
    rim.scale.set(1.15);
    rim.alpha = 0.62;

    const ringSprite = new Sprite(this.textures.ring);
    ringSprite.anchor.set(0.5);
    ringSprite.blendMode = 'add';
    ringSprite.tint = 0xff6b95;
    ringSprite.scale.set(0.62);
    ringSprite.alpha = 0.55;

    const petals = new Graphics();
    const core = new Graphics();
    core
      .circle(0, 0, 21)
      .fill({ color: COLORS.shadowVoid, alpha: 0.99 })
      .stroke({ width: 2.5, color: COLORS.shadowCrimson, alpha: 0.98 });
    core.circle(0, 0, 7.5).fill({ color: 0xff3b78, alpha: 0.95 });

    root.addChild(rim, ringSprite, petals, core);
    this.entityLayer.addChild(root);

    const enemy = {
      kind: 'core',
      root,
      rim,
      ringSprite,
      petals,
      core,
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 26,
      shields: 3,
      drawnShields: 3,
      coreHitCooldown: 0,
      spawnDelay: 1.0,
      age: 0,
      life: 40,
      speed: 74 * Math.min(1.3, speedScale),
      phase: randRange(0, Math.PI * 2),
      grazeCooldown: 0,
      slowTimer: 0,
      guardCooldown: 3.0,
      guardCharge: 0,
      guardRingAge: -1,
      guardRingParried: false,
      guardRingHit: false,
      guardOriginX: x,
      guardOriginY: y,
    };
    this._drawCoreShield(enemy, 3);
    return enemy;
  }

  _drawCoreShield(e, count) {
    e.petals.clear();
    e.drawnShields = count;
    const totalSlots = Math.max(3, e.maxShields || count || 3);
    const petalSpan = Math.min(0.72, (Math.PI * 2) / totalSlots * 0.62);
    for (let i = 0; i < count; i++) {
      const a0 = (i * Math.PI * 2) / totalSlots - petalSpan * 0.5;
      const a1 = a0 + petalSpan;
      const rOuter = 36;
      const rInner = 30;
      e.petals
        .moveTo(Math.cos(a0) * rOuter, Math.sin(a0) * rOuter)
        .arc(0, 0, rOuter, a0, a1)
        .lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner)
        .arc(0, 0, rInner, a1, a0, true)
        .closePath()
        .fill({ color: 0x1a0828, alpha: 0.96 })
        .stroke({ width: 1.8, color: 0xff8ea6, alpha: 0.92 });
    }
  }

  spawnEclipseCore(boundsW, boundsH, speedScale, extraShields = 0) {
    const hasCore = this.enemies.some((e) => e.kind === 'core');
    if (hasCore) return null;
    const core = this._createEclipseCore(boundsW, boundsH, speedScale);
    if (extraShields > 0) {
      core.shields += extraShields;
      core.maxShields = core.shields;
      this._drawCoreShield(core, core.shields);
    } else {
      core.maxShields = core.shields;
    }
    this.enemies.push(core);
    return core;
  }

  getGravitySources() {
    const list = [];
    for (const e of this.enemies) {
      if (e.kind === 'vortex' && e.age >= e.spawnDelay) {
        list.push({
          x: e.x,
          y: e.y,
          radius: e.pullRadius,
          strength: e.pullStrength,
        });
      }
    }
    return list;
  }

  _pickSafeInterior(margin, boundsW, boundsH, player, minDist = 190) {
    let x = boundsW * 0.5;
    let y = boundsH * 0.5;
    for (let attempt = 0; attempt < 12; attempt++) {
      x = randRange(margin, Math.max(margin + 20, boundsW - margin));
      y = randRange(margin, Math.max(margin + 20, boundsH - margin));
      if (Math.hypot(x - player.x, y - player.y) >= minDist) return { x, y };
    }
    return { x, y };
  }

  _spawnByPhase(phase, boundsW, boundsH, player) {
    const margin = 46;
    const pickPerimeter = rand() < 0.65;
    let x = 0;
    let y = 0;

    if (pickPerimeter) {
      const side = Math.floor(rand() * 4);
      if (side === 0) {
        x = randRange(margin, boundsW - margin);
        y = -24;
      } else if (side === 1) {
        x = boundsW + 24;
        y = randRange(margin, boundsH - margin);
      } else if (side === 2) {
        x = randRange(margin, boundsW - margin);
        y = boundsH + 24;
      } else {
        x = -24;
        y = randRange(margin, boundsH - margin);
      }
    } else {
      const pt = this._pickSafeInterior(margin, boundsW, boundsH, player, 190);
      x = pt.x;
      y = pt.y;
    }

    const roll = rand();
    const hpBonus = phase.hpBonus || 0;
    const hpMul = phase.hpMul || 1;
    const hasVortex = this.enemies.some((e) => e.kind === 'vortex');
    let created;
    if (phase.id >= 2 && !hasVortex && roll < 0.15) {
      const a = randRange(0, Math.PI * 2);
      const spd = randRange(36, 56);
      const pt =
        Math.hypot(x - player.x, y - player.y) >= 180
          ? { x: clamp(x, 85, boundsW - 85), y: clamp(y, 85, boundsH - 85) }
          : this._pickSafeInterior(85, boundsW, boundsH, player, 180);
      created = this._createVortex(pt.x, pt.y, Math.cos(a) * spd, Math.sin(a) * spd, phase.speedScale);
    } else if (phase.id >= 3 && roll >= 0.15 && roll < 0.28 && this.enemies.length < phase.maxEnemies - 1) {
      const pt = this._pickSafeInterior(70, boundsW, boundsH, player, 210);
      created = this._createWarden(pt.x, pt.y, phase.speedScale);
    } else if (phase.id >= 2 && roll < 0.42) {
      const aimX = player.x + randRange(-boundsW * 0.16, boundsW * 0.16);
      const aimY = player.y + randRange(-boundsH * 0.16, boundsH * 0.16);
      const a = Math.atan2(aimY - y, aimX - x);
      const spd = randRange(160, 215);
      created = this._createManta(x, y, Math.cos(a) * spd, Math.sin(a) * spd, phase.speedScale);
    } else if (phase.id >= 2 && roll < 0.6) {
      const a = randRange(0, Math.PI * 2);
      const spd = randRange(54, 86);
      const pt =
        Math.hypot(x - player.x, y - player.y) >= 170
          ? { x: clamp(x, 60, boundsW - 60), y: clamp(y, 60, boundsH - 60) }
          : this._pickSafeInterior(60, boundsW, boundsH, player, 170);
      created = this._createSentinel(pt.x, pt.y, Math.cos(a) * spd, Math.sin(a) * spd, phase.speedScale);
    } else {
      created = this._createStalker(x, y, phase.speedScale);
      created.angle = Math.atan2(player.y - y, player.x - x);
      created.vx = Math.cos(created.angle) * created.speed * 0.72;
      created.vy = Math.sin(created.angle) * created.speed * 0.72;
    }

    this._ensureCombatStats(created, hpBonus, hpMul);
    this.enemies.push(created);
  }

  applyRepulse(cx, cy, radius = 260, strength = 290) {
    const rSq = radius * radius;
    for (const e of this.enemies) {
      if (e.kind === 'lancer') continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      const dSq = dx * dx + dy * dy;
      if (dSq < rSq && dSq > 0.01) {
        const d = Math.sqrt(dSq);
        const factor = 1 - d / radius;
        e.vx += (dx / d) * strength * factor;
        e.vy += (dy / d) * strength * factor;
        e.slowTimer = Math.max(e.slowTimer, 1.3);
      }
    }
  }

  purgeNear(cx, cy, radius, onPurge) {
    const rSq = radius * radius;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.age < e.spawnDelay) continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      if (dx * dx + dy * dy <= rSq) {
        if (e.kind === 'core' && e.shields > 1) {
          e.shields -= 1;
          this._drawCoreShield(e, Math.max(0, Math.ceil(e.shields)));
          continue;
        }
        const ex = e.x;
        const ey = e.y;
        const kind = e.kind;
        this._removeAt(i);
        if (kind === 'warden') this._spawnSplitWisps(ex, ey);
        onPurge(ex, ey, kind);
      }
    }
  }

  purgeNearest(cx, cy, maxRadius, onPurge) {
    let bestIdx = -1;
    let bestDistSq = maxRadius * maxRadius;
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      if (e.age < e.spawnDelay || e.kind === 'core') continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      const dSq = dx * dx + dy * dy;
      if (dSq > 4 && dSq < bestDistSq) {
        bestDistSq = dSq;
        bestIdx = i;
      }
    }
    if (bestIdx !== -1) {
      const e = this.enemies[bestIdx];
      const ex = e.x;
      const ey = e.y;
      const kind = e.kind;
      this._removeAt(bestIdx);
      onPurge(ex, ey, kind);
      return { x: ex, y: ey };
    }
    return null;
  }

  _ensureCombatStats(e, hpBonus = 0, hpMul = 1) {
    if (e.hp !== undefined) return;
    const stats = ENEMY_STATS[e.kind] || ENEMY_STATS.stalker;
    let scaledHp = stats.hp;
    if (hpBonus > 0) {
      if (e.kind === 'stalker' || e.kind === 'manta') scaledHp += hpBonus;
      else if (e.kind === 'sentinel') scaledHp += Math.floor(hpBonus * 1.35);
      else if (e.kind === 'warden') scaledHp += Math.floor(hpBonus * 1.4);
      else if (e.kind === 'vortex') scaledHp += Math.floor(hpBonus * 1.5);
      else if (e.kind === 'lancer') scaledHp += Math.floor(hpBonus * 0.6);
    }
    if (hpMul !== 1) {
      scaledHp = Math.max(1, Math.round(scaledHp * hpMul * 10) / 10);
    }
    e.hp = scaledHp;
    e.maxHp = scaledHp;
    e.hitFlashTimer = 0;
    e.orbitalHitCooldown = 0;
    e.rayHitCooldown = 0;
    e.markTimer = 0;
    e.markMul = 1;
    e.burnTimer = 0;
    e.burnDps = 0;
    e.burnTick = 0.25;
    e.burnTint = COLORS.lumenGold;
    e.burnSourceAbility = null;
    e.baseRimTint = e.rim ? e.rim.tint : null;
  }

  findNearestTarget(cx, cy, maxRadius = Infinity, excludeSet = null) {
    let bestEnemy = null;
    let bestIdx = -1;
    let bestDistSq = maxRadius * maxRadius;
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      if (e.age < e.spawnDelay) continue;
      if (excludeSet && excludeSet.has(e)) continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      const dSq = dx * dx + dy * dy;
      if (dSq < bestDistSq) {
        bestDistSq = dSq;
        bestEnemy = e;
        bestIdx = i;
      }
    }
    return bestEnemy ? { enemy: bestEnemy, index: bestIdx, distSq: bestDistSq } : null;
  }

  damageEnemyByRef(enemy, amount = 1, knockX = 0, knockY = 0, callbacks = {}) {
    const idx = this.enemies.indexOf(enemy);
    if (idx === -1) return null;
    return this.damageEnemyAt(idx, amount, knockX, knockY, callbacks);
  }

  damageEnemyAt(index, amount = 1, knockX = 0, knockY = 0, callbacks = {}) {
    const e = this.enemies[index];
    if (!e || e.age < e.spawnDelay) return null;
    this._ensureCombatStats(e);
    const wasMarked = (e.markTimer || 0) > 0;
    const effAmount = wasMarked && (e.markMul || 1) > 1 ? +(amount * e.markMul).toFixed(3) : amount;

    if (e.kind === 'core') {
      const dealt = Math.min(effAmount, Math.max(0, e.shields));
      e.shields -= effAmount;
      e.slowTimer = Math.max(e.slowTimer || 0, 0.35);
      e.hitFlashTimer = 0.14;
      this._drawCoreShield(e, Math.max(0, Math.ceil(e.shields - 0.001)));
      if (e.shields <= 0.001) {
        const ex = e.x;
        const ey = e.y;
        this._removeAt(index);
        if (callbacks.sourceAbility) {
          callbacks.onAbilityDamage?.(callbacks.sourceAbility, dealt, true, Boolean(callbacks.isDot));
        }
        if (callbacks.onCoreShatter) callbacks.onCoreShatter(ex, ey);
        else callbacks.onPurge?.(ex, ey, 'core');
        return { killed: true, cracked: false, kind: 'core', x: ex, y: ey, dealt, wasMarked };
      }
      if (callbacks.sourceAbility) {
        callbacks.onAbilityDamage?.(callbacks.sourceAbility, dealt, false, Boolean(callbacks.isDot));
      }
      callbacks.onCoreCrack?.(e.x, e.y, Math.ceil(e.shields - 0.001));
      return { killed: false, cracked: true, kind: 'core', x: e.x, y: e.y, dealt, wasMarked };
    }

    const dealt = Math.min(effAmount, Math.max(0, e.hp));
    e.hp -= effAmount;
    if (e.hp <= 0.001) {
      const ex = e.x;
      const ey = e.y;
      const kind = e.kind;
      this._removeAt(index);
      if (kind === 'warden') this._spawnSplitWisps(ex, ey);
      if (callbacks.sourceAbility) {
        callbacks.onAbilityDamage?.(callbacks.sourceAbility, dealt, true, Boolean(callbacks.isDot));
      }
      callbacks.onPurge?.(ex, ey, kind);
      return { killed: true, cracked: false, kind, x: ex, y: ey, dealt, wasMarked };
    }

    e.hitFlashTimer = 0.13;
    e.slowTimer = Math.max(e.slowTimer || 0, 0.25);
    if (e.kind !== 'lancer') {
      e.vx += knockX;
      e.vy += knockY;
    }
    if (callbacks.sourceAbility) {
      callbacks.onAbilityDamage?.(callbacks.sourceAbility, dealt, false, Boolean(callbacks.isDot));
    }
    callbacks.onEnemyHit?.(e.x, e.y, e.kind, e.hp, e.maxHp);
    return { killed: false, cracked: false, kind: e.kind, x: e.x, y: e.y, dealt, wasMarked };
  }

  applyBurn(enemy, dps = 0.65, duration = 2.4, tint = COLORS.lumenGold, sourceAbility = null) {
    if (!enemy || enemy.age < enemy.spawnDelay || dps <= 0) return;
    this._ensureCombatStats(enemy);
    if (dps >= (enemy.burnDps || 0) || !enemy.burnSourceAbility) {
      enemy.burnSourceAbility = sourceAbility || enemy.burnSourceAbility || null;
    }
    enemy.burnDps = Math.max(enemy.burnDps || 0, dps);
    enemy.burnTimer = Math.max(enemy.burnTimer || 0, duration);
    enemy.burnTint = tint;
    if (enemy.burnTick === undefined || enemy.burnTick <= 0) enemy.burnTick = 0.22;
  }

  applyBurnRadius(cx, cy, radius, dps = 0.65, duration = 2.4, tint = COLORS.lumenGold, sourceAbility = null) {
    const rSq = radius * radius;
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      if (e.age < e.spawnDelay) continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      if (dx * dx + dy * dy <= rSq + e.radius * e.radius * 0.5) {
        this.applyBurn(e, dps, duration, tint, sourceAbility);
      }
    }
  }

  damageRadius(cx, cy, radius, amount = 1, knockStrength = 160, slowDuration = 0, callbacks = {}) {
    const rSq = radius * radius;
    let hits = 0;
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.age < e.spawnDelay) continue;
      const dx = e.x - cx;
      const dy = e.y - cy;
      const dSq = dx * dx + dy * dy;
      if (dSq <= rSq + e.radius * e.radius * 0.5) {
        const d = Math.max(1, Math.sqrt(dSq));
        if (slowDuration > 0) {
          e.slowTimer = Math.max(e.slowTimer || 0, slowDuration);
        }
        const pullScale = knockStrength < 0 ? Math.min(1, d / 28) : 1;
        const factor = knockStrength !== 0 ? clamp(1 - d / Math.max(1, radius), 0.2, 1) * pullScale : 0;
        const res = this.damageEnemyAt(
          i,
          amount,
          (dx / d) * knockStrength * factor,
          (dy / d) * knockStrength * factor,
          callbacks
        );
        if (res) hits++;
      }
    }
    return hits;
  }

  update(dt, player, phase, boundsW, boundsH, callbacks) {
    this.time += dt;
    this.telegraphGraphics.clear();
    this.trailGraphics.clear();

    const hpBonus = phase.hpBonus || 0;
    const hpMul = phase.hpMul || 1;
    const activeCount = this.enemies.length;
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && activeCount < phase.maxEnemies) {
      let batch = 1;
      if (phase.id >= 5) batch = hpBonus >= 3 && rand() < 0.35 ? 4 : rand() < 0.5 ? 3 : 2;
      else if (phase.id === 4) batch = rand() < 0.4 ? 3 : 2;
      else if (phase.id === 3) batch = rand() < 0.48 ? 2 : 1;
      else if (phase.id === 2) batch = rand() < 0.25 ? 2 : 1;

      const slots = Math.max(1, phase.maxEnemies - this.enemies.length);
      const count = Math.min(batch, slots);
      for (let s = 0; s < count; s++) {
        this._spawnByPhase(phase, boundsW, boundsH, player);
      }
      this.spawnTimer = phase.spawnInterval * randRange(0.84, 1.16);
    }

    if (phase.id >= 2) {
      this.lancerTimer -= dt;
      if (this.lancerTimer <= 0 && this.enemies.length < phase.maxEnemies + 2) {
        const l1 = this._createLancer(boundsW, boundsH, player, phase.speedScale);
        this._ensureCombatStats(l1, hpBonus, hpMul);
        this.enemies.push(l1);

        const twinChance = phase.id >= 5 ? 0.55 : phase.id === 4 ? 0.3 : 0;
        if (rand() < twinChance) {
          const l2 = this._createLancer(boundsW, boundsH, player, phase.speedScale);
          this._ensureCombatStats(l2, hpBonus, hpMul);
          this.enemies.push(l2);
        }

        const baseCooldown = Math.max(3.0, 8.6 - phase.id * 1.15);
        this.lancerTimer = baseCooldown * randRange(0.86, 1.2);
      }
    }

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      this._ensureCombatStats(e, hpBonus, hpMul);
      e.age += dt;
      if (e.grazeCooldown > 0) e.grazeCooldown = Math.max(0, e.grazeCooldown - dt);
      if (e.slowTimer > 0) e.slowTimer = Math.max(0, e.slowTimer - dt);
      if (e.hitFlashTimer > 0) e.hitFlashTimer = Math.max(0, e.hitFlashTimer - dt);
      if (e.orbitalHitCooldown > 0) e.orbitalHitCooldown = Math.max(0, e.orbitalHitCooldown - dt);
      if (e.rayHitCooldown > 0) e.rayHitCooldown = Math.max(0, e.rayHitCooldown - dt);
      if ((e.markTimer || 0) > 0 && e.age >= e.spawnDelay) {
        e.markTimer = Math.max(0, e.markTimer - dt);
        if (e.markTimer <= 0) {
          e.markMul = 1;
        } else {
          this.telegraphGraphics
            .circle(e.x, e.y, e.radius + 5.5)
            .stroke({ width: 1.4, color: COLORS.lumenGold, alpha: Math.min(0.7, 0.35 + e.markTimer * 0.15) });
        }
      }

      if ((e.burnTimer || 0) > 0 && e.age >= e.spawnDelay) {
        e.burnTimer = Math.max(0, e.burnTimer - dt);
        e.burnTick = (e.burnTick ?? 0.25) - dt;
        const bAlpha = Math.min(0.75, 0.3 + e.burnTimer * 0.2);
        this.telegraphGraphics
          .circle(e.x, e.y, e.radius + 3.5)
          .stroke({ width: 1.5, color: e.burnTint || COLORS.lumenGold, alpha: bAlpha });
        let killedByBurn = false;
        const burnCb = e.burnSourceAbility
          ? { ...callbacks, sourceAbility: e.burnSourceAbility, isDot: true }
          : callbacks;
        while (e.burnTick <= 0) {
          e.burnTick += 0.25;
          const bRes = this.damageEnemyAt(i, (e.burnDps || 0.65) * 0.25, 0, 0, burnCb);
          if (!bRes || bRes.killed || this.enemies[i] !== e) {
            killedByBurn = true;
            break;
          }
        }
        if (killedByBurn) continue;
      }

      const speedMult = e.slowTimer > 0 ? 0.45 : 1.0;

      if (e.kind === 'lancer') {
        if (e.age < e.spawnDelay) {
          if (!e.telegraphedSound && callbacks.onLancerTelegraph) {
            e.telegraphedSound = true;
            callbacks.onLancerTelegraph();
          }
          const prog = e.age / e.spawnDelay;
          const pulse = 0.35 + 0.65 * Math.abs(Math.sin(prog * Math.PI * 5));
          const width = prog > 0.78 ? 3.2 : 1.4;
          this.telegraphGraphics
            .moveTo(e.startX, e.startY)
            .lineTo(e.targetX, e.targetY)
            .stroke({
              width,
              color: prog > 0.78 ? 0xff7096 : COLORS.shadowCrimson,
              alpha: 0.24 + pulse * 0.52,
            });
          continue;
        }

        if (!e.launched) {
          e.launched = true;
          e.root.visible = true;
          e.trail.push({ x: e.x, y: e.y });
        }

        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.root.x = e.x;
        e.root.y = e.y;

        e.trail.unshift({ x: e.x, y: e.y });
        if (e.trail.length > 9) e.trail.pop();
        this._drawRibbonTrail(e.trail, 7, 0xff2e6a);

        if (e.x < -120 || e.x > boundsW + 120 || e.y < -120 || e.y > boundsH + 120) {
          this._removeAt(i);
          continue;
        }
      } else {
        const active = e.age >= e.spawnDelay;
        if (!active) {
          const t = clamp(e.age / e.spawnDelay, 0, 1);
          e.root.alpha = t * 0.78;
          e.root.scale.set(0.35 + 0.65 * easeOutCubic(t));
          this.telegraphGraphics
            .circle(e.x, e.y, (1 - t) * 26 + e.radius)
            .stroke({ width: 1.5, color: COLORS.shadowCrimson, alpha: (1 - t) * 0.55 });
        } else {
          e.root.alpha = 1;
          e.root.scale.set(1);
        }

        if (e.kind === 'stalker') {
          if (active) {
            const desiredAngle = Math.atan2(player.y - e.y, player.x - e.x);
            let diff = desiredAngle - e.angle;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            e.angle += clamp(diff, -e.turnRate * dt, e.turnRate * dt);

            e.lungeTimer -= dt;
            if (e.lungeTimer <= 0 && e.lungeCharge <= 0 && e.lungeActive <= 0) {
              e.lungeCharge = 0.34;
            }
            if (e.lungeCharge > 0) {
              e.lungeCharge = Math.max(0, e.lungeCharge - dt);
              if (e.lungeCharge <= 0) {
                e.lungeActive = 0.44;
                e.lungeTimer = randRange(3.2, 5.2);
              }
            }
            if (e.lungeActive > 0) e.lungeActive = Math.max(0, e.lungeActive - dt);

            const lungeFactor = e.lungeCharge > 0 ? 0.38 : e.lungeActive > 0 ? 1.68 : 1.0;
            const spd = e.speed * lungeFactor * speedMult;
            e.vx = damp(e.vx, Math.cos(e.angle) * spd, 6.0, dt);
            e.vy = damp(e.vy, Math.sin(e.angle) * spd, 6.0, dt);

            e.x += e.vx * dt;
            e.y += e.vy * dt;
          }

          e.root.x = e.x;
          e.root.y = e.y;
          e.root.rotation = e.angle;
          e.rim.alpha = e.lungeCharge > 0 ? 0.96 : e.lungeActive > 0 ? 0.85 : 0.48;
          e.rim.scale.set(e.lungeCharge > 0 ? 0.64 : 0.46);

          const sway = Math.sin(this.time * 9 + e.phase) * 7;
          e.tail.clear();
          e.tail
            .moveTo(-10, -3)
            .quadraticCurveTo(-22, sway, -34, -sway * 0.6)
            .quadraticCurveTo(-22, sway * 0.4 + 2, -10, 3)
            .fill({ color: COLORS.shadowVoid, alpha: 0.72 })
            .stroke({ width: 1, color: COLORS.shadowViolet, alpha: 0.45 });
        } else if (e.kind === 'manta') {
          const wave = Math.sin(this.time * 3.1 + e.phase) * 65;
          const perpX = -Math.sin(e.baseAngle);
          const perpY = Math.cos(e.baseAngle);
          e.x += (e.vx + perpX * wave) * speedMult * dt;
          e.y += (e.vy + perpY * wave) * speedMult * dt;
          e.angle = Math.atan2(e.vy + perpY * wave, e.vx + perpX * wave);
          e.root.x = e.x;
          e.root.y = e.y;
          e.root.rotation = e.angle;
          this._drawManta(e, this.time * 6.5 + e.phase);

          e.trail.unshift({ x: e.x, y: e.y });
          if (e.trail.length > 10) e.trail.pop();
          this._drawRibbonTrail(e.trail, 8, COLORS.shadowViolet);

          if (
            e.age > 3 &&
            (e.x < -110 || e.x > boundsW + 110 || e.y < -110 || e.y > boundsH + 110)
          ) {
            this._removeAt(i);
            continue;
          }
        } else if (e.kind === 'sentinel') {
          if (active) {
            e.x += e.vx * speedMult * dt;
            e.y += e.vy * speedMult * dt;

            const pad = 34;
            if (e.x < pad && e.vx < 0) e.vx *= -1;
            else if (e.x > boundsW - pad && e.vx > 0) e.vx *= -1;
            if (e.y < pad && e.vy < 0) e.vy *= -1;
            else if (e.y > boundsH - pad && e.vy > 0) e.vy *= -1;

            // Periodic void-pulse charge & ring emission
            if (e.pulseWaveAge >= 0) {
              e.pulseWaveAge += dt;
              const waveT = e.pulseWaveAge / 0.55;
              if (waveT >= 1) {
                e.pulseWaveAge = -1;
              } else {
                const waveR = e.radius + easeOutCubic(waveT) * 56;
                this.telegraphGraphics
                  .circle(e.x, e.y, waveR)
                  .stroke({ width: 2.6, color: 0xff3b78, alpha: (1 - waveT) * 0.78 });
              }
            } else if (e.pulseCharge > 0) {
              e.pulseCharge -= dt;
              const chargeFrac = clamp(e.pulseCharge / 0.85, 0, 1);
              this.telegraphGraphics
                .circle(e.x, e.y, e.radius + chargeFrac * 36)
                .stroke({ width: 1.4, color: COLORS.shadowViolet, alpha: (1 - chargeFrac) * 0.7 });
              if (e.pulseCharge <= 0) {
                e.pulseWaveAge = 0;
                e.pulseCooldown = randRange(3.4, 4.8);
              }
            } else {
              e.pulseCooldown -= dt;
              if (e.pulseCooldown <= 0) {
                e.pulseCharge = 0.85;
              }
            }
          }

          e.root.x = e.x;
          e.root.y = e.y;
          e.shards.rotation += dt * (e.pulseCharge > 0 ? 4.2 : 1.45);
          const pulse = 0.85 + 0.15 * Math.sin(this.time * 4 + e.phase);
          e.ringSprite.scale.set(0.42 * pulse);
          e.rim.alpha = (e.pulseCharge > 0 ? 0.72 : 0.36) + 0.14 * Math.sin(this.time * 4 + e.phase);
        } else if (e.kind === 'vortex') {
          if (active) {
            e.x += e.vx * speedMult * dt;
            e.y += e.vy * speedMult * dt;
            const pad = 64;
            if (e.x < pad && e.vx < 0) e.vx *= -1;
            else if (e.x > boundsW - pad && e.vx > 0) e.vx *= -1;
            if (e.y < pad && e.vy < 0) e.vy *= -1;
            else if (e.y > boundsH - pad && e.vy > 0) e.vy *= -1;

            const ringAnim = ((this.time * 0.75 + e.phase) % 1);
            this.telegraphGraphics
              .circle(e.x, e.y, lerp(e.pullRadius * 0.72, e.radius + 4, ringAnim))
              .stroke({ width: 1.2, color: COLORS.shadowViolet, alpha: (1 - Math.abs(ringAnim - 0.5) * 2) * 0.28 });
          }
          e.root.x = e.x;
          e.root.y = e.y;
          e.swirl.rotation -= dt * 2.6;
          e.rim.alpha = 0.34 + 0.12 * Math.sin(this.time * 3.4 + e.phase);
        } else if (e.kind === 'warden') {
          if (active) {
            const ang = Math.atan2(player.y - e.y, player.x - e.x);
            e.vx = damp(e.vx, Math.cos(ang) * e.speed * speedMult, 3.6, dt);
            e.vy = damp(e.vy, Math.sin(ang) * e.speed * speedMult, 3.6, dt);
            e.x += e.vx * dt;
            e.y += e.vy * dt;
          }
          e.root.x = e.x;
          e.root.y = e.y;
          e.shell.rotation += dt * 1.1;
          e.rim.alpha = 0.42 + 0.16 * Math.sin(this.time * 4.5 + e.phase);
        } else if (e.kind === 'core') {
          if (e.coreHitCooldown > 0) e.coreHitCooldown = Math.max(0, e.coreHitCooldown - dt);
          if (active) {
            const targetX = clamp(player.x * 0.35 + boundsW * 0.325 + Math.cos(this.time * 0.5 + e.phase) * 90, 90, boundsW - 90);
            const targetY = clamp(player.y * 0.35 + boundsH * 0.325 + Math.sin(this.time * 0.65 + e.phase) * 65, 90, boundsH - 90);
            const dx = targetX - e.x;
            const dy = targetY - e.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            e.vx = damp(e.vx, (dx / dist) * e.speed * speedMult, 3.2, dt);
            e.vy = damp(e.vy, (dy / dist) * e.speed * speedMult, 3.2, dt);
            e.x += e.vx * dt;
            e.y += e.vy * dt;
          }
          e.root.x = e.x;
          e.root.y = e.y;
          e.petals.rotation += dt * 1.9;
          const corePulse = 0.88 + 0.14 * Math.sin(this.time * 5 + e.phase);
          e.ringSprite.scale.set(0.62 * corePulse);
          e.rim.alpha = 0.52 + 0.18 * Math.sin(this.time * 5 + e.phase);
          const wantedPetals = Math.max(0, Math.ceil(e.shields));
          if (wantedPetals !== e.drawnShields) {
            this._drawCoreShield(e, wantedPetals);
          }

          // Guardian telegraphed shockwave ring: outwalkable (230px max); dashing across triggers Void Parry
          if (active) {
            const RING_CHARGE = 0.85;
            const RING_DUR = 0.9;
            const RING_MAX_R = 230;
            if (e.guardRingAge >= 0) {
              e.guardRingAge += dt;
              const rt = e.guardRingAge / RING_DUR;
              if (rt >= 1) {
                e.guardRingAge = -1;
                e.guardCooldown = 3.8;
              } else {
                const ringR = lerp(32, RING_MAX_R, rt);
                this.telegraphGraphics
                  .circle(e.guardOriginX, e.guardOriginY, ringR)
                  .stroke({ width: 4, color: 0xff5288, alpha: 0.86 * (1 - rt * 0.35) })
                  .circle(e.guardOriginX, e.guardOriginY, Math.max(10, ringR - 6))
                  .stroke({ width: 1.5, color: 0xffc2d6, alpha: 0.45 * (1 - rt * 0.4) });
                const distRing = Math.hypot(player.x - e.guardOriginX, player.y - e.guardOriginY);
                if (
                  !e.guardRingParried &&
                  !e.guardRingHit &&
                  Math.abs(distRing - ringR) <= PLAYER_CONFIG.hitRadius + 10
                ) {
                  if ((player.dashTimer || 0) > 0) {
                    e.guardRingParried = true;
                    e.guardRingAge = -1;
                    e.guardCooldown = 4.6;
                    const pRes = this.damageEnemyAt(i, 1, 0, 0, { ...callbacks, sourceAbility: null });
                    callbacks.onVoidParry?.(e.guardOriginX, e.guardOriginY);
                    if (pRes?.killed || this.enemies[i] !== e) {
                      continue;
                    }
                  } else if (!player.isInvulnerable) {
                    e.guardRingHit = true;
                    callbacks.onHit(player.x, player.y);
                  }
                }
              }
            } else if (e.guardCharge > 0) {
              e.guardCharge += dt;
              const ct = Math.min(1, e.guardCharge / RING_CHARGE);
              this.telegraphGraphics
                .circle(e.x, e.y, RING_MAX_R)
                .stroke({ width: 1.2, color: 0xff5288, alpha: 0.14 + ct * 0.24 })
                .circle(e.x, e.y, 28 + ct * 22)
                .stroke({ width: 2.6, color: 0xff7aa5, alpha: 0.4 + ct * 0.55 });
              if (e.guardCharge >= RING_CHARGE) {
                e.guardCharge = 0;
                e.guardRingAge = 0;
                e.guardOriginX = e.x;
                e.guardOriginY = e.y;
                e.guardRingParried = false;
                e.guardRingHit = false;
              }
            } else {
              e.guardCooldown -= dt;
              if (e.guardCooldown <= 0) {
                e.guardCharge = 0.001;
              }
            }
          }
        }

        if (e.age >= e.life) {
          const fadeOut = 1 - (e.age - e.life) / 0.6;
          if (fadeOut <= 0) {
            this._removeAt(i);
            continue;
          }
          e.root.alpha = Math.max(0, fadeOut);
        }
      }

      const armed = e.age >= e.spawnDelay;
      if (!armed) continue;

      if (e.rim) {
        if (e.hitFlashTimer > 0) {
          e.rim.tint = 0xffffff;
          e.rim.alpha = 0.96;
        } else if (e.baseRimTint !== null) {
          e.rim.tint = e.baseRimTint;
        }
      }
      if (e.hitFlashTimer > 0 && e.age >= e.spawnDelay) {
        const pop = 1 + 0.18 * (e.hitFlashTimer / 0.14);
        e.root.scale.set(pop);
      }

      if (e.kind !== 'core' && e.maxHp > 1 && e.hp > 0) {
        this._drawHpPips(e);
      }

      let effectiveRadius = e.radius;
      if (e.kind === 'sentinel' && e.pulseWaveAge >= 0) {
        const waveT = e.pulseWaveAge / 0.55;
        effectiveRadius = Math.max(e.radius, e.radius + easeOutCubic(waveT) * 50);
      }

      const hitDist = PLAYER_CONFIG.hitRadius + effectiveRadius;
      const d = Math.hypot(player.x - e.x, player.y - e.y);

      if (d <= hitDist) {
        if (!player.isInvulnerable && !(e.kind === 'core' && e.coreHitCooldown > 0)) {
          const ex = e.x;
          const ey = e.y;
          if (e.kind === 'core') {
            e.coreHitCooldown = 0.5;
            callbacks.onHit(ex, ey);
            continue;
          }
          this._removeAt(i);
          callbacks.onHit(ex, ey);
          continue;
        }
      } else if (
        d <= hitDist + PLAYER_CONFIG.grazeRadius * (callbacks.grazeMul || 1) &&
        e.grazeCooldown <= 0
      ) {
        e.grazeCooldown = 0.78;
        callbacks.onGraze(e.x, e.y);
      }
    }
  }

  _drawHpPips(e) {
    const r = e.radius + 7;
    const ratio = clamp(e.hp / e.maxHp, 0, 1);
    const low = e.hp <= 1.001;
    const color = low ? COLORS.lumenGold : 0xff76a8;
    const alpha = low ? 0.85 : 0.62;

    if (e.maxHp <= 8) {
      const pipTotal = Math.max(1, Math.ceil(e.maxHp - 0.001));
      const lit = Math.max(1, Math.ceil(e.hp - 0.001));
      const baseRot = this.time * 1.15 + e.phase;
      for (let i = 0; i < pipTotal; i++) {
        const a = baseRot + (i * Math.PI * 2) / pipTotal;
        const px = e.x + Math.cos(a) * r;
        const py = e.y + Math.sin(a) * r;
        this.telegraphGraphics
          .circle(px, py, i < lit ? 2.2 : 1.5)
          .fill({ color: i < lit ? color : 0xffffff, alpha: i < lit ? alpha : 0.16 });
      }
    } else {
      const startA = -Math.PI * 0.5;
      this.telegraphGraphics
        .circle(e.x, e.y, r)
        .stroke({ width: 1.5, color: 0xffffff, alpha: 0.14 });
      this.telegraphGraphics
        .moveTo(e.x, e.y - r)
        .arc(e.x, e.y, r, startA, startA + Math.PI * 2 * ratio)
        .stroke({ width: 2.0, color, alpha });
    }
  }

  _drawRibbonTrail(pts, maxWidth, rimColor) {
    if (pts.length < 2) return;
    for (let s = 0; s < pts.length - 1; s++) {
      const t = 1 - s / pts.length;
      this.trailGraphics
        .moveTo(pts[s].x, pts[s].y)
        .lineTo(pts[s + 1].x, pts[s + 1].y)
        .stroke({
          width: Math.max(1, maxWidth * t),
          color: s < 3 ? rimColor : COLORS.shadowVoid,
          alpha: t * 0.45,
          cap: 'round',
        });
    }
  }

  _removeAt(index) {
    const e = this.enemies[index];
    this.entityLayer.removeChild(e.root);
    e.root.destroy({ children: true });
    this.enemies.splice(index, 1);
  }
}
