// const { createECDH } = require("crypto")
// const { create } = require("../server/models/User")

const carousel = document.querySelector("#myCarousel")

const fetchProposals = async () =>{
    try{
        const res= await fetch('http://localhost:3000/submissions')
        if (res.ok){
            const data= await res.json()
            postToCarousel(data)
            postToAccordion(data)
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
    let proposal = 1 
    indicators.innerHTML=""
    images.innerHTML=""
    data.forEach(element => {
        if(data[counter]['submission_status']=="approved"){
            const li = document.createElement('li')
            const div = document.createElement('div')
            const img = document.createElement('img')
            const imageDiv = document.createElement('div')
            const captionDiv = document.createElement('div')
            const title = document.createElement('h4')
            const p = document.createElement('p')
            li.setAttribute('data-target',"#myCarousel")
            if(counter==0){
                //this part creates the indicator
                div.className='item active'
                div.append(img)
                li.setAttribute(`data-slide-to`, '0')
                li.classList.add('active')
                //this part creates the image
                imageDiv.classList.add('item', 'active')
                img.src = data[counter]["photo"]
                img.alt = data[counter]["title"]
                //carousel caption

            }else{
                //this part creates the indicator
                div.className='item'
                img.src = data["photo"]
                div.append(img)
                li.setAttribute(`data-slide-to`,`${counter}`)
                //this part creates the image
                imageDiv.classList.add('item')
                img.src = data[counter]["photo"]
                img.alt = data[counter]["title"]
                
            }
            //carousel caption
            captionDiv.className="carousel-caption"
            title.innerHTML = `Proposal ${proposal}`
            p.innerHTML=data[counter]['title']
            p.setAttribute('style','color: #F7FF00')
            captionDiv.append(title)
            captionDiv.append(p)
            imageDiv.append(captionDiv)
            indicators.append(li)
            imageDiv.append(img)
            images.append(imageDiv)
            proposal++
        }
        counter ++

    });
    carousel.append(indicators)
}

const postToAccordion = (data) =>{
    console.log('hello')
    let counter = 0
    let proposalsCounter = 1
    const div = document.querySelector('.panel-group')
    // div.innerHTML=""
    data.forEach(element => {
        const panelDiv = document.createElement('div')
        const headingDiv = document.createElement('div')
        const infoDiv = document.createElement('div')
        const infoBodyDiv = document.createElement('div')
        const header = document.createElement('h4')
        const anchor = document.createElement('a')
        if(data[counter]['submission_status']=="approved"){
            panelDiv.classList.add('panel', 'panel-default')
            headingDiv.classList.add('panel-heading')
            header.classList.add('panel-title')
            anchor.setAttribute('data-toggle',"collapse")
            anchor.setAttribute('data-parent',"#accordion")
            anchor.setAttribute('href',`#collapse${proposalsCounter}`)
            anchor.innerHTML=`Proposal ${proposalsCounter}: ${data[counter]['title']}`
            infoDiv.setAttribute('id',`collapse${proposalsCounter}`)
            if(proposalsCounter==1){
                infoDiv.classList.add('panel-collapse', 'collapse', 'in') //in the example found there is an additional class name 'in' for the first one which might have the first one open to begin with, hopefully no bugs with that 
            }else{
                infoDiv.classList.add('panel-collapse', 'collapse')
            }
            infoBodyDiv.classList.add('panel-body')
            infoBodyDiv.innerHTML=data[counter]['proposal']

            //appends
            header.append(anchor)
            headingDiv.append(header)
            panelDiv.append(headingDiv)
            infoDiv.append(infoBodyDiv)
            panelDiv.append(infoDiv)
            proposalsCounter ++
        }
        counter ++
        div.append(panelDiv)
    })
    
}

fetchProposals()
