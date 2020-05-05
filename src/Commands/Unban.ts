import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import UnbanParams from '../Types/UnbanParams';
import UnbanParamsParser from '../Parsers/UnbanParamsParser';

class Unban implements Command<UnbanParams> {
    public identifier: string;
    public parser: (src: Message, identifier: string) => Promise<UnbanParams>;
    public description: string;
    public usage: string;

    constructor() {
        this.identifier = 'Unban';
        this.parser = UnbanParamsParser;
        this.description = 'Unban a user with optional reason.';
        this.usage = '!uban <UserTag/UserID> <reason?>';
    }

    public async handle(msg: Message, params: UnbanParams): Promise<void> {
        const { member, reason } = await params;

        if (!member) {
            await this.respond(
                msg,
                {
                    message:
                        'you need to tag a user or provide a UserID in order to unban them, or the user is not banned!'
                },
                'reply'
            );

            return;
        }

        if (msg.member && !msg.member.hasPermission('BAN_MEMBERS')) {
            await this.respond(
                msg,
                { message: "You don't have permission to unban users!" },
                'send'
            );

            return;
        }

        try {
            await msg.guild?.members.unban(member, reason);
            await this.respond(
                msg,
                { message: `**${member.username}** has been unbanned` },
                'send'
            );
        } catch (error) {
            await this.respond(msg, { message: 'User is not banned' }, 'send');
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
