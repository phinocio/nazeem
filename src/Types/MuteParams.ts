import { GuildMember } from 'discord.js';

type MuteParams = {
	member: GuildMember | undefined;
	reason: string | undefined;
};

export default MuteParams;
