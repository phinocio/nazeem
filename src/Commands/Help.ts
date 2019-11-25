import { Message, RichEmbed } from 'discord.js';
import CommandList from './CommandList';
import { bot } from '../../config.json';
import Command from '../Interfaces/Command';
import HelpParams from '../Types/HelpParams';
import HelpParamsParser from '../Parsers/HelpParamsParser';

class Help implements Command<HelpParams> {
    identifier: string;
    parser: (src: Message, identifier: string) => HelpParams | undefined;
    description: string;
    constructor() {
        this.identifier = 'Help';
        this.parser = HelpParamsParser;
        this.description = 'Get help on commands.';
    }
    public async handle(msg: Message, param: HelpParams): Promise<void> {
        // do things
        const commands = new CommandList().getCommands();
        if (param) {
            //return this.respondCommand(msg, commandsparam.command);
        }

        return this.respond(msg, commands);
    }

    protected async respond(msg: Message, data: object): Promise<void> {
        const embed = new RichEmbed();
        embed.setAuthor(`${bot.name} Help Menu`, bot.avatar);
        embed.setThumbnail(bot.avatar);
        embed.setColor(0x00ae86);

        for (const key in data) {
            embed.addField(data[key].identifier, data[key].description);
        }

        embed.setFooter('Type !help {command} for specific command info.');

        try {
            await msg.channel.send(embed);
        } catch (e) {
            console.error('Error from help command: ' + e.message);
        }
    }

    // private async respondCommand(
    //     msg: Message,
    //     data: object,
    //     command: string
    // ): Promise<void> {
    //     if (data) {
    //         const embed = new RichEmbed();
    //         embed.setAuthor(`${bot.name} Help Menu`, bot.avatar);
    //         embed.setThumbnail(bot.avatar);
    //         embed.setColor(0x00ae86);
    //         embed.setTitle(
    //             `${command[0].toUpperCase() + command.slice(1)} help.`
    //         );

    //         embed.addField('Description', data['description']);
    //         embed.addField('Usage', data['usage']);

    //         embed.setFooter('Type !help {command} for specific command info.');

    //         try {
    //             await msg.channel.send(embed);
    //         } catch (e) {
    //             console.error('Error from help command: ' + e.message);
    //         }
    //     }
    // }
}

export default Help;
