import { Message } from 'discord.js';

abstract class Command {
    public abstract async handle(msg: Message, params?: string): Promise<void>;

    protected abstract async respond(msg: Message, data: object): Promise<void>;
}

export default Command;
