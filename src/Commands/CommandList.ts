import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ban from './Ban';
import Clear from './Clear';
import Help from './Help';
import Kick from './Kick';
import Unban from './Unban';
import Faction from './Faction';
import Pins from './Pins';

class CommandList {
    private commands: Array<Command<any>> = [
        new Agree(),
        new Ban(),
        new Clear(),
        new Faction(),
        new Help(),
        new Kick(),
        new Pins(),
        new Unban()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
