
let innerInput = document.getElementById('input');
let mainButton = document.getElementById('button');
let toDoArray = [];
// let toDoText;
// let inputText = innerInput.value;
let id = 0;


const addNewTask = function () {

    if (innerInput.value !== null && innerInput.value !== '') { //почему если здесь inputText то нихера не работает?

        let newTask = document.createElement('div');

        newTask.innerHTML = innerInput.value;
        newTask.setAttribute("id", id++)
        document.body.append(newTask);
        innerInput.value = '';
        console.log(newTask);
        toDoArray.push(newTask.id);
        toDoArray.push(newTask.innerHTML);
        console.log(toDoArray);

    }
};

mainButton.addEventListener('click', addNewTask);
innerInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById("button").click();
    }
});