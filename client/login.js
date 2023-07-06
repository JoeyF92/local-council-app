document.querySelector("#login").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("userInfo"));
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    if (response.status == 200) {
        localStorage.setItem("username", form.get("username"))
        localStorage.setItem("token", data.token.token);
        localStorage.setItem("votes",(data.voteCount))
        localStorage.setItem("user_id", data.userId)
        window.history.back();
        alert(`Welcome ${localStorage.getItem('username')}`)
    } else {
        alert(data.error);
    }
})

document.querySelector("#register").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(document.querySelector("#userInfo"));
    console.log(form.get("username"))
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("login.html");
        alert("User created!")
    } else {
        alert(data.error);
    }
})

