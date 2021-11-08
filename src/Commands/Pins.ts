import { Message } from 'discord.js';
import {} from '../../config.json';
import Command from '../Interfaces/Command';

class Pins implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'Pins';
		this.description = 'Show users how to check the pins.';
		this.usage = '!pins';
	}

	public async handle(msg: Message): Promise<void> {
		try {
			// TODO: The link will be stored in the DB once sqlite is set up. No point having it in config.json
			await msg.channel.send('https://i.imgur.com/LETwjvd.gifv');
		} catch (e: any) {
			this.respond(msg, { message: e.message });
		}

		// No response.
	}

	protected async respond(
		msg: Message,
		data: Record<string, string>
	): Promise<void> {
		try {
			await msg.channel.send(data['message']);
		} catch (e: any) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Pins;
