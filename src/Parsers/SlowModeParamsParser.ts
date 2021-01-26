import SlowModeParams from '../Types/SlowModeParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function SlowModeParamsParser(
	src: Message,
	identifier: string
): SlowModeParams {
	const amount = parseInt(
		src.content.slice(message.prefix.length + identifier.length)
	);
	return { amount };
}

export default SlowModeParamsParser;
