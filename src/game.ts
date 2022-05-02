import "phaser";

export default class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  preload() {
    this.load.glsl("stars", "assets/starfields.glsl.js");
    this.load.image("bulbasaur", "assets/pokemon/thumbnails/001.png");
    this.load.image("ivysaur", "assets/pokemon/thumbnails/002.png");
    this.load.image("venusaur", "assets/pokemon/thumbnails/003.png");
  }

  create() {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    const bulbasaurImage = this.add.image(200, 50, "bulbasaur");
    const ivysaurImage = this.add.image(400, 50, "ivysaur");
    const venusaurImage = this.add.image(600, 50, "venusaur");

    this.tweens.add({
      targets: bulbasaurImage,
      y: 500,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: venusaurImage,
      y: 500,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: ivysaurImage,
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
  scene: Demo,
};

const game = new Phaser.Game(config);
