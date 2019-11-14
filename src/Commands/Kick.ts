import Command from './Command';
import { Message } from 'discord.js';

class Kick extends Command {
    constructor() {
        super();
    }

    public async handle(msg: Message, params: string): Promise<void> {
        const member = msg.mentions.members.first();
        let reason = '';

        if (!msg.member.hasPermission('KICK_MEMBERS')) {
            await this.respond(
                msg,
                {
                    message: "You don't have permission to kick people!"
                },
                'send'
            );
            return;
        }

        if (!member) {
            await this.respond(
                msg,
                { message: 'you need to tag a user in order to kick them!' },
                'reply'
            );
            return;
        }

        if (!member.kickable) {
            await this.respond(
                msg,
                {
                    message: member.user.username + ' is not kickable.'
                },
                'send'
            );
            return;
        }

        try {
            if (params) {
                // Get rid of the first param, as it is the user to kick.
                params = params.replace(String(member), '').trim();
                reason = params || 'unspecified';
            }

            await member.send(
                `You have been kicked from **${msg.guild.name}** for: ${reason}`
            );

            await this.respond(
                msg,
                {
                    message: `**${member.user.username}** *has been kicked for:*  ${reason}`
                },
                'send'
            );

            await member.kick();
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
            console.log('Error from kick command: ' + e.message);
        }
    }
}

export default Kick;
