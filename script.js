const form = document.querySelector('.form');
const input = document.querySelector('.input')
const container = document.querySelector('.listcontainer')
const clearBtn = document.querySelector('.clear-btn')
const subBtn = document.querySelector('.submit-btn')

let editMode =false;
let editId;
let groceries =[];



form.addEventListener("submit", (e)=>{
 e.preventDefault();
 addItem();
})


// addItem 
function addItem(){
   let id = new Date().getTime()
   if (!input.value) {
     alert('Please enter value', 'red')
     return
   }
   if (input.value && editMode) {
     const lists = document.querySelectorAll('.edit-btn')
     let itemToEdit
     lists.forEach((li) => {
      if (li.dataset.id === editId) {
           itemToEdit = li
        }
     })
      if (!itemToEdit) {
        return
      }
     // Editing the list
     itemToEdit.parentNode.children[0].textContent = input.value
     alert('Item Edited', 'green')
     setDefault();
     editMode = false
   
    
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
   editItem.addEventListener('click', editingItem)
   //    Edit event end

   container.appendChild(element)
   alert('Item added on list', 'green')
   
  //  adding a grocery List to Local Storage
   addToLocalStorage(id,input.value)

   setDefault()
}

// clearing all items
clearBtn.addEventListener('click',()=>{
  container.innerHTML = ''
  clearBtn.classList.remove('show')
  alert('Empty List', 'red')
  // Removing all items when user click clear-items
  localStorage.removeItem('list')
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
            console.log('here')
        }else{
                alert('Item Deleted', 'red')
            
        }
        if(editMode){
         subBtn.textContent='Submit'
         input.value = ''
         editMode=false
         addItem();
        }
        removeFromLocalStorage(e.currentTarget.dataset.id)
       
       
}


    // edit an Item
function editingItem(e){
        // e.currentTarget is edit btn, previous element sibling is delete btn
        // previous element sibling is list text that need to edit
        input.value =e.currentTarget.previousElementSibling.previousElementSibling.textContent
        subBtn.textContent='Edit'

        // setting adding mode true so when form submitted it will work as edit mode
        editMode=true;
        editId=e.currentTarget.dataset.id;
}

// setting to default form
function setDefault(){
    input.value=''
    subBtn.textContent="Submit"
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

// displaying all grocery lists saved on local Storage when loading window



      /* **LocalStorage*** */

// adding to local Storage

function addToLocalStorage(id, value) {
  const grocery = { id, value }
  let items = getLocalStorage()
  items.push(grocery)
  localStorage.setItem('list', JSON.stringify(items))
}

function getLocalStorage() {
 
 return localStorage.getItem('list')
   ? JSON.parse(localStorage.getItem('list'))
   : []
}

// removing an item from local Storage
function removeFromLocalStorage(id){
  let items = getLocalStorage();
  console.log(items)
  items =items.filter((item)=>{
    return (item.id !==parseInt(id))
  })
  localStorage.removeItem('list')
  localStorage.setItem('list', JSON.stringify(items))
  
}