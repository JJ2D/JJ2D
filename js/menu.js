// PAUSESCREEN
const pauseScreen = document.getElementById("pause-screen");
window.addEventListener("scroll", event => {
    if (window.scrollY > window.innerHeight - 15) {
        pauseScreen.style.display = "none";
    } else {
        pauseScreen.style.display = "flex";
    }
})





// LOADING SCREEN
const userAgent = navigator.userAgent;
var device;
var aspectRatio;
var deviceOrientation;

if (/Mobi|Android/i.test(userAgent)) {
  device = "Mobile";
} else if (/Tablet|iPad/i.test(userAgent)) {
  device = "Tablet";
} else {
  device = "Desktop";
}

const loading = {};
loading.screen = document.getElementById("loading");
loading.icon = document.getElementById("icon");
loading.errorMessage = document.getElementById("error-message");

function orientationCheck() {
    setTimeout(() => {

        // Detect orientation
        aspectRatio = window.innerWidth / window.innerHeight;
        if (aspectRatio >= 1) {
            deviceOrientation = "Landscape";
        } else {
            deviceOrientation = "Portrait";
        }
        // Reset Loading Screen
        loading.screen.style.animation = "";
        loading.icon.style.animation = "rotate 1s ease-in-out infinite forwards";
        loading.icon.style.display = "block";
        loading.errorMessage.innerHTML = "";
        loading.errorMessage.style.display = "none";
        // Apply result
        if (device == "Desktop" && deviceOrientation == "Landscape") {
            loading.screen.style.animation = "loading-successful 1s forwards";
            loading.icon.style.animation = "loading-successful-icon 1s forwards";
    
        } else if (device  == "Desktop" && deviceOrientation == "Portrait") {
            loading.errorMessage.style.display = "flex";
            loading.icon.style.display = "none";
            loading.errorMessage.innerHTML = `
                <p>Please turn your device</p>
                <img src="assets/menu/loadingerrorpc.png">
                <p class="error-minitext">Why the f would you use your monitor in portrait?</p>
            `;
    
        } else if (device == "Mobile" && deviceOrientation == "Landscape") {
          loading.screen.style.animation = "loading-successful 1s forwards";
          loading.icon.style.animation = "loading-successful-icon 1s forwards";
          
        } else if (device == "Mobile" && deviceOrientation == "Portrait") {
            loading.errorMessage.style.display = "flex";
            loading.icon.style.display = "none";
            loading.errorMessage.innerHTML = `
                <p>Please turn your device</p>
                <img src="assets/menu/loadingerrormobile.png">
            `;
        }
        
    }, 100);

}
setTimeout(() => {
    orientationCheck()
    window.addEventListener("orientationchange", orientationCheck);
}, 1000);










// MENU
var altmenu = false;
const menuScreen = document.getElementById("menu-screen");
const partList = {};
partList.grid = document.getElementById("part-list");
partList.switchButton = document.getElementById("switch-button");
partList.parts = document.querySelectorAll(".part");


if (device == "Desktop") {
    
    // DESKTOP CODE
    partList.parts.forEach(element => {
        if (device == "Desktop") {
            element.addEventListener("mouseenter", event => {
                new Audio("assets/audio/ping.mp3").play();
            })
        }
    });
    partList.switchButton.addEventListener("click", event => {
        altmenu = !altmenu
        if (altmenu) {
            partList.grid.style.transform = "translateX(-100vw)";
            partList.switchButton.classList.add("altmenu-mode");
        } else {
            partList.grid.style.transform = "";
            partList.switchButton.classList.remove("altmenu-mode");
        }
    })

} else {

    // MOBILE AND TABLET CODE
    pauseScreen.children[1].innerHTML = "Swipe up to resume game";

    let partSelected = -1;
    let controls = {};
    controls.left = document.createElement("div");
    controls.left.classList.add("controls-splitscreen-button");
    controls.left.style.left = "0";
    controls.right = document.createElement("div");
    controls.right.classList.add("controls-splitscreen-button");
    controls.right.style.left = "50vw";

    function reloadSelectionRender() {
        partList.parts.forEach(element => {
            element.classList.remove("part-selected");
        })
        partList.parts[partSelected].classList.add("part-selected");
        
        if (altmenu) {
            partList.grid.style.transform = "translateX(-100vw)";
            partList.switchButton.classList.add("altmenu-mode");
        } else {
            partList.grid.style.transform = "";
            partList.switchButton.classList.remove("altmenu-mode");
        }
        new Audio("assets/audio/ping.mp3").play();
    }

    controls.left.addEventListener("click", event => {
        if (partSelected > 0) {
            partSelected--
            if (partSelected < 3) {
                altmenu = false;
            }
        }
        reloadSelectionRender();
    })
    controls.right.addEventListener("click", event => {
        if (partSelected < 5) {
            partSelected++
            if (partSelected > 2) {
                altmenu = true;
            }
        }
        reloadSelectionRender();
    })

    menuScreen.appendChild(controls.left);
    menuScreen.appendChild(controls.right);
}
