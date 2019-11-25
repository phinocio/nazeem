import { Message } from 'discord.js';

interface Command<T> {
    readonly identifier: string;
    readonly parser?: (src: Message) => T | Promise<T> | undefined;
    handle(msg: Message, params?: T): Promise<void>;
}

export default Command;
