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
		this.client.on('error', (error) => {
			console.error(
				'The websocket connection encountered an error:',
				error
			);
		});

		this.client.on('guildMemberAdd', (member) => {
			this.memberJoin.handle(member);
		});

		this.client.on('message', (msg) => {
			// Ensure bot doesn't respond to PM commands/messages.
			if (msg.guild !== null) {
				this.msgHandler.handle(msg);
			}
		});
	}
}

export default EventHandler;
