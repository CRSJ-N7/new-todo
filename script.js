const todoMainInput = document.getElementById("input");
const todoAddTaskElement = document.getElementById("add-task");
const listContainerElement = document.getElementById("todo-list");
const changeAllStatusesButton = document.getElementById("change-all");
const filterAllButton = document.getElementById("filter-all");
const filterCompletedButton = document.getElementById("filter-complete");
const filterActiveButton = document.getElementById("filter-active");
const clearCompletedButton = document.getElementById("clear-completed");
const textareaSelector = document.getElementsByTagName("textarea");
const pageButtons = document.getElementById("page-buttons");
const countTasksContainer = document.getElementById("count-tasks");

let toDoArray = [];
let setFilter = "All";
let currentPage = 1;
const tasksPerPage = 5;

let allTasksCounter,
  activeTasksCounter,
  completedTasksCounter,
  clearAllCompletedCounter;

const renderTodos = () => {
  todoMainInput.focus();
  listContainerElement.innerHTML = "";
  tasksCounter(); //считаем количество тудух и разбрасываем по кнопкам all, completed, active
  
  let filteredArray;
  
  // Фильтруем в зависимости от выбранного фильтра: All | Completed | Active
  if (toDoArray.length) {
    switch (setFilter) {
      case "All":
        filteredArray = toDoArray.slice(
          currentPage * tasksPerPage - tasksPerPage,
          currentPage * tasksPerPage
        );
        break;
      case "Active":
        filteredArray = toDoArray.filter((todo) => !todo.isCompleted);
        filteredArray = filteredArray.slice(
          currentPage * tasksPerPage - tasksPerPage,
          currentPage * tasksPerPage
        );
        break;
      case "Completed":
        filteredArray = toDoArray.filter((todo) => todo.isCompleted);
        filteredArray = filteredArray.slice(
          currentPage * tasksPerPage - tasksPerPage,
          currentPage * tasksPerPage
        );
        break;
    }
  } else { //если массив пустой, то удаляем все кнопки
    pageButtons.innerHTML = "";
    listContainerElement.innerHTML = "";
    return;
  }

  // Рисуем отфильтрованный массив со всеми плюшками в DOM.

  filteredArray.forEach((todo) => {
    const newTodoElement = document.createElement("div");
    newTodoElement.innerHTML = todo.text;
    newTodoElement.id = todo.id;
    newTodoElement.classList.add("todo");

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.classList.add("checkbox-flex");

    const labelElement = document.createElement("label");
    const spanElement = document.createElement("span");

    checkboxElement.checked = todo.isCompleted;

    if (checkboxElement.checked) {
      spanElement.innerText = "√";
      newTodoElement.classList.add('crossed-out')
    }

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("delete-button-flex");
    deleteButtonElement.innerText = 'x';

    checkboxElement.addEventListener("click", () => {
      changeCheckboxStatus(todo.id, !todo.isCompleted);
    });

    deleteButtonElement.addEventListener("click", () => {
      removeTask(todo.id);
    });

    newTodoElement.addEventListener("dblclick", () => {
      changeInputText(todo.id);
    });

    newTodoElement.append(labelElement);
    labelElement.append(checkboxElement);
    labelElement.append(spanElement);
    // newTodoElement.append(checkboxElement);
    labelElement.append(deleteButtonElement);
    listContainerElement.append(newTodoElement);
  });
 
  createPageButtons();
  // if(toDoArray.length) {
  // highlightCurrentPage();
  // }
  
  if (!filteredArray.length && currentPage - 1) {
    currentPage = currentPage - 1;
    render();
  }
  highlightCurrentPage();
  
  filteredArray = [];
};

const highlightCurrentPage = () => {

  const getCurrentPageId = document.getElementById(`${(currentPage)}`)
  if (getCurrentPageId) {
  getCurrentPageId.classList.add('page-highlight');
  };
}

