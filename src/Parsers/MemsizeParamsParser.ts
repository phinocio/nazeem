import MemsizeParams from '../Types/MemsizeParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function MemsizeParamsParser(src: Message, identifier: string): MemsizeParams {
	let vram = undefined;
	let ram = undefined;
	const params = src.content
		.slice(message.prefix.length + identifier.length)
		.trim()
		.split(' ');

	if (params.length === 2) {
		vram = parseInt(params[0].trim());
		ram = parseInt(params[1].trim());
	}
	return { vram, ram };
}

export default MemsizeParamsParser;
