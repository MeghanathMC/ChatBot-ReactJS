import { createChatBotMessage } from "react-chatbot-kit";

const config ={
    botName: "medical expert",
    initialMessages:[
        createChatBotMessage("Hello I'm a medical expert ,how can i help you?")
    ]
}

export default config;