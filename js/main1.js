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
    // Set up button click for add task form
    let addTaskBtn = document.querySelector("#add-task");
    addTaskBtn.onclick = processTask;
};
/**
 * Adds a dummy task to storage.
 */
function addDummyTask() {
    // Create a dummy Task object
    let dummyTask = new Task("Title", "Description", false);
    // Add the dummy Task to storage
    addTaskToStorage(dummyTask);
    console.log("Dummy task added to storage:", dummyTask);
}
// Call this function to add a dummy task when needed
// addDummyTask();
function processTask() {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToWebpage(userTask);
        addTaskToStorage(userTask);
    }
}
/**
 * This function will retrieve all the task
 * data from the HTML page. If all data is valid
 * a Task object will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the web page.
 */
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
    if (description.trim() === "") {
        isValidData = false;
        let descriptionErrorSpan = descriptionTextBox.nextElementSibling;
        if (descriptionErrorSpan) {
            descriptionErrorSpan.textContent = "Description can only be 256 characters.";
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
    // Add the task to the web page
    let taskDiv = document.createElement("div");
    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${t.title} : ${t.description}`;
    // Add h2 to task div <div><h2>Title : description</h2></div>
    taskDiv.appendChild(titleHeading);
    // Safely append taskDiv to #task-display if it exists
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
