// WEBSITES DATA
// I created an array of design-focused websites for users to explore
const websites = [
    {
        websiteName: "Are.na",
        url: "https://www.are.na/",
        img: "imgs/arena.png"
    },
    {
        websiteName: "Soot World",
        url: "https://play.soot.com/sootworld",
        img: "imgs/soot.png"
    },
    {
        websiteName: "Cosmos",
        url: "https://cosmos.so/",
        img: "imgs/cosmos.png"
    },
    {
        websiteName: "Godly",
        url: "https://godly.website/",
        img: "imgs/godly.png"
    },
    {
        websiteName: "Hover States",
        url: "https://www.hoverstat.es/",
        img: "imgs/hover.png"
    },
    {
        websiteName: "Brutalist Websites",
        url: "https://brutalistwebsites.com/",
        img: "imgs/brutalist.png"
    },
    {
        websiteName: "Falling Falling",
        url: "https://www.fallingfalling.com/",
        img: "imgs/falling.png"
    },
    {
        websiteName: "100,000 Stars",
        url: "https://stars.chromeexperiments.com/",
        img: "imgs/stars.png"
    },
    {
        websiteName: "Patatap",
        url: "https://patatap.com/",
        img: "imgs/patatap.png"
    },
    {
        websiteName: "Earth.fm",
        url: "https://earth.fm/",
        img: "imgs/earth.png"
    }
];


// GENERATE WEBSITE CARDS WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.getElementById("content");
    
    // I loop through each website and create a card
    websites.forEach(website => {
        // I create the card container
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");
        
        // I create the link that opens in a new tab
        const anchor = document.createElement("a");
        anchor.href = website.url;
        anchor.target = "_blank";
        
        // I create the thumbnail image
        const img = document.createElement("img");
        img.src = website.img;
        img.alt = website.websiteName + " thumbnail";
        
        // I create the website name label
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name");
        nameDiv.textContent = website.websiteName;
        
        // I assemble the elements together
        anchor.appendChild(img);
        anchor.appendChild(nameDiv);
        boxDiv.appendChild(anchor);
        contentDiv.appendChild(boxDiv);
    });
});
