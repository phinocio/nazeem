import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import Storage from '../Helpers/Storage';

class OptOut implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'OptOut';
		this.description =
			'Opt out of having a (non-pinging) message show up whenever you go live on Twitch streaming Ultimate Skyrim';
		this.usage = '!optout';
	}

	public async handle(msg: Message): Promise<void> {
		if (!msg.member) {
			//TODO: Channel log
			console.log('Message has no member. Error reee');
			return;
		}
		try {
			const data = await Storage.read('opt-ins.json');

			if (!data.has(msg.member.id)) {
				return await this.respond(
					msg,
					{
						message: "you aren't opted in, so can't be opted out."
					},
					'reply'
				);
			}
			data.delete(msg.member.id);

			await Storage.store('opt-ins.json', Array.from(data));
			return await this.respond(
				msg,
				{
					message:
						'you have opted out of having your Ultimate Skyrim streams posted.'
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
						'Something went wrong with opting out. Please let Phinocio know'
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

export default OptOut;
