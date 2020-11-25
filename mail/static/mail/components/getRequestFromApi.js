export function getRequestFromApi(query, loader, callback, mailbox){
    let status;
    fetch(`emails/${query}`)
    .then(response => {
      status = response.status;
      return response.json()
    })
    .then(response => {
      mailbox ? loader(response, mailbox) : loader(response, query);
      callback()
    })
  }