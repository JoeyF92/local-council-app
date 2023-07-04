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
            const options = {
                method: "DELETE",
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              };
            const res = await fetch("http://localhost:3000/users/logout", options)
            const data = await res.json();
            if(res.status==202){
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                profile.innerText = `Profile`
                windows.history.back()
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


loggedIn()
