import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import BanParams from '../Types/BanParams';
import BanParamsParser from '../Parsers/BanParamsParser';

class Ban implements Command<BanParams> {
    public identifier: string;
    public parser: (src: Message, identifier: string) => Promise<BanParams>;
    public description: string;
    public usage: string;

    constructor() {
        this.identifier = 'Ban';
        this.parser = BanParamsParser;
        this.description = 'Ban a user with optional reason.';
        this.usage = '!ban <UserTag/UserID> <reason>';
    }

    public async handle(msg: Message, params: BanParams): Promise<void> {
        const { member, reason } = await params;
        if (!member) {
            await this.respond(
                msg,
                {
                    message:
                        'you need to tag a user or provide a UserID in order to ban them!'
                },
                'reply'
            );

            return;
        }

        if (msg.member && !msg.member.hasPermission('BAN_MEMBERS')) {
            await this.respond(
                msg,
                { message: "You don't have permission to ban users!" },
                'send'
            );

            return;
        }

        if (!member.bannable) {
            await this.respond(
                msg,
                { message: `${member.user.username} is not bannable!` },
                'send'
            );

            return;
        }
        try {
            await member.send(
                `You have been banned from **${msg.guild?.name}** for: ${reason}`
            );
        } catch (e) {
            await msg.channel.send('Error: ' + e.message);
        }

        try {
            await this.respond(
                msg,
                {
                    message: `**${member.user.username}** has been banned for: ${reason}`
                },
                'send'
            );

            await member.ban({ reason });
        } catch (e) {
            await msg.channel.send('Error: ' + e.message);
        }

        console.log(reason);
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
