document.addEventListener("DOMContentLoaded", function () {
    // Add click event for all normal contacts
    let contacts = document.querySelectorAll(".contact:not(.runaway)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    // HRIS button starts normal, but activates "runaway mode" after clicking
    let hris = document.querySelector(".runaway");
    let isRunning = false;

    hris.addEventListener("click", function () {
        isRunning = true; // Activate escape mode
    });

    document.addEventListener("mousemove", function (event) {
        if (isRunning) { // Only move if HRIS has been clicked
            let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
            let newY = Math.random() * (window.innerHeight - hris.offsetHeight);
            
            hris.style.position = "absolute";
            hris.style.left = `${newX}px`;
            hris.style.top = `${newY}px`;
            hris.style.transition = "left 0.1s linear, top 0.1s linear"; // Fast movement
        }
    });
});
