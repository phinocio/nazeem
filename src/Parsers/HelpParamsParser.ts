import HelpParams from '../Types/HelpParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';
import CommandRegistry from '../Commands/CommandRegistry';

function HelpParamsParser(src: Message, identifier: string): HelpParams {
    const param = src.content
        .slice(message.prefix.length + identifier.length)
        .trim()
        .split(' ')[0]
        .trim()
        .toLowerCase();

    const command = CommandRegistry.getInstance().get(param);

    return { command };
}

export default HelpParamsParser;
