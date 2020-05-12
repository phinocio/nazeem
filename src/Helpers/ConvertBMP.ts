import { MessageAttachment } from 'discord.js';
import { exec } from 'child_process';
import Storage from './Storage';
import path from 'path';

class ConvertBMP {
	public static async convert(
		attachment: MessageAttachment
	): Promise<string> {
		const newName = 'bmpBad.jpg';

		exec(
			// Requires imagemagick to be installed.
			`convert ${attachment.url} ./storage/${newName}`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`BMP Converted. stdout: ${stdout}`);
			}
		);

		return path.join(Storage.path, newName);
	}
}
export default ConvertBMP;
