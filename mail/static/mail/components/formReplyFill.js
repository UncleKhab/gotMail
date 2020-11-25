export function formReplyFill(){
    const subject = subjectFormatter()
    const sender = document.querySelector("#email-sender").innerText;
    const body = bodyFormatter(sender)

    addValuesToForm(sender, subject, body)
    
}

function addValuesToForm(sender, subject, body){
    document.querySelector("#compose-recipients").value = sender;
    document.querySelector("#compose-body").value = body;
    document.querySelector("#compose-subject").value = subject;
}

function subjectFormatter(){
    let subject = document.querySelector("#list-title").innerText;
    let regex = /^RE:/
    return regex.test(subject) ? subject : "RE: " + subject;
}

function bodyFormatter(sender){
    let reply = document.querySelector('strong')
    let date = document.querySelector('#email-date').innerText;
    reply ? console.log(reply) : console.log("not here")
    if(reply){
        return `<strong>`+reply.innerHTML + `<br><br><br><br>---------------On ${date} ${sender} wrote:<br>` + document.querySelector("#email-body").innerHTML.split("</strong>")[1].trim() + `</strong>`
    }else{
        return `<strong>---------------On ${date} ${sender} wrote:<br>` + document.querySelector("#email-body").innerText + '</strong>'
    }
    
}