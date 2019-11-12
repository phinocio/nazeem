import Help from './Help';

class CommandList {
    private commands: object = {
        'h|help': {
            command: Help,
            description: 'Gives help on commands.',
            usage: 'h, help'
        }
    };

    public getCommands(): object {
        return this.commands;
    }
}

export default CommandList;
