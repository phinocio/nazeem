import { GuildMember } from 'discord.js';

type UnbanParams = {
    member: GuildMember | string | undefined;
    reason: string | undefined;
};

export default UnbanParams;
