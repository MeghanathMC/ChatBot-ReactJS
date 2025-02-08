import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "f0517ca61dca4c8889f7d8ccbb3a11e9",
    baseURL: "https://api.aimlapi.com", // Ensure this URL is correct
    dangerouslyAllowBrowser: true,
});

class Actionprovider {
    createChatBotMessage;
    setState;
    stateRef;
    createClientMessage;
    createCustomMessage;

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    callGenAI = async (prompt) => {
        try {
            const ChatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a medical expert who is helping the user to get the best treatment for their condition" },
                    { role: "user", content: prompt },
                ],
                temperature: 0.5,
                max_tokens: 50,
            });
            return ChatCompletion.choices[0].message.content;
        } catch (error) {
            console.error("Error in OpenAI API call:", error);
            return "Sorry, I couldn't generate a response.";
        }
    };

    timer = (ms) => new Promise((res) => setTimeout(res, ms));

    generateResponseMessage = async (userMessage) => {
        try {
            const responseGPT = await this.callGenAI(userMessage);
            let message;
            const numberNoLines = responseGPT.split("\n").length;

            for (let i = 0; i < numberNoLines; i++) {
                const msg = responseGPT.split("\n")[i];
                if (msg.length) {
                    message = this.createChatBotMessage(msg);
                    this.updateChatBotMessage(message);
                }
                await this.timer(1000); // Wait for 1 second before sending the next message
            }
        } catch (error) {
            console.error("Error in generating response message:", error);
        }
    };

    respond = (message) => {
        this.generateResponseMessage(message);
    };

    updateChatBotMessage = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
}

export default Actionprovider;

