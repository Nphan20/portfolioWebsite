import { Direction } from "./Directions";
import { GameScene } from "./main";

//create a player class

export class Player {

    constructor(
        private sprite: Phaser.GameObjects.Sprite,
        private tilePos: Phaser.Math.Vector2
    ){
        const offsetX = GameScene.TILE_SIZE / 2;
        const offsetY = GameScene.TILE_SIZE;

        this.sprite.setOrigin(0.5, 1);
        this.sprite.setPosition(
            tilePos.x * GameScene.TILE_SIZE + offsetX,
            tilePos.y * GameScene.TILE_SIZE + offsetY
        );
        this.sprite.setFrame(0);
    }

    getPosition(): Phaser.Math.Vector2{
        return this.sprite.getBottomCenter();
    }
    
    setPosition(position: Phaser.Math.Vector2): void {
        this.sprite.setPosition(position.x, position.y);
    }

    stopAnimation() {
        if(this.sprite.anims.currentAnim){
            const standingFrame = this.sprite.anims.currentAnim.frames[0].frame.name;
            this.sprite.anims.stop();
            this.sprite.setFrame(standingFrame);
        }
        this.sprite.anims.stop();
    }

    startAnimation(direction: Direction) {
        this.sprite.anims.play(direction);
    }

}