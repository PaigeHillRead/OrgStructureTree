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
    let chaseCount = 0;

    hris.addEventListener("click", function () {
        isRunning = true;
        bubble.style.opacity = "1";

        // Get current position before switching to fixed
        let rect = hris.parentElement.getBoundingClientRect();
        hris.parentElement.style.position = "fixed";
        hris.parentElement.style.left = `${rect.left}px`;
        hris.parentElement.style.top = `${rect.top}px`;
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
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth - 50);
                    let newY = Math.random() * (window.innerHeight - hris.offsetHeight - 50);

                    hris.parentElement.style.left = `${newX}px`;
                    hris.parentElement.style.top = `${newY}px`;

                    hris.style.opacity = "1";
                    bubble.style.opacity = "1";

                    teleportCooldown = false;
                    chaseCount++;

                    // After 2 chases
                    if (chaseCount >= 2) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0";

                        // Reset HRIS position cleanly
                        hris.parentElement.style.position = "relative";
                        hris.parentElement.style.left = "0px";
                        hris.parentElement.style.top = "0px";
                    }
                }, 50);
            }
        }
    });
});
