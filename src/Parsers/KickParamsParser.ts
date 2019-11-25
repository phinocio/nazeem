import KickParams from '../Types/KickParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function KickParamsParser(src: Message, identifier: string): KickParams {
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

export default KickParamsParser;
