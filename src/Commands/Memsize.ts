import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import MemsizeParams from '../Types/MemsizeParams';
import MemsizeParamsParser from '../Parsers/MemsizeParamsParser';

class Memsize implements Command<MemsizeParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => MemsizeParams;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'Memsize';
		this.parser = MemsizeParamsParser;
		this.description = 'Calculate the memsize for enblocal.ini';
		this.usage = '!memsize <vramInGB> <memInGB>';
	}

	public async handle(msg: Message, params: MemsizeParams): Promise<void> {
		const { vram, ram } = params;

		if (vram && ram) {
			const memsize = (vram + ram - 2) * 1024;
			await this.respond(
				msg,
				{ message: `your \`VideoMemorySizeMB\` is \`${memsize}\`` },
				'reply'
			);
		} else {
			await this.respond(
				msg,
				{
					message: `please enter in the format \`${this.usage}\``
				},
				'reply'
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

export default Memsize;
