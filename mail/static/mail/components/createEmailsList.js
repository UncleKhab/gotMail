export function createEmailsList(emailsArray, mailbox){
    let emailContainer = document.querySelector("#display-area")
    let title = document.querySelector('#list-title').firstChild;
    let unreadCount = 0;
    let emailItemClasses =""
    let retString = emailsArray.map(item => {
        let emailDisplayName = mailbox === "sent" ? item.recipients : item.sender;
        // let emailItemClasses = item.read ? "email-item opened" : {unreadCount++; return "email-item"};
        if(item.read){
            emailItemClasses = "email-item opened"
        }else{
            emailItemClasses = "email-item";
            unreadCount++;
        }
        if(mailbox === "sent"){
            emailItemClasses = "email-item opened"
        }
        return(
            `<li class="${emailItemClasses}" data-id=${item.id} data-mailbox=${mailbox} id=${item.id}>
                <p class="email-item-name">${emailDisplayName}</p>
                <p class="email-item-subject">${item.subject}</p>
                <p class="email-item-date">${item.timestamp}</p>    
            </li>`
        )
    }).join('')
    mailbox === "inbox" ? title.innerHTML += `<span id="list-title-counter">(${unreadCount}) new</span>` : null;
    retString = `<ul class="emails-list">` + retString + `</ul>`
    emailContainer.innerHTML = retString;
}
