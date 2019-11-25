import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import UnbanParams from '../Types/UnbanParams';
import UnbanParamsParser from '../Parsers/UnbanParamsParser';

class Unban implements Command<UnbanParams> {
    identifier: string;
    parser: (src: Message, identifier: string) => UnbanParams;
    description: string;

    constructor() {
        this.identifier = 'Unban';
        this.parser = UnbanParamsParser;
        this.description = 'Unban a user.';
    }

    public async handle(msg: Message, params: UnbanParams): Promise<void> {
        const { bannedID, reason } = params;
        if (!msg.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
            await this.respond(
                msg,
                {
                    message: "You don't have permission to unban people!"
                },
                'send'
            );
            return;
        }

        if (!msg.guild.me.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
            await this.respond(
                msg,
                {
                    message: "I don't have permission to unban people!"
                },
                'send'
            );
            return;
        }

        if (!bannedID) {
            await this.respond(
                msg,
                {
                    message: 'Please enter a user ID to unban!'
                },
                'send'
            );
            return;
        }

        const bannedMember = await msg.client.fetchUser(bannedID);
        const banned: boolean = await msg.guild.fetchBans().then(bans => {
            const users = bans.filter(r => r === bannedMember);
            if (!users.first()) {
                return Promise.resolve(false);
            } else {
                return Promise.resolve(true);
            }
        });

        if (!banned) {
            await this.respond(
                msg,
                {
                    message: `${bannedMember.tag} is not banned!`
                },
                'send'
            );
            return;
        }

        try {
            await msg.guild.unban(bannedMember, reason);

            await bannedMember.send(
                `You have been unbanned from **${msg.guild.name}** for: ${reason}`
            );

            await this.respond(
                msg,
                {
                    message: `**${bannedMember.tag}** has been unbanned for: ${reason}`
                },
                'send'
            );
        } catch (e) {
            await msg.channel.send('Error: ' + e.message);
        }
    }

    protected async respond(
        msg: Message,
        data: object,
        type: string
    ): Promise<void> {
        try {
            switch (type) {
                case 'send':
                    await msg.channel.send(data['message']);
                    break;
                case 'reply':
                    await msg.reply(data['message']);
                    break;
            }
        } catch (e) {
            console.error(`${this.identifier} response error: ${e.message}`);
        }
    }
}

export default Unban;
