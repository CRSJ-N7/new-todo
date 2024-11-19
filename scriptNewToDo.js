'use strict';
const todoMainInput = document.getElementById('input');
const todoAddTaskElement = document.getElementById('add-task');
const listContainerElement = document.getElementById('todo-list');
const changeAllStatusesButton = document.getElementById('change-all');
const filterAllButton = document.getElementById('filter-all');
const filterCompletedButton = document.getElementById('filter-complete');
const filterActiveButton = document.getElementById('filter-active');
const clearCompletedButton = document.getElementById('clear-completed');

let toDoArray = [];
let setFilter = 'All';

const renderTodos = () => {

    listContainerElement.innerHTML = "";

    let filteredArray;

      switch (setFilter) {
        case 'All':
            filteredArray = toDoArray.slice();
            break;
        case 'Active':
            filteredArray = toDoArray.filter(todo => !todo.isCompleted)
            break;
        case 'Completed':
            filteredArray = toDoArray.filter(todo => todo.isCompleted)
            break;  
      };

filteredArray.forEach((todo) => {

   const newTodoElement = document.createElement('div');
   newTodoElement.innerHTML = todo.text;

   const checkboxElement = document.createElement('input');
   checkboxElement.type = 'checkbox';
   checkboxElement.checked = todo.isCompleted;
 
   const deleteButtonElement = document.createElement('button');

   checkboxElement.addEventListener('click', () => {
    changeCheckboxStatus(todo.id, !todo.isCompleted)
   });

   deleteButtonElement.addEventListener('click', () => {
    removeTask(todo.id)
   });

   newTodoElement.addEventListener('dblclick',changeInputText);

   newTodoElement.append(checkboxElement);
   newTodoElement.append(deleteButtonElement);
   listContainerElement.append(newTodoElement);

});
};

const changeInputText = function(e) {

}


const createNewTodo = () => {

    const text = todoMainInput.value.trim();
    todoMainInput.value = "";
    
    if ( !text ) {
        alert("You can't create empty task")
        return;
    };

    const newTodo = {
        id: Date.now(),
        text,
        isCompleted: false,
    };
    
    toDoArray.push(newTodo);
    
    render();
    todoMainInput.focus();
    
};

const changeAllStatuses = () => {

    let result;
    toDoArray.find(todo => !todo.isCompleted ? result = true : result = false);


    if (result === true) {
        toDoArray.forEach((todo) => {
            todo.isCompleted = true;
        })
    }

    if (result === false) {
        toDoArray.forEach((todo) => {
            todo.isCompleted = false;
        })
    };


render();
};

const changeCheckboxStatus = (id, isCompleted) => {
const taskIndex = toDoArray.findIndex((todo) => {
    return todo.id === id;
})

toDoArray[taskIndex].isCompleted = isCompleted;

    render();
}

const removeTask = (id) => {
    const taskIndex = toDoArray.findIndex((todo) => {
        return todo.id === id;
    })

toDoArray.splice(taskIndex, 1);

render();

}

const removeAllCompleted = () => {
    toDoArray = toDoArray.filter((todo => !todo.isCompleted));
    render();
}



const render = () => {
    renderTodos();
}

filterAllButton.addEventListener('click', () => {
    setFilter = 'All';
    render();
});
filterActiveButton.addEventListener('click', () => {
    setFilter = 'Active';
    render();
});
filterCompletedButton.addEventListener('click', () => {
    setFilter = 'Completed';
    render();
})

clearCompletedButton.addEventListener('click', removeAllCompleted);
changeAllStatusesButton.addEventListener('click', changeAllStatuses);
todoAddTaskElement.addEventListener('click', createNewTodo);
todoMainInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        createNewTodo();
    }
});