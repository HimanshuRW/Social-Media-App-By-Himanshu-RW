const form = document.getElementById("register-form");
let gender =Array.from(form.elements["gender"]);
gender.forEach(radio => {
    radio.addEventListener("click",(e)=>{
        let avatar_group = document.getElementById("avatar-group");
        if(radio.value=="male"){
            avatar_group.innerHTML = genderCode("male");
        } else{
            avatar_group.innerHTML = genderCode("female");
        }
    })
});

function genderCode(gender) {
    return `
    <label id="label-avatar"><i class="zmdi zmdi-gender">Choose an avatar</i></label>
    <div class="avatars-options">
        <div class="avatar-input">
            <input type="radio" name="avatar" id="img1" class="input-hidden" value="${gender}-1" required />
            <label class="avatar-option" for="img1">
                <img src="/images/avatars/${gender}-1.png" />
            </label>
        </div>
        <div class="avatar-input">
            <input type="radio" name="avatar" id="img2" class="input-hidden" value="${gender}-2" required />
            <label class="avatar-option" for="img2">
                <img src="/images/avatars/${gender}-2.png" />
            </label>
        </div>
        <div class="avatar-input">
            <input type="radio" name="avatar" id="img3" class="input-hidden" value="${gender}-3" required />
            <label class="avatar-option" for="img3">
                <img src="/images/avatars/${gender}-3.png" />
            </label>
        </div>
        <div class="avatar-input">
            <input type="radio" name="avatar" id="img4" class="input-hidden" value="${gender}-4" required />
            <label class="avatar-option" for="img4">
                <img src="/images/avatars/${gender}-4.png" />
            </label>
        </div>
    </div>
    `;
}