import cron from 'node-cron';
import fetch from 'node-fetch';
import md5 from 'crypto-js/md5';
import { redditFeed } from '../../config.json';
import Storage from '../Helpers/Storage';

class RedditFeed {
	private task: cron.ScheduledTask;
	private newestPost: string;
	constructor() {
		this.task = cron.schedule(redditFeed.frequency, this.getNewPosts);
	}

	private async getNewPosts(): Promise<void> {
		const url = `https://www.reddit.com/r/${redditFeed.subreddit}/new.json`;

		const response = await fetch(url);
		const newPosts = await response.json();

		this.newestPost = await Storage.readTxt('redditfeed.txt');

		const postHash = md5(
			newPosts.data.children[0].data.title +
				newPosts.data.children[0].data.author +
				newPosts.data.children[0].data.created_utc
		).toString();

		if (this.newestPost != postHash) {
			// It's a new post, so overwrite the hash in the file.
			await Storage.store('redditfeed.txt', postHash);
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
								url: 'https://i.imgur.com/sdO8tAw.png'
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
					embeds: [
						{
							author: {
								name: `New media post from ${newPosts.data.children[0].data.author}`,
								url: `https://reddit.com${newPosts.data.children[0].data.permalink}`
							},
							title: newPosts.data.children[0].data.title,
							url: newPosts.data.children[0].data.url,
							thumbnail: {
								url: 'https://i.imgur.com/sdO8tAw.png'
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
			} catch (e: any) {
				console.log('reddit feed error: ' + e.message);
			}
		}
	}

	public run(): void {
		this.task.start();
	}
}

export default new RedditFeed();
