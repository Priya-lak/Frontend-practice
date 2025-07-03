
const shareIcon = document.querySelector(".share-icon");
const shareTooltip= document.querySelector(".share-tooltip");

// shareIcon.addEventListener('click',(e)=>{
//     console.log("Button clicked");
//     shareTooltip.style.visibility="visible";
// })


shareIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    console.log("Button clicked");
    console.log(shareTooltip.style.visibility);
    if (shareTooltip.style.visibility == "visible") 
        { shareTooltip.style.visibility = "hidden"; }
    else 
        { shareTooltip.style.visibility = "visible"; }
    
})

document.addEventListener('click', () => {
    
    { shareTooltip.style.visibility = "hidden"; }

})