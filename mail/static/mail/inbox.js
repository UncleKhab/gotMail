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
  const emailsArray = getEmailsFromApi(mailbox, createEmailsList)
  console.log(emailsArray)
  
  changeButtonStatus(mailbox)
  
  
  // Show the mailbox name
  
  document.querySelector('#list-title').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>` ;
}

function getEmailsFromApi(mailbox, callback){
  let status;
  let emailListContainer = document.querySelector(".emails-list")
  fetch(`emails/${mailbox}`)
  .then(response => {
    status = response.status;
    return response.json()
  })
  .then(response => {
    emailListContainer.innerHTML = callback(response)
  })
}

function closeForm(){
  document.querySelector('#compose-view').style.display = 'none';
}
function changeButtonStatus(button_id){
  // Changes The Button Status
  let mailboxButtons = document.querySelectorAll(".mailbox-btn")
  mailboxButtons.forEach(button =>{
    button.classList.remove("active")
  })
  document.getElementById(button_id).classList.add("active")

}
