import {handleArchiveEmail, handleOpenEmail, handleReplyToEmail} from "./eventHandlers.js"
function addMultipleEventListeners(selector, event, callback){
    document.querySelectorAll(selector).forEach(item => item.addEventListener(event, callback))
}

function removeMultipleEventListeners(selector, event, callback){
    document.querySelectorAll(selector).forEach(item => item.removeEventListener(event, callback))
}

function listEventListeners(){
    addMultipleEventListeners(".email-item", 'click', handleOpenEmail)
  }
function singleEventListeners(){
    addMultipleEventListeners(".archive-btn", "click", handleArchiveEmail)
    addMultipleEventListeners(".reply-btn", "click", handleReplyToEmail)
}

export {removeMultipleEventListeners,
        addMultipleEventListeners,
        listEventListeners,
        singleEventListeners,
        }




