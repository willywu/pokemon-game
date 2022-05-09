import "phaser";

const getPokemonNumber = () => {
  const TOTAL_NUM_POKEMON = 807;
  const pokeNum = Math.ceil(TOTAL_NUM_POKEMON * Math.random());
  return String(pokeNum).padStart(3, "0");
};

export default class PokemonHomeScene extends Phaser.Scene {
  constructor() {
    super("pokemonhomescene");
  }

  preload() {
    this.load.glsl("stars", "assets/starfields.glsl.js");

    const pokemonOneNum = getPokemonNumber();
    const pokemonTwoNum = getPokemonNumber();
    const pokemonThreeNum = getPokemonNumber();

    this.load.image("pokemonOne", `assets/pokemon/thumbnails/${pokemonOneNum}.png`);
    this.load.image("pokemonTwo", `assets/pokemon/thumbnails/${pokemonTwoNum}.png`);
    this.load.image("pokemonThree", `assets/pokemon/thumbnails/${pokemonThreeNum}.png`);
  }

  create() {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    const pokemonOneImage = this.add.image(200, 100, "pokemonOne");
    const pokemonTwoImage = this.add.image(400, 100, "pokemonTwo");
    const pokemonThreeImage = this.add.image(600, 100, "pokemonThree");

    this.tweens.add({
      targets: pokemonOneImage,
      y: 500,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: pokemonThreeImage,
      y: 500,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: pokemonTwoImage,
      y: 500,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: PokemonHomeScene,
};

const game = new Phaser.Game(config);
