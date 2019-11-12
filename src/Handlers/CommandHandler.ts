import { Message } from 'discord.js';
import Command from '../Commands/Command';
import CommandList from '../Commands/CommandList';

class CommandHandler {
    private commandMap: Map<string, Command> = new Map();
    private commands: object;

    public constructor() {
        this.commands = new CommandList().getCommands();

        Object.keys(this.commands).forEach(key => {
            const keys = key.split('|');
            const command = new this.commands[key].command();
            keys.forEach(k => {
                this.commandMap.set(k, command);
            });
        });
    }

    public handle(cmdMessage: string, msg: Message): void {
        const command = cmdMessage.split(' ')[0].toLowerCase();
        const params = cmdMessage.replace(command, '').trim();

        if (this.commandMap.has(command)) {
            const run = this.commandMap.get(command);
            if (run) {
                if (params) {
                    run.handle(msg, params);
                } else {
                    run.handle(msg);
                }
            }
        }
    }
}

export default CommandHandler;
