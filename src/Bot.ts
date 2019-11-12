import Discord from 'discord.js';
import { auth } from '../config.json';
import EventHandler from './Handlers/EventHandler';

// bot
class Bot {
    private TOKEN = '';
    private client: Discord.Client;
    private eventHandler: EventHandler | undefined;

    public constructor() {
        this.TOKEN = auth.token;

        this.client = new Discord.Client();

        this.client.on('ready', () => this.ready());
    }

    public async login(): Promise<void> {
        try {
            await this.client.login(this.TOKEN);
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    }

    private ready(): void {
        console.log(`Logged in as ${this.client.user.tag}!`);
        this.client.user.setActivity('Cloud District 9', { type: 'WATCHING' });

        this.eventHandler = new EventHandler(this.client);
        this.eventHandler.handle();
    }
}

export default Bot;
