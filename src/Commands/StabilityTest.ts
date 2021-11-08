import { Message } from 'discord.js';
import Command from '../Interfaces/Command';

class StabilityTest implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'StabilityTest';
		this.description = 'Reply with Stability Test.';
		this.usage = '!stabilitysest';
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
				message: `Bmxfreestyle created a Stability Test Guide for people who are just starting a new playthrough and would like to test the stability/integrity of their game. 
     Additionally, the end of the guide will aim to give helpful information for people who would like to learn more on load order and how to add mods on top of their Ultimate Skyrim Experience
always feel free to share your questions in the relevant channels <#348579495537803274> <#566109104360390657> 
https://docs.google.com/document/d/1PusjuS09qs8QPU5PVf7uSoZKt_35ZTvFmFrLWtIaTQ0/edit#heading=h.6znbuu4htqw`
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

export default StabilityTest;
