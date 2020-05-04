import UnbanParams from '../Types/UnbanParams';
import { Message } from 'discord.js';
import { message } from '../../config.json';

async function UnbanParamsParser(
    src: Message,
    identifier: string
): Promise<UnbanParams> {
    let member = undefined;
    let user = undefined;

    if (src.mentions.members && src.mentions.members.size != 0) {
        user = src.mentions.members.first();
    } else {
        user = src.content.split(' ')[1];
    }

    if (user) {
        try {
            member = (await src.guild?.fetchBan(user))?.user;
        } catch (e) {
            // TODO: Channel log
            console.log(e.message, 'ID: ', user);
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

export default UnbanParamsParser;
