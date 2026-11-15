export const GAME_STATES = {
  TITLE: 'title',
  PLAYING: 'playing',
  PAUSED: 'paused',
  DYING: 'dying',
  GAMEOVER: 'gameover',
};

export const GAME_MODES = {
  ARCADE: 'arcade',
  DAILY: 'daily',
  ZEN: 'zen',
};

export const SPIRIT_ASPECTS = [
  {
    id: 'wisp',
    name: 'Azure Wisp',
    tag: 'BALANCED',
    desc: 'Balanced Radiance & Solar Dash',
    unlockLuminance: 0,
    maxHealth: 3,
    dashCharges: 2,
    dashSpeedMul: 1.0,
    dashRechargeMul: 1.0,
    speedMul: 1.0,
    magnetMul: 1.0,
    grazeMul: 1.0,
    comboDecayMul: 1.0,
    arcReachMul: 1.0,
    colorHex: 0x5ff7eb,
    accentHex: 0xffe699,
  },
  {
    id: 'tempest',
    name: 'Solar Tempest',
    tag: '3 DASHES',
    desc: '3 Dashes · Wide Arc · 2 Radiance',
    unlockLuminance: 180,
    maxHealth: 2,
    dashCharges: 3,
    dashSpeedMul: 1.08,
    dashRechargeMul: 0.94,
    speedMul: 1.05,
    magnetMul: 0.95,
    grazeMul: 1.1,
    comboDecayMul: 1.0,
    arcReachMul: 1.35,
    colorHex: 0xffe484,
    accentHex: 0x5ff7eb,
  },
  {
    id: 'oracle',
    name: 'Tidal Oracle',
    tag: 'AURIC AURA',
    desc: '4 Radiance · Wide Magnet · Slow Combo Fade',
    unlockLuminance: 420,
    maxHealth: 4,
    dashCharges: 2,
    dashSpeedMul: 0.96,
    dashRechargeMul: 1.0,
    speedMul: 0.98,
    magnetMul: 1.38,
    grazeMul: 1.25,
    comboDecayMul: 0.72,
    arcReachMul: 1.0,
    colorHex: 0x8ef2ff,
    accentHex: 0xb8ffea,
  },
  {
    id: 'comet',
    name: 'Astral Comet',
    tag: 'HYPER VELOCITY',
    desc: '+24% Dash Speed · Fast Recharge · Nimble',
    unlockLuminance: 750,
    maxHealth: 3,
    dashCharges: 2,
    dashSpeedMul: 1.24,
    dashRechargeMul: 0.78,
    speedMul: 1.12,
    magnetMul: 1.08,
    grazeMul: 1.12,
    comboDecayMul: 0.95,
    arcReachMul: 1.15,
    colorHex: 0xff9ec7,
    accentHex: 0xffe699,
  },
];

export const MAX_ABILITY_SLOTS = 8;

export const ENEMY_STATS = {
  stalker: { hp: 1, exp: 10 },
  manta: { hp: 1, exp: 12 },
  lancer: { hp: 1, exp: 15 },
  sentinel: { hp: 2, exp: 20 },
  warden: { hp: 3, exp: 28 },
  vortex: { hp: 3, exp: 32 },
  core: { shields: 3, hp: 1, exp: 65 },
};

export function getExpForNextLevel(level) {
  const step = Math.max(0, level - 1);
  return Math.round((45 + step * 30 + step * step * 3.5) / 5) * 5;
}

export const STARLIGHT_CONFIG = {
  baseInterval: 0.80,
  baseRange: 360,
  boltSpeed: 740,
  feverCadenceMul: 0.72,
};

export const BLESSINGS = [
  // Standard Starting Weapon (starts unlocked at LV 1 so its aspects can drop immediately)
  {
    id: 'resonant_volley',
    name: 'Starlight Bolt',
    category: 'damage',
    tag: 'DAMAGE · BOLT',
    startsUnlocked: true,
    desc: 'Lumen’s automatic starlight bolt firing at nearby shadows.',
  },
  // Unlockable Automatic Damage Abilities
  {
    id: 'solar_orbitals',
    name: 'Orbiting Blades',
    category: 'damage',
    tag: 'DAMAGE · ORBITAL',
    desc: 'Summons 2 crystalline blades orbiting Lumen to slice nearby shadows.',
  },
  {
    id: 'voltaic_chain',
    name: 'Voltaic Arc',
    category: 'damage',
    tag: 'DAMAGE · LIGHTNING',
    desc: 'Strikes nearby shadows with Chain Lightning arcing across 2 targets.',
  },
  {
    id: 'astral_pulse',
    name: 'Astral Pulse',
    category: 'damage',
    tag: 'DAMAGE · NOVA',
    desc: 'Releases an automatic shockwave nova that damages & pushes shadows back.',
  },
  {
    id: 'seeker_barrage',
    name: 'Seeker Needles',
    category: 'damage',
    tag: 'DAMAGE · HOMING',
    desc: 'Launches 2 curved homing starlight needles toward distant shadows.',
  },
  {
    id: 'starbloom_spores',
    name: 'Starbloom Spores',
    category: 'damage',
    tag: 'DAMAGE · BLOOM',
    desc: 'Releases drifting bioluminescent starblooms that burst in starlight when shadows near.',
  },
  {
    id: 'celestial_spear',
    name: 'Celestial Spear',
    category: 'damage',
    tag: 'DAMAGE · PIERCE',
    desc: 'Fires a piercing radiant beam lance through up to 3 aligned shadows.',
  },

  // Unlockable Utility & Sanctuary Cores
  {
    id: 'gravity_harvest',
    name: 'Gravity Harvest',
    category: 'utility',
    tag: 'UTILITY · MAGNET',
    desc: '+25% Magnet reach, Constellation Star pull & +10% more EXP.',
  },
  {
    id: 'aegis_bloom',
    name: 'Aegis Sanctuary',
    category: 'utility',
    tag: 'UTILITY · WARD',
    desc: 'Restores +1 Radiance & grants a recharging hit-blocking Ward.',
  },
  {
    id: 'slipstream_gale',
    name: 'Slipstream Gale',
    category: 'utility',
    tag: 'UTILITY · MOBILITY',
    desc: '+8% glide speed & 12% faster Solar Dash recharge.',
  },
  {
    id: 'starforged_resonance',
    name: 'Resonance Weaver',
    category: 'utility',
    tag: 'UTILITY · TEMPO',
    desc: '+15% Graze reach, +15% Combo hold & +2 EXP per close Graze.',
  },
  {
    id: 'echo_conduit',
    name: 'Chrono Conduit',
    category: 'utility',
    tag: 'UTILITY · HASTE',
    desc: 'All abilities trigger 10% faster.',
  },
];

const BLESSINGS_BY_ID = Object.fromEntries(BLESSINGS.map((b) => [b.id, b]));
const pct = (abilityId, aspect, common, rare, title, desc) => ({
  abilityId,
  aspect,
  mode: 'pct',
  common,
  rare,
  rareChance: 0.28,
  title,
  desc,
});
const add = (abilityId, aspect, common, rare, title, desc, maxAdd = 0, rareChance = 0.28) => ({
  abilityId,
  aspect,
  mode: 'add',
  common,
  rare,
  maxAdd,
  rareChance,
  title,
  desc,
});

