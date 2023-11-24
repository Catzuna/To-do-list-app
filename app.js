function initTaskApp() {
    const taskForm = document.getElementById('taskFormeow');
    const taskInput = document.getElementById('taskInputmeow');
    const taskList = document.getElementById('taskListmeow');
    let tasks = [];

    document.addEventListener('DOMContentLoaded', () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            displayTasksWithAnimation();
        } else {
            animateTaskList();
        }
    });

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask(taskInput.value);
        taskForm.reset();
    });

    function addTask(task) {
        const timestamp = new Date().toLocaleString();
        tasks.push({ task, timestamp, done: false });
        saveTasksToLocalStorage();
        displayTasks();
    }

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((taskObj, index) => {
            const { task, timestamp, done } = taskObj;
            const li = document.createElement('li');
            li.textContent = `${task} (Added: ${timestamp})`;

            const editButton = createButton('Edit', () => editTask(index));
            const deleteButton = createButton('Delete', () => deleteTask(index));
            const doneButton = createButton('Done', () => markAsDone(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            li.appendChild(doneButton);

            taskList.appendChild(li);
            animateListItem(li);

            if (done) {
                const doneTime = new Date().toLocaleString();
                const doneMessage = document.createElement('span');
                doneMessage.textContent = ` - Done: ${doneTime}`;
                li.appendChild(doneMessage);
            }
        });
    }

    function animateListItem(item) {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)';
        }, 100);
    }

    function animateTaskList() {
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
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
        saveTasksToLocalStorage();
        displayTasks();
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

document.addEventListener('DOMContentLoaded', initTaskApp);
