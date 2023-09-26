const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatepatreonapi")
		.setDescription("Refreshes the Patreon API that the launcher pulls from.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
		await interaction.reply("Refreshing API...");

		const r = await fetch("https://ultsky.phinocio.com/api/patreon/update", {
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
