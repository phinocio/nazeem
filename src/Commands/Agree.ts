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
                msg.member.removeRole(roles.Prisoner);
                msg.delete();
            } catch (e) {
                console.log(e.message);
            }
        }

        // No response.
    }
}

export default Agree;
