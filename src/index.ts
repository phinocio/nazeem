import Discord from 'discord.js';
import Config from '../config.json';
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === 'Hi') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Do you get to the cloud district very often??');
    }
});

client.login(Config.auth.token);
