import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import { roles, channels } from '../../config.json';
import NotifyMeParams from '../Types/NotifyMeParams';
import NotifyMeParamsParser from '../Parsers/NotifyMeParamsParser';

class NotifyMe implements Command<NotifyMeParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => NotifyMeParams;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'NotifyMe';
		this.parser = NotifyMeParamsParser;
		this.description =
			'Opt in to being pinged for announcements and notifications about Dylan/US related things. Optionally append "stop" to optout.';
		this.usage = '!notifyme <stop?>';
	}

	public async handle(msg: Message, params: NotifyMeParams): Promise<void> {
		const { stop } = params;

		if (msg.channel.id !== channels.botCommands) {
			// do nothing and delete msg
			await msg.delete();
			return;
		}

		try {
			if (stop) {
				// remove role.
				if (msg.member && msg.member.roles.cache.get(roles.NotifyMe)) {
					msg.member?.roles.remove(roles.NotifyMe);
					return await this.respond(
						msg,
						{
							message:
								'you have been opted out of pinging notifications!'
						},
						'reply'
					);
				}
				return await this.respond(
					msg,
					{
						message: 'you are not opted in so can not opt out!'
					},
					'reply'
				);
			} else {
				// add role.
				if (msg.member && msg.member.roles.cache.get(roles.NotifyMe)) {
					return await this.respond(
						msg,
						{
							message: 'you are already opted in!'
						},
						'reply'
					);
				}
				await msg.member?.roles.add(roles.NotifyMe);
				return await this.respond(
					msg,
					{
						message:
							'you have been opted in to pinging notifications!'
					},
					'reply'
				);
			}
		} catch (e) {
			console.log(e.message);
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

export default NotifyMe;
