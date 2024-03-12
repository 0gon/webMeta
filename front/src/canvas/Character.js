import CharacterImages from "./CharacterImages";

var Direction = {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
};

const SIZE = 64; // 캐릭터 크기

class Character {
    canvas = null;
    ctx = null;
    position = { x: 0, y: 0 };
    direction = Direction.down;
    distance = 5; // 속도

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


    animationID = null;
    animate = () => {
        this.draw();
        this.animationID = requestAnimationFrame(this.animate.bind(this));
    }

    draw = () => {

        for (let key of this.typedKeys) {
            let { movement, isMoveable } = this.move[key];
            if (isMoveable()) {
                this.position.x += movement.x;
                this.position.y += movement.y;
            }
        }

        const { x, y } = this.position;
        const image = this.getImageByDirection(0, false);

        if (!this.ctx || !image) {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(image, x, y, SIZE, SIZE);
        console.log(this.animationID)
    }

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        console.log("캐릭터 생성")
    }

    typedKeys = [];
    arrowKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    move = {
        ArrowUp: {
            movement: { x: 0, y: -this.distance },
            isMoveable: () => this.position.y > 0,
        },
        ArrowDown: {
            movement: { x: 0, y: this.distance },
            isMoveable: () => this.position.y < this.canvas.height - SIZE,
        },
        ArrowRight: {
            movement: { x: this.distance, y: 0 },
            isMoveable: () => this.position.x < this.canvas.width - SIZE,
        },
        ArrowLeft: {
            movement: { x: -this.distance, y: 0 },
            isMoveable: () => this.position.x > 0,
        },
    };


    handleArrowKeyDown = (e) => {

        let key = e.key
        if (!this.typedKeys.includes(key) && this.arrowKeys.includes(key)) {
            this.typedKeys.push(key);
        }

        if (this.animationID == null && this.typedKeys.length > 0) {
            this.animate();
        }
        console.log("키다운")
    }

    handleArrowKeyUp = (e) => {

        let key = e.key
        this.typedKeys = this.typedKeys.filter(item => item != key);


        if (this.typedKeys.length <= 0 && this.animationID != null) {
            cancelAnimationFrame(this.animationID);
            this.animationID = null;
        }
        console.log("키업")
    }
}

export default Character;