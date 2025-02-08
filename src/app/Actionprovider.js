import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGSjg2R2NGM2pUYk5MT2NvNE52WmtVQ0lVbWZZQ3FvcXRPUWVNZmJoTmxFIn0.eyJleHAiOjE3NzA1NDEzMzAsImlhdCI6MTczOTAwNTMzMCwianRpIjoiMTkyYWZhN2YtYmQxMi00MTMyLWE4MmYtMTczMDNjMjU1OGJkIiwiaXNzIjoiaHR0cDovL2dhdGV3YXkuZTJlbmV0d29ya3MuY29tL2F1dGgvcmVhbG1zL2FwaW1hbiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyOWJlYWVmOS0wOGIxLTQ4ZGYtOTFlOS1mOWQxYWZlYzI0ZTQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGltYW51aSIsInNlc3Npb25fc3RhdGUiOiJjNTkzMjRkNy1hYWU4LTQ3YzAtODFjMi1jZjFmYTZhZWE3ZDMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwaXVzZXIiLCJkZWZhdWx0LXJvbGVzLWFwaW1hbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImM1OTMyNGQ3LWFhZTgtNDdjMC04MWMyLWNmMWZhNmFlYTdkMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkthcnRoaWsgTSIsInByaW1hcnlfZW1haWwiOiJra2FydGhpazc5MjNAZ21haWwuY29tIiwiaXNfcHJpbWFyeV9jb250YWN0Ijp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJra2FydGhpazc5MjNAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkthcnRoaWsiLCJmYW1pbHlfbmFtZSI6Ik0iLCJlbWFpbCI6ImtrYXJ0aGlrNzkyM0BnbWFpbC5jb20ifQ.eDZK8gP4q2Xk3ucB1cUhZET4QnA19r57vF9ZW1VmMkBX-kwgRmHUBgY3vUbnY6dWRWRP8zW9cxzDy437ZxtLq3oPG0wswORahWUzIzZ2B-qufDt5kdR2I-MPTmm9ZgakzPhEwPORuJQjazTQN3AdWNslSCTr-DTIDRX261LisuI", 
    baseURL: "https://infer.e2enetworks.net/project/p-4816/genai/deepseek_v3/v1",
    dangerouslyAllowBrowser:true
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
                model: "deepseek_v3",
                messages: [
                    { role: "system", content: "You are a medical expert who is helping the user to get the best treatment for their condition" },
                    { role: "user", content: prompt },
                ],
                temperature: 0.5,
                max_tokens: 300,
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

        // Create a single message instead of looping
        const message = this.createChatBotMessage(responseGPT);
        this.updateChatBotMessage(message);
        
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