/** Single-aspect endless upgrade templates (Common + Rare roll magnitudes). */
const ASPECT_DEFS = [
  // Starlight Bolt
  pct('resonant_volley', 'dmgMul', 12, 22, (v) => `+${v}% Damage`, (v) => `Starlight Bolts deal ${v}% more damage.`),
  pct('resonant_volley', 'rateMul', 10, 18, (v) => `${v}% Faster`, (v) => `Starlight Bolt fires ${v}% faster.`),
  add('resonant_volley', 'countAdd', 1, 2, (v) => `+${v} Bolt${v > 1 ? 's' : ''}`, (v) => `Fires +${v} additional Starlight Bolt${v > 1 ? 's' : ''} per volley.`, 9, 0.26),
  add('resonant_volley', 'pierceAdd', 1, 2, (v) => `+${v} Pierce`, (v) => `Starlight Bolts pierce +${v} more shadow${v > 1 ? 's' : ''}.`, 8, 0.24),
  pct('resonant_volley', 'rangeMul', 15, 26, (v) => `+${v}% Range`, (v) => `Starlight Bolt targeting reach increases by ${v}%.`),

  // Orbiting Blades
  add('solar_orbitals', 'countAdd', 1, 2, (v) => `+${v} Blade${v > 1 ? 's' : ''}`, (v) => `+${v} orbiting crystalline blade${v > 1 ? 's' : ''} circling Lumen.`, 8, 0.24),
  pct('solar_orbitals', 'dmgMul', 12, 22, (v) => `+${v}% Damage`, (v) => `Orbiting Blades deal ${v}% more damage.`),
  pct('solar_orbitals', 'speedMul', 12, 22, (v) => `${v}% Faster Spin`, (v) => `Orbiting Blades rotate & strike ${v}% faster.`),
  pct('solar_orbitals', 'sizeMul', 12, 22, (v) => `+${v}% Reach`, (v) => `+${v}% wider blade orbit radius & cleave reach.`),

  // Voltaic Arc
  add('voltaic_chain', 'targetsAdd', 1, 2, (v) => `+${v} Target${v > 1 ? 's' : ''}`, (v) => `Voltaic Arc chains to +${v} more shadow${v > 1 ? 's' : ''} per strike.`, 0, 0.26),
  pct('voltaic_chain', 'dmgMul', 12, 22, (v) => `+${v}% Damage`, (v) => `Voltaic Arc deals ${v}% more damage.`),
  pct('voltaic_chain', 'rateMul', 10, 18, (v) => `${v}% Faster`, (v) => `Voltaic Arc discharges ${v}% more often.`),
  pct('voltaic_chain', 'reachMul', 15, 26, (v) => `+${v}% Reach`, (v) => `Voltaic Arc jumps ${v}% further between shadows.`),

  // Astral Pulse
  pct('astral_pulse', 'dmgMul', 14, 25, (v) => `+${v}% Damage`, (v) => `Astral Pulse deals ${v}% more damage.`),
  pct('astral_pulse', 'rateMul', 10, 18, (v) => `${v}% Faster`, (v) => `Astral Pulse triggers ${v}% more often.`),
  pct('astral_pulse', 'radiusMul', 14, 24, (v) => `+${v}% Area`, (v) => `Astral Pulse shockwave expands ${v}% wider.`),
  pct('astral_pulse', 'slowMul', 20, 35, (v) => `+${v}% Slow`, (v) => `Astral Pulse slows surviving shadows ${v}% longer.`),

  // Seeker Needles
  add('seeker_barrage', 'countAdd', 1, 2, (v) => `+${v} Needle${v > 1 ? 's' : ''}`, (v) => `Launches +${v} extra homing needle${v > 1 ? 's' : ''} per volley.`, 0, 0.26),
  pct('seeker_barrage', 'dmgMul', 12, 22, (v) => `+${v}% Damage`, (v) => `Seeker Needles deal ${v}% more damage.`),
  pct('seeker_barrage', 'rateMul', 10, 18, (v) => `${v}% Faster`, (v) => `Seeker Needles launch ${v}% faster.`),
  pct('seeker_barrage', 'speedMul', 14, 25, (v) => `+${v}% Homing`, (v) => `Seeker Needles fly & curve ${v}% faster.`),

  // Starbloom Spores
  pct('starbloom_spores', 'dmgMul', 14, 25, (v) => `+${v}% Damage`, (v) => `Starbloom bursts deal ${v}% more damage.`),
  pct('starbloom_spores', 'rateMul', 12, 20, (v) => `${v}% Faster`, (v) => `Starbloom Spores bud ${v}% more often.`),
  pct('starbloom_spores', 'radiusMul', 14, 25, (v) => `+${v}% Blast Area`, (v) => `Starbloom blossom bursts expand ${v}% wider.`),
  add('starbloom_spores', 'maxAdd', 1, 2, (v) => `+${v} Max Bloom${v > 1 ? 's' : ''}`, (v) => `Hold +${v} more active Starbloom${v > 1 ? 's' : ''} in the arena.`, 16),

  // Celestial Spear
  pct('celestial_spear', 'dmgMul', 14, 25, (v) => `+${v}% Damage`, (v) => `Celestial Spear deals ${v}% more damage.`),
  pct('celestial_spear', 'rateMul', 10, 18, (v) => `${v}% Faster`, (v) => `Celestial Spear fires ${v}% more often.`),
  add('celestial_spear', 'pierceAdd', 2, 4, (v) => `+${v} Pierce`, (v) => `Celestial Spear pierces through +${v} more shadows.`),
  pct('celestial_spear', 'widthMul', 16, 28, (v) => `+${v}% Width`, (v) => `Celestial Spear beam sweeps ${v}% wider.`),

  // Utility Aspect Upgrades
  pct('gravity_harvest', 'magnetMul', 20, 35, (v) => `+${v}% Magnet`, (v) => `+${v}% wider Light Mote & Star magnet reach.`),
  pct('gravity_harvest', 'expMul', 10, 18, (v) => `+${v}% EXP`, (v) => `Earn ${v}% more EXP from purified shadows.`),
  pct('aegis_bloom', 'wardRateMul', 12, 22, (v) => `${v}% Faster Ward`, (v) => `Aegis Barrier Ward recharges ${v}% faster.`),
  pct('aegis_bloom', 'dashGraceMul', 15, 28, (v) => `+${v}% Dash Grace`, (v) => `Solar Dash stays invulnerable ${v}% longer.`),
  pct('aegis_bloom', 'repulseMul', 18, 30, (v) => `+${v}% Ward Push`, (v) => `Aegis Ward shockwave pushes shadows ${v}% further.`),
  pct('slipstream_gale', 'speedMul', 6, 11, (v) => `+${v}% Speed`, (v) => `Increase Lumen glide speed by ${v}%.`),
  pct('slipstream_gale', 'dashRateMul', 12, 22, (v) => `${v}% Faster Dash`, (v) => `Solar Dash recharges ${v}% faster.`),
  pct('starforged_resonance', 'grazeMul', 15, 25, (v) => `+${v}% Graze Reach`, (v) => `Widen Graze detection aura by ${v}%.`),
  pct('starforged_resonance', 'comboMul', 12, 22, (v) => `+${v}% Combo Hold`, (v) => `Hold Resonance Combo ${v}% longer.`),
  add('starforged_resonance', 'grazeExpAdd', 2, 4, (v) => `+${v} Graze EXP`, (v) => `Gain +${v} bonus EXP each time you Graze close.`),
  pct('echo_conduit', 'hasteMul', 8, 15, (v) => `${v}% Faster All`, (v) => `All automatic abilities fire ${v}% faster.`),
  pct('echo_conduit', 'globalDmgMul', 8, 15, (v) => `+${v}% All Damage`, (v) => `All Damage abilities deal ${v}% more damage.`),
];

/** Fresh endless-scaling build state for a new run (Starlight Bolt unlocked at LV 1). */
export function createDefaultBuildState() {
  return {
    resonant_volley: { rank: 1, dmgMul: 1, rateMul: 1, countAdd: 0, pierceAdd: 0, rangeMul: 1 },
    solar_orbitals: { rank: 0, countAdd: 0, dmgMul: 1, speedMul: 1, sizeMul: 1 },
    voltaic_chain: { rank: 0, targetsAdd: 0, dmgMul: 1, rateMul: 1, reachMul: 1 },
    astral_pulse: { rank: 0, dmgMul: 1, rateMul: 1, radiusMul: 1, slowMul: 1 },
    seeker_barrage: { rank: 0, countAdd: 0, dmgMul: 1, rateMul: 1, speedMul: 1 },
    starbloom_spores: { rank: 0, dmgMul: 1, rateMul: 1, radiusMul: 1, maxAdd: 0 },
    celestial_spear: { rank: 0, dmgMul: 1, rateMul: 1, pierceAdd: 0, widthMul: 1 },
    gravity_harvest: { rank: 0, magnetMul: 1, expMul: 1, starPull: false },
    aegis_bloom: { rank: 0, wardRateMul: 1, dashGraceMul: 1, repulseMul: 1 },
    slipstream_gale: { rank: 0, speedMul: 1, dashRateMul: 1 },
    starforged_resonance: { rank: 0, grazeMul: 1, comboMul: 1, grazeExpAdd: 0 },
    echo_conduit: { rank: 0, hasteMul: 1, globalDmgMul: 1 },
  };
}

function shuffleWithRng(list, rng) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export const ABILITY_EVOLUTIONS = {
  resonant_volley: { name: 'Forked Light', desc: 'Bolts split into 2 starlight sparks on kill.' },
  solar_orbitals: { name: 'Harmonic Halo', desc: 'Orbit ring periodically scorches shadows.' },
  voltaic_chain: { name: 'Ion Anchor', desc: 'Final chain hit erupts in a static shockwave.' },
  astral_pulse: { name: 'Echo Wave', desc: 'Fires a second trailing shockwave behind each nova.' },
  seeker_barrage: { name: 'Starburst', desc: 'Needles burst in a tight starlight splash on hit.' },
  starbloom_spores: { name: 'Chain Pollen', desc: 'Detonating blooms fire seeking sparks.' },
  celestial_spear: { name: 'Afterglow Lance', desc: 'Beam wake lingers & scorches crossing shadows.' },
};

export function getAbilityInfo(id) {
  return BLESSINGS_BY_ID[id] || null;
}

/** Summarizes an equipped ability's active cumulative modifiers for draft tooltips. */
export function getAbilityModifierLines(
  id,
  st,
  rank = 1,
  talentRanks = null,
  activeSynergies = []
) {
  const lines = [];
  if (st) {
    for (const def of ASPECT_DEFS) {
      if (def.abilityId !== id) continue;
      if (def.mode === 'pct') {
        const pctVal = Math.round(((st[def.aspect] ?? 1) - 1) * 100);
        if (pctVal > 0) lines.push(def.title(pctVal));
      } else {
        const addVal = st[def.aspect] || 0;
        if (addVal > 0) lines.push(def.title(addVal));
      }
    }
  }
  if (id === 'gravity_harvest' && st?.starPull) lines.push('Constellation Star Pull');
  if (id === 'aegis_bloom') lines.push('Recharging Hit-Blocking Ward');

  const groupNodes = ABILITY_TALENT_GROUPS.get(id) || [];
  for (const t of groupNodes) {
    const tr = Math.max(0, Number(talentRanks?.[t.id]) || 0);
    if (tr > 0) {
      lines.push(`✦ Talent · ${t.name} (LV ${tr}/${t.maxLevel}): ${t.rankText(tr)}`);
    }
  }

  for (const syn of activeSynergies) {
    if (syn.pair.includes(id)) {
      lines.push(`◈ Synergy · ${syn.name}: ${syn.desc}`);
    }
  }

  const evo = ABILITY_EVOLUTIONS[id];
  if (evo) {
    if (rank >= 10) lines.push(`✦ Supernova (LV 10+): ${evo.name} amplified`);
    else if (rank >= 5) lines.push(`★ ${evo.name}: ${evo.desc}`);
    else lines.push(`Next Ascension: LV 5 (${evo.name})`);
  }
  if (lines.length === 0) {
    const base = BLESSINGS_BY_ID[id];
    if (base) lines.push(base.desc);
  }
  return lines;
}

