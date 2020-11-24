import {handleSubmit} from "./components/formHandler.js"
import {createEmailsList} from "./components/createEmailList.js"

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archive').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  

  // Other Event Listeners
  document.querySelector("#close-form").addEventListener('click', closeForm)

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#compose-form').addEventListener('submit', handleSubmit)
  
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

export function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  // Show the mailbox name
  document.querySelector('#list-title').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>` ;
  removeListEventListeners()
  getEmailsFromApi(mailbox, createEmailsList)
  changeButtonStatus(mailbox, "add")
}
// Get Emails using Fetch.
function getEmailsFromApi(mailbox, callback){
  let status;
  let emailContainer = document.querySelector("#display-area")
  fetch(`emails/${mailbox}`)
  .then(response => {
    status = response.status;
    return response.json()
  })
  .then(response => {
    emailContainer.innerHTML = callback(response)
    addListEventListeners()
  })
}

function getSingleEmailFromApi(email_id, callback){
  let status;
  let retResponse;
  fetch(`emails/${email_id}`)
  .then(response => {
    status = response.status;
    return response.json()
  })
  .then(response => {
    callback(response)
  })

}


function closeForm(){
  document.querySelector('#compose-view').style.display = 'none';
}



function changeButtonStatus(button_id, req){
  // Changes The Button Status
  let mailboxButtons = document.querySelectorAll(".mailbox-btn")
  mailboxButtons.forEach(button =>{
    button.classList.remove("active")
  })
  req === "add" ? document.getElementById(button_id).classList.add("active") : null;
  
}



function addListEventListeners(){
  let itemList = document.querySelectorAll(".email-item");
  itemList.forEach(item => {
    item.addEventListener('click', handleOpenEmail)
  })
}
function removeListEventListeners(){
  let itemList = document.querySelectorAll(".email-item");
  itemList.forEach(item => {
    item.removeEventListener('click', handleOpenEmail)
  })
}


function handleOpenEmail(e){
  let email = e.currentTarget;
  let email_id = email.getAttribute("id")
  getSingleEmailFromApi(email_id, emailDetailCreator)
}

function emailDetailCreator(email){

  removeListEventListeners()
  changeButtonStatus(1, "remove")

  let emailContainer = document.querySelector("#display-area")
  document.querySelector("#list-title").innerHTML = `${email.subject}`

  emailContainer.innerHTML = emailFormatter(email)
  
}

function emailFormatter(email){
  console.log(email)
  return `<div class="email-header">
            <p>from: ${email.sender}</p>
            <div class="email-header-right">
                <p>at: ${email.timestamp}</p>
                <button>Archive</button>
                <button>Reply</button>
            </div>
          </div>
          <div class="email-body">
            <p>${email.body}</p>
          </div>`
}