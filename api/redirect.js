// api/redirect.js

module.exports = async (req, res) => {
    // Set the destination URL you want to redirect to
    const destinationUrl = "https://decimalediblegoose.com/tt44e8dv?key=c5d48f83233bb1353e58c70af36708d6"; // Replace with your target URL

    // Set the headers for the redirection
    res.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");
    res.setHeader("Referer", "https://www.google.com/");
    
    // Redirect to the destination URL
    res.writeHead(302, {
        "Location": destinationUrl,
        "X-Forwarded-For": "66.249.66.1" // IP range of Googlebot (appears US-based)
    });
    res.end();
};
