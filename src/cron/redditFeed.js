const { webhooks, subreddit } = require("../../config.json");
const Storage = require("../helpers/storage");
const { execSync } = require("node:child_process");
const md5 = require("crypto-js/md5");

exports.RedditFeed = class RedditFeed {
	async getNewPosts() {
		const url = `https://www.reddit.com/r/${subreddit}/new.json`;

		let newPosts = undefined;

		const cmd = `curl -S ${url}`;
		const resp = execSync(cmd, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
		});

		newPosts = JSON.parse(resp);

		// const response = await fetch(url, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
		// 	},
		// });
		// console.log(response);

		this.newestPost = await Storage.readTxt("redditfeed.txt");

		const postHash = md5(
			newPosts.data.children[0].data.title +
				newPosts.data.children[0].data.author +
				newPosts.data.children[0].data.created_utc
		).toString();

		if (this.newestPost != postHash) {
			// It's a new post, so overwrite the hash in the file.
			await Storage.store("redditfeed.txt", postHash);
			let data;

			if (newPosts.data.children[0].data.is_self) {
				data = {
					embeds: [
						{
							author: {
								name: `New self-post from ${newPosts.data.children[0].data.author}`,
								url: newPosts.data.children[0].data.url,
							},
							title: newPosts.data.children[0].data.title,
							url: newPosts.data.children[0].data.url,
							description: newPosts.data.children[0].data.selftext.slice(0, 200) + "...",
							// thumbnail: {
							// 	url: "https://discord.com/assets/b83feaf9d8a57b2f3534.svg",
							// },
							fields: [
								{
									name: "Author",
									value: `/u/${newPosts.data.children[0].data.author}`,
									inline: "true",
								},
								{
									name: "Content Warning",
									value: newPosts.data.children[0].data.over_18 ? "18+" : "None",
									inline: "true",
								},
							],
						},
					],
				};
			} else {
				data = {
					embeds: [
						{
							author: {
								name: `New media post from ${newPosts.data.children[0].data.author}`,
								url: `https://reddit.com${newPosts.data.children[0].data.permalink}`,
							},
							title: newPosts.data.children[0].data.title,
							url: newPosts.data.children[0].data.url,
							thumbnail: {
								url: "https://i.imgur.com/sdO8tAw.png",
							},
							fields: [
								{
									name: "Author",
									value: `/u/${newPosts.data.children[0].data.author}`,
									inline: "true",
								},
								{
									name: "Content Warning",
									value: newPosts.data.children[0].data.over_18 ? "18+" : "None",
									inline: "true",
								},
							],
						},
					],
				};
			}

			try {
				await fetch(webhooks.redditFeed, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
			} catch (e) {
				console.log("reddit feed error: " + e.message);
			}
		}
	}
};
