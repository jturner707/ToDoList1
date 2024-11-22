//  Starter code author is Joe Ortiz
//  Modifications by Jeffrey Turner
//  
/**
 * Represents an individual task
 */
class Task {
    /**
     * The short title of the task. A future feature may be to just display the titles
     */
    title: string;

    /**
     * The longer description of the task
     */
    description: string;

    /**
     * Mark whether the task is completed or not.
     */
    completed: boolean;

    constructor(title: string, description: string, completed: boolean) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

/**
 * When the HTML page loads, this function sets up the listeners for the buttons
 * and call the function to load the tasks from localStorage.
 */
window.onload = function() {
    // Set up button click for add and clear task form
    let addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = processTask;
    let clearTasksBtn = document.querySelector("#clear-tasks") as HTMLButtonElement; 
    clearTasksBtn.onclick = clearAllTasks;

    // Load existing tasks from localStorage
    loadTasks();
}

/**
 * Load tasks from localStorage and display them on the webpage.
 */
function loadTasks(): void {
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    if (taskData) {
        let tasks: Task[] = JSON.parse(taskData);
        refreshTaskDisplay(tasks);
    }
}

/**
 * When the Add Task button is clicked, this calls the functions
 * to get that data and add it to the array.  The input text boxes 
 * are cleared and the task list is updated.
 */
function processTask(): void {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToStorage(userTask);
        let taskData = localStorage.getItem("Tasks");
        if (taskData) {
            let tasks: Task[] = JSON.parse(taskData);
            refreshTaskDisplay(tasks); // Refresh the display to show the new task
        }
        clearInputFields();  // Clear the input fields after task is added
    }
}


/**
 * This function will retrieve all the task
 * data from the HTML page. If all data is valid
 * a Task object will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the web page.
 */
function getTask(): Task | null {
    clearAllErrorMessages();

    // Get all inputs
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let descriptionTextBox = document.querySelector("#description") as HTMLInputElement;

    // Validate data
    let isValidData = true;

    // Validate the title
    let title = titleTextBox.value;
    if (!isValidTitle(title)) {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling as HTMLSpanElement;
        if (titleErrorSpan) {
            titleErrorSpan.textContent = "Title can only be 25 characters.";
        }
    }

    // Validate description if shorter than 257 characters.  May be blank "".
    let description = descriptionTextBox.value;
    if (description.length > 256) {
        isValidData = false;
        let descriptionErrorSpan = descriptionTextBox.nextElementSibling as HTMLSpanElement;
        if (descriptionErrorSpan) {
            descriptionErrorSpan.textContent = "Description can only be up to 256 characters.";
        }
    }

    if (isValidData) {
        // Create and populate Task object if all data is valid
        let addedTask = new Task(title, description, false);  // Default to not completed
        return addedTask;
    }
    return null; // Return null if any invalid data is present
}

/**
 * This validates a title is 25 characters or fewer but not null
 */
function isValidTitle(data: string): boolean {
    let regex = /^.{1,25}$/;
    return regex.test(data);
}

/**
 * Adds a Task object to the web page. Assumes
 * all data is valid
 * @param t The Task containing valid data to be added
 */
