import {getRequestFromApi} from "./getRequestFromApi.js"
import {putRequestToApi} from "./putRequestToApi.js"
import {load_mailbox} from "../inbox.js"
import {createEmailDetailView} from "./createEmailDetailView.js"
import {singleEventListeners, 
        listEventListeners, 
        removeMultipleEventListeners} from "./eventListeners.js"
import {createEmailsList} from "./createEmailsList.js"
import {formReplyFill} from "./formReplyFill.js"
import {handleSubmit} from "./formHandler.js"


export function handleOpenEmail(e){
    let email = e.currentTarget;
    let email_id = email.getAttribute("id")
    let mailbox = email.getAttribute("data-mailbox")
    removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
    handleMailboxButtonChange(0, "remove")
    getRequestFromApi(email_id, createEmailDetailView, singleEventListeners, mailbox)
    putRequestToApi(email_id, {read:true})
  }

export function handleArchiveEmail(e){
    let email_id = e.target.getAttribute("data-id")
    let action = e.target.innerText;
    let obj = action === "Archive" ? {archived:true} : {archived:false}
    putRequestToApi(email_id, obj, loadMailBoxInCallback)
    
}
function loadMailBoxInCallback(){
  load_mailbox('inbox')
}
export function handleReplyToEmail(e){
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#compose-form').addEventListener('submit', handleSubmit)
    formReplyFill()
  }

export function handleMailBoxChange(mailbox){
  handleMailboxButtonChange(mailbox, "add")
  removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
  getRequestFromApi(mailbox, createEmailsList, listEventListeners)
  
  document.querySelector('#list-title').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>` ;
}

function handleMailboxButtonChange(mailbox){
    // Changes The Button Status
    let allButtonsBackground = document.querySelectorAll(".nav-mailbox-button-background")
    allButtonsBackground.forEach(item => {
      item.style.width = "0%"
      item.firstElementChild.style.width = "0%"
    })
    let buttonBackground = document.querySelector(`#${mailbox}`).firstElementChild;
    buttonBackground.style.width = "120%"
    buttonBackground.firstElementChild.style.width = "33%"
}

