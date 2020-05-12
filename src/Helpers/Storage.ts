import fs from 'fs';
import path from 'path';

abstract class Storage {
	// Relative to project root.
	public static path = 'storage';

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
		await fs.promises.writeFile(path.join(Storage.path, file), data);
	}

	public static async storeJSON(file: string, data: object): Promise<void> {
		console.log(typeof data);
		await fs.promises.writeFile(
			path.join(Storage.path, file),
			JSON.stringify(data)
		);
	}

	public static async delete(file: string): Promise<void> {
		await fs.promises.unlink(path.join(Storage.path, file));
	}
}

export default Storage;