function addTaskToWebpage(t: Task, taskIndex: number): void {
    console.log(t);

    // Create a div for the task
    let taskDiv = document.createElement("div") as HTMLDivElement;

    // Create and set up the title and description heading
    let titleHeading = document.createElement("h2");
    titleHeading.textContent = t.title;

    // Create and set up the task description
    let descriptionParagraph = document.createElement("p");
    descriptionParagraph.className = "task-description";
    descriptionParagraph.textContent = t.description;

    // Create and set up the completed status span
    let statusSpan = document.createElement("span");
    statusSpan.textContent = `Completed: ${t.completed ? "Yes" : "No"}`;
    statusSpan.style.marginLeft = "10px"; // Add some space between the text and the status

    // Create radio buttons for task completion status
    let completedYes = document.createElement("input");
    completedYes.type = "radio";
    completedYes.name = `completed-${taskIndex}`;
    completedYes.value = "true";
    completedYes.checked = t.completed;
    completedYes.onclick = () => updateTaskCompletionStatus(taskIndex, true);

    let completedNo = document.createElement("input");
    completedNo.type = "radio";
    completedNo.name = `completed-${taskIndex}`;
    completedNo.value = "false";
    completedNo.checked = !t.completed;
    completedNo.onclick = () => updateTaskCompletionStatus(taskIndex, false);

    // Add the radio buttons to the taskDiv
    let radioDiv = document.createElement("div");
    radioDiv.style.marginLeft = "10px";
    radioDiv.appendChild(completedYes);
    radioDiv.appendChild(document.createTextNode(" Yes "));
    radioDiv.appendChild(completedNo);
    radioDiv.appendChild(document.createTextNode(" No "));

    // Add titleHeading, descriptionParagraph, statusSpan, and radioDiv to taskDiv
    taskDiv.appendChild(titleHeading);
    taskDiv.appendChild(descriptionParagraph);
    taskDiv.appendChild(statusSpan);
    taskDiv.appendChild(radioDiv);

    // Safely append taskDiv to the task display container
    let taskDisplay = document.querySelector("#task-display") as HTMLDivElement;
    if (taskDisplay) {
        taskDisplay.appendChild(taskDiv);
    } else {
        console.error("Element with ID 'task-display' not found");
    }
}


/**
 * If the Completed yes/no button is check this changes the completed status 
 * in the localStorage for that item.
 * @param index is automatically assigned when a task is added (push) to the array.
 * @param completed is boolean value being changed.
 */
function updateTaskCompletionStatus(index: number, completed: boolean): void {
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    if (taskData) {
        let tasks: Task[] = JSON.parse(taskData);
        tasks[index].completed = completed;
        localStorage.setItem(TaskStorageKey, JSON.stringify(tasks));
        refreshTaskDisplay(tasks); // Refresh the display to show the updated status
    }
}

/**
 * Refreshes the task display area to show updated task statuses.
 */
function refreshTaskDisplay(tasks: Task[]): void {
    let taskDisplay = document.querySelector("#task-display") as HTMLDivElement;
    if (taskDisplay) {
        taskDisplay.innerHTML = ""; // Clear the display
        tasks.forEach((task, index) => {
            addTaskToWebpage(task, index);
        });
    }
}

/**
 * Adds a single Task object to existing Task list in storage.
 * If no tasks are currently stored, a new list will be created and stored
 * @param t The Task that will be added to localStorage
 */
function addTaskToStorage(t: Task): void {
    const TaskStorageKey = "Tasks";
    // Read existing tasks out of storage
    let taskData = localStorage.getItem(TaskStorageKey);

    // Initialize with existing taskData if not null, or empty array if null
    let tasks: Task[] = taskData ? JSON.parse(taskData) : [];

    tasks.push(t);

    // Add to localStorage
    taskData = JSON.stringify(tasks);
    localStorage.setItem(TaskStorageKey, taskData);
}

function clearAllTasks(): void {
    const TaskStorageKey = "Tasks";
    localStorage.removeItem(TaskStorageKey);
    let taskDisplay = document.querySelector("#task-display") as HTMLDivElement;
    if (taskDisplay) {
        taskDisplay.innerHTML = ""; // Clear the display
    } else {
        console.error("Element with ID 'task-display' not found");
    }
    console.log("All tasks have been cleared from storage.");
}

/**
 * Clears the input fields after a task is added
 */
function clearInputFields(): void {
    // Get all inputs
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let descriptionTextBox = document.querySelector("#description") as HTMLInputElement;
    let completedRadioButtons = document.querySelectorAll('input[name="completed"]') as NodeListOf<HTMLInputElement>;

    // Clear the values
    titleTextBox.value = "";
    descriptionTextBox.value = "";
    completedRadioButtons.forEach(button => button.checked = false);
}

/**
 * Clears all the validation error message spans
 * in the form
 */
function clearAllErrorMessages(): void {
    // Get all error spans
    let allSpans = document.querySelectorAll("form span.error-msg");

    // Loop through, and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}
