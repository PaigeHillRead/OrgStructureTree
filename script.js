document.addEventListener("DOMContentLoaded", function () {
    let contacts = document.querySelectorAll(".contact:not(.runaway)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    let hris = document.querySelector(".runaway");
    let bubble = document.getElementById("bubble");
    let isRunning = false;
    let teleportCooldown = false;
    let chaseCount = 0; // Counts how many times HRIS has teleported

    hris.addEventListener("click", function () {
        isRunning = true;
        bubble.style.opacity = "1"; // Show speech bubble
    });

    document.addEventListener("mousemove", function (event) {
        if (isRunning && !teleportCooldown) {
            let rect = hris.getBoundingClientRect();
            let distance = Math.hypot(
                event.clientX - (rect.left + rect.width / 2),
                event.clientY - (rect.top + rect.height / 2)
            );

            // If mouse is within 80px, HRIS teleports away
            if (distance < 80) {
                teleportCooldown = true;
                hris.style.opacity = "0"; // Disappear
                bubble.style.opacity = "0"; // Hide bubble briefly

                setTimeout(() => {
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
                    let newY = Math.random() * (window.innerHeight - hris.offsetHeight);

                    hris.style.position = "absolute";
                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;
                    hris.style.opacity = "1";

                    // Move bubble with HRIS
                    bubble.style.left = `${newX + hris.offsetWidth / 2}px`;
                    bubble.style.top = `${newY - 30}px`;
                    bubble.style.opacity = "1";

                    teleportCooldown = false;
                    chaseCount++;

                    // After 4 chases, show April Fools pop-up
                    if (chaseCount >= 4) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0"; // Hide bubble at the end
                    }
                }, 50); // Fast disappear + teleport
            }
        }
    });
});
