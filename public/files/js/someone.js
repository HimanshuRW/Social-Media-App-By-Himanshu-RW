async function sendReq(sendTo) {
    try {
        let params = {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                currentUserId : localStorage.getItem("name"),
                to:sendTo
            })
        }
        let url = "/requests";
        console.log(url);
        let res = await fetch(url,params);
        let btn = document.getElementById("reqBtn");
        btn.className = "btn btn-success";
        btn.innerText = "Request Sent";
    } catch (e) { console.log(e); }
}