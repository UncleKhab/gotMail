export function createEmailsList(emailsArray, mailbox){
    let emailContainer = document.querySelector("#list-body")
    let retString = emailsArray.map(item => {
        let emailDisplayName = item.sender;
        let firstChar = emailDisplayName[0].toUpperCase()

        return(`<div class="item" data-id=${item.id} data-mailbox=${mailbox} id=${item.id}>
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

    emailContainer.innerHTML = retString;
}
