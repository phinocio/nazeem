import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import BanParams from '../Types/BanParams';
import BanParamsParser from '../Parsers/BanParamsParser';

class Ban implements Command<BanParams> {
    identifier: string;
    parser: (src: Message, identifier: string) => BanParams;
    description: string;

    constructor() {
        this.identifier = 'Ban';
        this.parser = BanParamsParser;
        this.description = 'Ban a user with optional reason.';
    }

    public async handle(msg: Message, params: BanParams): Promise<void> {
        const { member, reason } = params;
        if (!msg.member.hasPermission('BAN_MEMBERS', true, true)) {
            await this.respond(
                msg,
                {
                    message: "You don't have permission to ban people!"
                },
                'send'
            );
            return;
        }

        if (!member) {
            await this.respond(
                msg,
                { message: 'you need to tag a user in order to ban them!' },
                'reply'
            );
            return;
        }

        if (!member.bannable) {
            await this.respond(
                msg,
                {
                    message: `${member.user.username} is not bannable.`
                },
                'send'
            );
            return;
        }

        try {
            await member.send(
                `You have been banned from **${msg.guild.name}** for: ${reason}`
            );

            await this.respond(
                msg,
                {
                    message: `**${member.user.username}** has been banned for: ${reason}`
                },
                'send'
            );

            await member.ban(reason);
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

export default Ban;
