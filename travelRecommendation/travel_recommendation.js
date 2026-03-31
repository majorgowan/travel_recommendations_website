function fetchData(key) {
    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            displayRecommendations(data[key]);
        })
        .catch(err => console.log(err));
}

function displayRecommendations(data) {
    console.log(data);
    // hide blurb
    const blurb = document.getElementById("blurb");
    const searchResults = document.getElementById("searchResults");
    const resultsContent = document.getElementById("resultsContent");

    blurb.style.display = "none";

    // clear existing search results
    resultsContent.innerHTML = "";

    // populate search results
    for (const datum of data) {
        resultsContent.appendChild(makeRecommendationCard(datum));
    }

    // show search results
    searchResults.style.display = "block";
}

function makeRecommendationCard(datum) {
    const card = document.createElement("div");
    card.classList.add("recommendationCard");
    let innerstring = `<h3>${datum.name}</h3>`;

    // get current time
    const now = new Date();

    // "countries" has different structure to other keys
    if ("cities" in datum) {
        for (const city of datum.cities) {
            innerstring += `<h5>${city.name}</h5>`;
            innerstring += `<img src='${city.imageUrl}'>`;
            innerstring += `<p>${city.description}</p>`;

            const datestring = now.toLocaleTimeString("en-ca", {"timeZone": city.timezone});
            innerstring += `<p>Current time at location: ${datestring}</p>`;
        }
    } else {
        innerstring += `<img src='${datum.imageUrl}'>`;
        innerstring += `<p>${datum.description}</p>`;

        const datestring = now.toLocaleTimeString("en-ca", {"timeZone": datum.timezone});
        innerstring += `<p>Current time at location: ${datestring}</p>`;
    }

    card.innerHTML = innerstring;
    console.log(card);
    console.log(innerstring);
    return card;
}

function searchButtonClicked() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value;
    if (searchTerm.toLowerCase().includes("beach")) {
        const data = fetchData("beaches");
    } else if (searchTerm.toLowerCase().includes("country")
               || searchTerm.toLowerCase().includes("countries")) {
        const data = fetchData("countries");
    } else if (searchTerm.toLowerCase().includes("temple")) {
        const data = fetchData("temples");
    }
}

function clearButtonClicked() {
    const blurb = document.getElementById("blurb");
    const searchResults = document.getElementById("searchResults");
    const resultsContent = document.getElementById("resultsContent");
    const searchInput = document.getElementById("searchInput");

    // clear the search bar
    searchInput.value = "";

    // reset searchResults and make invisible
    resultsContent.innerHTML = "";
    searchResults.style.display = "none";

    // make blurb visible again
    blurb.style.display = "block";
}