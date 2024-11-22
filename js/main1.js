"use strict";
//  Starter code author is Joe Ortiz
//  Modifications by Jeffrey Turner
//  
/**
 * Represents an individual task
 */
/**
 * Represents an individual task
 */
class Task {
    constructor(title, description, completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}
window.onload = function () {
    // Set up button click for add and clear task form
    let addTaskBtn = document.querySelector("#add-task");
    addTaskBtn.onclick = processTask;
    let clearTasksBtn = document.querySelector("#clear-tasks");
    clearTasksBtn.onclick = clearAllTasks;
    // Load existing tasks from localStorage
    loadTasks();
    /*
    // Check if storage exists, if not, add a dummy task
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    if (!taskData) {
        addDummyTask();
    }
        */
};
/*
/**
 * Adds a dummy task to storage.
 *
function addDummyTask(): void {
    // Create a dummy Task object
    let dummyTask = new Task("Title", "Description", false);

    // Add the dummy Task to storage
    addTaskToStorage(dummyTask);

    console.log("Dummy task added to storage:", dummyTask);
}
*/
/**
 * Load tasks from localStorage and display them on the webpage.
 */
function loadTasks() {
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    if (taskData) {
        let tasks = JSON.parse(taskData);
        for (let task of tasks) {
            addTaskToWebpage(task);
        }
    }
}
function processTask() {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToWebpage(userTask);
        addTaskToStorage(userTask);
        clearInputFields(); // Clear the input fields after task is added
    }
}
/**
 * This function will retrieve all the task
 * data from the HTML page. If all data is valid
 * a Task object will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the web page.
 */
function getTask() {
    clearAllErrorMessages();
    // Get all inputs
    let titleTextBox = document.querySelector("#title");
    let descriptionTextBox = document.querySelector("#description");
    let completedRadio = document.querySelector('input[name="completed"]:checked');
    // Validate data
    let isValidData = true;
    // Validate the title
    let title = titleTextBox.value;
    if (!isValidTitle(title)) {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        if (titleErrorSpan) {
            titleErrorSpan.textContent = "Title can only be 25 characters.";
        }
    }
    // Validate description
    let description = descriptionTextBox.value;
    if (description.length > 256) {
        isValidData = false;
        let descriptionErrorSpan = descriptionTextBox.nextElementSibling;
        if (descriptionErrorSpan) {
            descriptionErrorSpan.textContent = "Description can only be up to 256 characters.";
        }
    }
    if (isValidData) {
        // Create and populate Task object if all data is valid
        let addedTask = new Task(title, description, completedRadio ? completedRadio.value === "true" : false);
        return addedTask;
    }
    return null; // Return null if any invalid data is present
}
/**
 * This validates a title is 25 characters or fewer but not null
 */
function isValidTitle(data) {
    let regex = /^.{1,25}$/;
    return regex.test(data);
}
/**
 * Adds a Task object to the web page. Assumes
 * all data is valid
 * @param t The Task containing valid data to be added
 */
function addTaskToWebpage(t) {
    console.log(t);
    // Create a div for the task
    let taskDiv = document.createElement("div");
    // Create and set up the title and description heading
    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${t.title} : ${t.description}`;
    // Create and set up the completed status span
    let statusSpan = document.createElement("span");
    statusSpan.textContent = `Completed: ${t.completed ? "Yes" : "No"}`;
    statusSpan.style.marginLeft = "10px"; // Add some space between the text and the status
    // Add titleHeading and statusSpan to taskDiv
    taskDiv.appendChild(titleHeading);
    taskDiv.appendChild(statusSpan);
    // Safely append taskDiv to the task display container
    let taskDisplay = document.querySelector("#task-display");
    if (taskDisplay) {
        taskDisplay.appendChild(taskDiv);
    }
    else {
        console.error("Element with ID 'task-display' not found");
    }
}
/**
 * Adds a single Task object to existing Task list in storage.
 * If no tasks are currently stored, a new list will be created and stored
 * @param t The Task that will be added to localStorage
 */
function addTaskToStorage(t) {
    const TaskStorageKey = "Tasks";
    // Read existing tasks out of storage
    let taskData = localStorage.getItem(TaskStorageKey);
    // Initialize with existing taskData if not null, or empty array if null
    let tasks = taskData ? JSON.parse(taskData) : [];
    tasks.push(t);
    // Add to localStorage
    taskData = JSON.stringify(tasks);
    localStorage.setItem(TaskStorageKey, taskData);
}
function clearAllTasks() {
    const TaskStorageKey = "Tasks";
    localStorage.removeItem(TaskStorageKey);
    let taskDisplay = document.querySelector("#task-display");
    if (taskDisplay) {
        taskDisplay.innerHTML = ""; // Clear the display
    }
    else {
        console.error("Element with ID 'task-display' not found");
    }
    console.log("All tasks have been cleared from storage.");
}
/**
 * Clears the input fields after a task is added
 */
function clearInputFields() {
    // Get all inputs
    let titleTextBox = document.querySelector("#title");
    let descriptionTextBox = document.querySelector("#description");
    let completedRadioButtons = document.querySelectorAll('input[name="completed"]');
    // Clear the values
    titleTextBox.value = "";
    descriptionTextBox.value = "";
    completedRadioButtons.forEach(button => button.checked = false);
}
/**
 * Clears all the validation error message spans
 * in the form
 */
function clearAllErrorMessages() {
    // Get all error spans
    let allSpans = document.querySelectorAll("form span.error-msg");
    // Loop through, and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}
