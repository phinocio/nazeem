import KickParams from '../Types/KickParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

async function KickParamsParser(
    src: Message,
    identifier: string
): Promise<KickParams> {
    let member = undefined;

    if (src.mentions.members && src.mentions.members.size != 0) {
        member = src.mentions.members.first();
    } else {
        const memberId = src.content.split(' ')[1];
        if (memberId) {
            try {
                member = await src.guild?.members.fetch(memberId);
            } catch (e) {
                // TODO: Channel log
                console.log(e.message, 'ID: ', memberId);
            }
        }
    }

    let reason = undefined;

    const cut = src.content
        .slice(message.prefix.length + identifier.length)
        .trim();

    if (cut.indexOf(' ') > 0) {
        reason = cut.slice(cut.indexOf(' ')).trim();
    }

    if (!reason) {
        reason = 'unspecified';
    }

    return { member, reason };
}

export default KickParamsParser;
