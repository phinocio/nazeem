import Bot from './Bot';

const bot = new Bot();
bot.login();

// Temporary logging of unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});
