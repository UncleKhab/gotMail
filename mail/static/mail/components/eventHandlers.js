import {getRequestFromApi} from "./getRequestFromApi.js"
import {createEmailDetailView} from "./createEmailDetailView.js"
import {singleEventListeners, 
        listEventListeners, 
        removeMultipleEventListeners} from "./eventListeners.js"
import {createEmailsList} from "./createEmailsList.js"

export function handleOpenEmail(e){
    let email = e.currentTarget;
    let email_id = email.getAttribute("id")
    removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
    handleMailboxButtonChange(0, "remove")
    getRequestFromApi(email_id, createEmailDetailView, singleEventListeners)
  }

export function handleArchiveEmail(e){
    console.log("clicked")
  }
  
export function handleReplyToEmail(e){
    console.log('clicked');
  }

export function handleMailBoxChange(mailbox){
  handleMailboxButtonChange(mailbox, "add")
  removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
  getRequestFromApi(mailbox, createEmailsList, listEventListeners)
}

export function handleMailboxButtonChange(button_id, req){
    // Changes The Button Status
    const activeNow = document.querySelector(".active") || null
    activeNow ? activeNow.classList.remove("active") : null
    req === "add" ? document.getElementById(button_id).classList.add("active") : null;
}