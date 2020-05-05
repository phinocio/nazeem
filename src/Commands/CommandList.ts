import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ban from './Ban';
import Faction from './Faction';
import Kick from './Kick';
import Memsize from './Memsize';
import Unban from './Unban';

class CommandList {
    private commands: Array<Command<any>> = [
        new Agree(),
        new Ban(),
        new Faction(),
        new Kick(),
        new Memsize(),
        new Unban()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
