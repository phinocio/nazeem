import Agree from './Agree';
import Clear from './Clear';
import Help from './Help';
import Kick from './Kick';
import Command from '../Interfaces/Command';

class CommandList {
    private commands: Array<Command<any>> = [
        new Agree(),
        new Clear(),
        new Help(),
        new Kick()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
