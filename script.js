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
        teleportHRIS(); // Start the teleport loop
    });

    function teleportHRIS() {
        if (isRunning) {
            let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
            let newY = Math.random() * (window.innerHeight - hris.offsetHeight);
            
            hris.style.position = "absolute";
            hris.style.left = `${newX}px`;
            hris.style.top = `${newY}px`;

            // Keep teleporting every 50ms (super fast!)
            setTimeout(teleportHRIS, 50);
        }
    }
});
