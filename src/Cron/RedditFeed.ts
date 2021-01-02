import cron from 'node-cron';
import fetch from 'node-fetch';
import md5 from 'crypto-js/md5';
import { redditFeed } from '../../config.json';

class RedditFeed {
	private task: cron.ScheduledTask;
	private newestPost: string;
	constructor() {
		this.task = cron.schedule(redditFeed.frequency, this.getNewPosts);
	}

	private async getNewPosts(): Promise<void> {
		const url = `https://www.reddit.com/r/${redditFeed.subreddit}/new.json`;

		console.log('getting new posts time:', Date.now());

		const response = await fetch(url);
		const newPosts = await response.json();

		const postHash = md5(
			newPosts.data.children[0].data.title +
				newPosts.data.children[0].data.author +
				newPosts.data.children[0].data.created_utc
		).toString();

		if (this.newestPost != postHash) {
			this.newestPost = postHash;
			console.log('Sending new post...');
			let data;

			if (newPosts.data.children[0].data.is_self) {
				data = {
					embeds: [
						{
							author: {
								name: `New self-post from ${newPosts.data.children[0].data.author}`,
								url: newPosts.data.children[0].data.url
							},
							title: newPosts.data.children[0].data.title,
							url: newPosts.data.children[0].data.url,
							description:
								newPosts.data.children[0].data.selftext.slice(
									0,
									200
								) + '...',
							thumbnail: {
								url:
									'https://cdn.discordapp.com/attachments/793579025762353192/794714986043408424/iu.png'
							},
							fields: [
								{
									name: 'Author',
									value: `/u/${newPosts.data.children[0].data.author}`,
									inline: 'true'
								},
								{
									name: 'Content Warning',
									value: newPosts.data.children[0].data
										.over_18
										? '18+'
										: 'None',
									inline: 'true'
								}
							]
						}
					]
				};
			} else {
				data = {
					content: 'test!',
					embeds: [
						{
							author: {
								name: `New media post from ${newPosts.data.children[0].data.author}`,
								url: newPosts.data.children[0].data.url
							},
							title: newPosts.data.children[0].data.title,
							url: newPosts.data.children[0].data.url,
							thumbnail: {
								url: newPosts.data.children[0].data.thumbnail
							},
							fields: [
								{
									name: 'Author',
									value: `/u/${newPosts.data.children[0].data.author}`,
									inline: 'true'
								},
								{
									name: 'Content Warning',
									value: newPosts.data.children[0].data
										.over_18
										? '18+'
										: 'None',
									inline: 'true'
								}
							]
						}
					]
				};
			}

			try {
				await fetch(redditFeed.webhook, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
				console.log('sent!');
			} catch (e) {
				console.log(e.message);
			}
		} else {
			console.log('already sent post!');
		}
	}

	public run(): void {
		this.task.start();
	}
}

export default new RedditFeed();
