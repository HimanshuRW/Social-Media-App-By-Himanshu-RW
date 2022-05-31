function logout() {
    window.location.href = "/logout";
}
function findUser() {
    let searchInput = document.getElementById("searchInput");

    // --------------------same api in register ----------------------------
    // let present = fetch("return true if user present in db");
    let present = false;
    // ---------------------------------------------------------

    if (present) {
        window.location.href = `/${searchInput.value}`;
    } else {
        searchInput.className = searchInput.className + " is-invalid";
        document.getElementById("UserNotFound").style.display = "block";
    }

}
async function a() {
    let users_requests = document.getElementById("users-requests");
    users_requests.innerHTML = await getallRequests();
}
a();
async function getallRequests() {
    try {
        let code = "";
        // let reqArray = [
        //     { dp: "male-4", name: "Idk him", email: "white1@gmia.ocm" },
        //     { dp: "female-4", name: "JNU Delhi", email: "jnu@gmail.com" },
        //     { dp: "female-2", name: "Dog bhaiya", email: "dog@gmail.com" },
        //     { dp: "male-4", name: "Prateek Rawat", email: "himanshu@gmail.com" },
        //     { dp: "female-4", name: "Sanika Jain", email: "himanshu@gmail.com" },
        //     { dp: "female-3", name: "Himanshi Jain", email: "himanshu@gmail.com" },
        //     { dp: "female-3", name: "Himanshi Jain", email: "himanshu@gmail.com" },
        //     { dp: "female-3", name: "Himanshi Jain", email: "himanshu@gmail.com" },
        //     { dp: "female-3", name: "Himanshi Jain", email: "himanshu@gmail.com" },
        //     { dp: "female-3", name: "Himanshi Jain", email: "himanshu@gmail.com" },
        //     { dp: "male-3", name: "Prashanshu Rawat", email: "himanshu@gmail.com" }
        // ];

        let url = `/requests/${localStorage.getItem("name")}`;
        let res = await fetch(url);
        let reqArray = await res.json();
        reqArray.forEach(userReq => {
            code = code + `
            <nav class="user-request navbar navbar-light bg-light justify-content-between align-items-center">
            <div class='auser' onclick='redirectToUser("${userReq.email}")'>
              <img src="images/avatars/${userReq.dp}.png" alt="">
              <span class="navbar-brand">${userReq.name}</span>
            </div>
            <button class="btn btn-outline-info my-2 my-sm-0" onclick='acceptUser("${userReq.email}")'>Accept Friend Request</button>
          </nav>`;
        });
        return code;
    } catch (error) {
        console.log("Catch bobk of getalrequests function of home.js ->", error);
    }
}

async function acceptUser(anotherUserEmail) {
    try {
        let params = {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                currentUserId : localStorage.getItem("name"),
                toAccept:anotherUserEmail
            })
        }
        let url = "/acceptRequets";
        let res = await fetch(url,params);
        location.reload();
    } catch (e) { console.log(e); }
}

function redirectToUser(email) {
    var url = '/user/' + email;
    var form = $(`<form action="${url}" method="post">
        <input type="text" name="currentUserId" value="${localStorage.getItem('name')}" />
        </form>`);
    $('body').append(form);
    form.submit();
}



let suggestions = document.getElementById("suggestions");
let searchInput = document.getElementById("searchInput");
async function bringSuggestions() {
    if (searchInput.value=="") {
        searchInput.className = searchInput.className + " is-invalid";
        document.getElementById("UserNotFound").style.display = "block";
        suggestions.innerHTML = "";
    } else {
        let result = await getAllSugeestions(searchInput.value);
        if (result=="") {
            searchInput.className = searchInput.className + " is-invalid";
            document.getElementById("UserNotFound").style.display = "block";
            suggestions.innerHTML = "";
        } else {
            suggestions.innerHTML = result;
        }
    }
}
searchInput.addEventListener("keyup",bringSuggestions);
async function getAllSugeestions(userQuery) {
    try {
        let code = ``;
        let url = `/findUsers/${userQuery}`;
        let res = await fetch(url);
        let data = await res.json();
        data.forEach(suggestedUser => {
            code = code + `
                    <li class="list-group-item" onclick="redirectToUser('${suggestedUser.email}')">
                      <img src="/images/avatars/${suggestedUser.dp}.png" alt="">
                      <div class="userName">${suggestedUser.name}</div>
                    </li>
            `;
        });
        return code;
    } catch (e) { console.log(e); }
}