const http = require('http');
const fs = require('fs').promises;
const minimist = require('minimist');

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const port = parseInt(args.port, 10) || 3000; // Default to port 3000 if not provided

// Initialize content variables
let homeContent = '';
let projectContent = '';
let registrationContent = '';

// Load content for each page
async function loadContent() {
    try {
        homeContent = await fs.readFile('home.html', 'utf8');
        projectContent = await fs.readFile('project.html', 'utf8');
        registrationContent = await fs.readFile('registration.html', 'utf8');
    } catch (err) {
        console.error('Error reading files:', err);
        process.exit(1); // Exit if there's an error reading the files
    }
}

// Create server and handle requests
const server = http.createServer((req, res) => {
    const url = req.url;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    switch (url) {
        case '/project':
            res.write(projectContent);
            res.end();
            break;
        case '/registration':
            res.write(registrationContent);
            res.end();
            break;
        default:
            res.write(homeContent);
            res.end();
            break;
    }
});

// Start the server and load content
loadContent().then(() => {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});