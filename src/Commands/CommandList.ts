import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ban from './Ban';
import Faction from './Faction';
import Unban from './Unban';

class CommandList {
    private commands: Array<Command<any>> = [
        new Agree(),
        new Ban(),
        new Faction(),
        new Unban()
    ];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