/** Generates 3 varied draft options mixing new unlocks (up to MAX_ABILITY_SLOTS) and endless aspect cards. */
export function generateUpgradeDraft(abilityRanks, buildState, rng = Math.random, rareChanceBonus = 0) {
  const unlocks = [];
  const aspects = [];
  let unlockedTotal = 0;
  let unlockedWeapons = 0;

  for (const b of BLESSINGS) {
    const rank = abilityRanks.get(b.id) || 0;
    if (rank > 0) {
      unlockedTotal++;
      if (b.category === 'damage') unlockedWeapons++;
    } else {
      unlocks.push({
        uid: `${b.id}:unlock`,
        id: b.id,
        abilityId: b.id,
        aspect: 'unlock',
        mode: 'unlock',
        val: 1,
        rarity: 'new',
        category: b.category,
        tag: `NEW · ${b.name.toUpperCase()}`,
        title: b.name,
        desc: b.desc,
        currentRank: 0,
        nextRank: 1,
        isNew: true,
      });
    }
  }

  if (unlockedTotal >= MAX_ABILITY_SLOTS) {
    unlocks.length = 0;
  }

  for (const def of ASPECT_DEFS) {
    const curRank = abilityRanks.get(def.abilityId) || 0;
    if (curRank <= 0) continue;
    const abilityState = buildState[def.abilityId];
    if (def.maxAdd && abilityState && (abilityState[def.aspect] || 0) >= def.maxAdd) {
      continue;
    }
    const base = BLESSINGS_BY_ID[def.abilityId];
    const rarity = rng() < def.rareChance + rareChanceBonus ? 'rare' : 'common';
    const val = def[rarity];
    const catPrefix = base?.category === 'utility' ? 'UTILITY' : 'DAMAGE';
    aspects.push({
      uid: `${def.abilityId}:${def.aspect}:${rarity}`,
      id: def.abilityId,
      abilityId: def.abilityId,
      aspect: def.aspect,
      mode: def.mode,
      val,
      rarity,
      category: base?.category || 'damage',
      tag: `${catPrefix} · ${(base?.name || def.abilityId).toUpperCase()}`,
      title: def.title(val),
      desc: def.desc(val),
      currentRank: curRank,
      nextRank: curRank + 1,
      isNew: false,
    });
  }

  shuffleWithRng(unlocks, rng);
  shuffleWithRng(aspects, rng);

  const picked = [];
  const usedKeys = new Set();
  const usedAbilities = new Set();

  const tryTake = (opt, requireDistinctAbility = true) => {
    if (!opt || picked.length >= 3) return false;
    const key = `${opt.abilityId}:${opt.aspect}`;
    if (usedKeys.has(key)) return false;
    if (requireDistinctAbility && usedAbilities.has(opt.abilityId)) return false;
    usedKeys.add(key);
    usedAbilities.add(opt.abilityId);
    picked.push(opt);
    return true;
  };

  // Early run: offer a mix of new weapon/utility unlocks and aspect cards until slots fill
  const targetUnlocks = unlocks.length === 0 ? 0 : unlockedWeapons < 3 ? 2 : 1;
  for (let i = 0; i < unlocks.length && picked.length < targetUnlocks; i++) {
    tryTake(unlocks[i], true);
  }

  // Fill with aspect upgrades across distinct abilities first
  for (const opt of aspects) {
    if (picked.length >= 3) break;
    tryTake(opt, true);
  }

  // Fallback with remaining unlocks or another aspect on an existing ability
  for (const opt of unlocks) {
    if (picked.length >= 3) break;
    tryTake(opt, true);
  }
  for (const opt of aspects) {
    if (picked.length >= 3) break;
    tryTake(opt, false);
  }

  return shuffleWithRng(picked, rng);
}

/** Applies a chosen unlock or endless aspect card to abilityRanks and buildState. */
export function applyUpgradeOption(option, abilityRanks, buildState) {
  const id = option.abilityId || option.id;
  const prevRank = abilityRanks.get(id) || 0;
  const nextRank = prevRank + 1;
  abilityRanks.set(id, nextRank);

  const st = buildState[id];
  if (!st) return nextRank;
  st.rank = nextRank;

  if (option.aspect === 'unlock') {
    if (id === 'gravity_harvest') {
      st.magnetMul += 0.25;
      st.expMul += 0.1;
      st.starPull = true;
    } else if (id === 'slipstream_gale') {
      st.speedMul += 0.08;
      st.dashRateMul += 0.12;
    } else if (id === 'starforged_resonance') {
      st.grazeMul += 0.15;
      st.comboMul += 0.15;
      st.grazeExpAdd += 2;
    } else if (id === 'echo_conduit') {
      st.hasteMul += 0.1;
    }
    return nextRank;
  }

  if (option.mode === 'pct') {
    st[option.aspect] = +((st[option.aspect] || 1) + option.val / 100).toFixed(4);
  } else if (option.mode === 'add') {
    st[option.aspect] = (st[option.aspect] || 0) + option.val;
  }
  return nextRank;
}

function buildTalentCosts(start, mult, maxRank) {
  return Array.from({ length: maxRank }, (_, i) =>
    Math.round((start * Math.pow(mult, i)) / 50) * 50
  );
}

const fmtPct = (v) => `${Number(v.toFixed(1))}`;
const rerollsForRank = (r) => (r > 0 ? 1 + Math.floor((r - 1) / 4) : 0);

export const SANCTUARY_UPGRADES = [
  {
    id: 'astral_reroll',
    name: 'Astral Foresight',
    desc: '+2.5% Rare card odds per rank & +1 Reroll every 4 ranks.',
    effectLabel: (r) => {
      const rr = rerollsForRank(r);
      return `+${rr} Reroll${rr > 1 ? 's' : ''} · +${fmtPct(r * 2.5)}% Rare`;
    },
    costs: buildTalentCosts(1100, 1.15, 20),
  },
  {
    id: 'luminous_force',
    name: 'Radiant Core',
    desc: '+1.5% all automatic Damage per rank.',
    effectLabel: (r) => `+${fmtPct(r * 1.5)}% Damage`,
    costs: buildTalentCosts(950, 1.13, 25),
  },
  {
    id: 'quickening',
    name: 'Tempo Flow',
    desc: 'All abilities fire 1.5% faster per rank.',
    effectLabel: (r) => `${fmtPct(r * 1.5)}% Faster`,
    costs: buildTalentCosts(950, 1.13, 25),
  },
  {
    id: 'tide_current',
    name: 'Drift Current',
    desc: '+1% glide speed & +1.5% Solar Dash recharge per rank.',
    effectLabel: (r) => `+${r}% Spd · +${fmtPct(r * 1.5)}% Dash`,
    costs: buildTalentCosts(900, 1.14, 20),
  },
  {
    id: 'starlight_harvest',
    name: 'Magnet Tide',
    desc: '+3% Magnet reach & +2% EXP per rank.',
    effectLabel: (r) => `+${r * 3}% Mag · +${r * 2}% EXP`,
    costs: buildTalentCosts(1000, 1.14, 20),
  },
];

export function getUpgradeEffects(upgrades = {}) {
  const r = (id) => Math.max(0, Number(upgrades[id]) || 0);
  return {
    extraRerolls: rerollsForRank(r('astral_reroll')),
    rareBonus: r('astral_reroll') * 0.025,
    globalDmgMul: 1 + r('luminous_force') * 0.015,
    hasteMul: 1 + r('quickening') * 0.015,
    speedMul: 1 + r('tide_current') * 0.01,
    dashRateMul: 1 + r('tide_current') * 0.015,
    magnetMul: 1 + r('starlight_harvest') * 0.03,
    expMul: 1 + r('starlight_harvest') * 0.02,
  };
}

const T1_COSTS = [750, 1200, 1800, 2550];
const T2_COSTS = [1140, 1740, 2460, 3300];
const T3_COSTS = [1650, 2400, 3450, 4650];
const scaleCosts = (arr, mul = 1) => arr.map((c) => Math.round((c * mul) / 10) * 10);

const tn = (abilityId, id, slot, name, glyph, costs, requires, desc, rankText) => ({
  abilityId,
  id,
  slot,
  name,
  glyph,
  costs,
  maxLevel: costs.length,
  requires,
  desc,
  rankText,
});

const step = (arr, r) => arr[Math.max(0, Math.min(arr.length - 1, r - 1))];

