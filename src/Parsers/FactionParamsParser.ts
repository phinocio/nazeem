import FactionParams from '../Types/FactionParams';
import { Message } from 'discord.js';
import { message, factions } from '../../config.json';

function FactionParamsParser(src: Message, identifier: string): FactionParams {
	let role = undefined;

	const faction = src.content
		.slice(message.prefix.length + identifier.length)
		.trim();

	if (faction == 'remove') {
		return { role: 'remove' };
	}

	for (const key in factions) {
		if (key.toLowerCase() == faction.toLowerCase()) {
			role = src.guild?.roles.cache.find(
				(x) => x.name.toLowerCase() == faction.toLowerCase()
			);
		}
	}

	return { role };
}

export default FactionParamsParser;
