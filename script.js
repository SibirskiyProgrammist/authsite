"use strict";

let users = [
    {
        "lg" : "admin",
        "ps" : "admin",
        "role": "admin"
    },
    {
        "lg" : "user",
        "ps" : "user",
        "role": "user"
    }
];

let btnlog = document.querySelector(".btnlog");
let logScreen = document.querySelector(".blform");
let content = document.querySelector(".content");
let recover = document.querySelector(".recoverpass");
let recoverPage = document.querySelector(".recoverpage");
let loginField = document.querySelector("#authlogin");
let passwordField = document.querySelector("#authpass");
let logoutButton = document.getElementById("logoutbutton");
let buttonAuth = document.querySelector(".buttonauth");
let authForm = document.querySelector(".authform");

logoutButton.style.display = "none";
recover.style.display = "block";

btnlog.addEventListener("click", formwrap);

function formwrap() {
    logScreen.style.display = "block";
    authForm.style.display = "none";
    recoverPage.style.display = "none";
    let frmbut = document.querySelector(".frmbut");
    frmbut.addEventListener("click", getLogPass);
}

function getLogPass() {
    let frmlog = document.querySelector("#frmlog").value;
    let frmpass = document.querySelector("#frmpass").value;
    checkLogPass(frmlog, frmpass);
}

function checkLogPass(login, password) {
    if(checkChars(login)){
        for (const user of users) {
            if(user.lg == login && user.ps == password){

                content.innerHTML = `Hello, ${login}`;
                if(user.role == 'admin'){
                    content.innerHTML += "<br> => admin";
                }
                else{
                    content.innerHTML += "<br> => user";
                }
                logScreen.style.display = "none";
                authForm.style.display = "none";
                btnlog.style.display = "none";
                buttonAuth.style.display = "none";
                recover.style.display = "none";
                logoutButton.style.display = "block";
                logoutButton.addEventListener("click", logOutEvent);
                
                

                return;
            }
        }

        alert("Error login/pass");
    }
}

function logOutEvent(){
    btnlog.style.display = "inline-block";
    buttonAuth.style.display = "inline-block";
    logoutButton.style.display = "none";

    content.innerHTML = "";
    authForm.style.display = "none";
    recover.style.display = "inline-block";
}

buttonAuth.addEventListener("click", authFormWrap);

function authFormWrap(){
    recoverPage.style.display = "none";
    authForm.style.display = "block";
    logScreen.style.display = "none";
    let createAccountEvent = document.querySelector(".accessauth");
    createAccountEvent.addEventListener("click", accountCreationProcess);
}

function accountCreationProcess(){
    if(checkChars(loginField.value) && checkEmptinessOfFields(passwordField.value)){
		for(const user of users){
			if(user.lg == loginField.value){
				alert("Error login!");
				return;
			}
		}

		users.push({
			"lg" : loginField.value,
			"ps" : passwordField.value,
			"role": "user",
		});
	}
}

function checkEmptinessOfFields(str){
    if(str.length == 0){ alert("Input password!"); return false; }
	for(let i = 0; i < str.length; i++){
		if(str.charAt(i) == ' '){ alert("No use spaces in password!"); return false; }
	}

	return true
}

function checkChars(str){
    if(str.length == 0){ alert("Input login!"); return false; }
	for(let i = 0; i < str.length; i++){
		if(!(
		 str.charAt(i) >= 'a' && str.charAt(i) <= 'z' ||
		 str.charAt(i) >= 'A' && str.charAt(i) <= 'Z' ||
		 str.charAt(i) >= '0' && str.charAt(i) <= '9'
		 )){ alert("Use only english chars and numbers!"); return false; }
	}
    return true;
}

function checkPositionLogin(log){
    for (const user of users) {
        if(user.lg == log){
            return true;
        }
    }
    return false;
}

recover.addEventListener("click", openFormOfRecoverLogin);

function openFormOfRecoverLogin(){
    recoverPage.style.display = "block";
    let accessRecover = document.querySelector(".buttonrecover");
    accessRecover.addEventListener("click", recoverPasswordEvent);
}

function recoverPasswordEvent(){
    let login = document.querySelector("#logininfo").value;
	for(const user of users){
		if(user.lg == login){
			content.innerHTML = user.ps;
			return;
		}
	}
}