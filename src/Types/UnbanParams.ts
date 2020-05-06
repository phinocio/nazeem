import { User } from 'discord.js';

type UnbanParams = {
	member: User | undefined;
	reason: string | undefined;
};

export default UnbanParams;
