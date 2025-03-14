document.addEventListener("DOMContentLoaded", function () {
    let contacts = document.querySelectorAll(".contact:not(.runaway)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    let hris = document.querySelector(".runaway");
    let isRunning = false;

    hris.addEventListener("click", function () {
        isRunning = true; // Activate teleport mode
        teleportHRIS(); // Start teleport loop
    });

    function teleportHRIS() {
        if (isRunning) {
            // Make HRIS disappear
            hris.style.opacity = "0";

            // Wait 300ms (invisible) before reappearing in a new location
            setTimeout(() => {
                let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
                let newY = Math.random() * (window.innerHeight - hris.offsetHeight);

                hris.style.position = "absolute";
                hris.style.left = `${newX}px`;
                hris.style.top = `${newY}px`;

                // Reappear after teleporting
                hris.style.opacity = "1";

                // Keep teleporting every 700ms (adjust for more/less chaos)
                setTimeout(teleportHRIS, 700);
            }, 300); // Disappear for 300ms before reappearing
        }
    }
});
