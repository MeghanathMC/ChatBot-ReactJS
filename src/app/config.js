import { createChatBotMessage } from "react-chatbot-kit";

const config ={
    botName: "card expert",
    initialMessages:[
        createChatBotMessage("Hello I'm a credit card advisor,how can i help you")
    ]
}

export default config;