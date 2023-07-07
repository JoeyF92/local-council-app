// const nav = document.querySelector("#navbar-placeholder")
// nav.load(nav.html)

document.querySelector('#voting').addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.href="voting.html"
})
document.querySelector('#inProgress').addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.href="progress.html"
})
document.querySelector('#successStories').addEventListener('click', (e) =>{
    e.preventDefault()
    window.location.href="stories.html"
})
document.querySelector('#profile').addEventListener('click', (e) =>{
    e.preventDefault()
    if(localStorage.getItem('username')){
        alert("You are logged in!")
    }else{
        window.location.href="login.html"
    }
    
})

