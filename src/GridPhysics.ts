import { Direction } from "./Directions";
import { GameScene } from "./main";
import { Player } from "./Player";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridPhysics {

  private movementDirectionVectors: {
    [key in Direction]?: Vector2;
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  private movementDirection: Direction = Direction.IDLE;

  private readonly speedPixelsPerSecond: number = GameScene.TILE_SIZE * 3;
  private tileSizePixelsWalked: number = 0;

  private lastMovementIntent = Direction.IDLE;

  constructor(private player: Player) {}


  

  private isMoving(): boolean{
    return this.movementDirection != Direction.IDLE;
  }

  private startMoving(direction:Direction): void{
    this.movementDirection = direction;
    this.player.startAnimation(direction);
  }
  movePlayer(direction: Direction): void {
    // ...
    this.lastMovementIntent = direction;
    if(!this.isMoving()){
        this.startMoving(direction);
    }
  }
    private stopMoving(): void {
    this.movementDirection = Direction.IDLE;
    this.player.stopAnimation();
  }

  update(delta: number): void {
    if(this.isMoving()){
        this.updatePlayerPosition(delta);
    }
    this.lastMovementIntent = Direction.IDLE;
    // ...
  }

  private updatePlayerPosition(delta: number){
    const pixelsToWalkThisUpdate = this.getPixelsToWalkThisUpdate(delta);
    if (
      this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate) &&
      !this.shouldContinueMoving()
    ) {
      this.movePlayerSprite(GameScene.TILE_SIZE - this.tileSizePixelsWalked);
      this.stopMoving();
    } else {
      this.movePlayerSprite(pixelsToWalkThisUpdate);
    }
  }

  private shouldContinueMoving(): boolean {
    return this.movementDirection == this.lastMovementIntent;
  }

  private movePlayerSprite(pixelsToMove: number){
    const directionVec = this.movementDirectionVectors[
      this.movementDirection
    ].clone();
  const movementDistance = directionVec.multiply(new Vector2(pixelsToMove));
  const newPlayerPos = this.player.getPosition().add(movementDistance);
  this.player.setPosition(newPlayerPos);
  this.tileSizePixelsWalked += pixelsToMove;
  this.tileSizePixelsWalked %= GameScene.TILE_SIZE;
  }

  private getPixelsToWalkThisUpdate(delta: number): number{
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond * deltaInSeconds;
  }

  private willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate: number): 
  boolean{
    return(this.tileSizePixelsWalked + pixelsToWalkThisUpdate 
      >= GameScene.TILE_SIZE);
  }

}