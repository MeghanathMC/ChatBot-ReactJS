

class Message {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse = (message) => {
        this.actionProvider.respond(message);
    };
}

export default Message;
