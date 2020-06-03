import Command from '../Interfaces/Command';
import Agree from './Agree';
import Ask from './Ask';
import Ban from './Ban';
import Clear from './Clear';
import Faction from './Faction';
import Help from './Help';
import Kick from './Kick';
import Memsize from './Memsize';
import NotifyMe from './NotifyMe';
import OptIn from './OptIn';
import OptOut from './OptOut';
import Pins from './Pins';
import Unban from './Unban';

class CommandList {
	private commands: Array<Command<any>> = [
		new Agree(),
		new Ask(),
		new Ban(),
		new Clear(),
		new Faction(),
		new Help(),
		new Kick(),
		new Memsize(),
		new NotifyMe(),
		new OptIn(),
		new OptOut(),
		new Pins(),
		new Unban()
	];

	public getCommands(): Array<Command<any>> {
		return this.commands;
	}
}

export default CommandList;
