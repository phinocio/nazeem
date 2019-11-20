import KickParams from '../Types/KickParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function KickParamsParser(src: Message): KickParams {
    const member = src.mentions.members.first();
    const reason = src.content
        .replace(message.prefix + 'kick', '')
        .replace(String(member), '')
        .trim();
    return { member, reason };
}

export default KickParamsParser;
