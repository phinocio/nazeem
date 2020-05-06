import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import Storage from '../Helpers/Storage';

class OptIn implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'OptOut';
		this.description =
			'Opt in having a (non-pinging) message show up whenever you go live on Twitch streaming Ultimate Skyrim';
		this.usage = '!optin';
	}

	public async handle(msg: Message): Promise<void> {
		if (!msg.member) {
			//TODO: Channel log
			console.log('Message has no member. Error reee');
			return;
		}
		try {
			const data = await Storage.read('opt-ins.json');

			if (data.has(msg.member.id)) {
				return await this.respond(
					msg,
					{
						message:
							'you have already opted in to have your streams posted.'
					},
					'reply'
				);
			}
			data.add(msg.member.id);

			await Storage.store('opt-ins.json', Array.from(data));
			return await this.respond(
				msg,
				{
					message:
						'you have opted in to have your Ultimate Skyrim streams posted.'
				},
				'reply'
			);
		} catch (e) {
			// Something went wrong.
			console.log(e.message);
			await this.respond(
				msg,
				{
					message:
						'Something went wrong with opting in. Please let Phinocio know'
				},
				'send'
			);
		}
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

export default OptIn;
