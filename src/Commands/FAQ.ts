import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class FAQ implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'FAQ';
		this.description = 'Link to FAQ';
		this.usage = '!faq';
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
				message:
					'Check out the FAQ at: https://github.com/phinocio/UltimateSkyrim/blob/master/Docs/FAQ.md'
			},
			'send'
		);
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

export default FAQ;
