const form = document.querySelector('.form');
const input = document.querySelector('.input')
const container = document.querySelector('.listcontainer')
const clearBtn = document.querySelector('.clear-btn')


form.addEventListener("submit", (e) => {
  e.preventDefault()
  if(!input.value){
     alert('Please enter value', 'red')
     return
  }
  const element = document.createElement('div')
  element.classList.add('list')
  element.innerHTML = ` <p>${input.value}</p> 
                 <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                  <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
             `

  container.appendChild(element)
   alert('Item added on list', 'green')
  setDefault();
})


//adding list function
function addList(){

}

// clearing all items
clearBtn.addEventListener('click',()=>{
    container.innerHTML='';
    clearBtn.classList.remove('show')
    alert('Empty List', 'red')
})
// setting to default form

function setDefault(){
    input.value=''
    clearBtn.classList.add('show')
    container.classList.add('show')
   
}

//  displaying notification message

function alert(message , color){
    const notification = document.querySelector('.notification')
    notification.classList.add(`display-${color}`)
    notification.textContent = message
    setTimeout(()=>{
         notification.classList.remove(`display-${color}`)
    },1000)
   

}