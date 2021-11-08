import { Message, MessageEmbed } from 'discord.js';
import Command from '../Interfaces/Command';
import { bot } from '../../config.json';

class GameFolderFiles implements Command<undefined> {
	public identifier: string;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'GFF';
		this.description = 'Show how to do Game Folder Files';
		this.usage = '!gff';
	}

	public async handle(msg: Message): Promise<void> {
		if (!msg.member) {
			//TODO: Channel log
			console.log('Message has no member. Error reee');
			return;
		}

		const embed = new MessageEmbed();
		embed.setAuthor(`Nazeem`, bot.avatar);
		embed.setColor('#00ae86');
		embed.setTitle('Game Folder Files');
		embed.setDescription(
			'There is a folder inside your installation folder called `Game Folder Files`, move the contents of `Game Folder Files` to the game root directory i.e. where `TESV.exe` is located.'
		);
		embed.setImage(
			'https://image.prntscr.com/image/AE15Cp33RumeDTx-sZUz_w.png'
		);

		await this.respond(
			msg,
			{
				message: embed
			},
			'send'
		);
	}

	protected async respond(
		msg: Message,
		data: Record<string, MessageEmbed>,
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

export default GameFolderFiles;
