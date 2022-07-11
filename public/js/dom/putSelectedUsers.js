export default (selectedUsers) =>{
    const hiddenInputPlace = document.querySelector('#hidden-input-place');

    hiddenInputPlace.innerHTML = '';

    for(const user of selectedUsers)
    {
        const input = document.createElement('input');
        // make configs
        input.setAttribute('type','hidden');
        input.setAttribute('name','users[]');
        input.setAttribute('value',user.id);
        // add input
        hiddenInputPlace.append(input);
    }

}