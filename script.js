document.addEventListener("DOMContentLoaded", function() {
    let runawayBranch = document.querySelector(".runaway");

    document.addEventListener("mousemove", function(event) {
        let branchRect = runawayBranch.getBoundingClientRect();
        let distance = Math.hypot(
            event.clientX - (branchRect.left + branchRect.width / 2),
            event.clientY - (branchRect.top + branchRect.height / 2)
        );

        if (distance < 120) { // Moves only if mouse is near
            let newX = Math.random() * (window.innerWidth - branchRect.width);
            let newY = Math.random() * (window.innerHeight - branchRect.height);
            runawayBranch.style.left = `${newX}px`;
            runawayBranch.style.top = `${newY}px`;
        }
    });
});
