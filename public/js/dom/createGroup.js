import putSelectedUsers from "./putSelectedUsers.js";

const users = document.querySelectorAll('.user');
const form = document.querySelector('#submit-form');
for(const user of users)
{
    user.addEventListener('click',e =>{
        user.classList.toggle('selected');
    });

}

form.addEventListener('submit',(e) =>{
    e.preventDefault();    
    const users = document.querySelectorAll('.user.selected');
    const nameInput = document.querySelector('#name-input');
    if(nameInput.value.length === 0) 
        return alert('You must input name of the group!');          
    if(users.length === 0) 
        return alert('You must select minimum one user!');
    putSelectedUsers(users);
    form.submit();
})





