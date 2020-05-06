import Command from '../Interfaces/Command';
import CommandList from '../Commands/CommandList';

class CommandRegistry {
	private static instance: CommandRegistry;

	// We don't need to remember the type argument for Command<T> here.
	private readonly commands: Map<string, Command<any>>;

	constructor(commands: Array<Command<any>>) {
		this.commands = new Map();
		commands.forEach((comm) =>
			this.commands.set(comm.identifier.toLowerCase(), comm)
		);
	}

	public static getInstance(): CommandRegistry {
		if (!CommandRegistry.instance) {
			CommandRegistry.instance = new CommandRegistry(
				new CommandList().getCommands()
			);
		}

		return CommandRegistry.instance;
	}

	public get(identifier: string): Command<any> | undefined {
		return this.commands.get(identifier);
	}
}

export default CommandRegistry;
