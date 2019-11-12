import Help from './Help';
import Agree from './Agree';

class CommandList {
    private commands: object = {
        'h|help': {
            command: Help,
            description: 'Gives help on commands.',
            usage: 'h, help'
        },
        agree: {
            command: Agree,
            description:
                'Agree to the server rules to remove Prisoner role and gain access to channels.',
            usage: '!agree'
        }
    };

    public getCommands(): object {
        return this.commands;
    }
}

export default CommandList;
