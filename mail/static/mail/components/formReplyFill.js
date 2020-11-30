export function formReplyFill(){
    const subject = subjectFormatter()
    const sender = document.querySelector("#email-sender").innerText;
    const body = bodyFormatter();

    addValuesToForm(sender, subject, body)
    
}

function addValuesToForm(sender, subject, body){
    document.querySelector("#compose-recipients").value = sender;
    document.querySelector("#compose-body").value = body;
    document.querySelector("#compose-subject").value = subject;
}

function subjectFormatter(){
    let subject = document.querySelector("#email-subject").innerText;
    let regex = /^RE:/
    return regex.test(subject) ? subject : "RE: " + subject;
}

function bodyFormatter(){
    let body = document.querySelector("#email-body").innerText;
    let sender = document.querySelector("#email-sender").innerText;
    let date = document.querySelector("#email-date").innerText;
    let prevReply = document.querySelector("#email-body").innerHTML.split("</small>")[0].split(">")[1];
    let nextReply = document.querySelector("#email-body").innerHTML.split("</small>")[1].trim();
    if(prevReply !== undefined && nextReply !== undefined){
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