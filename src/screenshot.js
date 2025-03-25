import html2canvas from 'html2canvas';
console.log("html2canvas working");

export function setupScreenshot() {
    const screenshotButtons = document.querySelectorAll('.capture');
    
    screenshotButtons.forEach(button => {
        button.addEventListener('click', () => {
            // const target = button.closest('.notes-modal-parent') || document.querySelector('.main-container');
            const target = document.body;
            console.log("Target Element : ",target);
            takeScreenshot(target);
        });
    });
}

async function takeScreenshot(element) {
    try {
        const canvas = await html2canvas(element);
        const link = document.createElement('a');
        link.download = 'newsmania-screenshot.png';
        link.href = canvas.toDataURL();
        link.click();
    } catch (error) {
        console.error('Screenshot failed:', error);
    }
}