import UnbanParams from '../Types/UnbanParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function UnbanParamsParser(src: Message): UnbanParams {
    const bannedID = src.content
        .replace(message.prefix + 'unban', '')
        .trim()
        .split(' ')[0]
        .trim();

    let reason = src.content
        .replace(message.prefix + 'unban', '')
        .replace(String(bannedID), '')
        .trim();

    if (!reason) {
        reason = 'unspecified';
    }
    return { bannedID, reason };
}

export default UnbanParamsParser;
