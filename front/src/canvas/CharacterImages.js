const init = {};

const imageSrc = {
    manDown: `${process.env.PUBLIC_URL}/img/back.png`,
    manUp: `${process.env.PUBLIC_URL}/img/front.png`,
    manLeft: `${process.env.PUBLIC_URL}/img/left.png`,
    manRight: `${process.env.PUBLIC_URL}/img/right.png`,
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