export function setupNewsDisplay(newsData) {
    // Display news for each source with their logos
    displayNews('ET', newsData.ET, '/images/ET.jpg');
    displayNews('TH', newsData.Hindu, '/images/Hindu.jpg');
    displayNews('HT', newsData.HT, '/images/HT.jpg');
    displayNews('TOI', newsData.TOI, '/images/TOI.jpg');

    // Display COVID tracker
    displayCovidTracker(newsData.covid);

    // Setup news modal functionality
    setupNewsModals(newsData);
}

function displayNews(source, data, logoPath) {
    const container = document.querySelector(`.${source}news .lower`);
    const logoContainer = document.querySelector(`.${source}news .upper .paper-name`);
    if (!container || !logoContainer) return;

    // Add logo
    logoContainer.style.backgroundImage = `url(${logoPath})`;
    logoContainer.style.backgroundSize = 'contain';
    logoContainer.style.backgroundRepeat = 'no-repeat';
    logoContainer.style.backgroundPosition = 'left';
    logoContainer.style.height = '80%';
    logoContainer.style.width = '70%';
    // logoContainer.textContent = ''; // Remove text content since we're using image

    // Clear existing content
    container.innerHTML = '';

    // Add news items
    Object.keys(data).forEach(key => {
        if (key !== 'img') {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.textContent = data[key];
            container.appendChild(newsItem);
        }
    });
}

function displayCovidTracker(covidData) {
    const container = document.querySelector('.covid-tracker');
    if (!container) return;

    const stats = [
        { label: 'Active Cases', value: covidData[0] },
        { label: 'Total Cases', value: covidData[1] },
        { label: 'Recovered', value: covidData[2] },
        { label: 'Deaths', value: covidData[3] }
    ];

    container.innerHTML = stats.map(stat => 
        `<div class="covid-stat">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
        </div>`
    ).join('');

    setupCovidModal(covidData);
}

function setupNewsModals(newsData) {
    const newsContainers = {
        'ETnews': { name: 'The Economic Times', data: newsData.ET, link: 'https://economictimes.indiatimes.com/' },
        'THnews': { name: 'The Hindu', data: newsData.Hindu, link: 'https://www.thehindu.com/' },
        'HTnews': { name: 'Hindustan Times', data: newsData.HT, link: 'https://www.hindustantimes.com/' },
        'TOInews': { name: 'Times of India', data: newsData.TOI, link: 'https://timesofindia.indiatimes.com/' }
    };

    document.querySelectorAll('.news').forEach(newsDiv => {
        Object.keys(newsContainers).forEach(key => {
            if (newsDiv.classList.contains(key)) {
                newsDiv.addEventListener('click', () => {
                    const { name, data, link } = newsContainers[key];
                    showNewsModal(name, data, link);
                });
            }
        });
    });
}

function showNewsModal(name, content, link) {
    const today = new Date().toLocaleDateString();
    const existingModal = document.querySelector('.news-modal-parent');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'news-modal-parent';
    modal.innerHTML = `
        <div class="news-modal-container">
            <div class="head-date-container">
                <div class="newspaper">${name}</div>
                <div class="date">${today}</div>
            </div>
            <div class="news-items-container">
                <div class="left-items">
                    <li class="item">${content[0]}</li>
                    <li class="item">${content[1]}</li>
                    <li class="item">${content[2]}</li>
                </div>
                <div class="middle-items">
                    <img class="item image" src="${content.img}" alt="News Image"/>
                    <li class="item">${content[3]}</li>
                </div>
                <div class="right-items">
                    <li class="item">${content[4]}</li>
                    <li class="item">${content[5]}</li>
                    <li class="item">${content[6]}</li>                    
                </div>
            </div>
            <div class="link-container">
                <a href="${link}" target="_blank">Visit the site for more details!</a>
            </div>
        </div>
    `;

    document.querySelector('.main-container').appendChild(modal);

    modal.querySelector('.head-date-container').addEventListener('click', () => {
        modal.remove();
    });
}

function setupCovidModal(covidData) {
    const covidSection = document.querySelector('.covid');
    const covidTracker = document.querySelector('.covid-tracker');

    covidSection.addEventListener('click', () => {
        const existingCases = document.querySelector('.covid-cases');
        const existingClose = document.querySelector('.close-div');

        if (existingCases) {
            existingCases.remove();
            existingClose.remove();
            covidTracker.classList.remove('hide');
            return;
        }

        covidTracker.classList.add('hide');

        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-div';
        closeBtn.innerHTML = '<span class="material-icons">close</span>';

        const covidCases = document.createElement('div');
        covidCases.className = 'covid-cases';
        covidCases.innerHTML = `
            <div class="cases" id="curr">Active-Cases: ${covidData[0]}</div>
            <div class="cases" id="total">Total-Cases: ${covidData[1]}</div>
            <div class="cases" id="discharge">Discharged: ${covidData[2]}</div>
            <div class="cases" id="death">Deaths: ${covidData[3]}</div>
        `;

        const track = document.createElement('div');
        track.className = 'covid-tracker';
        track.textContent = 'INDIA';

        covidSection.prepend(covidCases);
        covidSection.appendChild(track);
        document.querySelector('.news-container').prepend(closeBtn);

        covidCases.style.width = '85%';

        closeBtn.addEventListener('click', () => {
            covidCases.animate({
                width: '0%'
            }, 400);
            setTimeout(() => {
                covidCases.remove();
                track.remove();
                closeBtn.remove();
                covidTracker.classList.remove('hide');
            }, 400);
        });
    });
}