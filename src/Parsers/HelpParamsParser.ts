import HelpParams from '../Types/HelpParams';
import { Message } from 'discord.js';

function HelpParamsParser(src: Message): HelpParams {
    const command = src.content.replace('!help ', '').split(' ')[0];
    return { command };
}

export default HelpParamsParser;
