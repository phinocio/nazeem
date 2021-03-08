import { Message } from 'discord.js';
import fetch from 'node-fetch';
import {} from '../../config.json';
import Command from '../Interfaces/Command';

class Pins implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = false;

	constructor() {
		this.identifier = 'UpdatePatreonApi';
		this.description = 'Updates the Patreon API for the launcher';
		this.usage = '!updatepatreonapi';
	}

	public async handle(msg: Message): Promise<void> {
		if (msg.member?.hasPermission('ADMINISTRATOR')) {
			try {
				await this.respond(
					msg,
					{ message: 'Updating caches this may take a minute...' },
					'send'
				);
				const response = await fetch(
					'https://ultsky.phinocio.com/api/patreon/update',
					{
						method: 'PATCH'
					}
				);
				const data = await response.json();
				await this.respond(msg, { message: data.message }, 'send');
			} catch (e) {
				this.respond(msg, { message: e.message }, 'send');
			}
		} else {
			this.respond(
				msg,
				{ message: " you don't have permission to run this command!" },
				'reply'
			);
		}
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
		} catch (e) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Pins;
