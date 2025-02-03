# File System Scanner - README

## Overview

The **File System Scanner** is a high-performance directory scanner built using `vmind_dir_scan`. It iterates through a file system, identifying files and directories while allowing filtering based on file age. This is particularly useful for retention management and monitoring large file structures efficiently.

## Features

- **Scans directories iteratively** with configurable worker threads.
- **Filters files based on age** (in seconds or days).
- **Handles errors gracefully** and logs issues encountered.
- **Emits events** for discovered files, directories, and errors.

## Installation

Ensure you have `vmind_dir_scan` installed in your project:

```sh
npm install vmind_dir_scan
```

## Usage

The following example demonstrates how to initialize and use the scanner:

### **1. Import Dependencies**

```typescript
import { FileSysScanHandler, FS_TYPE, FSEvent } from "vmind_dir_scan";
import path from "path";
import { workerData } from "worker_threads";
```

### **2. Initialize the Scanner**

```typescript
const fileSystemScanner = new FileSysScanHandler("/Users/user/code");
```

### **3. Register Event Listeners**

```typescript
let files = 0;
let folders = 0;
let errors = 0;

fileSystemScanner.addListener(FS_TYPE.FILE, (event: FSEvent) => {
  console.log(event);
  files += 1;
});

fileSystemScanner.addListener(FS_TYPE.DIR, (event: FSEvent) => {
  console.log(event);
  folders += 1;
});

fileSystemScanner.addListener(FS_TYPE.ERROR, (event: string) => {
  console.log(event);
  errors += 1;
});
```

### **4. Start Scanning with Filtering**

```typescript
fileSystemScanner
  .scanIterative(10, {
    age: 10000, // Scan files older than 10,000 seconds
    mode: "seconds",
  })
  .then(() => {
    console.log("filesCount:", files);
    console.log("dirCount:", folders);
    console.log("errCount:", errors);
  });
```

### **5. Run the Script**

```typescript
async function main() {
  await fileSystemScanner.scanIterative(10, { age: 10000, mode: "seconds" });
}

main()
  .then(() => console.log("Scan completed successfully."))
  .catch((err) => console.log("Error:", err));
```

## Configuration Options

| Parameter     | Description                                        |
| ------------- | -------------------------------------------------- |
| `workerCount` | Number of concurrent workers scanning directories. |
| `age`         | Filters files based on age (in seconds or days).   |
| `mode`        | Specifies time mode: "seconds" or "days".          |

## Expected Output

```
{ name: 'example.txt', path: '/Users/user/code/example.txt', type: 'file', ageInSeconds: 15000 }
filesCount: 12345
dirCount: 567
totalErrors: 0
```

## Error Handling

- The scanner emits an `FS_TYPE.ERROR` event if it encounters issues accessing files or directories.
- Error messages are logged to the console.

## Performance Considerations

- Using more workers (`workerCount > 10`) may improve performance for large directories.
- Filtering by age reduces the number of files processed, improving efficiency.

## Summary

This **File System Scanner** efficiently scans large directories, emitting structured events for files, directories, and errors. It provides configurable filtering and multi-threaded scanning, making it ideal for retention management, monitoring, and automation tasks.

Emi Roberti
