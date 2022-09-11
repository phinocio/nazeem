import { Message, MessageAttachment } from 'discord.js';
import { message, channels, webhooks } from '../../config.json';
import CommandHandler from './CommandHandler';
import CommandRegistry from '../Commands/CommandRegistry';
import ConvertBMP from '../Helpers/ConvertBMP';
import Storage from '../Helpers/Storage';
import CheckBot from '../Helpers/CheckBot';

class MessageHandler {
	private cmdHandler: CommandHandler;
	private cmdRegistry: CommandRegistry;

	public constructor() {
		this.cmdRegistry = CommandRegistry.getInstance();
		this.cmdHandler = new CommandHandler(this.cmdRegistry);
	}

	public async handle(msg: Message): Promise<void> {
		//TEMP FIX, shouldn't happen anyway.
		if (!msg.member) {
			//TODO: Channel Log
			console.log('meow Message has no member');
			return;
		}

		//Pass the message into a function to check if it's a potential bot
		const isBot = await CheckBot.check(msg);

		// if it's a bot, we can just return as we don't need to do anything else with the message as the check() method handles it
		if (isBot) {
			console.log('bot!');
			return;
		}

		// delete every message that's sent in suggestions channel unless it starts with ;suggest
		if (
			msg.channel.id == channels.suggestions &&
			!msg.content.startsWith(';suggest') &&
			!msg.member.hasPermission('MANAGE_MESSAGES')
		) {
			try {
				setTimeout(async () => {
					await msg.delete();
				}, 200);
			} catch (e: any) {
				console.log('Message already deleted');
			}
		}

		const bmp = msg.attachments.find((attachment) => {
			return Boolean(attachment.name?.includes('.bmp'));
		});

		if (bmp && bmp.name) {
			const newImg = await ConvertBMP.convert(bmp);

			await msg.reply(
				'BMPs are bad mmmmkay',
				new MessageAttachment(newImg)
			);

			await msg.delete();

			Promise.all([
				Storage.delete(newImg.replace('storage/', '')),
				Storage.delete(bmp.name)
			]);
		}

		if (
			msg.content.startsWith(message.prefix) &&
			msg.content.length > message.prefix.length && // Prevent sending commands to bot that is just the prefix.
			!msg.author.bot // Prevent bot from responding to itself.
		) {
			const cmdMessage = msg.content
				.substring(message.prefix.length)
				.toLowerCase();
			try {
				await this.cmdHandler.handle(cmdMessage, msg);
			} catch (e: any) {
				// TODO: Channel log
				console.log(
					`Main command handler error: ${e.message}`,
					cmdMessage
				);
			}
		}

		// delete every message that's sent in gatekeep channel or enlist channel except those who have manage messages permission or are an admin or owner..
		if (
			(msg.channel.id == channels.gatekeep ||
				msg.channel.id == channels.enlist) &&
			!msg.member.hasPermission('MANAGE_MESSAGES')
		) {
			try {
				setTimeout(async () => {
					await msg.delete();
				}, 1000);
			} catch (e: any) {
				console.log('Message already deleted');
			}
		}

		// On announcement message, update the patreon caches.
		if (msg.channel.id == channels.announcements) {
			try {
				let data = {
					embeds: [
						{
							title: 'Launcher Patreon API',
							description: `Message in announcements detected... updating Patreon API caches...`
						}
					]
				};
				MessageHandler.sendNotif(
					data,
					webhooks.scamReport,
					'API auto update error: '
				);
				const response = await fetch(
					'https://ultsky.phinocio.com/api/patreon/update',
					{
						method: 'PATCH'
					}
				);
				const resp = await response.json();
				data = {
					embeds: [
						{
							title: 'Launcher Patreon API',
							description: `${resp.message}`
						}
					]
				};
				MessageHandler.sendNotif(
					data,
					webhooks.scamReport,
					'API auto update error: '
				);
			} catch (e: any) {}
		}
	}

	// TODO: Make this a method in its own class
	public static async sendNotif(
		data: Record<string, unknown>,
		webhook: string,
		errorMsg: string
	): Promise<void> {
		try {
			await fetch(webhook, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} catch (e: any) {
			console.log(errorMsg + e.message);
		}
	}
}

export default MessageHandler;
