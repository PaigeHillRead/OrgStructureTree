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
    });

    document.addEventListener("mousemove", function (event) {
        if (isRunning) {
            let rect = hris.getBoundingClientRect();
            let distance = Math.hypot(
                event.clientX - (rect.left + rect.width / 2),
                event.clientY - (rect.top + rect.height / 2)
            );

            // If the mouse is within 150px, HRIS teleports away
            if (distance < 150) {
                teleportHRIS();
            }
        }
    });

    function teleportHRIS() {
        // Make HRIS disappear
        hris.style.opacity = "0";

        // Wait 150ms before reappearing somewhere else
        setTimeout(() => {
            let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
            let newY = Math.random() * (window.innerHeight - hris.offsetHeight);

            hris.style.position = "absolute";
            hris.style.left = `${newX}px`;
            hris.style.top = `${newY}px`;

            // Reappear after teleporting
            hris.style.opacity = "1";
        }, 150); // Faster teleport delay
    }
});
