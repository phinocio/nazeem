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
                command.handle(msg, params);
            } else {
                command.handle(msg);
            }
        }
    }
}

export default CommandHandler;
