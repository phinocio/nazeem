import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class Ask implements Command<undefined> {
    identifier: string;
    description: string;
    constructor() {
        this.identifier = 'Ask';
        this.description = 'Just ~~dance~~ ask!';
    }

    public async handle(msg: Message): Promise<void> {
        this.respond(msg, {
            message:
                'Please dont ask if you can ask a question, simply ask the question. Someone will eventually get around to answering you, we have a very helpful community.'
        });

        // No response.
    }

    protected async respond(msg: Message, data: object): Promise<void> {
        try {
            await msg.channel.send(data['message']);
        } catch (e) {
            console.error(`${this.identifier} response error: ${e.message}`);
        }
    }
}

export default Ask;
