import { Message } from 'discord.js';

abstract class Command {
    public abstract handle(msg: Message, params?: string): void;
}

export default Command;
