import ClearParams from '../Types/ClearParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

function ClearParamsParser(src: Message, identifier: string): ClearParams {
    const amount = parseInt(
        src.content.slice(message.prefix.length + identifier.length)
    );
    return { amount };
}

export default ClearParamsParser;
