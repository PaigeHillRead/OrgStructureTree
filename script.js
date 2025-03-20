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
            hris.style.position = "fixed";
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
                    // Calculate teleport positions
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth - 50);
                    let newY = 100 + Math.random() * (window.innerHeight - hris.offsetHeight - 150);

                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;
                    hris.style.opacity = "1";

                    // Move bubble above HRIS
                    bubble.style.left = `${newX + hris.offsetWidth / 2 - bubble.offsetWidth / 2}px`;
                    bubble.style.top = `${newY - 30}px`;
                    bubble.style.opacity = "1";

                    chaseCount++;
                    teleportCooldown = false;

                    // After 2 chases
                    if (chaseCount >= 2) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0";

                        // Reset HRIS
                        hris.style.position = "relative";
                        hris.style.left = "0px";
                        hris.style.top = "0px";
                    }
                }, 50);
            }
        }
    });
});
