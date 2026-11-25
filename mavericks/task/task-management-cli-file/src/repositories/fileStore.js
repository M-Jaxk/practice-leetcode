import fs from "node:fs";
import path from "node:path";

export class FileStore {
  constructor(filePath, label) {
    this.filePath = filePath;
    this.label = label;
  }

  read() {
    if (!fs.existsSync(this.filePath)) {
      return { nextId: 1, items: [] };
    }

    try {
      return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    } catch {
      throw new Error(`Stored ${this.label} data is corrupted`);
    }
  }

  write(data) {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
