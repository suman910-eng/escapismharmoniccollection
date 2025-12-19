// REDDIT REPLIES DATA
// I created an array of objects containing user responses from Reddit
// Each object has a username, their response, and a profile color
const data = [
    {
        "user": "virtigex",
        "info": "Walk my dog early in the morning. We pretend we are navigating an apocalyptic landscape in the search for treats.",
        "color": "#EBFF00"
    },
    {
        "user": "wertyuio234",
        "info": "Stargazing sets me straight.",
        "color": "#FA00FF"
    },
    {
        "user": "[deleted]",
        "info": "stay up awfully late",
        "color": "#D9D9D9"
    },
    {
        "user": "GT_334",
        "info": "Shower....time flows slow in there for some reason",
        "color": "#56835A"
    },
    {
        "user": "damnoice",
        "info": "daydream",
        "color": "#FFB774"
    },
    {
        "user": "[deleted]",
        "info": "Read fantasy fiction.",
        "color": "#D9D9D9"
    },
    {
        "user": "CoastalFred",
        "info": "Skate",
        "color": "#A763C7"
    },
    {
        "user": "e-rekt-ion",
        "info": "Hmm isn't that why we're all here on Reddit?",
        "color": "#FF1818"
    },
    {
        "user": "Unhappy_Mongoose_778",
        "info": "Garden. Saved me from depression. No meds ever worked.",
        "color": "#5F76CB"
    },
    {
        "user": "katzgar",
        "info": "youtube",
        "color": "#3B4C42"
    },
    {
        "user": "Fbg_dello",
        "info": "Smoke hella weed",
        "color": "#FF8D3B"
    },
    {
        "user": "TheVginyTcikler44",
        "info": "Eat.",
        "color": "#B10000"
    },
    {
        "user": "DragonKorny",
        "info": "Listen to an audio book in a bed with a thick warm blanket",
        "color": "#0D0F13"
    },
    {
        "user": "misstaken66",
        "info": "listen to music",
        "color": "#9B1CFF"
    },
    {
        "user": "counterspell",
        "info": "I pretend I won the lottery and escape to my first 24 hours of being debt free.",
        "color": "#89F1FF"
    },
    {
        "user": "Maleficent_Ad_7617",
        "info": "read a book",
        "color": "#FFC701"
    },
    {
        "user": "plojjj",
        "info": "Meditation",
        "color": "#9158B3"
    },
    {
        "user": "Vinny_Lam",
        "info": "Video games, music, and anime.",
        "color": "#BA9100"
    },
    {
        "user": "NeonWarCry",
        "info": "Smoke weed, take long showers, take a hike in the nearby wilderness preserve.",
        "color": "#A62060"
    },
    {
        "user": "rooftopflith",
        "info": "Browse Reddit for stupid lengths of time!",
        "color": "#8DFF57"
    },
    {
        "user": "midnight_ocean",
        "info": "Drive with no destination. Just pick a direction and go.",
        "color": "#2E86AB"
    },
    {
        "user": "cosmicdustt",
        "info": "I make spotify playlists for scenarios that will never happen",
        "color": "#F18F01"
    },
    {
        "user": "quiet_corner",
        "info": "Sit in my car in the parking lot before going inside. Sometimes for an hour.",
        "color": "#C73E1D"
    },
    {
        "user": "[deleted]",
        "info": "Online shopping. I add everything to cart and never buy anything.",
        "color": "#D9D9D9"
    },
    {
        "user": "oldsoulmillennial",
        "info": "Rewatch the same comfort show for the 100th time.",
        "color": "#8338EC"
    },
    {
        "user": "wanderlust_kid",
        "info": "Google flights to places I'll never afford to go",
        "color": "#3A86FF"
    },
    {
        "user": "[deleted]",
        "info": "dissociate lol",
        "color": "#D9D9D9"
    },
    {
        "user": "pixelated_dreams",
        "info": "Minecraft. Building houses I'll never live in.",
        "color": "#70E000"
    },
    {
        "user": "caffeinated_mess",
        "info": "coffee shop hopping. something about being alone in public feels safe.",
        "color": "#6B4226"
    },
    {
        "user": "night_owl_xyz",
        "info": "wikipedia rabbit holes at 4am",
        "color": "#4361EE"
    },
    {
        "user": "[deleted]",
        "info": "cry in the shower so no one hears",
        "color": "#D9D9D9"
    },
    {
        "user": "insomniac_thoughts",
        "info": "make up fake arguments in my head and win them",
        "color": "#9D4EDD"
    },
    {
        "user": "lo_fi_life",
        "info": "lo-fi beats and pretend I'm the main character in an indie film",
        "color": "#E9C46A"
    },
    {
        "user": "midnight_snacker",
        "info": "eat shredded cheese at 2am standing in front of the fridge",
        "color": "#FFBE0B"
    },
    {
        "user": "[deleted]",
        "info": "exist",
        "color": "#D9D9D9"
    }
];


// CREATE ELEMENTS FUNCTION
// I created this function to dynamically generate reply boxes from the data array
function createElements() {
    // I grab the container where replies will be added
    const minis = document.querySelector('.minis');
    
    // I check if the container exists before proceeding
    if (!minis) {
        console.log("Error: .minis element not found");
        return;
    }

    // I loop through each item in the data array
    data.forEach(item => {
        // I create the main reply box container
        const minibox = document.createElement('div');
        minibox.className = 'minibox';

        // I create the header section with user info
        const miniheader = document.createElement('div');
        miniheader.className = 'miniheader';

        // I create the colored profile circle
        const minicircle = document.createElement('div');
        minicircle.className = 'minicircle';
        // I set the background color from the data
        minicircle.style.backgroundColor = item.color;

        // I create the username element
        const userElement = document.createElement('div');
        userElement.className = 'miniuser';
        userElement.innerHTML = `<b>${item.user}</b> • 2 yr ago`;

        // I create the reply text content
        const minitext = document.createElement('div');
        minitext.className = 'minitext';
        // I replace newlines with <br> tags for proper formatting
        minitext.innerHTML = item.info.replace(/\n/g, '<br>');

        // I assemble the elements together
        miniheader.appendChild(minicircle);
        miniheader.appendChild(userElement);
        minibox.appendChild(miniheader);
        minibox.appendChild(minitext);
        
        // I add the completed reply box to the page
        minis.appendChild(minibox);
    });
}

// I call the function to generate all reply boxes when the script loads
createElements();