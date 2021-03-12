const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const takePhotoBtn = document.querySelector("#take-photo");

let width;
let height;

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((videoStream) => {
    video.srcObject = videoStream;
    video.play();
    video.hidden = true;
  })
  .catch((err) => console.log(err));

video.addEventListener("canplay", streamVideoToCanvas);
function streamVideoToCanvas() {
  width = video.videoWidth;
  height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 0);
}
takePhotoBtn.addEventListener("click", takePhoto);
function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  // get base64 string of photo
  let photo = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.setAttribute("download", "myPhoto");
  a.href = photo;
  a.innerHTML = `<img src=${photo}>`;
  strip.prepend(a);
}
function greenScreen(pixels) {
  let minMaxRGB = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    minMaxRGB[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];

    // if r, g, b are between min r,g,b, and max r,g,b - remove it from pixels,
    // setting its alpha to 0
    if (
      red <= minMaxRGB.rmax &&
      red >= minMaxRGB.rmin &&
      green <= minMaxRGB.gmax &&
      green >= minMaxRGB.gmin &&
      blue <= minMaxRGB.bmax &&
      blue >= minMaxRGB.bmin
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}
