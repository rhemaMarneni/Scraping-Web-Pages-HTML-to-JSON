# Scraping Web Pages: HTML to JSON

A web scraping tool: crawls a given list of Y Combinator ("YC") company urls, scrapes their public pages on the YC website and extract structured data about each.

Substitute with any input urls of your choice, you only need to change the file `processAllUrls.ts` based on the HTML data you are scraping (check browser's dev tools to understand structure)

<b>Input:</b> CSV file - List of company names and URLs from `inputs/companies.csv`.<br>
<b>Output:</b> JSON file of all the companies' data, stored in the `out/` folder.<br>
<b>Output path:</b> `out/scraped.json`

STEP 1: Given 50 urls of YC web pages, crawls all the web pages (using 'crawlee')<br>
STEP 2: For each page's HTML data, scrapes required HTML data (into pre-defined fields in interfaces) using 'cheerio'<br>
STEP 3: Compile all data into a JSON file<br>

## Tools

- TypeScript (version 5 or greater)
- Node (version 18 or greater)
- [Crawlee](https://crawlee.dev/) -> scraping library
  - Specifically using `CheerioCrawler`
- [Cheerio](https://cheerio.js.org/) (an HTML parsing library that uses jQuery's API)

## Data schema

Example template of data scraped in this project:

```ts
{
    name: "Fiber AI",
    founded: "2023",
    teamSize: 5,
    jobs: [
        {
            role: "Founding Full Stack Engineer",
            location: "New York, NY, US",
            // ...
        }
    ],
    founders: [
        {
            name: "Adi Agashe",
            linkedIn: "https://linkedin.com/in/adityaagashe",
            // ...
        }
    ],
    launchPosts: [
        {
            title: "🤝 Fiber AI - Drive revenue growth faster with AI-powered marketing automations",
            // ...
        }
    ],
    // ...
}
```

## Node.js modules to refer

- `crawlee`
- `cheerio`
- `fast-csv` or `papaparse`
- `fs/promises`
- `fs-extra`

## Recommended Documentation

[Crawlee's quickstart guide](https://crawlee.dev/docs/quick-start)<br>
[Cheerio crawler guide](https://crawlee.dev/docs/guides/cheerio-crawler-guide)<br>
This [jQuery cheatsheet](https://htmlcheatsheet.com/jquery/) may come in handy.

## Getting started

To get started, run these:

```sh
npm install
npm install --global tsx
```

## Running the code

To run your code, do:

```sh
tsx runner.ts
```

Since the input file is quite large, allow few minutes for the pipeline to finish processing
Feel free to make other `.ts` files for testing purposes; you can run them all with `tsx`.
You can also run `npx tsc` to ensure your code passes all the TypeScript compiler's checks.

<b><i>Courtesy: FiberAI</i></b>
