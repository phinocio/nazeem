import { Message } from 'discord.js';
import { message } from '../../config.json';
import CommandHandler from './CommandHandler';

class MessageHandler {
    private cmdHandler: CommandHandler;

    public constructor() {
        this.cmdHandler = new CommandHandler();
    }

    public handle(msg: Message): void {
        if (
            msg.content.startsWith(message.prefix) &&
            msg.content.length > 1 &&
            !msg.author.bot &&
            msg.guild !== null
        ) {
            const cmdMessage = msg.content.substring(1).toLowerCase();
            this.cmdHandler.handle(cmdMessage, msg);
        }
    }
}

export default MessageHandler;
