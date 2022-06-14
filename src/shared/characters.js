import {
  dekuPortrait,
  bakugoPortait,
  pinkyPortrait,
  todorokiPortrait,
  nejireHadoPortrait,
  mirioTogataPortrait,
  twicePortrait,
  togaPortrait,
  dabiPortrait,
  mrCompressPortrait,
  kurogiriPortrait,
  tomuraPortrait
} from "./characterPortraits";

class Character {
  constructor(id, img, name, quirk, health, stamina, abilities) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.quirk = quirk;
    this.health = health;
    this.stamina = stamina;
    this.abilities = abilities;
  }

  useAbility(ability, message) {
    return `${this.name} Used ${this.abilities[ability]} ${message}`;
  }
}

/* Heroes */

const deku = new Character(0, dekuPortrait, "Deku", "One For All", 100, 100, [
  "Detroit Smash",
  "Delaware Smash",
  "Shoot Style"
]);

const bakugo = new Character(
  1,
  bakugoPortait,
  "Bakugo",
  "Explosion",
  100,
  100,
  ["Stun Grenade", "Howitzer Impact", "AP Shot"]
);

const todoroki = new Character(
  2,
  todorokiPortrait,
  "Todoroki",
  "Cold & Hot",
  100,
  100,
  ["Heaven-Piercing Ice Wall", "Flashfreeze Heatwave", "Flashfire Fist"]
);

const pinky = new Character(3, pinkyPortrait, "Pinky", "Acid", 100, 100, [
  "Acid Veil",
  "Acid Shot",
  "Acid Layback"
]);

const nejireHado = new Character(
  4,
  nejireHadoPortrait,
  "Nejire Hado",
  "Wave Motion",
  100,
  100,
  ["Nejire Wave", "Nejire Flood", "Wave Boost"]
);

const lemillion = new Character(
  5,
  mirioTogataPortrait,
  "Lemillion",
  "Permeation",
  100,
  100,
  ["Permeation", "Blinder Touch Eyeball Crush", "Phantom Menace"]
);

/* Villains */

const twice = new Character(6, twicePortrait, "Twice", "Double", 100, 100, [
  "Sad Man's Parade",
  "Knife Stab",
  "measuring Tape"
]);

const toga = new Character(7, togaPortrait, "Toga", "Transform", 100, 100, [
  "Blood Suck",
  "Knife Stab",
  "Knife Throw"
]);

const dabi = new Character(8, dabiPortrait, "Dabi", "Blue Flame", 100, 100, [
  "Prominence Burn",
  "Jet Burn",
  "Hell Spider"
]);

const mrCompress = new Character(
  9,
  mrCompressPortrait,
  "Mr. Compress",
  "Compress",
  100,
  100,
  ["Compress Target", "marble decompression", "Swing Walking Stick"]
);

const kurogiri = new Character(
  10,
  kurogiriPortrait,
  "Kurogiri",
  "Warp Gate",
  100,
  100,
  ["Dark Fog", "Warp Attack", "Warp Drop"]
);

const shigaraki = new Character(
  11,
  tomuraPortrait,
  "Tomura Shigaraki",
  "Decay",
  100,
  100,
  ["Decay Touch", "Air Cannon", "Rivet Stab"]
);

const characters = [
  deku,
  bakugo,
  todoroki,
  pinky,
  nejireHado,
  lemillion,
  twice,
  toga,
  dabi,
  mrCompress,
  kurogiri,
  shigaraki
];

export { characters };
