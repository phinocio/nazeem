import Discord from 'discord.js';
import { auth, roles } from '../config.json';
import MessageHandler from './Handlers/MessageHandler';

// bot
class Bot {
    private TOKEN = '';
    private client: Discord.Client;
    private msgHandler: MessageHandler | undefined;

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
        this.client.user.setActivity('!h or !help');

        this.msgHandler = new MessageHandler(this.client);
        this.msgHandler.handle();

        this.client.on('guildMemberAdd', member => {
            member.addRole(roles.Prisoner);
        });
    }
}

export default Bot;
