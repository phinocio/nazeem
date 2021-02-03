import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class Ask implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'Ask';
		this.description = 'Just ~~dance~~ ask!';
		this.usage = '!ask';
	}

	public async handle(msg: Message): Promise<void> {
		this.respond(msg, {
			message:
				'Please dont ask if you can ask a question, simply ask the question. Someone will eventually get around to answering you, we have a very helpful community.'
		});

		// No response.
	}

	protected async respond(
		msg: Message,
		data: Record<string, string>
	): Promise<void> {
		try {
			await msg.channel.send(data['message']);
		} catch (e) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Ask;
