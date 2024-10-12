// index.js

// Geo-Targeting with ip-api
const fetch = require("node-fetch");

const urlList = {
    "US": "https://decimalediblegoose.com/tt44e8dv?key=c5d48f83233bb1353e58c70af36708d6",
   
};

// Fetch user IP and redirect based on country
module.exports = async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geoUrl = `http://ip-api.com/json/${ip}`;

    try {
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        const userCountry = geoData.countryCode || "US";
        
        // Set the URL to redirect based on country
        const redirectUrl = urlList[userCountry] || urlList["US"];

        // Set Chrome user-agent
        res.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36");

        // Perform the redirection
        res.writeHead(302, { Location: redirectUrl });
        res.end();
    } catch (error) {
        console.error("Error fetching geo data:", error);
        res.writeHead(302, { Location: urlList["US"] });
        res.end();
    }
};
