import { Message } from 'discord.js';
import Command from './Command';
import { channels, roles } from '../../config.json';

class Agree extends Command {
    constructor() {
        super();
    }

    public async handle(msg: Message): Promise<void> {
        // if message = !agree and channel = abandoned prison && member has role = Prisoner
        if (
            msg.channel.id === channels.gatekeep &&
            msg.member.roles.has(roles.Prisoner)
        ) {
            try {
                await msg.member.removeRole(roles.Prisoner);
                await msg.delete();
            } catch (e) {
                this.respond(msg, e.message);
            }
        }

        // No response.
    }

    protected async respond(msg: Message, data: string): Promise<void> {
        try {
            await msg.channel.send(data);
        } catch (e) {
            console.error('Agree response error: ' + e.message);
        }
    }
}

export default Agree;
