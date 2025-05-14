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
