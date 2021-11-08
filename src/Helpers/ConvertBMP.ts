import { MessageAttachment } from 'discord.js';
import { exec } from 'child_process';
import Storage from './Storage';
import path from 'path';
import fetch from 'node-fetch';
import util from 'util';

class ConvertBMP {
	public static async convert(
		attachment: MessageAttachment
	): Promise<string> {
		if (!attachment.name) {
			return 'fail';
		}
		const execPromise = util.promisify(exec);
		const newName = 'bmpBad.jpg';

		try {
			const bmp = await fetch(attachment.url);
			await Storage.store(attachment.name, await bmp.buffer());

			await execPromise(
				// Requires imagemagick to be installed.
				`convert ./storage/${attachment.name} ./storage/${newName}`
			);
		} catch (e: any) {
			console.log(e.message);
		}

		return path.join(Storage.path, newName);
	}
}
export default ConvertBMP;
