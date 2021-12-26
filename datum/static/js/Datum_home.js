var opt = document.querySelector('.Options')
var NoteDivs = document.querySelector('.TitleNotes')
var set = document.querySelector('.settings')
 
var gallery = document.getElementById('gallery_icon')
var fileDiv = document.querySelector('.fileChoose')

set.addEventListener('click', function(){
    opt.classList.toggle('slide1')
})

// gallery.addEventListener('click', function(){
//     fileDiv.classList.toggle('slide2')
// })