import { Message } from 'discord.js';
import Command from '../Interfaces/Command';
import Storage from '../Helpers/Storage';

class OptIn implements Command<undefined> {
    public identifier: string;
    public description: string;
    public usage: string;

    constructor() {
        this.identifier = 'OptIn';
        this.description =
            'Opt in having a (non-pinging) notification show up whenever you go live on Twitch streaming Ultimate Skyrim';
        this.usage = '!optin';
    }

    public async handle(msg: Message): Promise<void> {
        if (!msg.member) {
            //TODO: Channel log
            console.log('Message has no member. Error reee');
            return;
        }

        try {
            const data = await Storage.read('optins.json');
            console.log(data);
            await this.respond(msg, { message: 'opted in!' }, 'send');
        } catch (e) {
            console.log(e.message);
        }
    }

    protected async respond(
        msg: Message,
        data: object,
        type: string
    ): Promise<void> {
        try {
            switch (type) {
                case 'send':
                    await msg.channel.send(data['message']);
                    break;
                case 'reply':
                    await msg.reply(data['message']);
                    break;
            }
        } catch (e) {
            console.error(`${this.identifier} response error: ${e.message}`);
        }
    }
}

export default OptIn;
