const { Events, PermissionsBitField } = require("discord.js");

const { checkIfBot } = require("../moderation/checkBot");
const { channels, webhooks, apiUrl } = require("../../config.json");

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (!message.author.bot) {
			checkIfBot(message);
			if (message.channel.id === channels.announcements) {
				updateApi();
			}

			if (
				(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||
					!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) &&
				message.channel.id === channels.prison
			) {
				message.delete();
			}
		}
	},
};

async function updateApi() {
	try {
		let data = {
			embeds: [
				{
					title: "Launcher Patreon API",
					description: `Message in announcements detected... updating Patreon API caches...`,
				},
			],
		};

		await fetch(webhooks.apiUpdate, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const response = await fetch(apiUrl, {
			method: "PATCH",
		});
		const resp = await response.json();

		data = {
			embeds: [
				{
					title: "Launcher Patreon API",
					description: `${resp.message}`,
				},
			],
		};

		await fetch(webhooks.apiUpdate, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	} catch (e) {
		await fetch(webhooks.apiUpdate, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				embeds: [
					{
						title: "Launcher Patreon API",
						description: `Something went wrong, ${e.message}`,
					},
				],
			}),
		});
	}
}
