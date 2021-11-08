import Discord, { ClientUser } from 'discord.js';
import { auth } from '../config.json';
import EventHandler from './Handlers/EventHandler';
import AutoYeet from './Cron/AutoYeet';
import RedditFeed from './Cron/RedditFeed';
import cron from 'node-cron';

// bot
class Bot {
	private TOKEN = '';
	private client: Discord.Client;
	private eventHandler: EventHandler | undefined;

	public constructor() {
		this.TOKEN = auth.token;

		this.client = new Discord.Client();

		this.client.on('ready', () => this.ready(this.client.user));
	}

	public async login(): Promise<void> {
		try {
			await this.client.login(this.TOKEN);
			this.eventHandler = new EventHandler(this.client);
			this.eventHandler.handle();
		} catch (err: any) {
			console.error(`Error: ${err.message}`);
		}
	}

	private ready(user: ClientUser | null): void {
		if (user) {
			console.log(`Logged in as ${user.tag}!`);
			user.setActivity('Cloud District 9', {
				type: 'WATCHING'
			});

			// Start Cron tasks.
			const Yeet = new AutoYeet(this.client);
			cron.schedule('0 0 * * *', () => {
				Yeet.yeet();
			});
			RedditFeed.run();
		} else {
			// TODO: Channel log
			console.error('Something went wrong. User is Null');
		}
	}
}

export default Bot;
