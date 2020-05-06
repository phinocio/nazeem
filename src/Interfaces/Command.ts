import { Message } from 'discord.js';

interface Command<T> {
	readonly identifier: string;
	readonly parser?: (
		src: Message,
		identifier: string
	) => T | Promise<T> | undefined;
	handle(msg: Message, params?: T): Promise<void>;
	readonly description: string;
	readonly usage: string;
}

export default Command;
