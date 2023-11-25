const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInputmeow');
const taskList = document.getElementById('taskListmeow');
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
});

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask(taskInput.value);
    taskForm.reset();
});

function addTask(task) {
    const timestamp = new Date().toLocaleString();
    tasks.push({ task, timestamp, done: false, doneTimestamp: null });
    saveTasksToLocalStorage();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((taskObj, index) => {
        const { task, timestamp, done, doneTimestamp } = taskObj;

        const li = document.createElement('li');
        li.textContent = `${task} (Added: ${timestamp})`;

        const editButton = createButton('Edit', () => editTask(index));
        const deleteButton = createButton('Delete', () => deleteTask(index));
        const doneButton = createButton('Done', () => markAsDone(index));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(doneButton);

        if (done) {
            const doneTime = new Date(doneTimestamp).toLocaleString();
            const doneMessage = document.createElement('span');
            doneMessage.textContent = ` - Done: ${doneTime}`;
            li.appendChild(doneMessage);
        }

        taskList.appendChild(li);
        animate3DTransform(li);
    });
}

function animate3DTransform(element) {
    element.style.transition = 'transform 0.5s ease';
    element.style.transform = 'rotateX(360deg)'; // Adjust the rotation as needed

    // Reset the transform after the animation completes
    setTimeout(() => {
        element.style.transform = 'rotateX(0)';
    }, 500);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function editTask(index) {
    const newTask = prompt('Edit task:', tasks[index].task);
    if (newTask !== null) {
        tasks[index].task = newTask;
        saveTasksToLocalStorage();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();
}

function markAsDone(index) {
    tasks[index].done = true;
    tasks[index].doneTimestamp = new Date().toLocaleString();
    saveTasksToLocalStorage();
    displayTasks();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
