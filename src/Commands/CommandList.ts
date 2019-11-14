import Help from './Help';
import Agree from './Agree';
import Kick from './Kick';

class CommandList {
    private commands: object = {
        help: {
            command: Help,
            description: 'Gives help on commands.',
            usage: '!help | !help <command> for help on individual commands.'
        },
        agree: {
            command: Agree,
            description:
                'Agree to the server rules to remove Prisoner role and gain access to channels.',
            usage: '!agree'
        },
        kick: {
            command: Kick,
            description:
                'Kick a specified user from the server with an optional reason given.',
            usage: '!kick <user> <reason>'
        }
    };

    public getCommands(): object {
        return this.commands;
    }
}

export default CommandList;
