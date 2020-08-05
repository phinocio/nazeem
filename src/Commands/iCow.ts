import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class ICow implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'icow';
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
				message: `On behalf of the Ultimate Skyrim Team, we're sorry for the inconvenience, as of right now, 
  **Immersive College of Winterhold** which is a **mandatory** mod for the installation of Ultimate Skyrim is currently set to *hidden* as the mod author is updating/reviewing the mod permissions against the assets they use. By their comments, it sounds as if it will be back up in the next few days. We appreciate your patience, and I will gladly add your name to the list of people and will tag you when we get an update.
**Please Leave an Emoji on this message if you'd like to be added to our list**
*if your Emoji no longer there, it means you have been added and you will hear from us soon<3*`
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
