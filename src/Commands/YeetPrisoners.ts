import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import { roles } from '../../config.json';

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

		// get all members with prisoner role
		const prisoners = await msg.guild?.roles.fetch(roles.Prisoner);

		if (prisoners?.members) {
			let kicked = 0;
			prisoners.members.forEach((member: any) => {
				// 604800000 is the amount if milliseconds in a week. So we're checking if someone has been in the Guild for a week or more.
				console.log(Date.now() - member?.joinedTimestamp > 604800000);
				if (Date.now() - member?.joinedTimestamp > 604800000) {
					// member.kick();
					kicked++;
				}
			});
			await this.respond(
				msg,
				{
					message: `${kicked} Prisoners who can't read were kicked`
				},
				'send'
			);
		} else {
			await this.respond(
				msg,
				{
					message: 'There are no prisoners to kick!'
				},
				'send'
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
		} catch (e: any) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default YeetPrisoners;
