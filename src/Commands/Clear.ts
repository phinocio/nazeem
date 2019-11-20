import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import ClearParams from '../Types/ClearParams';
import ClearParamsParser from '../Parsers/ClearParamsParser';

class Clear implements Command<ClearParams> {
    identifier: string;
    description: string;
    parser: (src: Message) => ClearParams;
    constructor() {
        this.identifier = 'Clear';
        this.description =
            'Clear X number of messages. Amount includes the command itself.';
        this.parser = ClearParamsParser;
    }

    public async handle(msg: Message, param: ClearParams): Promise<void> {
        const { amount } = param;
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            await this.respond(msg, {
                message: 'You do not have permission to clear messages!'
            });
            return;
        }

        if (amount && amount > 0 && amount <= 100) {
            try {
                await msg.channel.bulkDelete(amount);
            } catch (e) {
                await this.respond(msg, { message: e.message });
            }
        } else {
            await await this.respond(msg, {
                message:
                    'Please enter an amount of messages to clear from 1-100 (inclusive)!'
            });
        }

        // No response.
    }

    protected async respond(msg: Message, data: object): Promise<void> {
        try {
            await msg.channel.send(data['message']);
        } catch (e) {
            console.error(`${this.identifier} response error: ${e.message}`);
        }
    }
}

export default Clear;
