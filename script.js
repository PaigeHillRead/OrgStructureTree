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

            // 🟢 First: Get current position BEFORE switching to fixed
            let rect = hris.getBoundingClientRect();

            // Freeze HRIS visually where it is
            hris.style.position = "fixed";
            hris.style.left = `${rect.left}px`;
            hris.style.top = `${rect.top}px`;

            // Position bubble right above
            bubble.style.left = `${rect.left + hris.offsetWidth / 2 - bubble.offsetWidth / 2}px`;
            bubble.style.top = `${rect.top - 40}px`;
            bubble.style.opacity = "1";
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
                    // Teleport HRIS
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth - 50);
                    let newY = 100 + Math.random() * (window.innerHeight - hris.offsetHeight - 150);

                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;
                    hris.style.opacity = "1";

                    // Move bubble with HRIS
                    bubble.style.left = `${newX + hris.offsetWidth / 2 - bubble.offsetWidth / 2}px`;
                    bubble.style.top = `${newY - 40}px`;
                    bubble.style.opacity = "1";

                    chaseCount++;
                    teleportCooldown = false;

                    // After 2 chases
                    if (chaseCount >= 2) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0";

                        // Reset HRIS back to normal
                        hris.style.position = "relative";
                        hris.style.left = "0px";
                        hris.style.top = "0px";
                    }
                }, 50);
            }
        }
    });
});
