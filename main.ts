/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {CSV_INPUT_PATH, JSON_OUTPUT_PATH} from './resources';
import {createDirectory} from './createOutputDir';
import {readCsvAndCrawl} from './crawlInput';
import {processDataset} from './processAllUrls';

/**
 * Main function to process a list of companies by crawling URLs from a CSV file,
 * scraping required data, and saving the data to a JSON file.
 * @returns {Promise<void>} - A promise that resolves when the process is complete.
 */

export async function processCompanyList() {
  const storagePath: string = './storage/datasets/default/';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputFileDirectory: string = path.join(__dirname, '/out');
  const outputFilePath: string = path.join(__dirname, JSON_OUTPUT_PATH);

  //Crawl all URLs in the CSV file and store page data
  readCsvAndCrawl(CSV_INPUT_PATH);

  //Scrape required data
  //To understand what kind of data is being collected refer '/interfaces.js'
  const companies = await processDataset(storagePath);

  //create output directory to save json data
  createDirectory(outputFileDirectory);

  // Write the collected company data to the JSON file
  fs.writeFileSync(outputFilePath, JSON.stringify(companies, null, 2), 'utf8');
  console.log('Data successfully written to', outputFilePath);
}