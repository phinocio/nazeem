import Command from '../Interfaces/Command';

class CommandRegistry {
    // We don't need to remember the type argument for Command<T> here.
    private readonly commands: Map<string, Command<any>>;

    constructor(commands: Array<Command<any>>) {
        this.commands = new Map();
        commands.forEach((comm) =>
            this.commands.set(comm.identifier.toLowerCase(), comm)
        );
    }

    get(identifier: string): Command<any> | undefined {
        return this.commands.get(identifier);
    }
}

export default CommandRegistry;
