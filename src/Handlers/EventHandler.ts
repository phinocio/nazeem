import { Client } from 'discord.js';
import MemberJoin from '../Events/MemberJoin';
import MessageHandler from '../Handlers/MessageHandler';

class EventHandler {
    private client: Client;
    private memberJoin: MemberJoin;
    private msgHandler: MessageHandler;

    public constructor(client: Client) {
        this.client = client;
        this.memberJoin = new MemberJoin();
        this.msgHandler = new MessageHandler();
    }

    public async handle(): Promise<void> {
        this.client.on('guildMemberAdd', member => {
            this.memberJoin.handle(member);
        });

        this.client.on('message', msg => {
            this.msgHandler.handle(msg);
        });
    }
}

export default EventHandler;
