/**
 * Reads a CSV file to extract URLs and initiates a crawling process for those URLs.
 */

import { parseCSV } from './parseCSV';
import {crawlUrls} from './combinator-crawler/src/main';

/**
 * @param {string} filePath - The path to the CSV file containing URLs.
 * @returns {Promise<void>} - A promise that resolves when the crawling is complete.
 */

export const readCsvAndCrawl = async (filePath: string) => {
    try {
        // Get the list of URLs from the CSV
        const urls = await parseCSV(filePath);
        await crawlUrls(urls);
        // Further processing of crawledHtmls if needed
    } catch (error) {
        console.error('Error reading CSV or crawling URLs:', error);
    }
};