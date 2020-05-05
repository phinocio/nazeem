import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import ClearParams from '../Types/ClearParams';
import ClearParamsParser from '../Parsers/ClearParamsParser';

class Clear implements Command<ClearParams> {
    public identifier: string;
    public parser: (src: Message, identifier: string) => ClearParams;
    public description: string;
    public usage: string;

    constructor() {
        this.identifier = 'Clear';
        this.parser = ClearParamsParser;
        this.description =
            'Clear X number of messages. Excludes the command itself.';
        this.usage = '!clear <numMsgToClear>';
    }

    public async handle(msg: Message, param: ClearParams): Promise<void> {
        const { amount } = param;

        // This *should* never happen, but gets rid of TS error, and more safe than msg.member && in next if
        if (!msg.member) {
            await this.respond(
                msg,
                {
                    message: 'Something went wrong. msg.member is falsy.'
                },
                'send'
            );
            return;
        }

        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            await this.respond(
                msg,
                {
                    message: 'you do not have permission to clear messages!'
                },
                'reply'
            );
            return;
        }

        if (amount && amount > 0 && amount <= 100) {
            try {
                await msg.delete();
                await msg.channel.bulkDelete(amount);
            } catch (e) {
                await this.respond(msg, { message: e.message }, 'send');
            }
        } else {
            await this.respond(
                msg,
                {
                    message:
                        'Please enter an amount of messages to clear from 1-100 (inclusive)!'
                },
                'send'
            );
        }

        // No response.
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

export default Clear;
