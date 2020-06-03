import NotifyMeParams from '../Types/NotifyMeParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function NotifyMeParamsParser(
	src: Message,
	identifier: string
): NotifyMeParams {
	const stop =
		src.content
			.slice(message.prefix.length + identifier.length)
			.trim()
			.toLowerCase() === 'stop';

	return { stop };
}

export default NotifyMeParamsParser;
