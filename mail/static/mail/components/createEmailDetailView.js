import {removeMultipleEventListeners} from "./eventListeners.js"
import {handleOpenEmail, handleMailboxButtonChange} from "./eventHandlers.js"

function emailFormatter(email){
    return `<div class="email-header">
              <p>from: ${email.sender}</p>
              <div class="email-header-right">
                  <p>at: ${email.timestamp}</p>
                  <button class="archive-btn" data-id="${email.id}">Archive</button>
                  <button class="reply-btn" data-id="${email.id}">Reply</button>
              </div>
            </div>
            <div class="email-body">
              <p>${email.body}</p>
            </div>`
}

function createEmailDetailView(email){
  removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
  handleMailboxButtonChange(0, "remove")
  let emailContainer = document.querySelector("#display-area")
  document.querySelector("#list-title").innerHTML = `${email.subject}`
  emailContainer.innerHTML = emailFormatter(email)
}

export {createEmailDetailView}
