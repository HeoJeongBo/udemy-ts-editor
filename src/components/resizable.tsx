import "./resizable.css";
import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resiableProps: ResizableBoxProps;

    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: number;

        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        };
    }, [width]);

    if (direction === "horizontal") {
        resiableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width,
            resizeHandles: ["e"],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            },
        };
    } else {
        resiableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
            height: 300,
            width: Infinity,
            resizeHandles: ["s"],
        };
    }

    return <ResizableBox {...resiableProps}>{children}</ResizableBox>;
};

export default Resizable;
