const init = {};

const imageSrc = {
    manDown: `url(${process.env.PUBLIC_URL}/img/back.png)`,
    manUp: `url(${process.env.PUBLIC_URL}/img/front.png)`,
    manLeft: `url(${process.env.PUBLIC_URL}/img/left.png)`,
    manRight: `url(${process.env.PUBLIC_URL}/img/right.png)`,
}

const CharacterImages = Object.entries(imageSrc).reduce(
    (images, [key, src]) => {
        const image = new Image();
        image.src = src;
        images[key] = image;
        return images;
    },
    init
)

export default CharacterImages;