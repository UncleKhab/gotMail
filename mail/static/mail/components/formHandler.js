import {load_mailbox} from "../inbox.js"


export function handleSubmit(e){
    // retrieves data from the submitted form
    e.preventDefault()
    const obj = retrieveFormData();
    postRequestToApi(obj)
}
  
export function retrieveFormData(){
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
export function postRequestToApi(obj){
//Function to Post Email to Api , pass in an object with the required format! 
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
    // TODO -> Beatufy the display of Error or Message
    status === 201 ? load_mailbox('sent') : alert(response.error)
});
}