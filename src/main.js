import newsData from './data.js';
import { setupNotes } from './notes.js';
import { setupNewsDisplay } from './newsDisplay.js';
import { setupScreenshot } from './screenshot.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    console.log(document.querySelector('.timeout-modal'));
    // Remove welcome modal after 2 seconds
    setTimeout(() => {        
        console.log('timeout function executed');
        document.querySelector('.timeout-modal').style.display = 'none';
        console.log('Modal Hidden');
    }, 2000);

    // Setup news display
    setupNewsDisplay(newsData);

    // Setup notes functionality
    setupNotes();

    // Setup screenshot functionality
    setupScreenshot();
});