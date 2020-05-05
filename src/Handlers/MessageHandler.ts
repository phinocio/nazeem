import { Message } from 'discord.js';
import { message, channels } from '../../config.json';
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

    public async handle(msg: Message): Promise<void> {
        //TEMP FIX, shouldn't happen anyway.
        if (!msg.member) {
            //TODO: Channel Log
            console.log('Message has no member');
            return;
        }

        if (
            msg.content.startsWith(message.prefix) &&
            msg.content.length > message.prefix.length && // Prevent sending commands to bot that is just the prefix.
            !msg.author.bot // Prevent bot from responding to itself.
        ) {
            const cmdMessage = msg.content
                .substring(message.prefix.length)
                .toLowerCase();
            try {
                await this.cmdHandler.handle(cmdMessage, msg);
            } catch (e) {
                // TODO: Channel log
                console.log(
                    `Main command handler error: ${e.message}`,
                    cmdMessage
                );
            }
        }

        // delete every message that's sent in gatekeep channel except those who have manage messages permission and are an admin or owner..
        if (
            (msg.channel.id == channels.gatekeep ||
                msg.channel.id == channels.enlist) &&
            !msg.member.hasPermission('MANAGE_MESSAGES')
        ) {
            try {
                setTimeout(async () => {
                    await msg.delete();
                }, 1000);
            } catch (e) {
                console.log('Message already deleted');
            }
        }
    }
}

export default MessageHandler;
