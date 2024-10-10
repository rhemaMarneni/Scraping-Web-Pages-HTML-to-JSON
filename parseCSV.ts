import fs from 'fs';
import csv from 'csv-parser';

/**
 * Helper function to parse CSV file to extract URLs from the specified column.
 * Reads the file line by line, retrieves the 'YC URL' field, and returns an array of URLs.
 *
 * @param {string} filePath - The path to the CSV file to be parsed.
 * @returns {Promise<string[]>} - A promise that resolves with an array of URLs extracted from the CSV.
 */


export const parseCSV = (filePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const urls: string[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                if (row['YC URL']) { // Adjust this key according to your CSV header
                    urls.push(row['YC URL'].trim());
                }
            })
            .on('end', () => {
                resolve(urls); // Resolve the promise with the list of URLs
            })
            .on('error', (error) => {
                reject(error); // Reject the promise on error
            });
    });
};