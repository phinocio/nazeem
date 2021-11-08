import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class YeetPrisoners implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = false;

	// This will be converted to a cron once I get it working
	constructor() {
		this.identifier = 'YeetPrisoners';
		this.description = 'Yeets Prisoners';
		this.usage = '!yeetprisoners';
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
		} catch (e: any) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default YeetPrisoners;
