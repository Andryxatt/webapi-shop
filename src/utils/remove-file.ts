/* eslint-disable prettier/prettier */
import * as fs from "fs";
export async function removeFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
