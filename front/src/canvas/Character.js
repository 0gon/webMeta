import CharacterImages from "./CharacterImages";

var Direction = {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
};

const SIZE = 64;

class Character {
    canvas = null;
    ctx = null;
    position = { x: 0, y: 0 };
    direction = Direction.down;

    getImageByDirection = (drt, isWalking) => {
        const {
            manDown,
            manUp,
            manLeft,
            manRight,
        } = CharacterImages;

        switch (drt) {
            case Direction.up:
                return manUp;
            case Direction.down:
                return manDown;
            case Direction.left:
                return manLeft;
            case Direction.right:
                return manRight;
            default:
                return null;
        }
    }

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.runAnimationFrame();
    }

    runAnimationFrame = () => {
        this.draw();
        requestAnimationFrame(this.runAnimationFrame.bind(this));
    }

    draw = () => {
        const {x, y} = this.position;
        const image = this.getImageByDirection(0, false);

        if (!this.ctx || !image) {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, x, y, SIZE, SIZE);
    }
}

export default Character;