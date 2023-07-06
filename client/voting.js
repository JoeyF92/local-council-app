// const { createECDH } = require("crypto")
// const { create } = require("../server/models/User")

//const { vote } = require("../server/models/Submissions")

const carousel = document.querySelector("#myCarousel")

const fetchProposals = async () =>{
    try{
        const res= await fetch('http://localhost:3000/submissions')
        if (res.ok){
            const data= await res.json()
            console.log(data)
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
    console.log("hello")
    const indicators = document.querySelector(".carousel-indicators")
    const images = document.querySelector(".carousel-inner")
    let counter=0
    let proposal = 1 
    indicators.innerHTML=""
    images.innerHTML=""
    data.forEach(element => {
        if(data[counter]['submission_status']=="approved"){
            const li = document.createElement('li')
            //const div = document.createElement('div')
            const img = document.createElement('img')
            const imageDiv = document.createElement('div')
            const captionDiv = document.createElement('div')
            const title = document.createElement('h4')
            const p = document.createElement('p')
            li.setAttribute('data-target',"#myCarousel")
            if(proposal==1){
                //this part creates the indicator
                // div.className='item active'
                // div.append(img)
                li.setAttribute(`data-slide-to`, '0')
                li.classList.add('active')
                //this part creates the image
                imageDiv.classList.add('item', 'active')
                img.src = data[counter]["photo"]
                
                img.alt = data[counter]["title"]
                //carousel caption

            }else{
                //this part creates the indicator
                // div.className='item'
                // img.src = data["photo"]
                // div.append(img)
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
    console.log(images)
    carousel.append(indicators)
}

const postToAccordion = (data) =>{
    let counter = 0
    let proposalsCounter = 1
    const div = document.querySelector('.panel-group')
    div.innerHTML=""
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
            //create vote button with modal
            const voteButton = document.createElement('button')
            voteButton.classList.add('btn', 'btn-info', 'btn-lg', 'btn-center')
            voteButton.setAttribute('type', 'button')
            voteButton.setAttribute('data-toggle',"modal")
            voteButton.setAttribute('data-target',`#myModal${proposalsCounter}`)//
            voteButton.innerHTML = `Vote ${proposalsCounter}`
            //modal content
            const modalDiv = document.createElement('div')
            modalDiv.classList.add('modal', 'fade')
            modalDiv.setAttribute('id',`myModal${proposalsCounter}`)//
            modalDiv.setAttribute('role','dialog')
            const modalDiv2 = document.createElement('div')
            modalDiv2.classList.add('modal-dialog')
            const modalDiv3 = document.createElement('div')
            modalDiv3.classList.add('modal-content')
            const modalDivHeader = document.createElement('div')
            modalDivHeader.classList.add('modal-header')
            const modalHeader = document.createElement('h4')
            modalHeader.classList.add('modal-title')
            modalHeader.innerHTML= `Proposal ${proposalsCounter}: ${data[counter]['title']}`
            modalDivHeader.append(modalHeader)
            const modalDivBody = document.createElement('div')
            modalDivBody.classList.add('modal-body')
            const modalBody = document.createElement('p')
            modalBody.innerHTML= `Cast your Vote! You have ${7-localStorage.getItem('votes')} votes remaining.` 
            modalDivBody.append(modalBody)
            //vote button
            console.log("Vote Button")
            const voteButtonModal = document.createElement('button')
            voteButtonModal.setAttribute('type', 'button')
            voteButtonModal.classList.add('btn', 'btn-default', 'vote-button')
            voteButtonModal.setAttribute('data-dismiss', 'modal')
            voteButtonModal.setAttribute('proposalId', data[counter]['submission_id'])
            voteButtonModal.innerHTML='Vote'
            voteButtonModal.addEventListener('click', (e) =>{
                if(!localStorage.getItem('username')){
                    alert('Please Login to Vote')
                }else{
                    const submission_id = (voteButtonModal.getAttribute('proposalId'))
                    console.log(submission_id)
                    castVote(submission_id)
            }

            })
            //
            const modalDivFooter = document.createElement('div')
            modalDivFooter.classList.add('modal-footer')
            const footerButton = document.createElement('button')
            footerButton.setAttribute('type', 'button')
            footerButton.classList.add('btn', 'btn-default')
            footerButton.setAttribute('data-dismiss', 'modal')
            footerButton.innerHTML='Back'


            modalDivFooter.append(voteButtonModal, footerButton)
            modalDiv3.append(modalDivHeader, modalDivBody, modalDivFooter)
            modalDiv2.append(modalDiv3)
            modalDiv.append(modalDiv2)
            //

            //appends
            header.append(anchor)
            headingDiv.append(header)
            panelDiv.append(headingDiv)
            infoDiv.append(infoBodyDiv)
            infoDiv.append(voteButton,modalDiv)
            panelDiv.append(infoDiv)
            proposalsCounter ++
        }
        counter ++
        div.append(panelDiv)
    })
    
}

const castVote = async (proposal_id)=>{
    const options = {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            votes: 1
        })
    }
    try{
        const res= await fetch(`http://localhost:3000/submissions/vote/${proposal_id}`, options)
        if (res.ok){
            const data= await res.json()
            localStorage.setItem('votes', (data['votes']))
            alert("Vote Cast")
            window.location.reload()
        }else{
            throw "Error: http Status Code = " + res.status
        }}
        catch(err){
            console.log(err)
            alert("No votes remaining")
        }
}


fetchProposals()
