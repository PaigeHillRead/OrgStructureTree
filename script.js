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

    // Move HRIS + bubble outside org chart layout after click
    hris.addEventListener("click", function () {
        isRunning = true;

        // Detach HRIS + bubble from org chart
        let hrisContainer = hris.parentElement;
        document.body.appendChild(hris);
        document.body.appendChild(bubble);

        hris.style.position = "absolute";
        bubble.style.position = "absolute";
        bubble.style.opacity = "1";
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
                    // Ensure HRIS stays fully on-screen
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
                    let newY = Math.random() * (window.innerHeight - hris.offsetHeight);

                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;
                    hris.style.opacity = "1";

                    bubble.style.left = `${newX + hris.offsetWidth / 2}px`;
                    bubble.style.top = `${newY - 30}px`;
                    bubble.style.opacity = "1";

                    teleportCooldown = false;
                    chaseCount++;

                    if (chaseCount >= 10) {
                        alert("April Fools!");
                        isRunning = false;
                        bubble.style.opacity = "0";
                    }
                }, 50);
            }
        }
    });
});
