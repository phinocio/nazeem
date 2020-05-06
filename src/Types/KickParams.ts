import { GuildMember } from 'discord.js';

type KickParams = {
	member: GuildMember | undefined;
	reason: string | undefined;
};

export default KickParams;
