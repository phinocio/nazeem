import BanParams from '../Types/BanParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function BanParamsParser(src: Message): BanParams {
    const member = src.mentions.members.first();
    let reason = src.content
        .replace(message.prefix + 'ban', '')
        .replace(String(member), '')
        .trim();
    if (!reason) {
        reason = 'unspecified';
    }
    return { member, reason };
}

export default BanParamsParser;
