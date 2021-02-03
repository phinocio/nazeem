import { Message } from 'discord.js';
import { roles, modRoles } from '../../config.json';
import Command from '../Interfaces/Command';
import MuteParams from '../Types/MuteParams';
import MuteParamsParser from '../Parsers/MuteParamsParser';

class Unmute implements Command<MuteParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => Promise<MuteParams>;
	public description: string;
	public usage: string;
	public isUserCommand = false;

	constructor() {
		this.identifier = 'Unmute';
		this.parser = MuteParamsParser;
		this.description = 'Unmute a user with optional reason.';
		this.usage = '!unmute <user> <reason?>';
	}

	public async handle(msg: Message, param: MuteParams): Promise<void> {
		const { member, reason } = await param;

		if (!msg.member) {
			return await this.respond(
				msg,
				{ message: 'Somehow there is no msg.member. Let Phin know.' },
				'send'
			);
		}

		let isMod;

		for (const role of modRoles) {
			if (!isMod) {
				isMod = msg.member?.roles.cache.has(role);
			}
		}

		if (
			isMod ||
			msg.member.hasPermission('ADMINISTRATOR') ||
			msg.member.hasPermission('MANAGE_ROLES')
		) {
			if (!member) {
				return await this.respond(
					msg,
					{
						message:
							'you need to tag a user or provide a UserID in order to unmute them!'
					},
					'reply'
				);
			}

			if (!member.roles.cache.has(roles.Mute)) {
				return await this.respond(
					msg,
					{
						message: `**${member.user.username}** isn't muted!`
					},
					'send'
				);
			}

			try {
				await member.send(
					`You have been **unmuted** on **${msg.guild?.name}** for: ${reason}`
				);
			} catch (e) {
				await msg.channel.send('Error: ' + e.message);
			}

			try {
				await member.roles.remove(roles.Mute);
				await this.respond(
					msg,
					{
						message: `**${member.user.username}** has been unmuted for: **${reason}**`
					},
					'send'
				);
			} catch (e) {
				console.log(e);
			}
		} else {
			await this.respond(
				msg,
				{ message: 'You do not have permission to unmute users.' },
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
		} catch (e) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Unmute;
