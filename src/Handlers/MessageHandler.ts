import { Client } from 'discord.js';
import { message } from '../../config.json';
import CommandHandler from './CommandHandler';

class MessageHandler {
    private client: Client;
    private cmdHandler: CommandHandler;

    public constructor(client: Client) {
        this.client = client;
        this.cmdHandler = new CommandHandler();
    }

    public handle(): void {
        this.client.on('message', msg => {
            // If the message is a command...
            if (
                msg.content.startsWith(message.prefix) &&
                msg.content.length > 1 &&
                !msg.author.bot
            ) {
                const cmdMessage = msg.content.substring(1).toLowerCase();
                console.log(cmdMessage);
                this.cmdHandler.handle(cmdMessage, msg);
            }
        });
    }
}

export default MessageHandler;
