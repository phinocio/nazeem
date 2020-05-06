import { roles } from '../../config.json';
import { GuildMember, PartialGuildMember } from 'discord.js';

class MemberJoin {
	public async handle(
		member: GuildMember | PartialGuildMember
	): Promise<void> {
		try {
			await member.roles.add(roles.Prisoner);
		} catch (e) {
			// TODO: Implement a channel log
			console.error(e.message);
		}
	}
}

export default MemberJoin;
