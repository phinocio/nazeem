import { Message, Role } from 'discord.js';
import { channels, factions } from '../../config.json';
import Command from '../Interfaces/Command';
import FactionParams from '../Types/FactionParams';
import FactionParamsParser from '../Parsers/FactionParamsParser';

class Faction implements Command<FactionParams> {
    identifier: string;
    description: string;
    numMsg: number;
    parser: (src: Message, identifier: string) => FactionParams;
    constructor() {
        this.identifier = 'Faction';
        this.description = 'Select a faction to join.';
        this.parser = FactionParamsParser;
    }

    public async handle(msg: Message, param: FactionParams): Promise<void> {
        const { role } = param;
        this.numMsg = 1;

        // Used to bulk delete messages after the command to keep the channel clean.

        if (msg.channel.id != channels.enlist) {
            // do nothing
            return;
        }

        if (role == undefined) {
            await this.respond(msg, {
                message: 'Please enter a faction to join'
            });
            this.numMsg++;
        } else if (role == 'remove') {
            await this.removeRoles(msg);
            await this.respond(msg, {
                message: 'You have been removed from your faction'
            });
            this.numMsg++;
        } else if (typeof role != 'string' && msg.member.roles.has(role.id)) {
            await this.respond(msg, {
                message: 'You already belong to ' + role.name
            });
            this.numMsg++;
        } else if (typeof role != 'string' && !msg.member.roles.has(role.id)) {
            this.enlistUser(msg, role);
        } else {
            await this.respond(msg, {
                message:
                    "Something went wrong and I don't know what. contact @Phinocio."
            });
            this.numMsg++;
        }

        setTimeout(() => {
            msg.channel.bulkDelete(this.numMsg);
        }, 2000);
    }

    protected async respond(msg: Message, data: object): Promise<void> {
        try {
            await msg.channel.send(data['message']);
        } catch (e) {
            console.error(`${this.identifier} response error: ${e.message}`);
        }
    }

    protected async removeRoles(msg: Message): Promise<void> {
        try {
            for (const faction in factions) {
                if (msg.member.roles.has(factions[faction])) {
                    await msg.member.removeRole(factions[faction]);
                }
            }
        } catch (e) {
            await this.respond(msg, { message: e.message });
        }
    }

    protected async enlistUser(msg: Message, role: Role): Promise<void> {
        try {
            // Remove role.
            await this.removeRoles(msg);
            await msg.member.addRole(role);
            await this.respond(msg, {
                message: 'You have been added to ' + role.name
            });
            this.numMsg++;
        } catch (e) {
            await this.respond(msg, { message: e.message });
        }
    }
}

export default Faction;