export const ABILITY_TALENTS = [
  // 1. Starlight Bolt (Precision Ricochet & Fan Salvos vs Starfire Supernova)
  tn('resonant_volley', 'rv_velocity', 'root', 'Focus Bolt', 'force', T1_COSTS, null,
    'Sharpens single-target Bolt impact damage and projectile flight speed.',
    (r) => `+${r * 8}% single-target dmg & +${r * 12}% speed`),
  tn('resonant_volley', 'rv_ricochet', 'leftMid', 'Prismatic Ricochet', 'chain', T2_COSTS, 'rv_velocity',
    'Bolts ricochet cleanly toward nearby unhit shadows after impact.',
    (r) => `+${r >= 3 ? 2 : 1} ricochet${r >= 3 ? 's' : ''} (${step([55, 70, 85, 100], r)}% dmg)`),
  tn('resonant_volley', 'rv_splitshot', 'leftCap', 'Fan Salvo', 'prism', T3_COSTS, 'rv_ricochet',
    'Every few volleys launches two extra angled flanking Starlight Bolts.',
    (r) => `Every ${step(['4th', '3rd', '3rd', '2nd'], r)} volley fires +2 flanking Bolts (${step([60, 75, 90, 100], r)}% dmg)`),
  tn('resonant_volley', 'rv_starfire', 'rightMid', 'Starfire Burn', 'burn', T2_COSTS, 'rv_velocity',
    'Bolts sear struck shadows with an incandescent 2.4s Starfire burn.',
    (r) => `${step([0.45, 0.7, 0.95, 1.25], r)} dmg/s burn (2.4s)`),
  tn('resonant_volley', 'rv_crescendo', 'rightCap', 'Supernova Finale', 'blast', T3_COSTS, 'rv_starfire',
    'Every 4th Bolt volley detonates on hit in a 64px astral flash & releases homing sparks.',
    (r) => `4th volley blasts (${step([55, 80, 110, 145], r)}% AoE) & scatters ${r} spark${r > 1 ? 's' : ''}`),

  // 2. Orbiting Blades (Outward Sunbeam Lasers vs Kinetic Deflector)
  tn('solar_orbitals', 'so_edge', 'root', 'Radiant Edge', 'prism', T1_COSTS, null,
    'Empowers Orbiting Blade slash damage and rotational orbit speed.',
    (r) => `+${r * 10}% blade dmg & +${r * 6}% orbit speed`),
  tn('solar_orbitals', 'so_sunray', 'leftMid', 'Solar Rays', 'prism', T2_COSTS, 'so_edge',
    'Each Blade projects a sweeping outward laser ray slicing shadows beyond its orbit.',
    (r) => `+${step([60, 82, 104, 126], r)}px outward blade laser (${step([35, 50, 65, 85], r)}% dmg)`),
  tn('solar_orbitals', 'so_mirror', 'leftCap', 'Corona Expansion', 'tempo', T3_COSTS, 'so_sunray',
    'Periodically expands Blades 1.45× outward for 1.6s while surging slash & laser damage.',
    (r) => `Every ${step([5.5, 4.7, 4.0, 3.3], r)}s surges 1.45× wide (+${step([25, 40, 55, 75], r)}% dmg)`),
  tn('solar_orbitals', 'so_repulse', 'rightMid', 'Void Deflector', 'force', T2_COSTS, 'so_edge',
    'Hurls slashed shadows harder and shaves Solar Dash cooldown on Elite/Lancer hits.',
    (r) => `+${r * 25}% knockback & -${step([0.15, 0.25, 0.35, 0.45], r)}s Dash on Heavy slash`),
  tn('solar_orbitals', 'so_execution', 'rightCap', 'Eclipse Cleave', 'shield', T3_COSTS, 'so_repulse',
    'Delivers heavy finishing slashes against Elites, Cores & wounded shadows below 50% HP.',
    (r) => `+${step([20, 40, 60, 85], r)}% dmg vs Elites, Cores & wounded (<50% HP)`),

  // 3. Voltaic Arc (Twin-Fork Lightning vs Single-Target Capacitor & Paralysis)
  tn('voltaic_chain', 'vc_charge', 'root', 'Overcharged Coil', 'chain', T1_COSTS, null,
    'Amplifies lightning arc damage and extends jump reach.',
    (r) => `+${r * 10}% arc dmg & +${r * 6}% reach`),
  tn('voltaic_chain', 'vc_relay', 'leftMid', 'Relay Conduit', 'chain', T2_COSTS, 'vc_charge',
    'Adds extra chain bounce targets and widens inter-shadow jump reach.',
    (r) => `+${r >= 3 ? 2 : 1} chain bounce${r >= 3 ? 's' : ''} & +${r * 8}% reach`),
  tn('voltaic_chain', 'vc_fork', 'leftCap', 'Twin-Arc Fork', 'chain', T3_COSTS, 'vc_relay',
    'Discharges two simultaneous forked lightning chains from Lumen at once.',
    (r) => `Simultaneous 2nd fork chain (${step([45, 60, 75, 95], r)}% dmg)`),
  tn('voltaic_chain', 'vc_capacitor', 'rightMid', 'Feedback Capacitor', 'force', T2_COSTS, 'vc_charge',
    'Each unused bounce surges back into the final struck target for heavy single-target burst.',
    (r) => `+${step([18, 28, 38, 50], r)}% burst dmg per unused chain bounce`),
  tn('voltaic_chain', 'vc_stun', 'rightCap', 'Paralyzing Surge', 'tempo', T3_COSTS, 'vc_capacitor',
    'Temporarily stalls electrocuted shadows and restores Solar Dash energy on Arc kills.',
    (r) => `${step([0.4, 0.6, 0.8, 1.0], r)}s jolt slow & +${step([0.12, 0.2, 0.28, 0.38], r)}s Dash on kill`),

  // 4. Astral Pulse (Gravity Implosion vs Twin Echo Siphon)
  tn('astral_pulse', 'ap_swell', 'root', 'Tidal Resonance', 'blast', T1_COSTS, null,
    'Strengthens radial shockwave damage and expands pulse radius.',
    (r) => `+${r * 10}% pulse dmg & +${r * 5}% radius`),
  tn('astral_pulse', 'ap_vortex', 'leftMid', 'Gravity Well', 'force', [2250], 'ap_swell',
    'Reverses Astral Pulse into a Gravity Collapse pulling shadows inward.',
    () => 'Pulls struck shadows inward instead of pushing away'),
  tn('astral_pulse', 'ap_singularity', 'leftCap', 'Singularity Crush', 'blast', T3_COSTS, 'ap_vortex',
    'Implodes shadows pulled near Lumen with a delayed crushing shockwave.',
    (r) => `Delayed implode (${step([0.55, 0.85, 1.15, 1.55], r)} AoE dmg & 1.1s stasis)`),
  tn('astral_pulse', 'ap_twinwave', 'rightMid', 'Harmonic Double-Wave', 'blast', T2_COSTS, 'ap_swell',
    'Astral Pulse echoes a second rapid pulse wave 0.26s after triggering.',
    (r) => `Echo wave after 0.26s (${step([35, 50, 65, 85], r)}% dmg)`),
  tn('astral_pulse', 'ap_siphon', 'rightCap', 'Tidal Siphon', 'hoard', T3_COSTS, 'ap_twinwave',
    'Each shadow struck shaves Pulse cooldown and pulls nearby Motes inward.',
    (r) => `-${step([0.06, 0.09, 0.12, 0.15], r)}s CD/hit & ${step([180, 240, 300, 380], r)}px Mote pull`),

  // 5. Seeker Needles (Ghostbreaker Pierce vs Starlight Execution Mark)
  tn('seeker_barrage', 'sb_guidance', 'root', 'Luminous Guidance', 'prism', scaleCosts(T1_COSTS, 1.1), null,
    'Boosts Seeker Needle damage and sharpens tracking turn rate.',
    (r) => `+${r * 10}% dmg & +${r * 12}% turn speed`),
  tn('seeker_barrage', 'sb_twin', 'leftMid', 'Twin Volleys', 'prism', scaleCosts(T2_COSTS, 1.1), 'sb_guidance',
    'Fires extra homing Needles and accelerates Needle flight velocity.',
    (r) => `+${r >= 3 ? 2 : 1} needle${r >= 3 ? 's' : ''} & +${r * 10}% speed`),
  tn('seeker_barrage', 'sb_pierce', 'leftCap', 'Ghostbreaker Pierce', 'force', scaleCosts(T3_COSTS, 1.1), 'sb_twin',
    'Needles pierce shadows and automatically bend mid-flight to re-acquire fresh targets.',
    (r) => `+${r >= 3 ? 2 : 1} pierce & homing re-lock after pass-through`),
  tn('seeker_barrage', 'sb_mark', 'rightMid', 'Starlight Mark', 'prism', scaleCosts(T2_COSTS, 1.1), 'sb_guidance',
    'Hits paint a 3.5s Starlight Mark amplifying ALL incoming damage on the target.',
    (r) => `Marked shadows take +${step([12, 20, 28, 38], r)}% dmg from all sources (3.5s)`),
  tn('seeker_barrage', 'sb_execute', 'rightCap', 'Guillotine Salvo', 'chain', scaleCosts(T3_COSTS, 1.1), 'sb_mark',
    'Deals finisher damage below 45% HP and launches free Needles on Marked purges.',
    (r) => `+${step([25, 40, 55, 75], r)}% dmg <45% HP · +${r >= 3 ? 2 : 1} bonus Needle on Marked kill`),

  // 6. Starbloom Spores (Drift Mitosis vs Living Spore Sanctuary)
  tn('starbloom_spores', 'ss_potency', 'root', 'Radiant Pollen', 'blast', scaleCosts(T1_COSTS, 1.15), null,
    'Increases Starbloom burst damage and widens detonation radius.',
    (r) => `+${r * 10}% bloom dmg & +${r * 6}% blast radius`),
  tn('starbloom_spores', 'ss_drift', 'leftMid', 'Blooming Drift', 'force', scaleCosts(T2_COSTS, 1.15), 'ss_potency',
    'Armed spores drift toward nearby shadows with wider trigger detection.',
    (r) => `+${r * 22}% shadow drift & +${r * 6}% trigger area`),
  tn('starbloom_spores', 'ss_chain', 'leftCap', 'Spore Mitosis', 'prism', scaleCosts(T3_COSTS, 1.15), 'ss_drift',
    'Bursts scatter homing sparks and can bud a fresh mini-spore in place.',
    (r) => `${r} spark${r > 1 ? 's' : ''} & ${step([30, 45, 60, 80], r)}% chance to bud mini-spore`),
  tn('starbloom_spores', 'ss_miasma', 'rightMid', 'Solar Miasma', 'burn', scaleCosts(T2_COSTS, 1.15), 'ss_potency',
    'Blooms sear caught shadows with a lingering 2.6s starlight miasma.',
    (r) => `${step([0.4, 0.65, 0.9, 1.2], r)} dmg/s miasma DoT (2.6s)`),
  tn('starbloom_spores', 'ss_garden', 'rightCap', 'Blighted Blossom Pool', 'zone', scaleCosts(T3_COSTS, 1.15), 'ss_miasma',
    'Detonated blooms unfurl a 76px glowing mist pool slowing & damaging entrants.',
    (r) => `76px spore mist (${step([0.55, 0.85, 1.15, 1.5], r)} dmg/s, 3.2s)`),

  // 7. Celestial Spear (Prismatic Railgun vs Residual Twin Lance)
  tn('celestial_spear', 'cs_caliber', 'root', 'Lance Caliber', 'prism', scaleCosts(T1_COSTS, 1.2), null,
    'Boosts Celestial Spear beam damage and widens laser corridor.',
    (r) => `+${r * 10}% beam dmg & +${r * 10}% beam width`),
  tn('celestial_spear', 'cs_impale', 'leftMid', 'Armor Shatter', 'force', scaleCosts(T2_COSTS, 1.2), 'cs_caliber',
    'Adds extra beam pierce and amplifies single-target damage on first hit.',
    (r) => `+${r >= 3 ? 2 : 1} pierce & +${step([15, 30, 45, 60], r)}% first-target dmg`),
  tn('celestial_spear', 'cs_prism', 'leftCap', 'Prismatic Split', 'prism', scaleCosts(T3_COSTS, 1.2), 'cs_impale',
    'Each pierced target refracts 2 angled radiant prism rays outward.',
    (r) => `Refracts 2 sparks (${step([30, 45, 60, 75], r)}% beam dmg)`),
  tn('celestial_spear', 'cs_afterglow', 'rightMid', 'Suspended Afterglow', 'tempo', scaleCosts(T2_COSTS, 1.2), 'cs_caliber',
    'Suspends the laser line longer in space to sear corridor foes a second time.',
    (r) => `+${step([0.45, 0.65, 0.85, 1.1], r)}s beam hang & ${step([35, 50, 65, 85], r)}% afterglow wave`),
  tn('celestial_spear', 'cs_crossfire', 'rightCap', 'Twin Celestial Lance', 'prism', scaleCosts(T3_COSTS, 1.2), 'cs_afterglow',
    'Simultaneously fires a second Celestial Spear at another nearby threat.',
    (r) => `Fires 2nd intersecting Spear (${step([45, 60, 75, 95], r)}% dmg)`),

  // 8. Gravity Harvest (Luminous Alchemy vs Vacuum Supercharge)
  tn('gravity_harvest', 'gh_attractor', 'root', 'Starwell Magnet', 'hoard', T1_COSTS, null,
    'Expands Mote & Shard magnetic pull reach around Lumen.',
    (r) => `+${r * 10}% Mote magnet range`),
  tn('gravity_harvest', 'gh_greed', 'leftMid', 'Luminous Hoard', 'hoard', T2_COSTS, 'gh_attractor',
    'Increases EXP & Score harvested from Light Motes.',
    (r) => `+${step([10, 20, 30, 45], r)}% bonus EXP & Score`),
  tn('gravity_harvest', 'gh_shimmer', 'leftCap', 'Midas Crystallization', 'hoard', T3_COSTS, 'gh_greed',
    'Every 12 Motes gathered crystallizes bonus LUM and spawns a Golden Mote.',
    (r) => `+${r} LUM & spawns Golden Mote every 12 Motes`),
  tn('gravity_harvest', 'gh_vacuum', 'rightMid', 'Slipstream Vacuum', 'force', T2_COSTS, 'gh_attractor',
    'Every 10th Light Mote triggers a cosmic pull reeling in distant Motes & Stars.',
    (r) => `Every 10th Mote pulls collectibles within ${step([240, 300, 360, 440], r)}px`),
  tn('gravity_harvest', 'gh_nova', 'rightCap', 'Constellation Blast', 'blast', T3_COSTS, 'gh_vacuum',
    'Golden Motes, Stars & Prisms erupt in a 135px burst and recharge Solar Dash.',
    (r) => `Special pickups blast (${step([0.65, 0.95, 1.25, 1.6], r)} dmg) & +${step([0.2, 0.3, 0.4, 0.5], r)} Dash`),

  // 9. Aegis Sanctuary (Repulsive Bulwark vs Phoenix Shatter)
  tn('aegis_bloom', 'ab_mantle', 'root', 'Crystal Mantle', 'shield', T1_COSTS, null,
    'Extends Solar Dash and Ward invulnerability grace windows.',
    (r) => `+${r * 10}% Dash & Ward invulnerability grace`),
  tn('aegis_bloom', 'ab_tempo', 'leftMid', 'Quick Mend', 'tempo', T2_COSTS, 'ab_mantle',
    'Recharges Aegis Barrier Ward significantly faster.',
    (r) => `${step([12, 22, 32, 42], r)}% faster Ward recharge`),
  tn('aegis_bloom', 'ab_bulwark', 'leftCap', 'Repulsive Bulwark', 'shield', T3_COSTS, 'ab_tempo',
    'While Ward is charged, emits a 96px knockback pulse every 1.6s shoving shadows away.',
    (r) => `96px shield pulse every 1.6s (${step([0.45, 0.7, 0.95, 1.25], r)} dmg + knockback)`),
  tn('aegis_bloom', 'ab_nova', 'rightMid', 'Mirror Shatter', 'blast', T2_COSTS, 'ab_mantle',
    'Blocking a hit erupts in a heavy Shockwave Nova & grants 1.6s burst glide speed.',
    (r) => `Ward block blasts (${step([1.2, 1.9, 2.6, 3.4], r)} dmg) & +${step([20, 30, 40, 55], r)}% speed`),
  tn('aegis_bloom', 'ab_radiance', 'rightCap', 'Phoenix Barrier', 'prism', T3_COSTS, 'ab_nova',
    'Ward block immediately restores 1 Solar Dash charge and surges Ability Damage for 4s.',
    (r) => `Ward block restores 1 Dash & +${step([25, 40, 55, 75], r)}% DMG for 4.0s`),

  // 10. Slipstream Gale (Chrono-Dash vs Feather Afterimage)
  tn('slipstream_gale', 'sg_tailwind', 'root', 'Tailwind Current', 'force', T1_COSTS, null,
    'Raises base Spirit glide speed and accelerates Solar Dash recharge.',
    (r) => `+${r * 4}% glide speed & +${r * 6}% Dash recharge`),
  tn('slipstream_gale', 'sg_feather', 'leftMid', 'Featherdrift', 'force', T2_COSTS, 'sg_tailwind',
    'Grants +1 max Solar Dash charge and extra glide agility.',
    (r) => `+1 Max Dash & +${Math.max(0, (r - 1) * 3)}% glide speed`),
  tn('slipstream_gale', 'sg_mirage', 'leftCap', 'Chrono-Dash', 'tempo', T3_COSTS, 'sg_feather',
    'Each Solar Dash shaves cooldowns off active automatic abilities.',
    (r) => `Dash shaves ${step([0.2, 0.35, 0.5, 0.65], r).toFixed(2)}s off ability cooldowns`),
  tn('slipstream_gale', 'sg_sparks', 'rightMid', 'Razor Feathers', 'chain', T2_COSTS, 'sg_tailwind',
    'Solar Dash launches homing wind-feathers toward chasing shadows.',
    (r) => `Dash fires ${r + 1} homing feather sparks (0.85 dmg)`),
  tn('slipstream_gale', 'sg_phase', 'rightCap', 'Phase Afterimage', 'blast', T3_COSTS, 'sg_sparks',
    'Leaves an explosive afterimage at Dash origin that refunds Dash when catching 2+ foes.',
    (r) => `74px origin blast (${step([1.0, 1.45, 1.9, 2.4], r)} dmg) & +${step([0.25, 0.35, 0.45, 0.55], r)} Dash if 2+ hit`),

  // 11. Starforged Resonance (Fever Overdrive vs Precision Graze Catalyst)
  tn('starforged_resonance', 'sr_harmonic', 'root', 'Harmonic Focus', 'hoard', T1_COSTS, null,
    'Extends Combo hold duration and widens close Graze detection.',
    (r) => `+${r * 8}% Combo hold & +${r * 8}% Graze reach`),
  tn('starforged_resonance', 'sr_sustain', 'leftMid', 'Astral Sustain', 'tempo', T2_COSTS, 'sr_harmonic',
    'Prolongs Astral Fever overdrive and boosts Fever firing cadence.',
    (r) => `+${step([0.6, 1.2, 1.8, 2.5], r)}s Fever & +${r * 5}% Fever haste`),
  tn('starforged_resonance', 'sr_crescendo', 'leftCap', 'Fever Overdrive', 'blast', T3_COSTS, 'sr_sustain',
    'During Astral Fever, empowers all automatic abilities with massive bonus damage.',
    (r) => `+${step([15, 28, 42, 60], r)}% all ability dmg during Fever`),
  tn('starforged_resonance', 'sr_graze_arc', 'rightMid', 'Precision Graze', 'chain', T2_COSTS, 'sr_harmonic',
    'Close Grazes whip a lightning counter-zap and grant instant bonus EXP.',
    (r) => `Grazes zap (${step([0.5, 0.8, 1.1, 1.45], r)} dmg) & +${step([1, 2, 2, 3], r)} EXP`),
  tn('starforged_resonance', 'sr_cascade', 'rightCap', 'Combo Catalyst', 'hoard', T3_COSTS, 'sr_graze_arc',
    'Every 6th Graze leaps Combo forward and pulls surrounding Light Motes.',
    (r) => `6th Graze: +${step([2, 3, 3, 4], r)} Combo & ${step([180, 220, 260, 300], r)}px Mote pull`),

  // 12. Echo Conduit (Mirror Casts vs Chromatic Harmonics)
  tn('echo_conduit', 'ec_tempo', 'root', 'Chrono Alignment', 'tempo', scaleCosts(T1_COSTS, 1.15), null,
    'Accelerates all automatic triggers and extends ability reach.',
    (r) => `+${(r * 2.5).toFixed(1)}% trigger speed & +${r * 4}% reach`),
  tn('echo_conduit', 'ec_overclock', 'leftMid', 'Cadence Overclock', 'tempo', scaleCosts(T2_COSTS, 1.15), 'ec_tempo',
    'Further overclocks automatic cooldown cadence across all abilities.',
    (r) => `+${r * 3}% faster all ability triggers`),
  tn('echo_conduit', 'ec_twinbeat', 'leftCap', 'Mirror Resonance', 'prism', scaleCosts(T3_COSTS, 1.15), 'ec_overclock',
    'Periodically echoes a full Mirror Copy of your Bolt, Seeker, or Spear casts.',
    (r) => `Every ${step(['5th', '4th', '3rd', '2nd'], r)} Bolt/Seeker/Spear echoes a 65% Mirror Copy`),
  tn('echo_conduit', 'ec_empower', 'rightMid', 'Prismatic Amplify', 'shield', scaleCosts(T2_COSTS, 1.15), 'ec_tempo',
    'Amplifies global automatic Ability Damage across every equipped weapon.',
    (r) => `+${r * 4}% global Ability Damage`),
  tn('echo_conduit', 'ec_singularity', 'rightCap', 'Chromatic Resonance', 'blast', scaleCosts(T3_COSTS, 1.15), 'ec_empower',
    'Scales global damage per active Synergy & Evolution and pulses a periodic Echo Wave.',
    (r) => `+${step([6, 10, 14, 18], r)}% dmg per Synergy/Evo & 165px Echo Wave every 4s`),
];

