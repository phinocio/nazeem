import { GuildMember } from 'discord.js';

type BanParams = {
    member: GuildMember | undefined;
    reason: string | undefined;
};

export default BanParams;
