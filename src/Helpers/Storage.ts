import fs from 'fs';
import path from 'path';

abstract class Storage {
	// Relative to project root.
	private static path = 'storage';

	public static async read(file: string): Promise<Set<unknown>> {
		let data = new Set();
		try {
			const parse = JSON.parse(
				await fs.promises.readFile(
					path.join(Storage.path, file),
					'utf8'
				)
			);
			data = new Set(parse);
		} catch (e) {
			// File doesn't exist.
			console.log(e.message);
		} finally {
			return data;
		}
	}

	public static async store(file: string, data: object): Promise<void> {
		await fs.promises.writeFile(
			path.join(Storage.path, file),
			JSON.stringify(data)
		);
	}
}

export default Storage;
