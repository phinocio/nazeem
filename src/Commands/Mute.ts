import { Message } from 'discord.js';
import { roles, modRoles } from '../../config.json';
import Command from '../Interfaces/Command';
import MuteParams from '../Types/MuteParams';
import MuteParamsParser from '../Parsers/MuteParamsParser';

class Mute implements Command<MuteParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => Promise<MuteParams>;
	public description: string;
	public usage: string;
	public isUserCommand = false;

	constructor() {
		this.identifier = 'Mute';
		this.parser = MuteParamsParser;
		this.description = 'Mute a user with optional reason.';
		this.usage = '!mute <user> <reason?>';
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
							'you need to tag a user or provide a UserID in order to mute them!'
					},
					'reply'
				);
			}

			let targetIsMod;

			for (const role of modRoles) {
				if (!targetIsMod) {
					targetIsMod = member.roles.cache.has(role);
				}
			}

			if (
				targetIsMod ||
				member.hasPermission('ADMINISTRATOR') ||
				member.hasPermission('MANAGE_ROLES')
			) {
				return await this.respond(
					msg,
					{
						message: `**${member.user.username}** cannot be muted!`
					},
					'send'
				);
			}
			if (member.roles.cache.has(roles.Mute)) {
				return await this.respond(
					msg,
					{
						message: `**${member.user.username}** is already muted!`
					},
					'send'
				);
			}

			try {
				await member.send(
					`You have been **muted** on **${msg.guild?.name}** for: ${reason}`
				);
			} catch (e) {
				await msg.channel.send('Error: ' + e.message);
			}

			try {
				await member.roles.add(roles.Mute);
				await this.respond(
					msg,
					{
						message: `**${member.user.username}** has been muted for: **${reason}**`
					},
					'send'
				);
			} catch (e) {
				console.log(e);
			}
		} else {
			await this.respond(
				msg,
				{ message: 'You do not have permission to mute users.' },
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

export default Mute;
