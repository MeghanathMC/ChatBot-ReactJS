'use client';

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../config";
import Actionprovider from "../Actionprovider";
import Message from "../Message";

const ChatComp = () => {
    return (
        <div>
            <Chatbot
                config={config}
                actionProvider={Actionprovider}
                messageParser={Message}
            />
        </div>
    );
};

export default ChatComp;
