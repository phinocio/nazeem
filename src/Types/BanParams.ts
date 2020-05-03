import { UserResolvable } from 'discord.js';

type BanParams = {
    member: UserResolvable | undefined;
    reason: string | undefined;
};

export default BanParams;
