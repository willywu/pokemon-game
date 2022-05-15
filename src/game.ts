import "phaser";

const getPokemonNumber = () => {
  const TOTAL_NUM_POKEMON = 807;
  return Math.ceil(TOTAL_NUM_POKEMON * Math.random());
};

const getPokemonPaddedNumber = (pokeNum) => {
  return String(pokeNum).padStart(3, "0");
};

const loadPokemonData = (pokedex, pokeNum) => {
  // Returns data about the pokemon with give pokeNum
  // Since the pokedex is "index 0"-based, we need to
  // look in the pokedex with pokeNum - 1
  return pokedex[pokeNum - 1];
};

export default class PokemonHomeScene extends Phaser.Scene {
  constructor() {
    super("pokemonhomescene");
  }

  preload() {
    this.load.glsl("stars", "assets/starfields.glsl.js");

    this.registry.set("width", this.game.config.width);
    this.registry.set("height", this.game.config.height);

    this.registry.set("pokemonOneNum", getPokemonNumber());
    this.registry.set("pokemonTwoNum", getPokemonNumber());
    this.registry.set("pokemonThreeNum", getPokemonNumber());
    this.registry.set("pokemonFourNum", getPokemonNumber());

    this.load.image(
      "pokemonOne",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.registry.get("pokemonOneNum"))}.png`
    );
    this.load.image(
      "pokemonTwo",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.registry.get("pokemonTwoNum"))}.png`
    );
    this.load.image(
      "pokemonThree",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.registry.get("pokemonThreeNum"))}.png`
    );
    this.load.image(
      "pokemonFour",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.registry.get("pokemonFourNum"))}.png`
    );
    this.load.image("button", "assets/button.png");
    this.load.image("button-down", "assets/button-down.png");

    this.load.json("pokedex", "data/pokedex.json");
  }

  create() {
    this.add
      .shader("RGB Shift Field", 0, 0, Number(this.game.config.width), Number(this.game.config.height))
      .setOrigin(0);

    const pokedex = this.cache.json.get("pokedex");

    var pokemonOneNum = this.registry.get("pokemonOneNum");
    var pokemonTwoNum = this.registry.get("pokemonTwoNum");
    var pokemonThreeNum = this.registry.get("pokemonThreeNum");
    var pokemonFourNum = this.registry.get("pokemonFourNum");

    const pokemonOne = loadPokemonData(pokedex, pokemonOneNum);
    console.log(pokemonOneNum);
    console.log(pokemonOne.name.english);

    const pokemonTwo = loadPokemonData(pokedex, pokemonTwoNum);
    console.log(pokemonTwoNum);
    console.log(pokemonTwo.name.english);

    const pokemonThree = loadPokemonData(pokedex, pokemonThreeNum);
    console.log(pokemonThreeNum);
    console.log(pokemonThree.name.english);

    const pokemonFour = loadPokemonData(pokedex, pokemonFourNum);
    console.log(pokemonFourNum);
    console.log(pokemonFour.name.english);

    const pokemonOneImage = this.add.image(240, 100, "pokemonOne");

    const addTextToButton = (button, text) => {
      this.add.text(button.x - 40, button.y - 10, text, {});
    };

    const buttonOneImage = this.add.image(240, 440, "button");
    addTextToButton(buttonOneImage, pokemonOne.name.english);
    const buttonTwoImage = this.add.image(240, 560, "button");
    addTextToButton(buttonTwoImage, pokemonTwo.name.english);
    const buttonThreeImage = this.add.image(240, 680, "button");
    addTextToButton(buttonThreeImage, pokemonThree.name.english);
    const buttonFourImage = this.add.image(240, 800, "button");
    addTextToButton(buttonFourImage, pokemonFour.name.english);

    this.tweens.add({
      targets: pokemonOneImage,
      y: 200,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    var pointer = this.input.activePointer;

    pointer;
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 480,
  height: 900,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: PokemonHomeScene,
};

const game = new Phaser.Game(config);
