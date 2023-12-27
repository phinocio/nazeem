const fs = require("fs");
const path = require("path");

module.exports = class Storage {
	// Relative to project root.
	static path = "storage";

	static async read(file) {
		let data = new Set();
		try {
			const parse = JSON.parse(await fs.promises.readFile(path.join(Storage.path, file), "utf8"));
			data = new Set(parse);
		} catch (e) {
			// File doesn't exist.
			console.log(e.message);
		} finally {
			return data;
		}
	}

	static async readTxt(file) {
		let data = "";
		try {
			data = await fs.promises.readFile(path.join(Storage.path, file), "utf8");
		} catch (e) {
			// File doesn't exist.
			console.log(e.message);
		} finally {
			return data;
		}
	}

	static async store(file, data) {
		await fs.promises.writeFile(path.join(Storage.path, file), data);
	}

	static async storeJSON(file, data) {
		await fs.promises.writeFile(path.join(Storage.path, file), JSON.stringify(data));
	}

	static async delete(file) {
		await fs.promises.unlink(path.join(Storage.path, file));
	}
};
