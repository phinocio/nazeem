const { SlashCommandBuilder } = require("discord.js");
const { roles } = require("../../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("agree")
		.setDescription("Removes Prisoner role as the user agrees to the rules."),

	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.user.id);

		if (member.roles.cache.some((role) => role.id == roles.prisoner)) {
			const role = await interaction.guild.roles.fetch(roles.prisoner);
			await member.roles.remove(role);
			await interaction.reply({ content: "Thanks for agreeing, enjoy the server!", ephemeral: true });
		} else {
			await interaction.reply({ content: "You already agreed to the rules!", ephemeral: true });
		}
	},
};
