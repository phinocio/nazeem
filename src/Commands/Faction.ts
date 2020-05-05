import { Message, Role } from 'discord.js';
import { channels, factions } from '../../config.json';
import Command from '../Interfaces/Command';
import FactionParams from '../Types/FactionParams';
import FactionParamsParser from '../Parsers/FactionParamsParser';

class Faction implements Command<FactionParams> {
    public identifier: string;
    public parser: (src: Message, identifier: string) => FactionParams;
    public description: string;
    public usage: string;
    private numMsg: number;

    constructor() {
        this.identifier = 'Faction';
        this.parser = FactionParamsParser;
        this.description = 'Select a faction to join.';
        this.usage = '!faction <remove | factionName>';
    }

    public async handle(msg: Message, param: FactionParams): Promise<void> {
        const { role } = param;
        console.log(role);
        this.numMsg = 1;

        // Used to bulk delete messages after the command to keep the channel clean.

        if (msg.channel.id !== channels.enlist) {
            // do nothing
            return;
        }

        if (!msg.member) {
            return;
        }

        if (role == undefined) {
            await this.respond(
                msg,
                {
                    message: 'Please enter a faction to join'
                },
                'send'
            );
            this.numMsg++;
        } else if (role == 'remove') {
            await this.removeRoles(msg);
            await this.respond(
                msg,
                {
                    message: 'You have been removed from your faction'
                },
                'send'
            );
            this.numMsg++;
        } else if (
            typeof role != 'string' &&
            msg.member.roles.cache.get(role.id)
        ) {
            await this.respond(
                msg,
                {
                    message: 'You already belong to ' + role.name
                },
                'send'
            );
            this.numMsg++;
        } else if (
            typeof role != 'string' &&
            !msg.member.roles.cache.get(role.id)
        ) {
            this.enlistUser(msg, role);
        } else {
            await this.respond(
                msg,
                {
                    message:
                        "Something went wrong and I don't know what. contact @Phinocio."
                },
                'send'
            );
            this.numMsg++;
        }

        setTimeout(() => {
            msg.channel.bulkDelete(this.numMsg);
        }, 2000);
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

    protected async removeRoles(msg: Message): Promise<void> {
        try {
            for (const faction in factions) {
                if (
                    msg.member &&
                    msg.member.roles.cache.get(factions[faction])
                ) {
                    await msg.member.roles.remove(factions[faction]);
                }
            }
        } catch (e) {
            // TODO: Channel log
            console.log('Faction remove error:', e.message);
        }
    }

    protected async enlistUser(msg: Message, role: Role): Promise<void> {
        try {
            // Remove role.
            await this.removeRoles(msg);
            await msg.member?.roles.add(role);
            await this.respond(
                msg,
                {
                    message: 'You have been added to ' + role.name
                },
                'send'
            );
            this.numMsg++;
        } catch (e) {
            // TODO: Channel log
            console.log('Faction add error:', e.message);
        }
    }
}

export default Faction;
