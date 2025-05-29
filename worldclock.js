const clockDiv = document.getElementById("world-clock");

const cities = [
    { name: "New York", timezone: "America/New_York" },
    { name: "London", timezone: "Europe/London" },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
    { name: "Sydney", timezone: "Australia/Sydney" },
    { name: "Dubai", timezone: "Asia/Dubai" },
    { name: "Mumbai", timezone: "Asia/Kolkata" }
];

function displayTime() {
    let clockHTML = '<div class="clock-info">';
    cities.forEach(city => {
        const time = new Date().toLocaleTimeString("en-US", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
        clockHTML += `
            <div class="clock-item">
                <span class="clock-city">${city.name}</span>
                <span class="clock-time">${time}</span>
            </div>
        `;
    });
    clockHTML += '</div>';
    clockDiv.innerHTML = clockHTML;
}

// Update time every second
displayTime();
setInterval(displayTime, 1000);