document.addEventListener("DOMContentLoaded", function () {
    let contacts = document.querySelectorAll(".contact:not(#hris)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    let hris = document.getElementById("hris");
    let bubble = document.getElementById("bubble");
    let isRunning = false;
    let teleportCooldown = false;
    let chaseCount = 0;

    hris.addEventListener("click", function () {
        if (!isRunning) {
            isRunning = true;
            bubble.style.opacity = "1";
            hris.style.position = "fixed"; // HRIS becomes movable
        }
    });

    document.addEventListener("mousemove", function (event) {
        if (isRunning && !teleportCooldown) {
            let rect = hris.getBoundingClientRect();
            let distance = Math.hypot(
                event.clientX - (rect.left + rect.width / 2),
                event.clientY - (rect.top + rect.height / 2)
            );

            if (distance < 80) {
                teleportCooldown = true;
                hris.style.opacity = "0";
                bubble.style.opacity = "0";

                setTimeout(() => {
                    // Calculate safe teleport coordinates
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth - 50);
                    let newY = 100 + Math.random() * (window.innerHeight - hris.offsetHeight - 150); // Avoid very top

                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;
                    hris.style.opacity = "1";

                    // Move bubble relative to HRIS position
                    bubble.style.left = "50%";
                    bubble.style.top = "-30px";
                    bubble.style.opacity = "1";

                    chaseCount++;
                    teleportCooldown = false;

                    // After 2 chases
                    if (chaseCount >= 2) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0";

                        // Reset HRIS back to layout
                        hris.style.position = "relative";
                        hris.style.left = "0px";
                        hris.style.top = "0px";
                    }
                }, 50);
            }
        }
    });
});
