export function alertDisplay(cl, message){
    let alert = document.querySelector(".alert")
    alert.classList = "alert"
    alert.classList.add(`alert-${cl}`)
    alert.innerHTML = `<h2>${message}</h2>`;
    alert.style.opacity = "1";
    setTimeout(()=>{
      alert.style.opacity = "0";
    }, 2000)
}