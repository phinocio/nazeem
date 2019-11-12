import { roles } from '../../config.json';
import { GuildMember } from 'discord.js';

class MemberJoin {
    public handle(member: GuildMember): void {
        member.addRole(roles.Prisoner);
    }
}

export default MemberJoin;
