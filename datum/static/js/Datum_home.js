var opt = document.querySelector('.Options')
var NoteDivs = document.querySelector('.TitleNotes')
var set = document.querySelector('.settings')

var gallery = document.getElementById('gallery_icon')
var fileDiv = document.querySelector('.fileChoose')
var tool1 = document.querySelector('.tooltiptext')
var tool2 = document.querySelector('.tooltiptext2')

set.addEventListener('click', function () {
    opt.classList.toggle('slide1')
    tool1.classList.toggle('none')
    tool2.classList.toggle('none')
})

// gallery.addEventListener('click', function(){
//     fileDiv.classList.toggle('slide2')
// })

var noteDivs = document.querySelectorAll('.HalfContent');
Array.from(noteDivs).forEach(function (noteDiv) {
    noteDiv.addEventListener('click', function (e) {
        if (e.target.className == 'optBtn') {
            noteDiv.children[1].classList.toggle('open')
        }
    })
})

// To handle the search functionality
const searchBtnDiv = document.querySelector('.searchBtnDiv')
const searchBtn = searchBtnDiv.querySelector('button');
const searchBtnImg = searchBtn.querySelector('img');
const searchBarDiv = document.querySelector('.searchDiv');
const searchBarForm = searchBarDiv.querySelector('form');
const searchBar = searchBarDiv.querySelector('input');
const cancelDiv = document.querySelector('.cancelDiv');

searchBtnDiv.addEventListener('click', function (e) {
    if (e.target.closest('#searchBtn1').matches('.searchBtn')) {
        if (searchBarDiv.classList.contains('opener')) return;
        searchBarDiv.classList.add('opener');
    }
})

cancelDiv.addEventListener('click', function () {
    searchBarDiv.classList.add('closer');
    searchBarDiv.classList.remove('opener');
})

// To search for a note by note-title
searchBar.addEventListener('keyup', function () {
    var searchTerm = searchBar.value.toLowerCase();
    const notes = document.querySelectorAll('.HalfContent')
    Array.from(notes).forEach((note) => {
        var title = note.children[2].firstElementChild.textContent;
        if (title.toLowerCase().indexOf(searchTerm) != -1) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    })
})
searchBarForm.addEventListener('submit', function (e) {
    e.preventDefault();
})
