function emailFormatter(email, mailbox){
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
  let emailContainer = document.querySelector("#emails-view")
  emailContainer.innerHTML = emailFormatter(email, mailbox)
}

function mailboxCheck(email, mailbox){
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

export {createEmailDetailView}


