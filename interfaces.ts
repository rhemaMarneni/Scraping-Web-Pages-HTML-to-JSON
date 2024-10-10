
/**
 * defines all the interfaces used to store the scraped data
 * Jobs, launchposts and some social media links maybe missing in few YC pages, so they are filled only when data is present
 */

export interface Company {
    name: string;
    founded: number;
    teamSize: number;
    location: string;
    officialWebsite: string;
    yCombinatorURL: string;
    founders: Founders[];
    jobs?: Jobs[];
    socialMedia?: SocialMedia;
    launchPost?: LaunchPost[];
}

export interface Founders {
    founderName: string;
    founderTitle: string;
    founderLinkedinUrl: string;
    founderTwitterUrl: string;
}

export interface Jobs{
    role: string;
    location: string;
    applyUrl?: string;
    jobType?: string;
    salaryRange?: string;
    minExperience?: string;
}

export interface SocialMedia {
    companyLinkedinUrl?: string;
    companyTwitterUrl?: string;
    companyFacebookUrl?: string;
}

export interface LaunchPost {
    launchPostUrl: string;
    launchPostTitle: string;
}