// const nav = document.querySelector("#navbar-placeholder")
// nav.load(nav.html)
const loggedIn = ()=>{
    if(localStorage.getItem('username')){
        const profile=document.querySelector("#profile")
        profile.addEventListener('click', e=>{
            console.log(localStorage.getItem('username'))
        })
        profile.innerText = `${localStorage.getItem('username')}`
        const logout=document.getElementById("logoutButton")
        logout.innerText= "Logout"
        const token = JSON.stringify(localStorage.getItem("token"))
        console.log(token)        
        logout.addEventListener('click', async (e)=>{
            e.preventDefault()
            const token = localStorage.getItem("token")
            console.log(token)
            const options = {
                method: "DELETE",
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              };
            const res = await fetch("http://localhost:3000/users/logout", options)
            const data = await response.json();
            if(res.status==202){
                localStorage.removeItem('token')
                window.location.href="index.html"
            }else{
                console.log(res)
                console.log(data)
            }
            
        })
    }else{
        document.getElementById("logoutButton").addEventListener('click', (e)=>{
            window.location.href="login.html"
        })
    }
}


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


loggedIn()
