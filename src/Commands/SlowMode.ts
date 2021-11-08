import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import SlowModeParams from '../Types/SlowModeParams';
import SlowModeParamsParser from '../Parsers/SlowModeParamsParser';

class SlowMode implements Command<SlowModeParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => SlowModeParams;
	public description: string;
	public usage: string;
	public isUserCommand = false;

	constructor() {
		this.identifier = 'Slowmode';
		this.parser = SlowModeParamsParser;
		this.description =
			'Set slow mode in the current channel of provided seconds, with a max of 21600.';
		this.usage = '!slowmode <TimeInSec>';
	}

	public async handle(msg: Message, param: SlowModeParams): Promise<void> {
		const { amount } = param;

		// This *should* never happen, but gets rid of TS error, and more safe than msg.member && in next if
		if (!msg.member) {
			await this.respond(
				msg,
				{
					message: 'Something went wrong. msg.member is falsy.'
				},
				'send'
			);
			return;
		}

		if (!msg.member.hasPermission('MANAGE_CHANNELS')) {
			await this.respond(
				msg,
				{
					message: 'you do not have permission to enable Slowmode!'
				},
				'reply'
			);
			return;
		}

		if (amount >= 0 && amount <= 21600) {
			try {
				if (msg.channel.type != 'dm' && msg.channel.type == 'text') {
					await msg.channel.setRateLimitPerUser(amount);
					if (amount == 0) {
						await this.respond(
							msg,
							{
								message: 'Slowmode has been turned off.'
							},
							'send'
						);
					} else {
						await this.respond(
							msg,
							{
								message:
									'Slowmode of **' +
									amount +
									'** seconds has been enabled.'
							},
							'send'
						);
					}
				}
			} catch (e: any) {
				await this.respond(msg, { message: e.message }, 'send');
			}
		} else {
			await this.respond(
				msg,
				{
					message:
						'Please enter the length of Slowmode in seconds! (max of 21600)'
				},
				'send'
			);
		}

		// No response.
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

export default SlowMode;
