import * as fs from 'node:fs/promises';

(async () => {
  const CREATE_FILE = 'Create a file';
  const DELETE_FILE = 'Delete the file';
  const RENAME_FILE = 'Rename the file';
  const APPEND_TO_FILE = 'Append to file';

  const createFile = async (filePath) => {
    try {
      const existingFileHandler = await fs.open(filePath, 'r');
      existingFileHandler.close();
      console.log(`The file ${filePath} already exists`);
    } catch (err) {
      const newFileHandler = await fs.open(filePath, 'w');
      console.log('The new file created successfully');
      newFileHandler.close();
    }
  };

  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath);
      console.log(`The file ${filePath} deleted successfully`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`The file ${filePath} does not exist`);
      } else {
        console.log(`${err.message}`);
      }
    }
  };

  const renameFile = async (oldFilePath, newFilePath) => {
    try {
      await fs.rename(oldFilePath, newFilePath);
      console.log(`The file renamed from ${oldFilePath} to ${newFilePath} successfully`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log("The file to be renamed doesn't exist");
      } else {
        console.log(`${err.message}`);
      }
    }
  };

  let appendedData = '';
  const appendToFile = async (filePath, dataToAppend) => {
    if (appendedData === dataToAppend) return;
    try {
      const fileHandler = await fs.open(filePath, 'a');
      fileHandler.write(dataToAppend);
      appendedData = dataToAppend;
      console.log(`The data appended to file ${filePath} successfully`);
      fileHandler.close();
    } catch (error) {
      console.log(`Error appending data to file ${filePath}`);
    }
  };

  // All <FileHandle> objects are <EventEmitter>s.
  const commandFileHandle = await fs.open('./commands.txt', 'r');
  const watcher = fs.watch('./commands.txt');

  commandFileHandle.on('change', async () => {
    const fileStats = await commandFileHandle.stat();
    const size = fileStats.size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    // Since the buffer is already allocated, we can directly call fileHandler.read() without assigning it to a variable.
    await commandFileHandle.read(buff, offset, length, position);
    const command = buff.toString('utf-8'); // Default -> utf-8

    console.log(command);

    // Command format: "Create a file <file-path>"
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      await createFile(filePath);
    }

    // Command format: "Delete the file <file-path>"
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      await deleteFile(filePath);
    }

    // Command format: "Rename the file <old-file-path> to <new-file-path>"
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx).trim();
      const newFilePath = command.substring(_idx + 4).trim();
      await renameFile(oldFilePath, newFilePath);
    }

    // Command format: "Append to file <file-path> this content: <data-to-append>"
    if (command.includes(APPEND_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(APPEND_TO_FILE.length + 1, _idx).trim();
      const dataToAppend = command.substring(_idx + 15);
      await appendToFile(filePath, dataToAppend);
    }
  });

  for await (const evt of watcher) {
    if (evt.eventType === 'change') {
      commandFileHandle.emit('change');
    }
  }
})();
