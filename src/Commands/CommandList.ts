import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ban from './Ban';

class CommandList {
    private commands: Array<Command<any>> = [new Agree(), new Ban()];

    public getCommands(): Array<Command<any>> {
        return this.commands;
    }
}

export default CommandList;
