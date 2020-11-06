import Phaser from "phaser";
import Hero from '../entities/Hero'

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {

    this.input.keyboard.on('keydown-SPACE',() => {
      console.log('pressed space')
    })

    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)    
    this.space.on('up',() => {
      console.log('Release Space')
    })


    this.anims.create({
      key: 'hero-running',
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      frameRate: 15, 
      repeat: -1
    })

    this.hero = new Hero (this, 250, 160)
  }

  update(time, delta) {}
}

export default Game;
