const {
	SlashCommandBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
	ComponentType,
} = require("discord.js");
const { factions } = require("../../../config.json");

module.exports = {
	data: new SlashCommandBuilder().setName("faction").setDescription("Choose a faction to join."),

	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const select = new StringSelectMenuBuilder()
			.setCustomId("faction")
			.setPlaceholder("Choose a faction to join.")
			.addOptions(await buildOptions());

		const row = new ActionRowBuilder().addComponents(select);

		const response = await interaction.reply({
			content: "Choose your Faction",
			components: [row],
			ephemeral: true,
		});

		const collector = response.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			time: 60_000,
		});

		collector.on("collect", async (i) => {
			await i.reply({ content: "Working on it...", ephemeral: true });
			const selection = i.values[0];
			const role = await interaction.guild.roles.fetch(selection);

			// A user is only able to join one faction at a time, so we
			// remove all the faction roles first instead of trying
			// to do a ton of if checks.
			await removeRoles(member);
			await member.roles.add(role);

			await i.editReply({ content: `${i.user}, you have joined the faction!`, ephemeral: true });
		});
	},
};

async function removeRoles(member) {
	for (const faction in factions) {
		await member.roles.remove(factions[faction]);
	}
}

async function buildOptions() {
	let options = [];

	for (const faction in factions) {
		options.push(
			new StringSelectMenuOptionBuilder()
				.setLabel(faction)
				.setDescription(`Join the ${faction} faction.`)
				.setValue(factions[faction])
		);
	}

	return options;
}