export const ABILITY_TALENTS_BY_ID = Object.fromEntries(ABILITY_TALENTS.map((t) => [t.id, t]));

export const ABILITY_TALENT_GROUPS = new Map();
for (const t of ABILITY_TALENTS) {
  if (!ABILITY_TALENT_GROUPS.has(t.abilityId)) ABILITY_TALENT_GROUPS.set(t.abilityId, []);
  ABILITY_TALENT_GROUPS.get(t.abilityId).push(t);
}

const RANK_VALS = {
  rv_ricochet_mul: [0, 0.55, 0.7, 0.85, 1.0],
  rv_fan_every: [0, 4, 3, 3, 2],
  rv_fan_mul: [0, 0.6, 0.75, 0.9, 1.0],
  rv_crescendo_pct: [0, 0.55, 0.8, 1.1, 1.45],
  dot_bolt: [0, 0.45, 0.7, 0.95, 1.25],
  dot_miasma: [0, 0.4, 0.65, 0.9, 1.2],
  pool_150: [0, 0.55, 0.85, 1.15, 1.5],
  so_ray_len: [0, 60, 82, 104, 126],
  so_ray_pct: [0, 0.35, 0.5, 0.65, 0.85],
  so_surge_cd: [0, 5.5, 4.7, 4.0, 3.3],
  so_surge_dmg: [0, 0.25, 0.4, 0.55, 0.75],
  so_dash_cdr: [0, 0.15, 0.25, 0.35, 0.45],
  so_exec: [0, 0.2, 0.4, 0.6, 0.85],
  vc_fork_pct: [0, 0.45, 0.6, 0.75, 0.95],
  vc_cap: [0, 0.18, 0.28, 0.38, 0.5],
  vc_stun: [0, 0.4, 0.6, 0.8, 1.0],
  vc_dash: [0, 0.12, 0.2, 0.28, 0.38],
  crush: [0, 0.55, 0.85, 1.15, 1.55],
  ap_twin: [0, 0.35, 0.5, 0.65, 0.85],
  ap_siphon_cdr: [0, 0.06, 0.09, 0.12, 0.15],
  ap_siphon_pull: [0, 180, 240, 300, 380],
  sb_mark: [0, 0.12, 0.2, 0.28, 0.38],
  sb_exec: [0, 0.25, 0.4, 0.55, 0.75],
  ss_mitosis: [0, 0.3, 0.45, 0.6, 0.8],
  first_60: [0, 0.15, 0.3, 0.45, 0.6],
  cs_prism: [0, 0.3, 0.45, 0.6, 0.75],
  cs_hang: [0, 0.45, 0.65, 0.85, 1.1],
  cs_after_pct: [0, 0.35, 0.5, 0.65, 0.85],
  cs_twin: [0, 0.45, 0.6, 0.75, 0.95],
  gh_exp: [0, 0.1, 0.2, 0.3, 0.45],
  gh_vac: [0, 240, 300, 360, 440],
  gh_nova: [0, 0.65, 0.95, 1.25, 1.6],
  gh_dash: [0, 0.2, 0.3, 0.4, 0.5],
  ab_tempo: [0, 0.12, 0.22, 0.32, 0.42],
  ab_bulwark: [0, 0.45, 0.7, 0.95, 1.25],
  ab_nova: [0, 1.2, 1.9, 2.6, 3.4],
  ab_speed: [0, 0.2, 0.3, 0.4, 0.55],
  ab_phoenix: [0, 0.25, 0.4, 0.55, 0.75],
  sg_cdr: [0, 0.2, 0.35, 0.5, 0.65],
  sg_blast: [0, 1.0, 1.45, 1.9, 2.4],
  sg_refund: [0, 0.25, 0.35, 0.45, 0.55],
  sr_fever: [0, 0.6, 1.2, 1.8, 2.5],
  sr_over: [0, 0.15, 0.28, 0.42, 0.6],
  sr_zap: [0, 0.5, 0.8, 1.1, 1.45],
  sr_exp: [0, 1, 2, 2, 3],
  sr_cat_combo: [0, 2, 3, 3, 4],
  sr_cat_pull: [0, 180, 220, 260, 300],
  ec_mirror_every: [0, 5, 4, 3, 2],
  ec_syn_pct: [0, 0.06, 0.1, 0.14, 0.18],
};

