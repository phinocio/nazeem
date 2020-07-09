import { MessageEmbed, Presence, TextChannel } from 'discord.js';
import { channels } from '../../config.json';
import Storage from '../Helpers/Storage';

class TwitchNotify {
	public async handle(presence: Presence): Promise<void> {
		const optIns = await Storage.read('opt-ins.json');

		if (
			(presence.member && !optIns.has(presence.member.id)) ||
			!presence.member
		) {
			return;
		}

		const channel = presence.guild?.channels.cache.find(
			(ch) => ch.id == channels.twitchNotify
		) as TextChannel;

		const stream = presence.activities.find((activity) => {
			return (
				activity.type === 'STREAMING' &&
				(activity.details?.toLowerCase().includes('ultimate skyrim') ||
					activity.details?.toLowerCase().includes('ultsky'))
			);
		});

		if (presence.user && stream) {
			const embed = new MessageEmbed();
			embed.setTitle(`${stream.details}`);
			embed.setURL(`${stream.url}`);
			embed.addField('Game', stream.state);
			embed.setImage(`${stream.assets?.largeImageURL()}`);
			embed.setColor('#DB243A');

			try {
				await channel.send(
					`${presence.user.username} is now streaming at ${stream.url} check it out!`,
					embed
				);
			} catch (e) {
				// TODO: Implement a channel log
				console.error(e.message);
			}
		}
	}
}

export default TwitchNotify;
