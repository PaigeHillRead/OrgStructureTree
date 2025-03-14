document.addEventListener("DOMContentLoaded", function () {
  // Add click event listeners for all contact boxes except HRIS.
  let contacts = document.querySelectorAll(".contact:not(.runaway)");
  contacts.forEach(function (contact) {
    contact.addEventListener("click", function () {
      alert("Contact information coming soon!");
    });
  });

  // For HRIS, make it run away when the mouse comes close.
  let hris = document.querySelector(".runaway");
  let orgChart = document.querySelector(".org-chart");

  document.addEventListener("mousemove", function (e) {
    // Get the bounding rectangle for HRIS.
    let rect = hris.getBoundingClientRect();
    // Calculate the distance from the mouse pointer to the center of HRIS.
    let distance = Math.hypot(
      e.clientX - (rect.left + rect.width / 2),
      e.clientY - (rect.top + rect.height / 2)
    );
    // If the mouse is within 150px, reposition HRIS.
    if (distance < 150) {
      let containerRect = orgChart.getBoundingClientRect();
      // Generate new positions within the container boundaries.
      let newLeft = Math.random() * (containerRect.width - rect.width);
      let newTop = Math.random() * (containerRect.height - rect.height);
      hris.style.left = newLeft + "px";
      hris.style.top = newTop + "px";
    }
  });
});