/** Computes typed active talent modifiers for any ability from saved `talentRanks`. */
export function getGroupTalentEffects(abilityId, talentRanks = {}) {
  const rk = (id) => Math.max(0, Number(talentRanks?.[id]) || 0);
  if (abilityId === 'resonant_volley') {
    const ricoR = rk('rv_ricochet');
    const fanR = rk('rv_splitshot');
    const cresR = rk('rv_crescendo');
    return {
      singleDmgMul: 1 + rk('rv_velocity') * 0.08,
      speedMul: 1 + rk('rv_velocity') * 0.12,
      ricochetCount: ricoR >= 3 ? 2 : ricoR >= 1 ? 1 : 0,
      ricochetMul: RANK_VALS.rv_ricochet_mul[ricoR] || 0,
      fanEvery: RANK_VALS.rv_fan_every[fanR] || 0,
      fanDmgMul: RANK_VALS.rv_fan_mul[fanR] || 0,
      burnDps: RANK_VALS.dot_bolt[rk('rv_starfire')] || 0,
      crescendoSplashPct: RANK_VALS.rv_crescendo_pct[cresR] || 0,
      crescendoSparks: cresR,
    };
  }
  if (abilityId === 'solar_orbitals') {
    const mirR = rk('so_mirror');
    const repR = rk('so_repulse');
    return {
      dmgMul: 1 + rk('so_edge') * 0.1,
      speedMul: 1 + rk('so_edge') * 0.06,
      rayLen: RANK_VALS.so_ray_len[rk('so_sunray')] || 0,
      rayPct: RANK_VALS.so_ray_pct[rk('so_sunray')] || 0,
      surgeCooldown: RANK_VALS.so_surge_cd[mirR] || 0,
      surgeBonusPct: RANK_VALS.so_surge_dmg[mirR] || 0,
      knockMul: 1 + repR * 0.25,
      staggerSlow: repR * 0.2,
      heavyDashCdr: RANK_VALS.so_dash_cdr[repR] || 0,
      eliteExecBonus: RANK_VALS.so_exec[rk('so_execution')] || 0,
    };
  }
  if (abilityId === 'voltaic_chain') {
    const relR = rk('vc_relay');
    const stR = rk('vc_stun');
    return {
      dmgMul: 1 + rk('vc_charge') * 0.1,
      reachMul: 1 + rk('vc_charge') * 0.06 + relR * 0.08,
      extraTargets: relR >= 3 ? 2 : relR >= 1 ? 1 : 0,
      forkPct: RANK_VALS.vc_fork_pct[rk('vc_fork')] || 0,
      capPerUnused: RANK_VALS.vc_cap[rk('vc_capacitor')] || 0,
      stunSec: RANK_VALS.vc_stun[stR] || 0,
      killDashRestore: RANK_VALS.vc_dash[stR] || 0,
    };
  }
  if (abilityId === 'astral_pulse') {
    const siphR = rk('ap_siphon');
    return {
      dmgMul: 1 + rk('ap_swell') * 0.1,
      radiusMul: 1 + rk('ap_swell') * 0.05,
      vortexPull: rk('ap_vortex') > 0,
      crushDmg: RANK_VALS.crush[rk('ap_singularity')] || 0,
      twinPct: RANK_VALS.ap_twin[rk('ap_twinwave')] || 0,
      siphonPerHit: RANK_VALS.ap_siphon_cdr[siphR] || 0,
      siphonPullRadius: RANK_VALS.ap_siphon_pull[siphR] || 0,
    };
  }
  if (abilityId === 'seeker_barrage') {
    const twR = rk('sb_twin');
    const piR = rk('sb_pierce');
    const exR = rk('sb_execute');
    return {
      dmgMul: 1 + rk('sb_guidance') * 0.1,
      turnMul: 1 + rk('sb_guidance') * 0.12,
      extraCount: twR >= 3 ? 2 : twR >= 1 ? 1 : 0,
      speedMul: 1 + twR * 0.1,
      extraPierce: piR >= 3 ? 2 : piR >= 1 ? 1 : 0,
      markBonus: RANK_VALS.sb_mark[rk('sb_mark')] || 0,
      executeBonus: RANK_VALS.sb_exec[exR] || 0,
      killedSalvo: exR >= 3 ? 2 : exR >= 1 ? 1 : 0,
    };
  }
  if (abilityId === 'starbloom_spores') {
    const drR = rk('ss_drift');
    const chR = rk('ss_chain');
    return {
      dmgMul: 1 + rk('ss_potency') * 0.1,
      radiusMul: 1 + rk('ss_potency') * 0.06,
      driftMul: drR * 0.22,
      triggerMul: 1 + drR * 0.06,
      clusterSparks: chR,
      mitosisChance: RANK_VALS.ss_mitosis[chR] || 0,
      burnDps: RANK_VALS.dot_miasma[rk('ss_miasma')] || 0,
      poolDps: RANK_VALS.pool_150[rk('ss_garden')] || 0,
    };
  }
  if (abilityId === 'celestial_spear') {
    const impR = rk('cs_impale');
    const afR = rk('cs_afterglow');
    return {
      dmgMul: 1 + rk('cs_caliber') * 0.1,
      widthMul: 1 + rk('cs_caliber') * 0.1,
      extraPierce: impR >= 3 ? 2 : impR >= 1 ? 1 : 0,
      firstTargetBonus: RANK_VALS.first_60[impR] || 0,
      prismPct: RANK_VALS.cs_prism[rk('cs_prism')] || 0,
      afterglowHang: RANK_VALS.cs_hang[afR] || 0,
      afterglowPct: RANK_VALS.cs_after_pct[afR] || 0,
      twinPct: RANK_VALS.cs_twin[rk('cs_crossfire')] || 0,
    };
  }
  if (abilityId === 'gravity_harvest') {
    const shR = rk('gh_shimmer');
    const novR = rk('gh_nova');
    return {
      magnetMul: 1 + rk('gh_attractor') * 0.1,
      expScoreMul: 1 + (RANK_VALS.gh_exp[rk('gh_greed')] || 0),
      bountyLum: shR,
      spawnGoldMote: shR > 0,
      vacuumRadius: RANK_VALS.gh_vac[rk('gh_vacuum')] || 0,
      specialNovaDmg: RANK_VALS.gh_nova[novR] || 0,
      specialDashEnergy: RANK_VALS.gh_dash[novR] || 0,
    };
  }
  if (abilityId === 'aegis_bloom') {
    const novR = rk('ab_nova');
    const radR = rk('ab_radiance');
    return {
      graceMul: 1 + rk('ab_mantle') * 0.1,
      wardRateMul: 1 + (RANK_VALS.ab_tempo[rk('ab_tempo')] || 0),
      bulwarkPulseDmg: RANK_VALS.ab_bulwark[rk('ab_bulwark')] || 0,
      novaDmg: RANK_VALS.ab_nova[novR] || 0,
      novaSpeedBonus: RANK_VALS.ab_speed[novR] || 0,
      phoenixDashRestore: radR > 0 ? 1 : 0,
      phoenixDmgBonus: RANK_VALS.ab_phoenix[radR] || 0,
    };
  }
  if (abilityId === 'slipstream_gale') {
    const feR = rk('sg_feather');
    const spR = rk('sg_sparks');
    const phR = rk('sg_phase');
    return {
      speedMul: 1 + rk('sg_tailwind') * 0.04 + Math.max(0, feR - 1) * 0.03,
      dashRateMul: 1 + rk('sg_tailwind') * 0.06,
      extraDashes: feR >= 1 ? 1 : 0,
      dashCdrSec: RANK_VALS.sg_cdr[rk('sg_mirage')] || 0,
      dashSparks: spR > 0 ? spR + 1 : 0,
      phaseBlastDmg: RANK_VALS.sg_blast[phR] || 0,
      phaseRefund: RANK_VALS.sg_refund[phR] || 0,
    };
  }
  if (abilityId === 'starforged_resonance') {
    const harR = rk('sr_harmonic');
    const susR = rk('sr_sustain');
    const grR = rk('sr_graze_arc');
    const caR = rk('sr_cascade');
    return {
      comboMul: 1 + harR * 0.08,
      grazeMul: 1 + harR * 0.08,
      feverExtraSec: RANK_VALS.sr_fever[susR] || 0,
      feverHasteMul: 1 + susR * 0.05,
      feverDmgMul: 1 + (RANK_VALS.sr_over[rk('sr_crescendo')] || 0),
      grazeZapDmg: RANK_VALS.sr_zap[grR] || 0,
      grazeExp: RANK_VALS.sr_exp[grR] || 0,
      catalystCombo: RANK_VALS.sr_cat_combo[caR] || 0,
      catalystPull: RANK_VALS.sr_cat_pull[caR] || 0,
    };
  }
  if (abilityId === 'echo_conduit') {
    const chR = rk('ec_singularity');
    return {
      hasteMul: 1 + rk('ec_tempo') * 0.025 + rk('ec_overclock') * 0.03,
      reachMul: 1 + rk('ec_tempo') * 0.04,
      mirrorEvery: RANK_VALS.ec_mirror_every[rk('ec_twinbeat')] || 0,
      globalDmgMul: 1 + rk('ec_empower') * 0.04,
      synergyDmgBonus: RANK_VALS.ec_syn_pct[chR] || 0,
      chromaticWaveDmg: chR > 0 ? +(0.75 + (chR - 1) * 0.35).toFixed(2) : 0,
    };
  }
  return {};
}

