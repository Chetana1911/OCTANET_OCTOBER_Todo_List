let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const button = document.getElementById('btn');

function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="img/delete-btn.svg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}



function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;


}



function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id == taskId;
    });
    if (task.length > 0) {
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task toggle successfully");
        return;
    }
    showNotification("Could not toggle the task");
}

//delete task from list 
///The filter method is used to create a new array (newTasks) that contains all tasks except the one with the specified taskId. This effectively removes the task you want to delete from the array.
//This line assigns the filtered array (newTasks) back to the tasks variable. 
//This step effectively updates the tasks array to exclude the deleted task.

function deleteTasks(taskId) {
    //if task id is not equal to the taskId which you want to delete the the task is added in task list 
    //And if taskId is equal to task which delete to user then the task not add in task list 
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId
    })

    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully");

}
//add task into list
function addTasks(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task cannot be added');



}
//show notification 
function showNotification(text) {
    alert(text);
}

//handle input keypress event 
function handleInputkeypress(e) {
    if (e.key == "Enter" || e.type == 'mousedown') {
        const text = addTaskInput.value;
        console.log(text);

        if (!text) {
            showNotification('Task text cannot be empty');
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        addTaskInput.value = '';//create empty input bar
        addTasks(task);
    }

}


function handleClickListener(e) {
    const target = e.target;
    console.log(target);

    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTasks(taskId);
        return;
    }
    else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }


}
function initilizeApp() {
    // fetchTodos();
    addTaskInput.addEventListener("keyup", handleInputkeypress);
    document.addEventListener('click', handleClickListener);
    button.addEventListener('mousedown', handleInputkeypress);
}
initilizeApp();

