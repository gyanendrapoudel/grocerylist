const form = document.querySelector('.form');
const input = document.querySelector('.input')
const container = document.querySelector('.listcontainer')
const clearBtn = document.querySelector('.clear-btn')


form.addEventListener("submit", (e) => {
  e.preventDefault()
  let id = new Date().getTime()
  if (!input.value) {
    alert('Please enter value', 'red')
    return
  }

  const element = document.createElement('div')
  element.classList.add('list')
  element.innerHTML = ` <p>${input.value}</p> 
                 <button class="delete-btn" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
                  <button class="edit-btn" data-id="${id}"><i class="fa-solid fa-pen-to-square"></i></button>
             `

//    Delete event start
  const deleteItem = element.querySelector('.delete-btn')
  deleteItem.addEventListener('click', deletingItem)
//    Delete event end
//    Edit event start
  const editItem = element.querySelector('.edit-btn')
  editItem.addEventListener('click',()=>{})
//    Edit event end
  container.appendChild(element)
  alert('Item added on list', 'green')
  setDefault()
})






// clearing all items
clearBtn.addEventListener('click',()=>{
    container.innerHTML='';
    clearBtn.classList.remove('show')
    alert('Empty List', 'red')
})

// delete an Item
function deletingItem(e){
  let items = document.querySelectorAll('.delete-btn')
  let item 
   items.forEach((link)=>{
       if(link.dataset.id ===e.currentTarget.dataset.id){
        item=link
       }
   })
  item.parentNode.remove();
   items = document.querySelectorAll('.delete-btn')
  if(items.length<1){
    clearBtn.classList.remove('show')
     alert('Empty List', 'red')
  }else{
        alert('Item Deleted', 'red')
    
  }
 
}
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