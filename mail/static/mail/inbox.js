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

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  // Show the mailbox name
  
  handleMailBoxChange(mailbox)

}


// ----------------------------------------------------------------API CALLS

function getRequestFromApi(query, loader, callback, mailbox){
  //This function sends a get request to the api using the query argument to make the call
  //When it gets a response, it saves the status in a variable(for later user if needed) and transforms the response into a json object
  //It then checks for a mailbox argument and loads the corresponding element on the page

  let status;
  fetch(`emails/${query}`)
  .then(response => {
    status = response.status;
    return response.json()
  })
  .then(response => {
    mailbox ? loader(response, mailbox) : loader(response, query);
    callback()
  })
}

function putRequestToApi(email_id, obj, callback){
  // Send a PUT request to the api passing in an object (the object should contain a property that needs to be changed)
  fetch(`/emails/${email_id}`, {
      method: 'PUT',
      body: JSON.stringify(obj)
    }).then(callback)
}


function postRequestToApi(obj){
  //Sends a POST request to the API , passing in an object with the required format! 
  //Object example : 
  // {
  //     recipients: 'alex@example.com',
  //     subject: 'Do not meet anyone',
  //     body: "Stay save, the 'Rona is everywhere"
  // }
  let status = 0;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify(obj)
  })
  .then(response => {
    status = response.status
    return response.json()
  })
  .then(response => {
    if (status === 201){
        load_mailbox('sent')
        alertDisplay("message", response.message)
    }else{
        alertDisplay("error", response.error);
    }
  });
}
// --------------------------------------------------------------Form Handlers (SEND and REPLY)



function handleSubmit(e){
  // Handles the form Submission, calling the Post to API function and passing in the form data
  e.preventDefault()
  const obj = retrieveFormData();
  postRequestToApi(obj)
}
function retrieveFormData(){
// Retrieves the submitted form data and returns an object with the data.
  const recipients = document.getElementById("compose-recipients").value
  const subject = document.getElementById("compose-subject").value
  const body = document.getElementById("compose-body").value

  return {
      recipients: recipients,
      subject: subject,
      body: body
  }
}

function formReplyFill(){
    // Saves the form data into variables and then passes the value to the AddValuesToForm function
    const subject = subjectFormatter()
    const sender = document.querySelector("#email-sender").innerText;
    const body = bodyFormatter();

    addValuesToForm(sender, subject, body)

}

function addValuesToForm(sender, subject, body){
    // Populates the form with the values
    document.querySelector("#compose-recipients").value = sender;
    document.querySelector("#compose-body").value = body;
    document.querySelector("#compose-subject").value = subject;
}

function subjectFormatter(){
    // Checks if the subject has "RE: " and returns the correct string
    let subject = document.querySelector("#email-subject").innerText;
    let regex = /^RE:/
    return regex.test(subject) ? subject : "RE: " + subject;
}

function bodyFormatter(){
    // Retrieves the email body and returns a formated string corresponding to the requirements
    // Adds a small tag before and after the original text
    // If the body already has small tags, removes them , concatonates the previous reply with the current body and
    // Adds the small tag before and after the whole text
    let body = document.querySelector("#email-body").innerText;
    let sender = document.querySelector("#email-sender").innerText;
    let date = document.querySelector("#email-date").innerText;
    let prevReply = document.querySelector("#email-body").innerHTML.split("</small>")[0].split(">")[1];
    
    if(prevReply !== undefined){
        let nextReply = document.querySelector("#email-body").innerHTML.split("</small>")[1].trim();
            return`<small class="reply"> 
        ${prevReply}
        -------------------------on ${date} : ${sender} wrote:
        ${nextReply}
        </small>`

    }else{
        return `<small class="reply">
        -------------------------on ${date} : ${sender} wrote:
        ${body}
        </small>
        `
    }

}
//---------------------------------------------------------Add and Remove Event Listeners functions

function addMultipleEventListeners(selector, event, callback){
  // Simple function that iterates through multiple items in an array 
  // Connects the event to the callback function for each item.
  document.querySelectorAll(selector).forEach(item => item.addEventListener(event, callback))
}

function removeMultipleEventListeners(selector, event, callback){
  // Removes the event listeners from all the items in an array
  document.querySelectorAll(selector).forEach(item => item.removeEventListener(event, callback))
}

function listEventListeners(){
  // Function to add event listeners to the email list
  addMultipleEventListeners(".item", 'click', handleOpenEmail)
}
function singleEventListeners(){
  // Function to add event listeners to the buttons in an open email
  addMultipleEventListeners(".detail-archive", "click", handleArchiveEmail)
  addMultipleEventListeners(".detail-reply", "click", handleReplyToEmail)
}


// --------------------------------------------------------------------Event Handlers

function handleOpenEmail(e){
  // Handles the email open, retrieving the required data and passing it into the APIrequest functions.
  // Marks the opened email as read.
  let email = e.currentTarget;
  let email_id = email.getAttribute("id")
  let mailbox = email.getAttribute("data-mailbox")
  getRequestFromApi(email_id, createEmailDetailView, singleEventListeners, mailbox)
  putRequestToApi(email_id, {read:true})
}

function handleArchiveEmail(e){
    // Marks the email as archived and reloads the mailbox
    let email_id = e.currentTarget.getAttribute("data-id")
    let action = e.currentTarget.innerText;
    let obj = action === "archive" ? {archived:true} : {archived:false}
    let msg = action === "archive" ? "Archived" : "Unarchived"
    putRequestToApi(email_id, obj, ()=> load_mailbox('inbox'))
    document.querySelector("#emails-view").innerHTML = ""
    alertDisplay("message", `Email ${msg} Succesfully!`)
  
}

