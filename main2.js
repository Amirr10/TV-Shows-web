let pic = document.getElementsByClassName('pic')[0];
let info = document.querySelector('.info')
let rating = document.querySelector('.rating')


// let nn =  localStorage.getItem('Fet')
//            console.log(JSON.parse(nn));
//            let na = nn[0].name


function loadData(det){
    console.log("AAA")
    let ind = localStorage.getItem('index')
    let count = localStorage.getItem('counter')


    fetch(`https://www.episodate.com/api/most-popular?page=${count}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.tv_shows[ind].name);
            // det(data.tv_shows[ind].name)

            pic.innerHTML = ` <img src="${data.tv_shows[ind].image_thumbnail_path}" width="100%" height="100%" alt="">`
            info.innerHTML = `<h3>${data.tv_shows[ind].name}</h3>
                     <h3> Start Date - ${data.tv_shows[ind].start_date}</h3>
                     <h3>Network: ${data.tv_shows[ind].network}</h3>
                     <h3>Country: ${data.tv_shows[ind].country}</h3> 
                     <button class="add-btn">Add To Watch List</button>`


                let addBtn = document.querySelector('.add-btn')
                addBtn.addEventListener('click', () => {

                let fetchedData = localStorage.getItem('Fetched')
                let newArr = [fetchedData , data.tv_shows[ind].name]
                console.log(newArr)

                localStorage.setItem('Fetched', newArr)
                let leftPic = document.getElementsByClassName('rightInfo')[1]

                leftPic.innerHTML = `<div class="watchList"><h3>${newArr}</h3></div>`
            })


           fetch(`https://www.episodate.com/api/show-details?q=${data.tv_shows[ind].name}`)
           .then(res => res.json())
           .then(ndata => {
               let newA = ndata

             console.log(newA,'AAAAAAA')

                // rating.innerHTML = `<h3>Rating: ${tvshow}</h3>`
            })
            
        })
            
}


let det = (name) => {

fetch(`https://www.episodate.com/api/show-details?q=${name}`)
            .then(res => res.json())
            .then(data => {
            console.log(data);
        })

    }

loadData(det);



let ar12 = [12,3,5,7,3]

const ar = [...ar12 , 33,11]

// console.log(ar)