export const SPIRIT_TRAILS = [
  { id: 'mist', name: 'Azure Mist', cost: 0, desc: 'Soft bioluminescent drift embers.' },
  { id: 'stardust', name: 'Stardust Silk', cost: 140, desc: 'Glittering diamond & star glints.' },
  { id: 'prism', name: 'Prism Wake', cost: 240, desc: 'Dual-hue iridescent ribbon trail.' },
  { id: 'solar', name: 'Solar Corona', cost: 360, desc: 'Incandescent flare sparks.' },
];

export const SPIRIT_PALETTES = [
  { id: 'default', name: 'Signature', cost: 0, colorHex: null, accentHex: null },
  { id: 'abyss_teal', name: 'Pelagic Cyan', cost: 110, colorHex: 0x5ff7eb, accentHex: 0xffe699 },
  { id: 'solar_amber', name: 'Solar Amber', cost: 170, colorHex: 0xffc864, accentHex: 0xfff3ba },
  { id: 'nebula_rose', name: 'Nebula Rose', cost: 250, colorHex: 0xff84c8, accentHex: 0x8ef7ff },
  { id: 'astral_jade', name: 'Astral Jade', cost: 330, colorHex: 0x6cffb6, accentHex: 0xeeff99 },
];

export const OVERDRIVE_WAVES = [
  { name: 'PRISM DRIFT', subtitle: 'OVERDRIVE WAVE I' },
  { name: 'VIOLET GALE', subtitle: 'OVERDRIVE WAVE II' },
  { name: 'LANCER CHORUS', subtitle: 'OVERDRIVE WAVE III' },
  { name: 'SOLAR ECLIPSE', subtitle: 'OVERDRIVE WAVE IV' },
];

export const WORLD_EVENTS = [
  {
    id: 'starfall',
    name: 'STARFALL DRIFT',
    subtitle: 'MOTES & CONSTELLATIONS RAIN · COLLECT 3 STARS FOR BONUS LUM',
    duration: 12,
    goalType: 'stars',
    goalTarget: 3,
    goalLabel: 'STARS',
    rewardExp: 90,
    rewardLum: 33,
  },
  {
    id: 'eclipse_surge',
    name: 'ECLIPSE SURGE',
    subtitle: '+50% EXP & SCORE · PURGE 12 SHADOWS FOR BONUS LUM',
    duration: 12,
    goalType: 'purges',
    goalTarget: 12,
    goalLabel: 'PURGES',
    rewardExp: 100,
    rewardLum: 38,
  },
  {
    id: 'convergence',
    name: 'PRISM CONVERGENCE',
    subtitle: 'RADIANT PRISMS AWAKEN · GRAB A PRISM OR 4 GRAZES',
    duration: 10,
    goalType: 'prisms_or_grazes',
    goalTarget: 4,
    goalLabel: 'PRISM/GRAZE',
    rewardExp: 95,
    rewardLum: 35,
  },
];

export const DIFFICULTIES = [
  {
    id: 'normal',
    label: 'NORMAL',
    shortDesc: '1× Enemy HP · Standard Rewards',
    desc: 'Standard shadow strength, score, EXP & Luminance.',
    hpMul: 1.0,
    enemySpeedMul: 1.0,
    spawnRateMul: 1.0,
    scoreMul: 1.0,
    expMul: 1.0,
    lumMul: 1.0,
  },
  {
    id: 'hard',
    label: 'HARD',
    shortDesc: '1.45× HP · +35% Pts · +25% EXP · +45% LUM',
    desc: '+45% Shadow HP & +8% Speed · +35% Score, +25% EXP & +45% LUM.',
    hpMul: 1.45,
    enemySpeedMul: 1.08,
    spawnRateMul: 1.06,
    scoreMul: 1.35,
    expMul: 1.25,
    lumMul: 1.45,
  },
  {
    id: 'nightmare',
    label: 'NIGHTMARE',
    shortDesc: '2× HP · +80% Pts · +50% EXP · 2× LUM',
    desc: '2× Shadow HP & +16% Speed · +80% Score, +50% EXP & 2× Luminance.',
    hpMul: 2.0,
    enemySpeedMul: 1.16,
    spawnRateMul: 1.14,
    scoreMul: 1.8,
    expMul: 1.5,
    lumMul: 2.0,
  },
];

export const DIFFICULTIES_BY_ID = Object.fromEntries(DIFFICULTIES.map((d) => [d.id, d]));

export const DAILY_TWISTS = [
  { id: 'chrono_surge', name: 'Chrono Surge', desc: '+15% Fire Rate · +10% Shadow Speed', hasteMul: 1.15, enemySpeedMul: 1.1 },
  { id: 'astral_harvest', name: 'Astral Harvest', desc: '+25% Mote Score · +20% Magnet Reach', moteScoreMul: 1.25, magnetMul: 1.2 },
  { id: 'long_solstice', name: 'Long Solstice', desc: '+30% Combo Hold · +15% EXP Gain', comboMul: 1.3, expMul: 1.15 },
  { id: 'nimble_current', name: 'Nimble Current', desc: '+12% Move & Dash Recharge · +10% Ability DMG', speedMul: 1.12, dashRateMul: 1.12, dmgMul: 1.1 },
  { id: 'volatile_void', name: 'Volatile Void', desc: '+15% Ability DMG · +15% Shadow Speed', dmgMul: 1.15, enemySpeedMul: 1.15 },
];

