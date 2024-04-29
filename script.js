document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".icon");
    const popouts = document.querySelectorAll(".popout");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Function to populate a popup with location information
    function populatePopup(popout, location) {
        popout.querySelector(".title").textContent = location.title;
        popout.querySelector(".location").textContent = location.location;
        popout.querySelector(".description").textContent = location.description;
        popout.querySelector(".dishes").textContent = location.dishes.join(", ");
        popout.querySelector(".photo").src = location.photo;
    }

    // Hide all popouts and overlay initially
    popouts.forEach((popout) => {
        popout.style.display = "none";
    });
    overlay.style.display = "none";

    // Fetch JSON data from the file
    fetch("file.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch JSON data");
            }
            return response.json();
        })
        .then(locations => {
            // Show the corresponding popup when icon is clicked
            icons.forEach((icon, index) => {
                icon.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const location = locations.find(loc => loc.number === index + 1); // Assuming icon numbers start from 1
                    if (location) {
                        populatePopup(popouts[index], location);
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        const popupWidth = popouts[index].offsetWidth;
                        const popupHeight = popouts[index].offsetHeight;
                        const left = (windowWidth - popupWidth) / 2;
                        const top = (windowHeight - popupHeight) / 2;
                        popouts[index].style.left = left + "px";
                        popouts[index].style.top = top + "px";
                        popouts[index].style.display = "block";
                        overlay.style.display = "block";
                    }
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