import HelpParams from '../Types/HelpParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function HelpParamsParser(src: Message, identifier: string): HelpParams {
    const command = src.content
        .slice(message.prefix.length + identifier.length)
        .trim()
        .split(' ')[0]
        .trim();
    return { command };
}

export default HelpParamsParser;
