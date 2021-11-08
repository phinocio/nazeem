import { Message } from 'discord.js';
import { channels, roles } from '../../config.json';
import Command from '../Interfaces/Command';

class Agree implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'Agree';
		this.description =
			'Agree to server rules and remove Prisoner role, granting access to channels.';
		this.usage = '!agree';
	}

	public async handle(msg: Message): Promise<void> {
		if (!msg.member) {
			//TODO: Channel log
			console.log('Message has no member. Error reee');
			return;
		}

		if (
			msg.channel.id === channels.gatekeep &&
			msg.member.roles.cache.get(roles.Prisoner)
		) {
			try {
				await msg.member.roles.remove(roles.Prisoner);
			} catch (e: any) {
				this.respond(msg, { message: e.message }, 'send');
			}
		}

		// No response.
	}

	protected async respond(
		msg: Message,
		data: Record<string, string>,
		type: string
	): Promise<void> {
		try {
			switch (type) {
				case 'send':
					await msg.channel.send(data['message']);
					break;
				case 'reply':
					await msg.reply(data['message']);
					break;
			}
		} catch (e: any) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Agree;
