const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const { apiUrl } = require("../../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatepatreonapi")
		.setDescription("Refreshes the Patreon API that the launcher pulls from.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
		await interaction.reply("Refreshing API...");

		const r = await fetch(apiUrl, {
			method: "PATCH",
		});
		const data = await r.json();

		if (data.status == 200) {
			await interaction.editReply("Successfully refreshed API!");
		} else {
			await interaction.editReply(`Refreshing failed! ${JSON.stringify(data)}`);
		}
	},
};
