import { Message, MessageEmbed } from 'discord.js';
import { bot, modRoles } from '../../config.json';
import Command from '../Interfaces/Command';
import CommandList from '../Commands/CommandList';
import HelpParams from '../Types/HelpParams';
import HelpParamsParser from '../Parsers/HelpParamsParser';

class Help implements Command<HelpParams> {
	public identifier: string;
	public parser: (src: Message, identifier: string) => HelpParams | undefined;
	public description: string;
	public usage: string;
	public isUserCommand = true;

	constructor() {
		this.identifier = 'Help';
		this.parser = HelpParamsParser;
		this.description = 'Get help on commands.';
		this.usage = '!help <command?>';
	}
	public async handle(msg: Message, param: HelpParams): Promise<void> {
		// do things
		const { command } = param;

		if (!command) {
			return this.generalHelp(msg);
		} else {
			return this.commandHelp(msg, command);
		}
	}

	protected async generalHelp(msg: Message): Promise<void> {
		if (!msg.member) {
			return await this.respond(
				msg,
				{
					message: 'Somehow there is no msg.member. Let Phin know.'
				},
				'send'
			);
		}

		const embed = new MessageEmbed();
		embed.setThumbnail(bot.avatar);
		embed.setColor(0x00ae86);

		let commands = new CommandList().getCommands();

		let isMod;

		for (const role of modRoles) {
			if (!isMod) {
				isMod = msg.member?.roles.cache.has(role);
			}
		}

		if (isMod || msg.member.hasPermission('ADMINISTRATOR')) {
			commands = commands.filter((commands) => !commands.isUserCommand);
			embed.setAuthor(`${bot.name} Admin Commands`, bot.avatar);
		} else {
			commands = commands.filter((commands) => commands.isUserCommand);
			embed.setAuthor(`${bot.name} User Commands`, bot.avatar);
		}

		for (const command of commands) {
			embed.addField(command.identifier, command.description);
		}
		embed.setFooter(`Type ${this.usage} for specific command info.`);
		try {
			await this.respond(msg, { message: embed }, 'embed');
		} catch (e) {
			console.error('Error from help command: ' + e.message);
		}
	}

	protected async commandHelp(
		msg: Message,
		command: Command<any>
	): Promise<void> {
		if (!msg.member) {
			return await this.respond(
				msg,
				{
					message: 'Somehow there is no msg.member. Let Phin know.'
				},
				'send'
			);
		}

		let isMod;

		for (const role of modRoles) {
			if (!isMod) {
				isMod = msg.member?.roles.cache.has(role);
			}
		}

		if (
			!isMod &&
			!msg.member.hasPermission('ADMINISTRATOR') &&
			!command.isUserCommand
		) {
			return await this.respond(
				msg,
				{
					message: " you don't have access to that command."
				},
				'reply'
			);
		}

		const embed = new MessageEmbed();
		embed.setAuthor(`${command.identifier} Help Menu`, bot.avatar);
		embed.setThumbnail(bot.avatar);
		embed.setColor('#00ae86');
		embed.setDescription(command.description);
		embed.addField('Usage', command.usage);
		embed.setFooter(
			"A `?` in a command param means it's optional. For example <name?> would be an optional param."
		);

		try {
			await this.respond(msg, { message: embed }, 'send');
		} catch (e) {
			console.error('Error from help command: ' + e.message);
		}
	}

	protected async respond(
		msg: Message,
		data: Record<string, string | MessageEmbed>,
		type: string
	): Promise<void> {
		try {
			switch (type) {
				case 'send':
					await msg.channel.send(data['message']);
					break;
				case 'embed':
					await msg.channel.send(data['message']);
					break;
				case 'reply':
					await msg.reply(data['message']);
					break;
			}
		} catch (e) {
			console.error(`${this.identifier} response error: ${e.message}`);
		}
	}
}

export default Help;
