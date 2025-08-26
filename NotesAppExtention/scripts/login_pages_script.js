/**
 * Storage layout
 * 
 * allAccountsInfo{
 * 'User1': {'password': password, 
 *           'securityInfo': {'SecQue1': [question, answer],
 *                            'SecQue2': [question, answer],
 *                            'SecQue3': [question, answer]}, 
 *           'notesData': {notesDataDictionary}}}
 */

let allAccountsInfo = {};

window.addEventListener("load", () => {
    localStorage.setItem("currentUser", "");
    let stored = localStorage.getItem("allAccountsInfo");
    if (stored) {
        allAccountsInfo = JSON.parse(stored);
    }
    console.log(localStorage.getItem("currentUser"))
    console.log(allAccountsInfo);
});

if (document.body.id === "login_page") {
    const usernameInput = document.getElementById("username_input");
    const passwordInput = document.getElementById("password_input");
    const signInButton = document.getElementById("sign_in_button");

    const invalidLoginText = document.getElementById("invalid_login_text");

    signInButton.addEventListener("click", () => {
        if(!(allAccountsInfo[usernameInput.value] && passwordInput.value == allAccountsInfo[usernameInput.value]['Password'])){
            invalidLoginText.innerHTML = "<p>Invalid username or password</p>"
            return;
        }

        localStorage.setItem("currentUser", usernameInput.value);
        window.location.replace("notes_list.html");
    });
} else if (document.body.id === "create_account_page") {
    const usernameInput = document.getElementById("username_input");
    const passwordInput = document.getElementById("password_input");

    const secQue1Input = document.getElementById("sec_que_1_input");
    const secQue2Input = document.getElementById("sec_que_2_input");
    const secQue3Input = document.getElementById("sec_que_3_input");

    const answer1Input = document.getElementById("answer_1_input");
    const answer2Input = document.getElementById("answer_2_input");
    const answer3Input = document.getElementById("answer_3_input");

    const createAccountButton = document.getElementById("create_account_button");

    const invalidUsernameText = document.getElementById("invalid_username_text");
    const invalidPasswordText = document.getElementById("invalid_password_text");
    const emptyFieldText = document.getElementById("empty_field_text");

    createAccountButton.addEventListener("click", () => {
        invalidUsernameText.innerHTML = "";
        invalidPasswordText.innerHTML = "";
        emptyFieldText.innerHTML = "";

        let invalidInfo = false;

        const newAccInfo = [
            usernameInput.value, passwordInput.value,
            secQue1Input.value, answer1Input.value,
            secQue2Input.value, answer2Input.value,
            secQue3Input.value, answer3Input.value
        ];

        if (allAccountsInfo[newAccInfo[0]]) {
            invalidInfo = true;
            invalidUsernameText.innerHTML = "<p>This username is already taken</p>";
        }

        const hasNumber = /\d/.test(newAccInfo[1]);
        const hasSpecial = /[!@#$%^&*]/.test(newAccInfo[1]);

        if (newAccInfo[1].length < 5 || !hasNumber || !hasSpecial) {
            invalidInfo = true;
            invalidPasswordText.innerHTML =
                "<p>Password must be at least 5 characters long and contain at least one number and one of the following special characters (!,@,#,$,%,^,&,*)</p>";
        }

        newAccInfo.forEach(info => {
            if (info.trim() === "") {
                invalidInfo = true;
                emptyFieldText.innerHTML = "<p>One or more fields have been left empty</p>";
            }
        });

        if (invalidInfo) {
            return;
        }

        allAccountsInfo[newAccInfo[0]] = {
            'Password': newAccInfo[1],
            'SecurityInfo': {
                'SecQue1': [newAccInfo[2], newAccInfo[3]],
                'SecQue2': [newAccInfo[4], newAccInfo[5]],
                'SecQue3': [newAccInfo[6], newAccInfo[7]]
            },
            'NotesData': {}
        };

        localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
        localStorage.setItem("currentUser", newAccInfo[0]);
        window.location.replace("notes_list.html");
    });
} else if (document.body.id === "forgot_password_page") {
    const usernameInput = document.getElementById("username_input");
    const invalidUsernameText = document.getElementById("invalid_username_text");
    const getSecQueButton = document.getElementById("get_sec_que_button");

    const  secQue1 = document.getElementById("sec_que_1");
    const  secQue2 = document.getElementById("sec_que_2");
    const  secQue3 = document.getElementById("sec_que_3");

    const  answer1Input = document.getElementById("answer_1_input");
    const  answer2Input = document.getElementById("answer_2_input");
    const  answer3Input = document.getElementById("answer_3_input");

    const getPasswordOutput = document.getElementById("get_password");
    const getPasswordButton = document.getElementById("get_password_button");
    const invalidAnswersText = document.getElementById("invalid_answers_text");

    let username = "";

    getSecQueButton.addEventListener("click", () => {
        invalidUsernameText.innerHTML = "";
        username = usernameInput.value;

        if(!allAccountsInfo[username]){
            invalidUsernameText.innerHTML = "<p>This username does not match one in our database</p>"
            return;
        }
        usernameInput.disabled = true;
        getSecQueButton.disabled = true;

        secQue1.innerHTML = allAccountsInfo[username]['SecurityInfo']['SecQue1'][0]
        secQue2.innerHTML = allAccountsInfo[username]['SecurityInfo']['SecQue2'][0]
        secQue3.innerHTML = allAccountsInfo[username]['SecurityInfo']['SecQue3'][0]
    });

    getPasswordButton.addEventListener("click", () => {
        invalidAnswersText.innerHTML = "";

        if(!((answer1Input.value === allAccountsInfo[username]['SecurityInfo']['SecQue1'][1]) &&
            (answer2Input.value === allAccountsInfo[username]['SecurityInfo']['SecQue2'][1]) && 
            (answer3Input.value === allAccountsInfo[username]['SecurityInfo']['SecQue3'][1]))){

            invalidAnswersText.innerHTML = "<p>One or more answers are incorrect</p>";
            return;
        }

        getPasswordOutput.innerHTML = `<h3>Your Password:</h3><p>${allAccountsInfo[username]['Password']}</p>`
    });
}