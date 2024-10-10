/**
 * Crawls a list of URLs, extracts the HTML content, and stores it in a Dataset.
 * Uses CheerioCrawler to fetch and parse the content of each page.
 *
 * @param {string[]} urls - An array of URLs to be crawled.
 * @returns {Promise<void>} - A promise that resolves once all URLs are crawled.
 */

import { CheerioCrawler, Dataset } from 'crawlee';

export const crawlUrls = async (urls: string[]): Promise<void> => {
    const crawler = new CheerioCrawler({
        // maxRequestsPerCrawl: 50,
        async requestHandler({ request, $ }) {
            try {
                const crawledHtml = $('body').html(); // Get the entire HTML of the page
                // console.log(`Crawled ${request.loadedUrl}`); // Log the URL

                // Push crawled data to Dataset
                await Dataset.pushData({
                    url: request.loadedUrl,
                    html: crawledHtml,
                });
            } catch (error) {
                console.error(`Error processing ${request.loadedUrl}:`, error);
            }
        },
        failedRequestHandler({ request }) {
            console.error(`Request ${request.loadedUrl} failed. Reason: ${request.errorMessages}`);
        },
    });

    // Add all requests to the crawler
    await crawler.addRequests(urls.map(url => ({ url })));
    await crawler.run(); // Run the crawler
    console.log(`Crawled all URLs`);
};

