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
        if (key == faction) {
            role = src.guild.roles.find(x => x.name == faction);
        }
    }

    return { role };
}

export default FactionParamsParser;
