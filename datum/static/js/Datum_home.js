var opt = document.querySelector('.Options')
var NoteDivs = document.querySelector('.TitleNotes')
var set = document.querySelector('.settings')
 
var gallery = document.getElementById('gallery_icon')
var fileDiv = document.querySelector('.fileChoose')
var tool1  = document.querySelector('.tooltiptext')
var tool2  = document.querySelector('.tooltiptext2')

set.addEventListener('click', function(){
    opt.classList.toggle('slide1')
    tool1.classList.toggle('none')
    tool2.classList.toggle('none')
})

// gallery.addEventListener('click', function(){
//     fileDiv.classList.toggle('slide2')
// })