export function getDailyTwist(dateKey = '') {
  let h = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    h ^= dateKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return DAILY_TWISTS[(h >>> 0) % DAILY_TWISTS.length];
}

export const MILESTONES = [
  { id: 'phase_2', name: 'Deep Currents', desc: 'Reach Phase 02', reward: 150 },
  { id: 'phase_3', name: 'Umbral Drift', desc: 'Reach Phase 03', reward: 250 },
  { id: 'phase_4', name: 'Eclipse Tide', desc: 'Reach Phase 04', reward: 350 },
  { id: 'phase_5', name: 'Astral Storm', desc: 'Reach Phase 05', reward: 500 },
  { id: 'medal_astral', name: 'Astral Honor', desc: 'Achieve Astral Rank Medal', reward: 450 },
  { id: 'medal_eclipse', name: 'Eclipse Legend', desc: 'Achieve Eclipse Rank Medal', reward: 800 },
  { id: 'supernova_first', name: 'Supernova', desc: 'Ascend an Ability to LV 10', reward: 400 },
];

export const MILESTONES_BY_ID = Object.fromEntries(MILESTONES.map((m) => [m.id, m]));

export const ABILITY_SYNERGIES = [
  {
    id: 'storm_pollen',
    name: 'Storm Pollen',
    pair: ['voltaic_chain', 'starbloom_spores'],
    minRank: 3,
    desc: 'Voltaic Arc detonates nearby armed Starblooms at +35% blast radius.',
  },
  {
    id: 'event_horizon',
    name: 'Event Horizon',
    pair: ['astral_pulse', 'gravity_harvest'],
    minRank: 3,
    desc: 'Astral Pulse pulls nearby Light Motes & Stars directly toward Lumen.',
  },
  {
    id: 'halo_lance',
    name: 'Halo Lance',
    pair: ['solar_orbitals', 'celestial_spear'],
    minRank: 3,
    desc: 'Celestial Spear fires a bonus 55% dmg lance from your leading Blade.',
  },
  {
    id: 'comet_volley',
    name: 'Comet Volley',
    pair: ['resonant_volley', 'seeker_barrage'],
    minRank: 3,
    desc: 'Every 3rd Starlight Bolt volley launches an extra homing Seeker Needle.',
  },
  {
    id: 'wardens_spark',
    name: "Warden's Spark",
    pair: ['aegis_bloom', 'starforged_resonance'],
    minRank: 3,
    desc: 'Close Grazes shave 1.2s off Aegis Ward recharge & spark nearby shadows.',
  },
];

export function getActiveSynergies(abilityRanks) {
  if (!abilityRanks) return [];
  const rank = (id) => (abilityRanks instanceof Map ? abilityRanks.get(id) || 0 : abilityRanks[id] || 0);
  return ABILITY_SYNERGIES.filter((s) => s.pair.every((id) => rank(id) >= s.minRank));
}

export const RANK_MEDALS = [
  { id: 'spark', label: 'SPARK', minScore: 4000, color: '#9efcf4' },
  { id: 'tide', label: 'TIDE', minScore: 15000, color: '#74d8ff' },
  { id: 'astral', label: 'ASTRAL', minScore: 38000, color: '#ffe699' },
  { id: 'eclipse', label: 'ECLIPSE', minScore: 75000, color: '#ff9ec7' },
];

export function getMedalForScore(score) {
  let achieved = null;
  let next = RANK_MEDALS[0];
  for (let i = 0; i < RANK_MEDALS.length; i++) {
    if (score >= RANK_MEDALS[i].minScore) {
      achieved = RANK_MEDALS[i];
      next = RANK_MEDALS[i + 1] || null;
    } else {
      next = RANK_MEDALS[i];
      break;
    }
  }
  return { achieved, next };
}

export function getScaledQuest(baseQuest, tier = 1) {
  const t = Math.max(1, tier);
  if (t === 1) return { ...baseQuest, tier: 1 };
  const rawTarget = baseQuest.target * (1 + (t - 1) * 0.65);
  const target =
    baseQuest.target >= 10
      ? Math.round(rawTarget / 5) * 5
      : Math.max(baseQuest.target + t - 1, Math.round(rawTarget));
  const reward = Math.round((baseQuest.reward * (1 + (t - 1) * 0.4)) / 10) * 10;
  const roman = ['I', 'II', 'III', 'IV', 'V'][t - 1] || `${t}`;
  const desc = baseQuest.desc.replace(String(baseQuest.target), String(target));
  return {
    ...baseQuest,
    tier: t,
    label: `${baseQuest.label} ${roman}`,
    desc,
    target,
    reward,
  };
}

export const QUEST_POOL = [
  { id: 'graze_15', label: 'Edge Dancer', desc: 'Graze 15 shadows in one run', metric: 'grazeCount', target: 15, reward: 120 },
  { id: 'chain_3', label: 'Arc Conductor', desc: 'Purge 3+ shadows in one chain burst', metric: 'peakChain', target: 3, reward: 130 },
  { id: 'stars_2', label: 'Star Weaver', desc: 'Complete 2 Constellations', metric: 'constellationsCompleted', target: 2, reward: 150 },
  { id: 'combo_10', label: 'Resonant Soul', desc: 'Reach x10 Resonance Combo', metric: 'maxCombo', target: 10, reward: 110 },
  { id: 'purge_12', label: 'Shadowbreaker', desc: 'Purge 12 shadows in one run', metric: 'purgedCount', target: 12, reward: 120 },
  { id: 'core_1', label: 'Eclipse Bane', desc: 'Shatter an Eclipse Core', metric: 'coresShattered', target: 1, reward: 180 },
  { id: 'survive_60', label: 'Deep Voyager', desc: 'Survive 60 seconds in one run', metric: 'survivalTime', target: 60, reward: 140 },
];

export const PLAYER_CONFIG = {
  maxHealth: 3,
  radius: 13,
  hitRadius: 11,
  grazeRadius: 48,
  accel: 1950,
  maxSpeed: 400,
  damping: 5.2,
  pointerGain: 6.4,
  dashCharges: 2,
  dashRechargeTime: 2.35,
  dashSpeed: 1080,
  dashDuration: 0.25,
  dashCooldown: 0.12,
  invulnOnHit: 1.55,
  comboDuration: 3.9,
  maxCombo: 12,
  magnetRadius: 110,
  magnetComboBonus: 5,
};

export const PHASES = [
  {
    id: 1,
    code: '01 · FIRST SPARK',
    name: 'FIRST SPARK',
    subtitle: 'AWAKENING IN THE ABYSS',
    minScore: 0,
    minTime: 0,
    spawnInterval: 1.24,
    maxEnemies: 7,
    speedScale: 0.96,
    // Deep pelagic teal -> warm cyan rays
    deepColor: [0.02, 0.035, 0.095],
    midColor: [0.045, 0.115, 0.235],
    glowColor: [0.16, 0.72, 0.76],
    accentHex: 0x5df7eb,
  },
  {
    id: 2,
    code: '02 · DEEP CURRENTS',
    name: 'DEEP CURRENTS',
    subtitle: 'THE TIDE STIRS',
    minScore: 4500,
    minTime: 22,
    spawnInterval: 1.1,
    maxEnemies: 10,
    speedScale: 1.06,
    // Twilight indigo -> bioluminescent aquamarine
    deepColor: [0.03, 0.03, 0.11],
    midColor: [0.075, 0.095, 0.255],
    glowColor: [0.24, 0.68, 0.88],
    accentHex: 0x74d8ff,
  },
  {
    id: 3,
    code: '03 · UMBRAL DRIFT',
    name: 'UMBRAL DRIFT',
    subtitle: 'SHADOWS GATHER',
    minScore: 14000,
    minTime: 46,
    spawnInterval: 0.94,
    maxEnemies: 13,
    speedScale: 1.18,
    // Nocturne plum-navy -> coral-violet shimmer
    deepColor: [0.05, 0.024, 0.105],
    midColor: [0.11, 0.065, 0.22],
    glowColor: [0.46, 0.56, 0.88],
    accentHex: 0x99b8ff,
  },
  {
    id: 4,
    code: '04 · ECLIPSE TIDE',
    name: 'ECLIPSE TIDE',
    subtitle: 'THE GROVE TREMBLES',
    minScore: 28000,
    minTime: 72,
    spawnInterval: 0.76,
    maxEnemies: 17,
    speedScale: 1.32,
    // Deep crimson-violet -> amber-rose bioluminescence
    deepColor: [0.065, 0.02, 0.09],
    midColor: [0.145, 0.05, 0.18],
    glowColor: [0.78, 0.36, 0.56],
    accentHex: 0xff8ea6,
  },
  {
    id: 5,
    code: '05 · ASTRAL STORM',
    name: 'ASTRAL STORM',
    subtitle: 'RADIANCE UNBOUND',
    minScore: 48000,
    minTime: 100,
    spawnInterval: 0.56,
    maxEnemies: 23,
    speedScale: 1.48,
    // Obsidian void -> incandescent gold-mint aurora
    deepColor: [0.03, 0.022, 0.075],
    midColor: [0.085, 0.06, 0.175],
    glowColor: [0.35, 0.85, 0.78],
    accentHex: 0xffe493,
  },
];

export const COLORS = {
  lumenCore: 0xfffdf2,
  lumenCyan: 0x5ff7eb,
  lumenGold: 0xffe699,
  moteCyan: 0x7df9ff,
  moteGold: 0xffe38f,
  prismCore: 0xffffff,
  prismAura: 0xffd384,
  shadowVoid: 0x06040d,
  shadowCrimson: 0xff2e6a,
  shadowViolet: 0xb93bff,
  grazeSpark: 0x9efff5,
};
