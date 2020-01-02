import { Message } from 'discord.js';
import { channels, roles } from '../../config.json';
import Command from '../Interfaces/Command';

class Agree implements Command<undefined> {
    identifier: string;
    description: string;
    constructor() {
        this.identifier = 'Agree';
        this.description =
            'Agree to server rules and remove Prisoner role, granting access to channels.';
    }

    public async handle(msg: Message): Promise<void> {
        if (
            msg.channel.id === channels.gatekeep &&
            msg.member.roles.has(roles.Prisoner)
        ) {
            try {
                await msg.member.removeRole(roles.Prisoner);
                await msg.channel.send('Welcome to the server!');
            } catch (e) {
                this.respond(msg, { message: e.message });
            }
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

export default Agree;
