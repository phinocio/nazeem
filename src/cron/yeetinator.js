const { guildId, webhooks, roles } = require("../../config.json");

exports.Yeetinator = class Yeetinator {
	constructor(client) {
		this.client = client;
	}

	async yeet() {
		const guild = await this.client.guilds.resolve(guildId);
		const prisoners = await guild.roles.resolve(roles.prisoner);

		let kicked = 0;

		if (prisoners.members) {
			prisoners.members.forEach((member) => {
				// 172800000 is the amount if milliseconds in 2 days. So we're checking if someone has been in the Guild for 2 days or more.
				if (member.kickable && Date.now() - member.joinedTimestamp > 172800000) {
					member.kick();
					kicked++;
				}
			});
		}

		const data = {
			embeds: [
				{
					title: "Yeetinator 9001",
					description: `${kicked} prisoners who can't read were kicked`,
					thumbnail: {
						url: "https://cdn.discordapp.com/emojis/689897969146789938.png?size=128",
					},
				},
			],
		};

		try {
			await fetch(webhooks.yeetinator, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		} catch (e) {
			console.log("auto yeet error: " + e.message);
		}
	}
};
