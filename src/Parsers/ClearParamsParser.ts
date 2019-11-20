import ClearParams from '../Types/ClearParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function ClearParamsParser(src: Message): ClearParams {
    const amount = parseInt(src.content.replace(message.prefix + 'clear', ''));
    return { amount };
}

export default ClearParamsParser;
