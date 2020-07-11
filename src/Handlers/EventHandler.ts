import { Client } from 'discord.js';
import MemberJoin from '../Events/MemberJoin';
import TwitchNotify from '../Events/TwitchNotify';
import MessageHandler from '../Handlers/MessageHandler';

class EventHandler {
	private client: Client;
	private memberJoin: MemberJoin;
	private twitchNotify: TwitchNotify;
	private msgHandler: MessageHandler;

	public constructor(client: Client) {
		this.client = client;
		this.memberJoin = new MemberJoin();
		this.twitchNotify = new TwitchNotify();
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

		this.client.on('presenceUpdate', async (oldPresence, newPresence) => {
			// Check if the oldPresence had a streaming activity.
			console.log('presence update!');
			const oldStream = oldPresence?.activities.some(
				(activity) => activity.type === 'STREAMING'
			);

			// Check if the oldPresence has a streaming activity.
			const newStream = newPresence?.activities.some(
				(activity) => activity.type === 'STREAMING'
			);

			// Only show notification if old presence didn't have a streaming activity and new one does.
			if (!oldStream && newStream) {
				this.twitchNotify.handle(newPresence);
			}
		});
	}
}

export default EventHandler;
