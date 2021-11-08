import Discord from 'discord.js';
import cron from 'node-cron';
import fetch from 'node-fetch';
import { roles, autoYeet } from '../../config.json';

class AutoYeet {
	private task: cron.ScheduledTask;
	private client: Discord.Client;
	constructor(client: Discord.Client) {
		this.client = client;
	}

	async yeet(): Promise<void> {
		// get all members with prisoner role
		const guild = await this.client.guilds.fetch(autoYeet.guild);
		const prisoners = await guild.roles.fetch(roles.Prisoner);
		let kicked = 0;

		if (prisoners?.members) {
			prisoners.members.forEach((member: any) => {
				// 604800000 is the amount if milliseconds in a week. So we're checking if someone has been in the Guild for a week or more.
				if (
					member.kickable &&
					Date.now() - member?.joinedTimestamp > 604800000
				) {
					member.kick();
					kicked++;
				}
			});
		}

		const data = {
			embeds: [
				{
					title: 'Yeetinator 1000',
					description: `${kicked} Prisoners who can't read were kicked`,
					thumbnail: {
						url: 'https://cdn.discordapp.com/emojis/689897969146789938.png?size=128'
					}
				}
			]
		};

		try {
			await fetch(autoYeet.webhook, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} catch (e: any) {
			console.log('auto yeet error: ' + e.message);
		}
	}

	public setup(): void {
		this.task = cron.schedule(autoYeet.frequency, this.yeet);
	}

	public run(): void {
		this.task.start();
	}
}

export default AutoYeet;
