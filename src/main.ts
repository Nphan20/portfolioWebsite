import * as Phaser from "phaser";
import { Player } from "./player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { Grid } from "matter";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 528;

export class GameScene extends Phaser.Scene {
  static readonly TILE_SIZE = 64;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
  constructor() {
    super(sceneConfig);
  }
  public preload() {    
    this.load.image("tiles", "assets/Tilemap.png");
    this.load.tilemapTiledJSON("test-map", "assets/testIsland.json");
    this.load.spritesheet("player", "assets/NickSprite.png",{
      frameWidth: 55,
      frameHeight: 64,
    });
  }

  //Const for tile sizes, our tile map is 16x16, * 3 due to for loop scaling up
  //by 3

  public create(){
    const testTileMap = this.make.tilemap({ key: "test-map"});
    testTileMap.addTilesetImage("Tileset", "tiles");
    for (let i = 0; i < testTileMap.layers.length; i++) {
      const layer = testTileMap.createLayer(i, "Tileset", 0, 0);
      layer.setDepth(i);
      layer.scale = 4;
    }

    const playerSprite = this.add.sprite(0,0, "player");
    playerSprite.setDepth(2);
    playerSprite.scale = 1;
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6));
    this.gridPhysics = new GridPhysics(player);
    this.gridControls = new GridControls(
      this.input,
      this.gridPhysics
    );
    }
    public update(_time: number, delta: number) {
      this.gridControls.update();
      this.gridPhysics.update(delta);
    }

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
