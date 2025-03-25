const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function fetchNews() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox']
    });

    const headlines = {
        ET: {},
        Hindu: {},
        HT: {},
        TOI: {},
        covid: {}
    };

    try {
        const page = await browser.newPage();
        
        // Fetch Economic Times news
        await fetchEconomicTimes(page, headlines);
        
        // Fetch The Hindu news
        await fetchTheHindu(page, headlines);
        
        // Fetch Hindustan Times news
        await fetchHindustanTimes(page, headlines);
        
        // Fetch Times of India news
        await fetchTimesOfIndia(page, headlines);
        
        // Fetch COVID data
        await fetchCovidData(page, headlines);

        // Save the data
        const outputPath = path.join(__dirname, '../data/newsData.json');
        fs.writeFileSync(outputPath, JSON.stringify(headlines, null, 2));
        console.log('News data fetched and saved successfully!');

    } catch (error) {
        console.error('Error fetching news:', error);
    } finally {
        await browser.close();
    }
}

async function fetchEconomicTimes(page, headlines) {
    await page.goto('https://economictimes.indiatimes.com/');
    await page.waitForSelector('.latestTopstry.flt');
    
    const news = await page.evaluate(() => {
        const articles = document.querySelectorAll('.latestTopstry.flt');
        return Array.from(articles, (article, i) => ({
            [i]: article.getAttribute('alt')
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    });
    
    headlines.ET = { ...news };
}

async function fetchTheHindu(page, headlines) {
    await page.goto('https://www.thehindu.com/');
    await page.waitForSelector('.story-card-news h3, .story-card-news h2');
    
    const news = await page.evaluate(() => {
        const articles = document.querySelectorAll('.story-card-news h3, .story-card-news h2');
        return Array.from(articles, (article, i) => ({
            [i]: article.textContent.trim()
        })).slice(0, 7).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    });
    
    headlines.Hindu = { ...news };
}

async function fetchHindustanTimes(page, headlines) {
    await page.goto('https://www.hindustantimes.com/');
    await page.waitForSelector('.hdg3 a');
    
    const news = await page.evaluate(() => {
        const articles = document.querySelectorAll('.hdg3 a');
        return Array.from(articles, (article, i) => ({
            [i]: article.textContent.trim()
        })).slice(0, 7).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    });
    
    headlines.HT = { ...news };
}

async function fetchTimesOfIndia(page, headlines) {
    await page.goto('https://timesofindia.indiatimes.com/india');
    await page.waitForSelector('#c_wdt_list_1 .w_tle a');
    
    const news = await page.evaluate(() => {
        const articles = document.querySelectorAll('#c_wdt_list_1 .w_tle a');
        return Array.from(articles, (article, i) => ({
            [i]: article.textContent.trim()
        })).slice(0, 7).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    });
    
    headlines.TOI = { ...news };
}

async function fetchCovidData(page, headlines) {
    await page.goto('https://www.mygov.in/covid-19');
    await page.waitForSelector('.icount');
    
    const covidStats = await page.evaluate(() => {
        const stats = document.querySelectorAll('.icount');
        return Array.from(stats, (stat, i) => ({
            [i]: stat.textContent.trim()
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    });
    
    headlines.covid = { ...covidStats };
}

module.exports = fetchNews;