let input = document.getElementById('input');
let boxes = document.querySelector('.boxes');
let allBox = document.querySelectorAll('.box');
let nextPage = document.getElementById('next-page')
let count = 1
console.log(nextPage)


//Not in use
let sf = function searchFilter(cb,arr,inp){
    let narr = arr;
    console.log(narr[0].title,"SFFF")

    allBox.forEach(box => {
        console.log(box.textContent)  
        // narr.title
        if(box.textContent.toLowerCase().indexOf(inp) > -1){
            box.style.display = ""
        } else {
            box.style.display = "none"
        }
    })
}


function loadData(index){
    console.log(index)
    let ab ;

    localStorage.setItem('index', index)
    localStorage.setItem('counter', count)
    fetch('https://www.episodate.com/api/most-popular?page=1')
        .then(res => res.json())
        .then(data => {
            console.log(data.tv_shows,"ASASA");
            localStorage.setItem('Fetched', JSON.stringify(data.tv_shows[index]))
            let d = localStorage.getItem('Fetched')
        })       
}


function popupDisplay(index){
    // console.log();
    let popup = document.getElementsByClassName('popup')[index];
        popup.style.opacity = "1"
}

function cancelPopup(index){
    let popup = document.getElementsByClassName('popup')[index];
         popup.style.opacity = "0"
    
}


function removeFromDom(arr){

    while(boxes.firstChild){
        boxes.firstChild.remove();
    }
}

//Create Boxes and remove boxes from Dom
let cb = function createBoxes(arr,count){
    if(boxes){
        removeFromDom()
    }

    let newArr = arr
    let box = document.createElement('div');

    //Create Dynammic boxes from the data from the api
    newArr.map((el,index) => {
        box = document.createElement('div');
        box.classList.add('box');
        let btn = document.createElement('button');
        btn.innerHTML = "Show more"
        box.innerHTML = 
            ` <div class="apiDetails"> 
                     <div class="titleImg" onclick="cancelPopup(${index})">
                      <h4 class="h4Title">${el.name}</h4> 
                        <img src="${el.image_thumbnail_path}" onmouseover="cancelPopup(${index})" alt="" class="imgApi">
                        <button onclick="loadData(${index})"  onmouseover="popupDisplay(${index})" class="btn"><a href="show.html">Show more</a></button>
                      <div class="popup"></div>
             </div>`
            //  <a href="show.html">Show more</a>
        boxes.appendChild(box)
    }) 
}


//Call Api and filter the data, then call CreateBoxes with the data we parsed
function callAPI(cb, inp, count){
    let arr;

    //Fetch from api
    // https://api.thetvdb.com
    // https://jsonplaceholder.typicode.com/photos
    fetch(`https://www.episodate.com/api/most-popular?page=${count}`)
        .then(res => res.json())
        .then(data => {
             arr = data.tv_shows
            //  console.log(arr)

             //filter the array with the input from the search field
             let fil = arr.filter(el => el.name.toLowerCase().indexOf(inp) > -1)
            console.log(fil);
            cb(fil,inp,count)
        })
}


nextPage.addEventListener('click',() => {
    count += 1
    callAPI(cb, "", count)
    console.log(count)
})


input.addEventListener('keyup', (e) => {
    let inp = e.target.value

    callAPI(cb, inp, count)
})

//init squares
callAPI(cb,"",count)