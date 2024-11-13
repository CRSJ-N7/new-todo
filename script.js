let innerInput = document.getElementById('input');
let mainButton = document.getElementById('button');
let checkAllButton = document.getElementById('button-check');
let uncheckAllButton = document.getElementById('button-uncheck');
let deleteAllButton = document.getElementById('button-delete');
// let checkboxes = Array.from(document.body.querySelectorAll('div > input'))
let toDoArray = [];
let id = 0;

const addNewTask = function () {

    if (innerInput.value !== null && innerInput.value !== '') { // interesting: почему если вместо innerInput.value я пишу inputText то нихера не работает?

        let newTask = document.createElement('div');
        let checkbox = document.createElement('input');
        let deleteButton = document.createElement('button');

        checkbox.type = 'checkbox';
        checkbox.id = id;
        deleteButton.id = id;

        newTask.innerHTML = innerInput.value;
        newTask.setAttribute("id", id)
        // console.log(id);
        document.body.append(newTask);
        newTask.append(checkbox);
        newTask.append(deleteButton);
        deleteButton.addEventListener('click', removeTask);
        checkbox.addEventListener('click', checkboxValue)
        innerInput.value = '';
        // toDoArray.push(newTask.id);
        console.log(toDoArray);

        let toDoObject = {
            id: id,
            checkboxId: id,
            deleteButtoinId: id,
            checkboxed: false,
        }

        toDoArray.push(toDoObject);
        id++;
    }
};

const removeAllCheckboxedTasks = function () {

    let tasks = toDoArray.filter(item => item.checkboxed == true)

    for (let ids of tasks) {
        console.log(ids.id)
    }
    // tasks.forEach(function() {

    // })
    // let elements = document.querySelectorAll(`div id=${tasks.id} `)
    // console.log(elements);
    console.log(tasks);

    }

  
    

const removeTask = function (e) {
    let target = e.target.id;

    let task = toDoArray.find(item => item.id == target);
    let element = document.getElementById(task.id);
    element.parentNode.removeChild(element);
    toDoArray = toDoArray.filter(del => del.id !== task.id);

};

const checkboxValue = function (e) {
    let target = e.target.id
    // console.log(target);

    toDoObject = toDoArray.findIndex(obj => obj.id == target);
    if (toDoArray[toDoObject].checkboxed == false) {
        toDoArray[toDoObject].checkboxed = true
        } else {
            toDoArray[toDoObject].checkboxed = false
        }
    // console.log(toDoArray);
    
};

const allCheckboxesChecked = function () {

    let checkboxes = Array.from(document.body.querySelectorAll('div > input'))
    checkboxes.forEach((element) => {
        if (element.checked === false) {
            element.checked = true
        }
    })

    
    
};

const allCheckboxesUnchecked = function () {
    let checkboxes = Array.from(document.body.querySelectorAll('div > input'))
    checkboxes.forEach((element) => {
        if (element.checked === true) {
            element.checked = false
        }
    })
};


mainButton.addEventListener('click', addNewTask);
checkAllButton.addEventListener('click', allCheckboxesChecked);
uncheckAllButton.addEventListener('click', allCheckboxesUnchecked);
deleteAllButton.addEventListener('click', removeAllCheckboxedTasks);
innerInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById("button").click();
    }
});