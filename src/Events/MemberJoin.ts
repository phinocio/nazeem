import { roles } from '../../config.json';
import { GuildMember } from 'discord.js';

class MemberJoin {
    public async handle(member: GuildMember): Promise<void> {
        try {
            await member.addRole(roles.Prisoner);
        } catch (e) {
            console.error(e.message);
        }
    }
}

export default MemberJoin;
