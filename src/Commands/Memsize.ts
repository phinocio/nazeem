import Command from '../Interfaces/Command';
import { Message } from 'discord.js';
import MemsizeParams from '../Types/MemsizeParams';
import MemsizeParamsParser from '../Parsers/MemsizeParamsParser';

class Memsize implements Command<MemsizeParams> {
    identifier: string;
    parser: (src: Message, identifier: string) => MemsizeParams;
    description: string;

    constructor() {
        this.identifier = 'Memsize';
        this.parser = MemsizeParamsParser;
        this.description = 'Calculate the memsize for enblocal.ini';
    }

    public async handle(msg: Message, params: MemsizeParams): Promise<void> {
        const { vram, ram } = params;

        if (vram && ram) {
            const memsize = (vram + ram - 2) * 1024;
            await this.respond(
                msg,
                { message: `your memsize is \`${memsize}\`` },
                'reply'
            );
        } else {
            await this.respond(
                msg,
                {
                    message:
                        'please enter in the format `!memsize <vramInGB> <ramInGB>`'
                },
                'reply'
            );
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

export default Memsize;
