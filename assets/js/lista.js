document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromStorage();

    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', addTask);

    const taskList = document.getElementById('task-list');
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target);
        }
    });

    taskList.addEventListener('dblclick', function (event) {
        if (event.target.tagName === 'SPAN') {
            editTask(event.target);
        }
    });
});

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskItem(taskText);

        taskList.appendChild(taskItem);
        saveTaskToStorage(taskText);

        newTaskInput.value = '';
    }
}

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Eliminar</button>
    `;
    return taskItem;
}

function editTask(spanElement) {
    const taskText = spanElement.textContent;
    const editedTaskText = prompt('Editar tarea:', taskText);

    if (editedTaskText !== null && editedTaskText.trim() !== '') {
        spanElement.textContent = editedTaskText;
        updateTaskInStorage(taskText, editedTaskText);
    }
}

function deleteTask(deleteBtn) {
    const taskItem = deleteBtn.parentNode;
    const taskText = taskItem.querySelector('span').textContent;

    if (confirm(`¿Eliminar la tarea "${taskText}"?`)) {
        taskItem.remove();
        removeTaskFromStorage(taskText);
    }
}

function saveTaskToStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = getTasksFromStorage();
    const taskList = document.getElementById('task-list');

    tasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });
}

function updateTaskInStorage(oldTaskText, newTaskText) {
    let tasks = getTasksFromStorage();
    const index = tasks.indexOf(oldTaskText);

    if (index !== -1) {
        tasks[index] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    const index = tasks.indexOf(taskText);

    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function getTasksFromStorage() {
    const tasksString = localStorage.getItem('tasks') || '[]';
    return JSON.parse(tasksString);
}
