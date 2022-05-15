import "phaser";

const getPokemonNumber = () => {
  const TOTAL_NUM_POKEMON = 807;
  return Math.ceil(TOTAL_NUM_POKEMON * Math.random());
};

const getPokemonPaddedNumber = (pokeNum) => {
  return String(pokeNum).padStart(3, "0");
};

const loadPokemonMetadata = (pokedex, pokeNum) => {
  // Returns data about the pokemon with give pokeNum
  // Since the pokedex is "index 0"-based, we need to
  // look in the pokedex with pokeNum - 1
  return pokedex[pokeNum - 1];
};

export default class PokemonHomeScene extends Phaser.Scene {
  localData = {};

  constructor() {
    super("pokemonhomescene");
  }

  preload() {
    this.load.glsl("stars", "assets/starfields.glsl.js");

    this.localData = {};
    this.localData["pokemonOneNum"] = getPokemonNumber();
    this.localData["pokemonTwoNum"] = getPokemonNumber();
    this.localData["pokemonThreeNum"] = getPokemonNumber();
    this.localData["pokemonFourNum"] = getPokemonNumber();

    this.load.image(
      "pokemonOne",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.localData["pokemonOneNum"])}.png`
    );
    this.load.image(
      "pokemonTwo",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.localData["pokemonTwoNum"])}.png`
    );
    this.load.image(
      "pokemonThree",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.localData["pokemonThreeNum"])}.png`
    );
    this.load.image(
      "pokemonFour",
      `assets/pokemon/thumbnails/${getPokemonPaddedNumber(this.localData["pokemonFourNum"])}.png`
    );
    this.load.image("button", "assets/button.png");
    this.load.image("button-down", "assets/button-down.png");

    this.load.json("pokedex", "data/pokedex.json");
  }

  create() {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    const pokedex = this.cache.json.get("pokedex");

    var pokemonOneNum = this.localData["pokemonOneNum"];
    var pokemonTwoNum = this.localData["pokemonTwoNum"];
    var pokemonThreeNum = this.localData["pokemonThreeNum"];
    var pokemonFourNum = this.localData["pokemonFourNum"];

    const pokemonOne = loadPokemonMetadata(pokedex, pokemonOneNum);
    console.log(pokemonOneNum);
    console.log(pokemonOne.name.english);

    const pokemonTwo = loadPokemonMetadata(pokedex, pokemonTwoNum);
    console.log(pokemonTwoNum);
    console.log(pokemonTwo.name.english);

    const pokemonThree = loadPokemonMetadata(pokedex, pokemonThreeNum);
    console.log(pokemonThreeNum);
    console.log(pokemonThree.name.english);

    const pokemonFour = loadPokemonMetadata(pokedex, pokemonFourNum);
    console.log(pokemonFourNum);
    console.log(pokemonFour.name.english);

    const pokemonOneImage = this.add.image(400, 100, "pokemonOne");

    const buttonOneImage = this.add.image(200, 380, "button");
    const pokeOneNameLabel = this.add.text(200, 380, pokemonOne.name.english, {});
    const buttonTwoImage = this.add.image(600, 380, "button");
    const pokeTwoNameLabel = this.add.text(600, 380, pokemonTwo.name.english, {});
    const buttonThreeImage = this.add.image(200, 500, "button");
    const pokeThreeNameLabel = this.add.text(200, 500, pokemonThree.name.english, {});
    const buttonFourImage = this.add.image(600, 500, "button");
    const pokeFourNameLabel = this.add.text(600, 500, pokemonFour.name.english, {});

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
  width: 800,
  height: 600,
  scene: PokemonHomeScene,
};

const game = new Phaser.Game(config);
