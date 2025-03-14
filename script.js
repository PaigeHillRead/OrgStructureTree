document.addEventListener("DOMContentLoaded", function () {
    // Add click event for all contact boxes except HRIS
    let contacts = document.querySelectorAll(".contact:not(.runaway)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    // HRIS runs away when hovered
    let hris = document.querySelector(".runaway");

    hris.addEventListener("mouseenter", function () {
        let orgChart = document.querySelector(".org-chart");
        let chartRect = orgChart.getBoundingClientRect();
        let rect = hris.getBoundingClientRect();

        // Random new position within the org chart area
        let newX = Math.random() * (chartRect.width - rect.width);
        let newY = Math.random() * (chartRect.height - rect.height);
        
        hris.style.position = "absolute"; // Only move once hovered
        hris.style.left = `${newX}px`;
        hris.style.top = `${newY}px`;
    });
});
