/**
 * Key module to scrape required company data
 * Processes a dataset of JSON files that contain HTML content and extracts relevant company data.
 * loads the HTML with Cheerio
 * Reads all files in the specified directory, parses the HTML, and retrieves information about companies,
 * including their founders, job postings, social media links, and launch posts.
 * Refer './interfaces.ts' to understand what data is being collected
 */

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { Company, Founders, Jobs, SocialMedia, LaunchPost } from './interfaces';

/**
 * @param {string} storagePath - Path to the folder containing the JSON files to process.
 * @returns {Promise<Company[]>} - A promise that resolves to an array of Company objects with extracted data.
 */

export const processDataset = async (storagePath: string): Promise<Company[]> => {
  try{
    // Read all JSON files from the storage folder (each file has "url": "..." and "html": "..." fields)
    const files: string[] = fs.readdirSync(storagePath);
    const companies: Company[] = [];
    // Process each file
    await Promise.all(files.map(async (file: string) => {
      const filePath: string = path.join(storagePath, file);
      // Read and parse each JSON file
      const jsonData: { url: string, html: string } = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      // Extract the 'html' part from the JSON
      const htmlContent: string = jsonData.html;
      const ycURL: string = jsonData.url;

      if (htmlContent) {
          // Load the HTML into Cheerio
          const $ = cheerio.load(htmlContent);
          // Extract the 'data-page' attribute
          // Cheerio can work with static content only, but YC webpages have dynamic content which made it harder to parse through the HTML
          // So this code targets rhe 'data-page' tag to acquire data
          const dataPage: string | undefined = $('div[data-page]').attr('data-page');
          if (dataPage) {
              const companyData = JSON.parse(dataPage);
              //Fill in the interfaces
              //Company interface
              const company: Company = {
                name: companyData.props.company.name,
                founded: parseInt(companyData.props.company.year_founded,10),
                teamSize: companyData.props.company.team_size ? parseInt(companyData.props.company.team_size) : 0,
                location: companyData.props.company.location || '',
                officialWebsite: companyData.props.company.website || '',
                yCombinatorURL: ycURL,
                founders: companyData.props.company.founders.map((founder: any) => ({
                    founderName: founder.full_name,
                    founderLinkedinUrl: founder.linkedin_url,
                }))
              }

              //Look for founders data
              const foundersInfo: Founders[] = companyData.props.company.founders.map((founder: any) => {
                const founderData: any = {
                  founderName: founder.full_name,
                  founderLinkedinUrl: founder.linkedin_url,
                }
                if(founder.title){
                  founderData.founderTitle = founder.title;
                }
                if(founder.twitter_url){
                  founderData.founderTwitterurl = founder.twitter_url;
                }
                return founderData;
              });
              company.founders = foundersInfo;

              //Look for jobs data
              const jobs = companyData.props.jobPostings;
              if(jobs.length > 0){
                const jobsInfo: Jobs[] = companyData.props.jobPostings.map((job: any) => {
                  const jobData: any = {
                    role: job.title,
                    location: job.location,
                  };
                  if (job.apply_url){
                    jobData.applyUrl = job.apply_url;
                  }
                  if (job.type){
                    jobData.jobType = job.type;
                  }
                  if (job.salary_range){
                    jobData.salaryRange = job.salary_range;
                  }
                  if (job.min_experience){
                    jobData.minExperience = job.min_experience;
                  }
                  return jobData;
                });
                company.jobs = jobsInfo;
              }

              //Look for social media links
              const compLinkedinUrl: string =  companyData.props.company.linkedin_url;
              const compTwitterUrl: string =  companyData.props.company.twitter_url;
              const compFacebookUrl: string =  companyData.props.company.fb_url;

              if(compLinkedinUrl || compTwitterUrl || compFacebookUrl){
                const socialmedia: SocialMedia = {
                };
                if(companyData.props.company.linkedin_url){
                  socialmedia.companyLinkedinUrl = compLinkedinUrl;
                }
                if(companyData.props.company.twitter_url){
                  socialmedia.companyTwitterUrl = compTwitterUrl;
                }
                if(companyData.props.company.fb_url){
                  socialmedia.companyFacebookUrl = compFacebookUrl;
                }
                company.socialMedia = socialmedia;
              }

              //Look for launch posts
              const launchPostings = companyData.props.launches;
              if(launchPostings.length > 0){
                const launchPostingsInfo: LaunchPost[] = launchPostings.map((post: any) => ({
                    launchPostUrl: post.url,
                    launchPostTitle: post.title,
                }));
                company.launchPost = launchPostingsInfo;
              }

              companies.push(company);
          } else {
              console.log(`No 'data-page' attribute found in ${file}`);
          }
      } else {
          console.log(`No HTML found in ${file}`);
      }
  }));

  // Return the collected companies array
  return companies;

  } catch (error) {
    console.error('Error processing JSON files:', error);
    return [];
}
}