import Bot from './Bot';
import RedditFeed from './Cron/RedditFeed';

const bot = new Bot();
bot.login();

// Temporary logging of unhandled rejections
process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});

// Start Cron tasks.
RedditFeed.run();
