let addMessage = document.querySelector('.message'),
 addButton = document.querySelector('.add'),
 todo = document.querySelector('.todo');

 let todoList = [];

 if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
 }

addButton.addEventListener('click', function(){
    if(!addMessage.value) return;
let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
};
todoList.push(newTodo);
displayMessages();
localStorage.setItem('todo', JSON.stringify(todoList));
addMessage.value = '';
}); 

function displayMessages(){
    let displayMessages = '';
    if(todoList.length === 0)
    {
        todo.innerHTML ='';
    }
    todoList.forEach(function(item, i){
    displayMessages += `
        <li>
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="text-decoration ${item.important ? 'important' : ''}">${item.todo}</label>
        </li> `;
        todo.innerHTML = displayMessages;
    });
};

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let valueLable = todo.querySelector('[for='+ idInput +']').innerHTML;
    
    todoList.forEach(function(item){
        if(item.todo === valueLable){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey) {
                todoList.splice(i, 1);
            } 
            else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        } 
    });
});
