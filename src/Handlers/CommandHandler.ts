import { Message } from 'discord.js';
import CommandRegistry from '../Commands/CommandRegistry';

class CommandHandler {
    private readonly commands: CommandRegistry;
    constructor(commands: CommandRegistry) {
        this.commands = commands;
    }

    public async handle(cmdMessage: string, msg: Message): Promise<void> {
        const commandIdentifier = cmdMessage.split(' ')[0];
        const command = this.commands.get(commandIdentifier.toLowerCase());
        if (command) {
            let params = '';
            if (typeof command.parser === 'function') {
                params = command.parser(msg, commandIdentifier);
            }
            if (params) {
                await command.handle(msg, params);
            } else {
                await command.handle(msg);
            }
        } else {
            // delete message if it's not a command.
            msg.delete();
        }
    }
}

export default CommandHandler;
