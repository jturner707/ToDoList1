//  Starter code author is Joe Ortiz
//  Modifications by Jeffrey Turner
//  
/**
 * Represents a individual task
 */
class Task {
    /**
     * The short title of the task. A future feature may be to just display the titles
     */
    title : string;

    /**
     * The longer description of the task
     */
    description : string;

    /**
     * Mark whether the task is completed or not.
     */
    completed : boolean;


window.onload = function() {
    // Set up button click for add task form
    let addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = processTask;
}

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
function getTask():Task {
    clearAllErrorMessages();

    // Get all inputs
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let descriptionTextBox = document.querySelector("#description") as HTMLInputElement;
    let completedradio = document.querySelector("#completed") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate the title
    let title:string = titleTextBox.value;
    if (!isValidTitle(title)) {
        isValidData = false;
        titleTextBox.nextElementSibling.textContent = "Title can only be 25 characters.";
    }

    // Validate description
    let description:string = descriptionTextBox.value;
    if (description.trim() == "") {
        isValidData = false;
        let descriptionErrorSpan = descriptionTextBox.nextElementSibling;
        descriptionErrorSpan.textContent = "Description can only be 256 characters.";
    }
    
    // no validation for radio button check
    if (isValidData) {
        // Create and populate Book object if all data is valid
        let addedTask = new Task();
        addedTask.title = title;
        addedTask.description = description;
        addedTask.completed = completed;

        return addedTask;
    }
    return null; // Return null if any invalid data is present
}

/**
 * This validates a title is 25 character or fewer but not null
 * Create regex object.  Use the test method of regex.
 */
function isValidTitle(data) {
    let regex = /^.{1,25}$/;
    return regex.test(data);
}


/**
 * Adds a Book object to the web page. Assumes
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addTaskToWebpage(t:Task):void {
    console.log(t);

    // Add the task to the web page
    let taskDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${t.title} : ${t.description}`;
    // Add h2 to task div <div><h2>Title : description</h2></div>
    taskDiv.appendChild(titleHeading);
    


    // Add bookDiv to web page
    document.querySelector("#task-display").appendChild(taskDiv);
}

/**
 * Adds a single Book object to existing Book list in storage.
 * If no books are currently stored a new list will be created and stored
 * @param b The Book that will be added to localStorage
 */
function addTaskToStorage(t:Task):void {
    const TaskStorageKey = "Tasks";
    // Read existing tasks out of storage
    let taskData = localStorage.getItem(TaskStorageKey);

    // Initialize with existing taskData is not null, or empty array if null
    // This is a JS ternary/conditional operator
    let tasks:Task[] = taskData ? JSON.parse(taskData) : [];
    
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
    for(let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}