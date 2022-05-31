
async function a() {
    try {
        let url = `/friends/${localStorage.getItem("name")}`;
        let res = await fetch(url);
        let friends = await res.json();
        
        
        function getFriendCode(friends) {
            let code = "";
            let i = 1;
            friends.forEach(friend => {
                if (i % 3 == 1) {
                    code = code + `<div class="row">
                    ${getcolcode(friend)}
                    `;
                    if (i == friends.length) {
                        code = code + `<div class="col friend">
                        </div>
                        <div class="col friend">
                        </div>
                        </div>`;
                    }
                    console.log(friend);
                    i++;
                } else if (i % 3 == 2) {
                    code = code + getcolcode(friend);
                    if (i == friends.length) {
                        code = code + `<div class="col friend">
                        </div>
                        </div>`;
                    }
                    console.log(friend);
                    i++;
                } else {
                    code = code + `${getcolcode(friend)}
                </div>`;
                console.log(friend);
                    i++;
                }
            });
        
        
            return code;
        }
        
        document.getElementById("friends").innerHTML = getFriendCode(friends);
        function getcolcode(friend) {
            return `<div class="col friend" onclick='redirectToUser("${friend.email}")'>
            <div class="dp">
                <img src="/images/avatars/${friend.dp}.png" alt="">
            </div>
               <h6> ${friend.name} </h6>
          </div>`;   
        }
        
        
    } catch (e) { console.log(e); }
}
a();
function redirectToUser(email) {
    var url = '/user/' + email;
    var form = $(`<form action="${url}" method="post">
        <input type="text" name="currentUserId" value="${localStorage.getItem('name')}" />
        </form>`);
    $('body').append(form);
    form.submit();
}

// let friends = [
//     { dp: "male-1", name: "Doggy ji" ,email:"dog@gmail.com"},
//     { dp: "female-4", name: "IDk him" ,email:"white1@gmia.ocm"},
//     { dp: "female-2", name: "Yashika Jindal" ,email:"himanshu@gmail.com"},
//     { dp: "male-4", name: "Prateek Rawat" ,email:"himanshu@gmail.com"},
//     { dp: "female-4", name: "Sanika Jain" ,email:"himanshu@gmail.com"},
//     { dp: "female-3", name: "Himanshi Jain" ,email:"himanshu@gmail.com"},
//     { dp: "female-3", name: "Himanshi Jain" ,email:"himanshu@gmail.com"},
//     { dp: "female-3", name: "Himanshi Jain" ,email:"himanshu@gmail.com"},
//     { dp: "female-3", name: "Himanshi Jain" ,email:"himanshu@gmail.com"},
//     { dp: "female-3", name: "Himanshi Jain" ,email:"himanshu@gmail.com"},
//     { dp: "male-3", name: "Prashanshu Rawat" ,email:"himanshu@gmail.com"}
// ];
