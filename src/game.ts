import _ from "lodash-es";
import "phaser";

const WIDTH: number = 480;
const HEIGHT: number = 900;

/**
 * @returns a list of 4 random pokemon numbers
 */
const getPokemonNumbers = (): number[] => {
  const TOTAL_NUM_POKEMON = 807;
  // a list of numbers, from 1 to the total number of pokemon
  let allNumbers = _.range(1, TOTAL_NUM_POKEMON + 1);
  let pokemonNumbers = [];
  for (let i = 0; i < 4; i++) {
    // pop a random element from the list of numbers
    let allNumsPosition = Math.floor(allNumbers.length * Math.random());
    let pokemonNumber = allNumbers.splice(allNumsPosition, 1)[0];
    pokemonNumbers.push(pokemonNumber);
  }
  return pokemonNumbers;
};

/**
 * @returns a string of the passed-in pokemon number, left-padded with 0s.
 *        This is to help load the filenames of the pokemon images
 */
const getPokemonPaddedNumber = (pokeNum: number): string => {
  return String(pokeNum).padStart(3, "0");
};

/**
 * @returns data about the pokemon with given pokeNum.
 *         Since the pokedex is "index 0"-based, we need to
 *         look in the pokedex with pokeNum - 1
 */
const loadPokemonData = (pokedex: object, pokeNum: number) => {
  return pokedex[pokeNum - 1];
};

export default class PokemonHomeScene extends Phaser.Scene {
  constructor() {
    super("pokemonhomescene");
  }

  preload() {
    this.load.glsl("stars", "assets/starfields.glsl.js");

    const pokemonNumbers: number[] = getPokemonNumbers();

    this.registry.set("pokemonOneNum", pokemonNumbers[0]);
    this.registry.set("pokemonTwoNum", pokemonNumbers[1]);
    this.registry.set("pokemonThreeNum", pokemonNumbers[2]);
    this.registry.set("pokemonFourNum", pokemonNumbers[3]);

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
    this.load.image("button-correct", "assets/button-correct.png");
    this.load.image("button-incorrect", "assets/button-incorrect.png");

    this.load.json("pokedex", "data/pokedex.json");
  }

  create() {
    this.add
      .shader("RGB Shift Field", 0, 0, Number(this.game.config.width), Number(this.game.config.height))
      .setOrigin(0);

    const pokedex: object = this.cache.json.get("pokedex");

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

    const allPokemon = ["pokemonOne", "pokemonTwo", "pokemonThree", "pokemonFour"];
    const chosenPokemonNum = Math.floor(Math.random() * allPokemon.length);
    const chosenPokemon = allPokemon[chosenPokemonNum];
    const chosenPokemonImage = this.add.image(0.5 * WIDTH, 0.12 * HEIGHT, chosenPokemon);

    const addButton = (x: number, y: number, thisPokemonNum: number, chosenPokemonNum: number) => {
      let sprite = this.add.sprite(x, y, "button").setInteractive();
      sprite.on("pointerdown", () => {
        if (thisPokemonNum === chosenPokemonNum) {
          sprite.setTexture("button-correct");
        } else {
          sprite.setTexture("button-incorrect");
        }
      });
      sprite.on("pointerup", () => {
        sprite.setTexture("button");
      });
      return sprite;
    };

    const addTextToButton = (button, text) => {
      this.add.text(button.x - 40, button.y - 10, text, {});
    };

    const buttonSpacing = 0.14 * HEIGHT;
    const buttonOneHeight = 0.46 * HEIGHT;

    const buttonOneImage = addButton(0.5 * WIDTH, buttonOneHeight, 0, chosenPokemonNum);
    addTextToButton(buttonOneImage, pokemonOne.name.english);
    const buttonTwoImage = addButton(0.5 * WIDTH, buttonOneHeight + buttonSpacing, 1, chosenPokemonNum);
    addTextToButton(buttonTwoImage, pokemonTwo.name.english);
    const buttonThreeImage = addButton(0.5 * WIDTH, buttonOneHeight + 2 * buttonSpacing, 2, chosenPokemonNum);
    addTextToButton(buttonThreeImage, pokemonThree.name.english);
    const buttonFourImage = addButton(0.5 * WIDTH, buttonOneHeight + 3 * buttonSpacing, 3, chosenPokemonNum);
    addTextToButton(buttonFourImage, pokemonFour.name.english);

    this.tweens.add({
      targets: chosenPokemonImage,
      y: 250,
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
  width: WIDTH,
  height: HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: PokemonHomeScene,
};

const game = new Phaser.Game(config);
