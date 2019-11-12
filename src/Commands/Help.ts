import { Message, RichEmbed } from 'discord.js';
import Command from './Command';
import CommandList from './CommandList';
import { bot } from '../../config.json';

class Help extends Command {
    constructor() {
        super();
    }

    public async handle(msg: Message): Promise<void> {
        // do things
        const commands = new CommandList().getCommands();

        this.respond(msg, commands);
    }

    private respond(msg: Message, data: object): void {
        const embed = new RichEmbed();
        embed.setAuthor(`${bot.name} Help Menu`, bot.avatar);
        embed.setThumbnail(bot.avatar);
        embed.setColor(0x00ae86);

        for (const key in data) {
            embed.addField(key, data[key].description);
        }

        embed.setFooter('Type !help {command} for specific command info.');

        msg.channel.send(embed);
    }
}

export default Help;
