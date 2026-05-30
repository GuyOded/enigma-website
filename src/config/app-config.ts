import { message } from "antd";

export const init = () => {
    message.config({
        duration: 1.5,
        maxCount: 3,
    });
};

export const MATH_JAX_CONFIG = {
    loader: { load: ["input/tex", "output/chtml"] },
    tex: {
        inlineMath: [
            ["\\(", "\\)"],
            ["$", "$"],
        ],
        displayMath: [
            ["\\[", "\\]"],
            ["$$", "$$"],
        ],
    },
};

export const UNITY_ASSETS_PATH = import.meta.env.DEV
    ? "/assets/build"
    : "https://pub-995d9435467a47e3aaa6aa4408977ebd.r2.dev";
