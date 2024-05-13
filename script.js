document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".icon");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Function to create a popup dynamically
    function createPopup(location) {
        const popout = document.createElement("div");
        popout.classList.add("popout");
        popout.innerHTML = `
            <h2 class="title subheading-bold">${location.title}</h2>
            <p class="location body-italic">${location.location}</p>
            <p class="description body">${location.description}</p>
            <div class="recommended-dishes-container">
                <p class="body-bold">Recommended:</p>
                <p class="dishes body">${location.dishes.join(", ")}</p>
            </div>
            <img class="photo" src="${location.photo}" alt="Location photo">
        `;
        popout.style.display = "none"; // Initially hide the popout
        document.body.appendChild(popout);
        return popout;
    }

    // Create popups for each location
    const popouts = [];
    fetch("file.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch JSON data");
            }
            return response.json();
        })
        .then(locations => {
            locations.forEach(location => {
                const popout = createPopup(location);
                popouts.push(popout);
            });

            // Show the corresponding popup when icon is clicked
            icons.forEach((icon, index) => {
                icon.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const popout = popouts[index];
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const popupWidth = popout.offsetWidth;
                    const popupHeight = popout.offsetHeight;
                    const left = (windowWidth - popupWidth) / 2;
                    const top = (windowHeight - popupHeight) / 2;
                    popout.style.left = left + "px";
                    popout.style.top = top + "px";
                    popout.style.display = "block";
                    overlay.style.display = "block";
                });
            });
        })
        .catch(error => console.error("Error fetching or parsing JSON:", error));

    // Close popouts when clicking anywhere outside of them
    document.addEventListener("click", () => {
        popouts.forEach((popout) => {
            popout.style.display = "none";
        });
        overlay.style.display = "none";
    });
});
