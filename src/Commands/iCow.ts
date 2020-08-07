import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class ICow implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'ICOW';
		this.description = 'Show that icow is not currently available.';
		this.usage = '!icow';
	}

	public async handle(msg: Message): Promise<void> {
		if (!msg.member) {
			//TODO: Channel log
			console.log('Message has no member. Error reee');
			return;
		}
		await this.respond(
			msg,
			{
				message: `The official auto-install is currently under maintenance. If you'd like to install now using Wabbajack, please see https://discordapp.com/channels/344256550640287755/348579495537803274/741208052027621408 to use Wabbajack's unofficial auto-installation of Ultimate Skyrim`
			},
			'send'
		);
	}

	protected async respond(
		msg: Message,
		data: object,
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
		} catch (e) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default ICow;
