import UnbanParams from '../Types/UnbanParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function UnbanParamsParser(src: Message, identifier: string): UnbanParams {
    const bannedID = src.content
        .slice(message.prefix.length + identifier.length)
        .trim()
        .split(' ')[0]
        .trim();

    let reason = src.content
        .slice(message.prefix.length + identifier.length)
        .replace(String(bannedID), '')
        .trim();

    if (!reason) {
        reason = 'unspecified';
    }
    return { bannedID, reason };
}

export default UnbanParamsParser;
