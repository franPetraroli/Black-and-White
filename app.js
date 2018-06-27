const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const uplodadfile = document.getElementById('upload-file')
var img = new Image();

uplodadfile.addEventListener('change', handleImage, false)

//Add Filters
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('filter-btn')){
    if(e.target.classList.contains('btn-classic')){
      Caman('#canvas', function(){
        this.saturation(-100).render()
      })
    }if(e.target.classList.contains('btn-sin-city')){
      Caman('#canvas', function(){
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
