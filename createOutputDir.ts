/**
 * Helper function to create a directory - specifically out/
 * To make sure we get right results, any existing out/ directory is deleted and then recreated to store results of the latest run
 * @param {string} directory - The path of the directory to create.
 */

import fs from 'fs';

//function to create necessary directories
export const createDirectory = (directory: string) => {
    //delete if required directory exists
    if (fs.existsSync(directory)) {
        fs.rmSync(directory, { recursive: true, force: true });
    }
    //create/recreate
    fs.mkdirSync(directory, { recursive: true });
};