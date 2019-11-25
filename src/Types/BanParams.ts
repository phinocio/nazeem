import { GuildMember } from 'discord.js';

type BanParams = {
    member: GuildMember;
    reason: string | undefined;
};

export default BanParams;
