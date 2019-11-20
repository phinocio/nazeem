import { GuildMember } from 'discord.js';

type KickParams = {
    member: GuildMember;
    reason: string | undefined;
};

export default KickParams;
