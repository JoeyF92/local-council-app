const carousel = document.querySelector("#myCarousel")

const fetchProposals = async () =>{
    try{
        const res= await fetch('http://localhost:3000/submissions')
        if (res.ok){
            const data= await res.json()
            console.log(data)
            postToCarousel(data)
        }else{
            throw "Error: http Status Code = " + res.status
        }}
        catch(err){
            console.log(err)
        }
}

const postToCarousel = (data)=>{
    const indicators = document.querySelector(".carousel-indicators")
    const images = document.querySelector(".carousel-inner")
    let counter=0
    indicators.innerHTML=""
    console.log(indicators)
    data.forEach(element => {
        console.log("hi")
        const li = document.createElement('li')

        if(counter==0){
            const div = document.createElement('div')
            const img = document.createElement('img')
            img.src = data["photo"]
            div.className='item active'
            div.append(img)
            li.innerHTML= `data-target="#myCarousel" data-slide-to="0" class="active"`
        }else{
            const div = document.createElement('div')
            div.className='item'
            const img = document.createElement('img')
            img.src = data["photo"]
            div.append(img)
            li.innerHTML= `data-target="#myCarousel" data-slide-to="${counter}"`
            
        }
        console.log(li)
        indicators.append(li)

        counter ++

    });
    carousel.append(indicators)
}

fetchProposals()
