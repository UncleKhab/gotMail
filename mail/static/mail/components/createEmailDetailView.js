function emailFormatter(email, mailbox){
    let archiveButton = checkIfEmailIsRead(email)
    let buttons = mailbox === "sent" ? "" : archiveButton + `<button class="reply-btn" data-id="${email.id}">Reply</button>`
    let emailDisplayName = mailbox === "sent" ? `sent to: ${email.recipients}` : `from: <span id="email-sender">${email.sender}</span>`;
    return `<div class="email-header">
              <p>${emailDisplayName}</p>
              <div class="email-header-right">
                  <p>at: <spam id="email-date">${email.timestamp}</span></p>
                  ${buttons}
                  
              </div>
            </div>
            <div class="email-body">
              <p id="email-body">${email.body}</p>
            </div>
            `
}

function createEmailDetailView(email, mailbox){
  let emailContainer = document.querySelector("#display-area")
  document.querySelector("#list-title").innerHTML = `${email.subject}`
  emailContainer.innerHTML = emailFormatter(email, mailbox)
  let element = document.querySelector("strong")
  element ? element.scrollTop = element.scrollHeight : null;
  
}

function checkIfEmailIsRead(email){
  return email.archived ? `<button class="archive-btn" data-id="${email.id}">Unarchive</button>` : `<button class="archive-btn" data-id="${email.id}">Archive</button>`;
}
export {createEmailDetailView}
