const { Events } = require("discord.js");
const { roles } = require("../../config.json");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const role = await interaction.guild.roles.fetch(roles.prisoner);
		await member.roles.add(role);
	},
};
