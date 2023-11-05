let title = document.getElementById("title");
let des = document.getElementById("des");
let submitBtn = document.getElementById("btn");
let form = document.querySelector("form");
let container = document.querySelector(".container");

let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
showTasks();

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showTasks() {
  console.log(tasks);
  tasks.forEach((value, index) => {
    let div = document.createElement("div");
    div.setAttribute("class", "task");

    let innerDiv = document.createElement("div");
    div.append(innerDiv);
    tasks[index].completed
      ? innerDiv.classList.add("completed")
      : innerDiv.classList.remove("completed");

    let p = document.createElement("p");
    p.innerHTML = `<strong>Title:</strong> ${value.title}`;
    innerDiv.append(p);

    let span = document.createElement("span");
    span.innerHTML = `<strong>Description:</strong> ${value.description}`;
    innerDiv.append(span);

    let divBtn = document.createElement("div");
    divBtn.setAttribute("class", "button-container");

    let btn = document.createElement("button");
    btn.setAttribute("class", "del-btn");
    btn.setAttribute("title", "Delete Task");
    btn.innerHTML = "-";
    divBtn.append(btn);

    let completeTaskBtn = document.createElement("button");
    completeTaskBtn.setAttribute("class", "complete-btn");

    if (tasks[index].completed) {
      completeTaskBtn.setAttribute("title", "Mark Not Completed");
      completeTaskBtn.style.background =
        " radial-gradient(crimson, transparent)";
      completeTaskBtn.innerHTML = "&#10008;";
    } else {
      completeTaskBtn.setAttribute("title", "Mark Completed");
      completeTaskBtn.style.background = " radial-gradient(green, transparent)";
      completeTaskBtn.innerHTML = "&#10004;";
    }
    divBtn.append(completeTaskBtn);

    div.append(divBtn);

    btn.addEventListener("click", function() {
      removeTasks();
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      showTasks();
    });

    completeTaskBtn.addEventListener("click", function() {
      tasks[index].completed = !tasks[index].completed;

      if (tasks[index].completed) {
        completeTaskBtn.setAttribute("title", "Mark Not Completed");
        completeTaskBtn.style.background =
          " radial-gradient(crimson, transparent)";
        completeTaskBtn.innerHTML = "&#10008;";
      } else {
        completeTaskBtn.setAttribute("title", "Mark Completed");
        completeTaskBtn.style.background =
          " radial-gradient(green, transparent)";
        completeTaskBtn.innerHTML = "&#10004;";
      }
      tasks[index].completed
        ? innerDiv.classList.add("completed")
        : innerDiv.classList.remove("completed");

      saveTasksToLocalStorage();
    });

    container.append(div);
  });
}

let removeTasks = () => {
  tasks.forEach(() => {
    const div = document.querySelector(".task");
    div.remove();
  });
};

form.addEventListener("submit", function(e) {
  e.preventDefault();
  removeTasks();
  tasks.push({
    title: title.value,
    description: des.value,
    completed: false,
  });
  saveTasksToLocalStorage();
  showTasks();
  title.value = "";
  des.value = "";
});
