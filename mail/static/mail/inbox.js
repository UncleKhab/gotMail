import {handleSubmit} from "./components/formHandler.js"
import {handleMailBoxChange} from "./components/eventHandlers.js"

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archive').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  

  // Other Event Listeners
  document.querySelector("#close-form").addEventListener('click', () => document.querySelector('#compose-view').style.display = 'none')

  // Setting user Profile
  let currentUser = document.querySelector('#user-name').innerText
  document.querySelector('#user-char').innerText = currentUser[0].toUpperCase();
  
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
  
  handleMailBoxChange(mailbox)

  // width: 120%;
  // width: 33%;
}

