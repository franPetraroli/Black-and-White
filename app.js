const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const uplodadfile = document.getElementById('upload-file')
const revert = document.getElementById('revert')
const downloadBtn = document.getElementById('download')

let fileName = ''
let img = new Image();

uplodadfile.addEventListener('change', handleImage, false)
//Revert Changes
revert.addEventListener('click', (e)=>{
  Caman('#canvas', img, function(){
    this.revert()
  })
})

downloadBtn.addEventListener("click", () => {
  // Get ext
  const fileExtension = fileName.slice(-4);

  // Init new filename
  let newFilename;

  // Check image type
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    // new filename
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }

  // Call download
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}

//Add Filters
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('filter-btn')){
    if(e.target.classList.contains('btn-classic')){
      Caman('#canvas', function(){
        this.saturation(-100).render()
      })
    }if(e.target.classList.contains('btn-sin-city')){
      Caman('#canvas',img, function(){
        this.sinCity().render()
      })
    }
  }
})

function handleImage(e) {
  const reader = new FileReader()
  reader.onload = function (event) {
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}
