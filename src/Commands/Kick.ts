import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import KickParams from '../Types/KickParams';
import KickParamsParser from '../Parsers/KickParamsParser';

class Kick implements Command<KickParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => Promise<KickParams>;
	public description: string;
	public usage: string;

	constructor() {
		this.identifier = 'Kick';
		this.parser = KickParamsParser;
		this.description = 'Kick a user with optional reason.';
		this.usage = '!kick <UserTag/UserID> <reason?>';
	}

	public async handle(msg: Message, params: KickParams): Promise<void> {
		const { member, reason } = await params;
		if (!member) {
			await this.respond(
				msg,
				{
					message:
						'you need to tag a user or provide a UserID in order to Kick them!'
				},
				'reply'
			);

			return;
		}

		if (msg.member && !msg.member.hasPermission('KICK_MEMBERS')) {
			await this.respond(
				msg,
				{ message: "You don't have permission to kick users!" },
				'send'
			);

			return;
		}

		if (!member.kickable) {
			await this.respond(
				msg,
				{ message: `${member.user.username} is not kickable!` },
				'send'
			);

			return;
		}
		try {
			await member.send(
				`You have been kicked from **${msg.guild?.name}** for: ${reason}`
			);
		} catch (e) {
			await msg.channel.send('Error: ' + e.message);
		}

		try {
			await this.respond(
				msg,
				{
					message: `**${member.user.username}** has been kicked for: ${reason}`
				},
				'send'
			);

			await member.kick(reason);
		} catch (e) {
			await msg.channel.send('Error: ' + e.message);
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

export default Kick;
