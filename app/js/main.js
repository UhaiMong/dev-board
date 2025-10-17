function getRandomBgColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomBgColor() {
  const bodyBg = document.getElementById("body-bg");
  if (bodyBg) {
    bodyBg.style.backgroundColor = getRandomBgColor();
  } else {
    bodyBg.style.backgroundColor = "#E6DFAF";
  }
}

async function fetchTaskData() {
  try {
    const res = await fetch("./json/taskData.json");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to load taskData.json:", err);
  }
}

fetchTaskData().then((data) => {
  const singleTask = getElementByID("taskSection");
  const assignedTask = getElementByID("assigned-tasks");
  const dataLength = data.length;
  const dataLengthString = dataLength.toString();
  assignedTask.innerText = dataLengthString;
  data.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = `
               <div class="card card-border task-box bg-primary">
              <div class="card-body">
                <div class="bg-base task-project rounded-md">${p.projectName}</div>
                <h2 class="text-xl font-semibold">${p.issueTitle}</h2>
                <p class="bg-base task-description">
                  ${p.issueDetails}
                </p>
                <div
                  class="card-actions justify-between"
                  style="margin-top: 18px"
                >
                  <div>
                    <p class="text-xs text-gray-400">Deadline</p>
                    <span class="text-sm font-semibold">${p.deadline}</span>
                  </div>
                  <button id="btn-${p.id}" onClick="handleId(${p.id})" class="complete-button">Complete</button>
                </div>
              </div>
            </div>
  `;
    singleTask.appendChild(div);
  });
});

function handleId(id) {
  let assignedTasks = getTextValueById("assigned-tasks");
  let completedTask = getTextValueById("task-completed");

  // Button disable
  const btn = getElementByID(`btn-${id}`);
  btn.disabled = true;
  btn.style.opacity = 0.6;
  btn.innerText = "Completed";
  btn.style.cursor = "auto";

  // Update tasks
  const remainingTask = assignedTasks - 1;
  const totalCompleted = completedTask + 1;

  setTextById("assigned-tasks", remainingTask);
  setTextById("task-completed", totalCompleted);

  fetchTaskData().then((data) => {
    const fixedIssue = data.find((i) => i.id === id);
    if (fixedIssue) {
      activityLogHandler(fixedIssue);
    }
  });
}

function activityLogHandler(completedTask) {
  const activityLog = getElementByID("activity-log");
  const element = document.createElement("div");
  element.innerHTML = `
              <div class="activity-history bg-primary rounded-md">
                <p>Project: ${completedTask.projectName} Issue: ${
    completedTask.issueTitle
  }<br> Completed on: <small class="underline text-blue-600 italic">${new Date().toLocaleString()}</small> </p>
              </div>
  `;
  activityLog.appendChild(element);
  getElementByID("clear-activity").addEventListener("click", function () {
    element.innerHTML = ``;
  });
}

const today = getElementByID("day");
const fullDate = getElementByID("date");

const date = new Date();
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Dicember",
];
const day = dayName[date.getDay()];
const month = monthName[date.getMonth()];
const currentDate = date.getDate();
const year = date.getFullYear();
today.textContent = day;
fullDate.textContent = `${month} ${currentDate}, ${year}`;
