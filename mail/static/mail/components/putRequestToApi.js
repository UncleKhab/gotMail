export function putRequestToApi(email_id, obj, callback){
    fetch(`/emails/${email_id}`, {
        method: 'PUT',
        body: JSON.stringify(obj)
      }).then(callback)
}