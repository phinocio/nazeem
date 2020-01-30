import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ask from './Ask';
import Ban from './Ban';
import Clear from './Clear';
import Help from './Help';
import Kick from './Kick';
import Unban from './Unban';
import Faction from './Faction';
import Pins from './Pins';
import Memsize from './Memsize';

class CommandList {
    private commands: Array<Command<any>> = [
        new Agree(),
        new Ask(),
        new Ban(),
        new Clear(),
        new Faction(),
        new Help(),
        new Kick(),
        new Memsize(),
        new Pins(),
        new Unban()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
