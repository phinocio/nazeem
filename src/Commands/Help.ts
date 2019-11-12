import { Message, RichEmbed } from 'discord.js';
import Command from './Command';
import CommandList from './CommandList';
import { bot } from '../../config.json';

class Help extends Command {
    constructor() {
        super();
    }

    public async handle(msg: Message, params?: string): Promise<void> {
        // do things
        const commands = new CommandList().getCommands();

        if (params) {
            // Only respond to 1 param.
            const param = params.split(' ')[0];
            return this.respondCommand(msg, param, commands[param]);
        }

        return this.respond(msg, commands);
    }

    private async respond(msg: Message, data: object): Promise<void> {
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

    private async respondCommand(
        msg: Message,
        command: string,
        data: object
    ): Promise<void> {
        if (data) {
            const embed = new RichEmbed();
            embed.setAuthor(`${bot.name} Help Menu`, bot.avatar);
            embed.setThumbnail(bot.avatar);
            embed.setColor(0x00ae86);
            embed.setTitle(
                `${command[0].toUpperCase() + command.slice(1)} help.`
            );

            embed.addField('Description', data['description']);
            embed.addField('Usage', data['usage']);

            embed.setFooter('Type !help {command} for specific command info.');

            msg.channel.send(embed);
        }
    }
}

export default Help;
