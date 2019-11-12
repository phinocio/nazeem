import { Message } from 'discord.js';
import Command from './Command';
import { channels, roles } from '../../config.json';

class Agree extends Command {
    constructor() {
        super();
    }

    public handle(msg: Message): void {
        // if message = !agree and channel = abandoned prison && member has role = Prisoner
        if (
            msg.channel.id === channels.gatekeep &&
            msg.member.roles.has(roles.Prisoner)
        ) {
            msg.member.removeRole(roles.Prisoner);
            msg.delete();
        }

        // No response.
    }
}

export default Agree;
