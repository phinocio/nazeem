import fetch from 'node-fetch';
import { Message } from 'discord.js';
import { roles, webhooks } from '../../config.json';

class CheckBot {
	public static async check(msg: Message): Promise<boolean> {
		console.log('checking!');
		// check if the message is from a mod/admin, if so, don't do anything.
		if (
			msg.member?.hasPermission('ADMINISTRATOR') ||
			msg.member?.hasPermission('KICK_MEMBERS')
		) {
			return false;
		}
		const msgContent = msg.content.toLocaleLowerCase();
		if (
			msgContent.includes('@everyone') ||
			msgContent.includes('free nitro') ||
			msgContent.includes('discord nitro for free')
		) {
			CheckBot.reportMessage(msg);
			await msg.member?.roles.add(roles.Mute);
			await msg.delete();

			// call method to report the potential bot in a specified channel

			return true;
		}

		// return false as the last thing to hopefully minimize false positives
		return false;
	}

	private static async reportMessage(msg: Message): Promise<void> {
		const user = `${msg.member?.user.username}#${msg.member?.user.discriminator}`;
		const data = {
			embeds: [
				{
					title: 'Scam Protectatron',
					description: `${user} muted as potential bot.`,
					thumbnail: {
						url: 'https://cdn.discordapp.com/emojis/689897969146789938.png?size=128'
					},
					fields: [
						{
							name: 'User ID',
							value: `${msg.member?.user.id}`,
							inline: 'true'
						},
						{
							name: 'Offending Message',
							value: `${msg.content}`,
							inline: 'false'
						},
						{
							name: 'Channel',
							value: `${msg.channel}`,
							inline: 'false'
						}
					]
				}
			]
		};

		try {
			await fetch(webhooks.scamReport, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} catch (e: any) {
			console.log('scam reporting error: ' + e.message);
		}
	}
}
export default CheckBot;
