import Discord, { ClientUser } from 'discord.js';
import { auth } from '../config.json';
import EventHandler from './Handlers/EventHandler';

// bot
class Bot {
    private TOKEN = '';
    private client: Discord.Client;
    private eventHandler: EventHandler | undefined;
    private loggedIn = false;

    public constructor() {
        this.TOKEN = auth.token;

        this.client = new Discord.Client();

        this.client.once('ready', () => this.ready(this.client.user));

        this.client.on('error', (error) => {
            console.error(
                'The websocket connection encountered an error:',
                error
            );
        });

        process.on('unhandledRejection', (error) => {
            console.error('Unhandled promise rejection:', error);
        });
    }

    public async login(): Promise<void> {
        if (!this.loggedIn) {
            try {
                await this.client.login(this.TOKEN);
                this.loggedIn = true;
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        } else {
            console.log('Bot is already logged in.');
        }
    }

    private ready(user: ClientUser | null): void {
        if (user) {
            console.log(`Logged in as ${user.tag}!`);
            user.setActivity('Cloud District 9', {
                type: 'WATCHING'
            });

            this.eventHandler = new EventHandler(this.client);
            this.eventHandler.handle();
        } else {
            // TODO: Channel log
            console.error('Something went wrong. User is Null');
        }
    }
}

export default Bot;
