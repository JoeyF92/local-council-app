document.querySelector("#submit").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(document.querySelector("#login"))
    const form = new FormData(document.querySelector("#login"));
    console.log(form.get("username"))
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("pwd")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("voting.html");
    } else {
        alert(data.error);
    }
})
