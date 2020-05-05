import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ask from './Ask';
import Ban from './Ban';
import Clear from './Clear';
import Faction from './Faction';
import Help from './Help';
import Kick from './Kick';
import Memsize from './Memsize';
import Pins from './Pins';
import Unban from './Unban';

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
