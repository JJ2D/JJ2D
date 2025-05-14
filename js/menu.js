const aspectRatio = window.innerWidth / window.innerHeight;
const userAgent = navigator.userAgent;
var deviceRotation;
var device;

if (aspectRatio >= 1) {
    deviceRotation = "Landscape";
} else {
    deviceRotation = "Portrait";
}
if (/Mobi|Android/i.test(userAgent)) {
  device = "Mobile";
} else if (/Tablet|iPad/i.test(userAgent)) {
  device = "Tablet";
} else {
  device = "Desktop";
}



// Loading
const loading = document.getElementById("loading");
setTimeout(() => {

    if (device == "Desktop" && deviceRotation == "Landscape") {
        loading.style.animation = "loading-successful 1s forwards";
        document.getElementById("icon").style.animation = "loading-successful-icon 1s forwards";

    } else if (device  == "Desktop" && deviceRotation == "Portrait") {
        let errorMessage = document.createElement("div");
        errorMessage.id = "error-message";
        errorMessage.innerHTML = `
            <p>Please turn your device</p>
            <img src="assets/menu/loadingerrorpc.png">
            <p class="error-minitext">Why the f would you use your monitor in portrait?</p>
        `;
        document.getElementById("icon").remove();
        loading.appendChild(errorMessage);

    } else if (device == "Mobile" && deviceRotation == "Landscape") {
      loading.style.animation = "loading-successful 1s forwards";
      document.getElementById("icon").style.animation = "loading-successful-icon 1s forwards";
      
    } else if (device == "Mobile" && deviceRotation == "Portrait") {
        let errorMessage = document.createElement("div");
        errorMessage.id = "error-message";
        errorMessage.innerHTML = `
            <p>Please turn your device</p>
            <img src="assets/menu/loadingerrormobile.png">
        `;
        document.getElementById("icon").remove();
        loading.appendChild(errorMessage);
    }

}, 1000);
