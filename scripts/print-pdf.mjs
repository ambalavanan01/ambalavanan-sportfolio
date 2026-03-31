import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const page = await browser.newPage();
    
    // Simulate print media
    await page.emulateMediaType('print');

    console.log("Navigating to http://127.0.0.1:5173/resume...");
    // Go to the resume Route
    await page.goto('http://127.0.0.1:5173/resume', { waitUntil: 'load', timeout: 30000 });

    // Wait 5 seconds to ensure Firebase fetch finishes
    await new Promise(r => setTimeout(r, 5000));

    // Hide the return button and download button
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(b => b.style.display = 'none');
    });

    const outputPath = path.join(process.cwd(), 'public', 'Ambalavanan_Resume.pdf');
    console.log(`Saving PDF to ${outputPath}...`);
    
    // Generate PDF
    await page.pdf({ 
        path: outputPath, 
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
    });

    console.log("PDF generated successfully!");
    await browser.close();
  } catch (err) {
    console.error("Error generating PDF:", err);
    process.exit(1);
  }
})();