// function loadMailBoxInCallback(){
//     load_mailbox('inbox')
// }

function handleReplyToEmail(e){
  // Shows the form populated with the reply data.
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#compose-form').addEventListener('submit', handleSubmit)
    formReplyFill()
}

function handleMailBoxChange(mailbox){
  // Changes the mailbox, button style and removes the event listeners from previous list.
    handleMailboxButtonChange(mailbox, "add")
    removeMultipleEventListeners(".email-item", 'click', handleOpenEmail)
    getRequestFromApi(mailbox, createEmailsList, listEventListeners)

    document.querySelector('#list-title').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>` ;
}

function handleMailboxButtonChange(mailbox){
  // Changes selected mailbox button style.
    let allButtonsBackground = document.querySelectorAll(".nav-mailbox-button-background")
    allButtonsBackground.forEach(item => {
      item.style.width = "0%"
      item.firstElementChild.style.width = "0%"
    })
    let buttonBackground = document.querySelector(`#${mailbox}`).firstElementChild;
    buttonBackground.style.width = "120%"
    buttonBackground.firstElementChild.style.width = "33%"
}


// ----------------------------------------------------------------------Creator Functions

function createEmailsList(emailsArray, mailbox){
  // from a passed array, it formats each element and stores it in a string
  // it then returns the string if the array has at least one item
  // If the array has no elements , it returns a message 
  let emailContainer = document.querySelector("#list-body")
  let retString = emailsArray.map(item => {
      let emailDisplayName = item.sender;
      let firstChar = emailDisplayName[0].toUpperCase()
      let classesList = item.read ? "item read" : "item";
      return(`<div class="${classesList}" data-id=${item.id} data-mailbox=${mailbox} id=${item.id}>
                  <div class="item-background"></div>
                  <div class="item-side-bar"></div>
                  <div class="item-container">
                      <div class="user">
                          <div class="user-background">
                              <h2 class="user-char">${firstChar}</h2>
                          </div>
                      </div>
                      <div class="item-content">
                          <div class="item-content-user">
                              <div class="details">
                                  <small>From:</small>
                                  <p class="details-email">${emailDisplayName}</p>
                              </div>
                              <div class="date">
                                  <p>${item.timestamp}</p>
                              </div>
                          </div>
                          <div class="item-content-heading">
                              <h2>${item.subject}</h2>
                          </div>
                          <div class="item-content-body">
                              <p>${item.body}</p>
                          </div>
                      </div>
                  </div>
              </div>`
      )
  }).join('')
  emailsArray.length === 0 ? retString = `<h2 class="no-message">It looks like you dont have any ${mailbox} messages</h2>` : null;
  emailContainer.innerHTML = retString;
}


function emailFormatter(email, mailbox){
  // Formats a single element, and returns a string
  let firstChar = email.sender[0].toUpperCase();
  let buttons = mailboxCheck(email, mailbox)
  document.getElementById(`${email.id}`).classList.add("read");
  return `
  <div class="detail-container">
    <div class="detail-content">
        <div class="left">
            <div class="detail-userchar">
                <div>
                    <p id="detail-char">${firstChar}</p>
                </div>
            </div>
            <div class="detail-buttons">
                ${buttons}
            </div>
        </div>
        <div class="right">
            <div class="right-header">
                <div class="users">
                    <div class="users-from">
                        <small>From:</small>
                        <p id="email-sender">${email.sender}</p>
                    </div>
                    <div class="users-to">
                        <small>To:</small>
                        <p>${email.recipients}</p>
                    </div>
                </div>
                <div class="date">
                    <p id="email-date">${email.timestamp}</p>
                </div>
            </div>
            <div class="right-title">
                <h2 id="email-subject">${email.subject}</h2>
            </div>
            <div class="right-body">
                <p id="email-body">${email.body}</p>
            </div>
        </div>
    </div>
  </div>
  `
}

function createEmailDetailView(email, mailbox){
  // renders the element into the selected view
  let emailContainer = document.querySelector("#emails-view")
  emailContainer.innerHTML = emailFormatter(email, mailbox)
}

function mailboxCheck(email, mailbox){
  // Check what mailbox the accesed email is from and returns an empty string if the mailbox is "sent"
  // It returns a string containing the Archive and Reply buttons otherwise
  if(mailbox === "sent"){
    return " ";
  }
  else{
    let archived = email.archived ? "unarchive" : "archive";
    let archivedIcon = email.archived? "unarchive-white.svg" : "archive-white.svg";
    return `
        <button class="detail-archive" data-id="${email.id}">
            <img src="/static/mail/icons/${archivedIcon}"/>
            <p>${archived}</p>
        </button>
        <button class="detail-reply" data-id="${email.id}">
            <img src="/static/mail/icons/reply-white.svg"/>
            <p>reply</p>
        </button>`
  }
}

//-------------------------------------------------------------------Alert Function

function alertDisplay(cl, message){
  // It displays a custom alert , green/red with the passed message/error
  let alert = document.querySelector(".alert")
  alert.classList = "alert"
  alert.classList.add(`alert-${cl}`)
  alert.innerHTML = `<h2>${message}</h2>`;
  alert.style.opacity = "1";
  setTimeout(()=>{
    alert.style.opacity = "0";
  }, 2000)
}
