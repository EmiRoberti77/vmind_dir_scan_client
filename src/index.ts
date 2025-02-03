import { FileSysScanHandler, FS_TYPE, FSEvent } from "vmind_dir_scan";
import path from "path";
import { workerData } from "worker_threads";

async function main() {
  let files = 0;
  let folders = 0;
  let errors = 0;
  const fileSystemScanner = new FileSysScanHandler("/Users/user/code");
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

  fileSystemScanner
    .scanIterative(10, {
      age: 10000,
      mode: "seconds",
    })
    .then((success) => {
      console.log("filesCount:", files);
      console.log("dirCount:", folders);
      console.log("errCount:", errors);
    });
}

main()
  .then((success) => {
    console.log(success);
  })
  .catch((err) => console.log(err));
