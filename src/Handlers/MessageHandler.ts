import { Message } from 'discord.js';
import { message } from '../../config.json';
import CommandHandler from './CommandHandler';
import CommandList from '../Commands/CommandList';
import CommandRegistry from '../Commands/CommandRegistry';

class MessageHandler {
    private cmdHandler: CommandHandler;
    private cmdRegistry: CommandRegistry;

    public constructor() {
        this.cmdRegistry = new CommandRegistry(new CommandList().getCommands());
        this.cmdHandler = new CommandHandler(this.cmdRegistry);
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
