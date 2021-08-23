import { Message, MessageAttachment } from 'discord.js';
import { message } from '../../config.json';
import CommandHandler from './CommandHandler';
import CommandRegistry from '../Commands/CommandRegistry';
import ConvertBMP from '../Helpers/ConvertBMP';
import Storage from '../Helpers/Storage';

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
			} catch (e) {
				// TODO: Channel log
				console.log(
					`Main command handler error: ${e.message}`,
					cmdMessage
				);
			}
		}

		// delete every message that's sent in gatekeep channel or enlist channel except those who have manage messages permission or are an admin or owner..
		// if (
		// 	(msg.channel.id == channels.gatekeep ||
		// 		msg.channel.id == channels.enlist) &&
		// 	!msg.member.hasPermission('MANAGE_MESSAGES')
		// ) {
		// 	try {
		// 		setTimeout(async () => {
		// 			await msg.delete();
		// 		}, 1000);
		// 	} catch (e) {
		// 		console.log('Message already deleted');
		// 	}
		// }
	}
}

export default MessageHandler;
