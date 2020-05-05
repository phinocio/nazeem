import { MessageEmbed, Presence, TextChannel } from 'discord.js';
import { channels } from '../../config.json';

class TwitchNotify {
    public async handle(presence: Presence): Promise<void> {
        const channel = presence.guild?.channels.cache.find(
            (ch) => ch.id == channels.twitchNotify
        ) as TextChannel;

        const stream = presence.activities.find((activity) => {
            console.log(activity.details?.toLowerCase());
            return activity.details?.toLowerCase().includes('ultimate skyrim');
        });

        console.log(stream);

        if (presence.user && stream) {
            console.log('making embed');
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
