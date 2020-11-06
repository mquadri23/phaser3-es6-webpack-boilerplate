import Phaser from "phaser";
import Hero from "../entities/Hero";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {

    this.load.tilemapTiledJSON('level-1', 'assets/tilemaps/level-1.json')
    
    this.load.spritesheet('world-1-sheet', 'assets/tilesets/world-1.png',{
      frameWidth: 32,
      frameHeight: 32, 
      margin: 1, 
      spacing: 2
    })

    this.load.image('clouds-sheet', 'assets/tilesets/clouds.png')

    this.load.spritesheet("hero-idle-sheet", "assets/hero/idle.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("hero-run-sheet", "assets/hero/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("hero-pivot-sheet", "assets/hero/pivot.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("hero-jump-sheet", "assets/hero/jump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("hero-flip-sheet", "assets/hero/spinjump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet("hero-fall-sheet", "assets/hero/fall.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
      
    });

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-run-sheet"),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-pivoting",
      frames: this.anims.generateFrameNumbers("hero-pivot-sheet"),
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jump-sheet"),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-flipping",
      frames: this.anims.generateFrameNumbers("hero-flip-sheet"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-fall-sheet"),
      frameRate: 15,
      repeat: -1,
    });

    this.addMap()

    this.addHero()

    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)
    this.cameras.main.startFollow(this.hero)

    // const platform = this.add.rectangle(220,240,260,10, 0x4BCB7C)
    // this.physics.add.existing(platform,true)
    // this.physics.add.collider(this.hero,platform)
  }

  addHero(){
    this.hero = new Hero(this, 250, 160);

    this.children.moveTo(this.hero, this.children.getIndex(this.map.getLayer('Foreground').tilemapLayer))

    this.physics.add.collider(this.hero,this.map.getLayer('Ground').tilemapLayer)

  }

  addMap(){
    this.map = this.make.tilemap({key: 'level-1'})
    const groundTiles = this.map.addTilesetImage('world-1', 'world-1-sheet')
    const backgroundTiles = this.map.addTilesetImage('clouds','clouds-sheet')

    const backgroundLayer = this.map.createStaticLayer('Background', backgroundTiles)
    backgroundLayer.setScrollFactor(0.6)

    const groundLayer = this.map.createStaticLayer('Ground', groundTiles)
    groundLayer.setCollision([1,2,4],true)

    this.map.createStaticLayer('Foreground',groundTiles)

    this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels)
    this.physics.world.setBoundsCollision(true,true,false,true)

    this.spikeGroup = this.physics.add.group({immovable: true, allowGravity: false})

    this.map.getObjectLayer('Objects').objects.forEach(object => {
      if (object.gid === 7){
       const spike =  this.spikeGroup.create(object.x, object.y,'world-1-sheet', object.gid-1) 
        spike.setOrigin(0,1)
      }
    })
  }

  update(time, delta) {}
}

export default Game;
