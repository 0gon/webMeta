import { useRef, useEffect } from "react";

const useCanvas = (setCanvas) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas && setCanvas(canvas);
    }, []);

    return canvasRef;
};

export default useCanvas;