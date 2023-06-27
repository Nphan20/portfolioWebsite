import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 528;

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }
  public preload() {    
    this.load.image("tiles", "assets/Tilemap.png");
    this.load.tilemapTiledJSON("test-map", "assets/testIsland.json");
  }

  //Create() function is not working properly. Learn Tiled API and how you work
  //with preload and create.

  //FIXED! When making a map, you must embed the tileset within the JSON in order
  //for it to work.


  public create(){
    const testTileMap = this.make.tilemap({ key: "test-map"});
    testTileMap.addTilesetImage("Tileset", "tiles");
    for (let i = 0; i < testTileMap.layers.length; i++) {
      const layer = testTileMap.createLayer(i, "Tileset", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }
  }

  public update() {}


}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: GameScene,
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);
