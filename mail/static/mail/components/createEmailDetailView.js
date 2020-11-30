function emailFormatter(email, mailbox){
    let firstChar = email.sender[0].toUpperCase();
    let buttons = mailboxCheck(email, mailbox)
    
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
                          <p>${email.sender}</p>
                      </div>
                      <div class="users-to">
                          <small>To:</small>
                          <p>${email.recipients}</p>
                      </div>
                  </div>
                  <div class="date">
                      <p>${email.timestamp}</p>
                  </div>
              </div>
              <div class="right-title">
                  <h2>${email.subject}</h2>
              </div>
              <div class="right-body">
                  <p>${email.body}</p>
              </div>
          </div>
      </div>
    </div>
    `
}

function createEmailDetailView(email, mailbox){
  let emailContainer = document.querySelector("#emails-view")
  emailContainer.innerHTML = emailFormatter(email, mailbox)
}

function mailboxCheck(email, mailbox){
  if(mailbox === "sent"){
    return " ";
  }
  else{
    let archived = email.archived ? "unarchive" : "archive";
    return `
        <button class="detail-archive" data-id="${email.id}">
            <img src="/static/mail/icons/archive-24px.svg"/>
            <p>${archived}</p>
        </button>
        <button class="detail-reply" data-id="${email.id}">
            <img src="/static/mail/icons/reply-24px.svg"/>
            <p>reply</p>
        </button>`
  }
}

export {createEmailDetailView}


