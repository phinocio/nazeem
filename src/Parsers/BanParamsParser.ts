import BanParams from '../Types/BanParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function BanParamsParser(src: Message, identifier: string): BanParams {
    const member = src.mentions.members.first();
    let reason = src.content
        .slice(message.prefix.length + identifier.length)
        .replace(String(member), '')
        .trim();
    if (!reason) {
        reason = 'unspecified';
    }
    return { member, reason };
}

export default BanParamsParser;
