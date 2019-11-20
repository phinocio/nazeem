import Help from './Help';
import Agree from './Agree';
import Kick from './Kick';
import Command from '../Interfaces/Command';
import Clear from './Clear';

class CommandList {
    private commands: Array<Command<any>> = [
        new Help(),
        new Agree(),
        new Kick(),
        new Clear()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
