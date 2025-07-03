const shareIcon = document.querySelector(".share-icon");
const shareTooltip = document.querySelector(".share-tooltip");
const footerDetails = document.querySelector(".footer-details");

function isMobile() {
    return window.innerWidth <= 720;
}

shareIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile()) {
        footerDetails.classList.toggle('active');
    } else {
        if (shareTooltip.style.visibility === "visible") {
            shareTooltip.style.visibility = "hidden";
        } else {
            shareTooltip.style.visibility = "visible";
        }
    }
});

document.addEventListener('click', () => {
    if (isMobile()) {
        footerDetails.classList.remove('active');
    } else {
        shareTooltip.style.visibility = "hidden";
    }
});

// Prevent tooltip click from closing itself
shareTooltip.addEventListener('click', (e) => {
    e.stopPropagation();
});

