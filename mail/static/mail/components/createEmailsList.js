export function createEmailsList(emailsArray){
    let emailContainer = document.querySelector("#display-area")
    let retString = emailsArray.map(item => {
        return(
            `<li class="email-item" data-id=${item.id} id=${item.id}>
                <p class="email-item-name">${item.sender}</p>
                <p class="email-item-subject">${item.subject}</p>
                <p class="email-item-date">${item.timestamp}</p>    
            </li>`
        )
    }).join('')
    retString = `<ul class="emails-list">` + retString + `</ul>`
    emailContainer.innerHTML = retString;
}