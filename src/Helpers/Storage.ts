import fs from 'fs';
import path from 'path';

abstract class Storage {
    // Relative to project root.
    private static path = 'storage';

    public static async read(file: string): Promise<string> {
        const data = await fs.promises.readFile(path.join(Storage.path, file));
        return JSON.parse(data.toString());
    }

    public static async store(file: string, data: object): Promise<void> {
        await fs.promises.writeFile(
            path.join(Storage.path, file),
            JSON.stringify(data)
        );
    }
}

export default Storage;
