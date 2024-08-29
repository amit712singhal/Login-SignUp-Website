// /js/inject.js
const fs = require( 'fs' );
const dotenv = require( 'dotenv' );
const path = require( 'path' );

// Load environment variables from .env file
dotenv.config();

// Paths
const htmlFilePath = path.join( __dirname, '../index.html' );
const outputFilePath = path.join( __dirname, '../index.html' );

// Read the HTML file
let html = fs.readFileSync( htmlFilePath, 'utf8' );

// Replace the placeholder with the actual key from the environment variable
html = html.replace( 'YOUR_RESPONSIVEVOICE_KEY', process.env.MY_RESPONSIVE_VOICE_KEY );

// Write the modified HTML back to the file
fs.writeFileSync( outputFilePath, html );

console.log( 'Environment variable injected successfully!' );
