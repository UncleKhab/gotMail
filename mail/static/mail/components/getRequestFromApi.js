export function getRequestFromApi(query, loader, callback){
    let status;
    fetch(`emails/${query}`)
    .then(response => {
      status = response.status;
      return response.json()
    })
    .then(response => {
      loader(response)
      callback()
    })
  }