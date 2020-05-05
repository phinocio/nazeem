import Discord, { ClientUser } from 'discord.js';
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

        this.client.on('ready', () => this.ready(this.client.user));
    }

    public async login(): Promise<void> {
        try {
            await this.client.login(this.TOKEN);
            this.eventHandler = new EventHandler(this.client);
            this.eventHandler.handle();
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    }

    private ready(user: ClientUser | null): void {
        if (user) {
            console.log(`Logged in as ${user.tag}!`);
            user.setActivity('Cloud District 9', {
                type: 'WATCHING'
            });
        } else {
            // TODO: Channel log
            console.error('Something went wrong. User is Null');
        }
    }
}

export default Bot;