const tasksCounter = () => {

  allTasksCounter = toDoArray.length;
  activeTasksCounter = toDoArray.filter(
    (element) => !element.isCompleted
  ).length;
  completedTasksCounter = toDoArray.filter(
    (element) => element.isCompleted
  ).length;

  if (allTasksCounter) {

    filterAllButton.innerHTML = "";
    filterActiveButton.innerHTML = "";
    filterCompletedButton.innerHTML = "";

    filterAllButton.innerHTML = 'All <br>todos</br>' + `(${allTasksCounter})`;
    filterActiveButton.innerHTML = 'Active <br>todos</br>' + `(${activeTasksCounter})`;
    filterCompletedButton.innerHTML = 'Completed <br>todos</br>' + `(${completedTasksCounter})`;
    
  } else {
    filterAllButton.innerHTML = 'All <br>todos</br>';
    filterActiveButton.innerHTML = 'Active <br>todos</br>';
    filterCompletedButton.innerHTML = 'Completed <br>todos</br>';
  };

}

const createPageButtons = () => {
  const completedTodoArray = toDoArray.filter((element) => element.isCompleted);
  const activeTodoArray = toDoArray.filter((element) => !element.isCompleted);
  const allTodoArray = toDoArray;
  let currentArray;

  setFilter === "All"
    ? (currentArray = allTodoArray)
    : setFilter === "Completed"
    ? (currentArray = completedTodoArray)
    : setFilter === "Active"
    ? (currentArray = activeTodoArray)
    : currentArray === allTodoArray;

  pageButtons.innerHTML = "";

  pages = Math.ceil(currentArray.length / tasksPerPage);

  for (i = 1; i <= pages; i++) {
    const newButton = document.createElement("button");
    newButton.innerHTML = i;
    newButton.id = i;
    newButton.addEventListener("click", () => {
      currentPage = +newButton.innerHTML;
      render();
    });
    pageButtons.append(newButton);

   
  }
};

const changeInputText = (id) => {
  if (textareaSelector.length > 0) {
    return;
  } else {
    const element = document.getElementById(`${id}`);
    const textarea = document.createElement("textarea");
    textarea.value = toDoArray[toDoArray.findIndex((el) => el.id === id)].text;
    element.style.display = "none";
    textarea.classList.add("textarea");
    element.after(textarea);
    textarea.focus();

    textarea.addEventListener("blur", () => {
      element.innerText = textarea.value;
      // textarea.classList.add("edit");
      if (!textarea.value.trim()) {
        textarea.remove();
        element.style.display = "flex";
        render();
      } else {
        toDoArray[toDoArray.findIndex((el) => el.id === id)].text =
          element.innerText;
        console.log(element.innerText);
        textarea.remove();
        element.style.display = "flex";
        render();
      }
    });

    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        textarea.blur();
      }
    });
  }
};

const createNewTodo = () => {
  const text = todoMainInput.value.trim();
  todoMainInput.value = "";

  if (!text) {
    alert("You can't create empty task");
    return;
  }

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
  toDoArray.find((todo) =>
    !todo.isCompleted ? (result = true) : (result = false)
  );

  if (result === true) {
    toDoArray.forEach((todo) => {
      todo.isCompleted = true;
    });
  }

  if (result === false) {
    toDoArray.forEach((todo) => {
      todo.isCompleted = false;
    });
  }

  render();
};

const changeCheckboxStatus = (id, isCompleted) => {
  const taskIndex = toDoArray.findIndex((todo) => {
    return todo.id === id;
  });

  toDoArray[taskIndex].isCompleted = isCompleted;

  render();
};

const removeTask = (id) => {
  const taskIndex = toDoArray.findIndex((todo) => {
    return todo.id === id;
  });

  toDoArray.splice(taskIndex, 1);

  render();
};

const removeAllCompleted = () => {
  toDoArray = toDoArray.filter((todo) => !todo.isCompleted);
  setFilter = "All";

  render();
};

const render = () => {
  renderTodos();
};

filterAllButton.addEventListener("click", () => {
  setFilter = "All";
  render();
});
filterActiveButton.addEventListener("click", () => {
  setFilter = "Active";
  render();
});
filterCompletedButton.addEventListener("click", () => {
  setFilter = "Completed";
  render();
});

clearCompletedButton.addEventListener("click", removeAllCompleted);
changeAllStatusesButton.addEventListener("click", changeAllStatuses);
todoAddTaskElement.addEventListener("click", createNewTodo);
todoMainInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNewTodo();
  }
});
