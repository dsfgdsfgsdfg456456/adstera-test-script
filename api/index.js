// index.js

// Geo-Targeting with ip-api
const fetch = require("node-fetch");

const urlList = {
    "US": "https://your-url-for-us.com",
    "IN": "https://your-url-for-in.com",
    "PK": "https://your-url-for-pk.com",
    "default": "https://your-default-url.com"
};

// Fetch user IP and redirect based on country
module.exports = async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geoUrl = `http://ip-api.com/json/${ip}`;

    try {
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        const userCountry = geoData.countryCode || "default";
        
        // Set the URL to redirect based on country
        const redirectUrl = urlList[userCountry] || urlList["default"];

        // Set Chrome user-agent
        res.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");

        // Perform the redirection
        res.writeHead(302, { Location: redirectUrl });
        res.end();
    } catch (error) {
        console.error("Error fetching geo data:", error);
        res.writeHead(302, { Location: urlList["default"] });
        res.end();
    }
};
