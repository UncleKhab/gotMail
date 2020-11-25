import {getRequestFromApi} from "./getRequestFromApi.js"
import {createEmailDetailView} from "./createEmailDetailView.js"
import {singleEventListeners} from "./eventListeners.js"

export function handleOpenEmail(e){
    let email = e.currentTarget;
    let email_id = email.getAttribute("id")
    getRequestFromApi(email_id, createEmailDetailView, singleEventListeners)
  }

export function handleArchiveEmail(e){
    console.log("clicked")
  }
  
export function handleReplyToEmail(e){
    console.log('clicked');
  }

export function handleMailboxButtonChange(button_id, req){
    // Changes The Button Status
    const activeNow = document.querySelector(".active") || null
    activeNow ? activeNow.classList.remove("active") : null
    req === "add" ? document.getElementById(button_id).classList.add("active") : null;
  }