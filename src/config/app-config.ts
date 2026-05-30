import { message } from "antd";

export const init = () => {
    message.config({
        duration: 1.5,
        maxCount: 3,
    });
};
