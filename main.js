const taskForm = document.querySelector("#task-form");
const mainTaskList = document.querySelector("#tasks");
const completedTaskList = document.querySelector("#completed-tasks");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskValue = taskForm.querySelector("#task").value;
  addTask(taskValue, mainTaskList, true);
});



function addTask(taskName, taskList = mainTaskList, controls = true) {
  let listItem = document.createElement("li");
  console.log(taskName);
  listItem.innerText = taskName;
  taskList.appendChild(listItem);
  if (controls == true) {
    addTaskControls(listItem);
  }
}

function addTaskControls(taskListItem) {
  let completedTaskBtn = document.createElement("button");
  completedTaskBtn.innerText = "complete";

  completedTaskBtn.addEventListener("click", () => {
    let parentTaskValue = taskListItem.innerText
      .replace("complete", "")
      .replace("delete", "");
    console.log(parentTaskValue);
    addTask(parentTaskValue, completedTaskList, false);

    taskListItem.remove();

  });

  let deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.innerText = "delete";

  deleteTaskBtn.addEventListener("click",()=>{
    taskListItem.remove()
  })


  taskListItem.appendChild(completedTaskBtn);
  taskListItem.appendChild(deleteTaskBtn);
}


