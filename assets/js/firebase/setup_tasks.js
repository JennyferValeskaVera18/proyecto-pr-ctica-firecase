import { createTask, onGetTask, updateTask, deleteTask, getTask } from "./firebase.js";

const taskForm = document.getElementById("create-form");
const tasksContainer = document.getElementById("tasks-container");

let id = "";
let editStatus = false;
let userGlobAL;

export default function setUpTasks(user)  {
    userGlobAL = user;

    onGetTask((querySnapshot) => {
        let html = '';

        // READ
        querySnapshot.forEach(doc => {
            const data = doc.data();
            

            html += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class ="text-right"> ${data.userName}<h6/>
                        <h4 class="card-title">${data.title}</h4>
                        <p class="opacity-75"> ${data.date} ${data.time}<p/>
                        <p class="card-text">${data.description}</p>
                        <div class="row">
                            <button class='btn btn-danger btn-delete-custom mx-auto col-5' data-id='${doc.id}'>🗑 Eliminar</button>
                            <button class='btn btn-info btn-edit-custom mx-auto col-5' data-id='${doc.id}'>🖉 Editar</button>
                        </div>
                    </div>
                </div>
            `;
        });

        tasksContainer.innerHTML = html;

        // DELETE
        const btnsDelete = document.querySelectorAll(".btn-delete-custom");

        btnsDelete.forEach(btn => {
            btn.addEventListener("click", ({target: { dataset }}) => deleteTask(dataset.id));
        });
        //UPDATE
        const btnsEdit = document.querySelectorAll(".btn-edit-custom");


        btnsEdit.forEach(btn => {
            btn.addEventListener("click", async ({target : {dataset}}) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                taskForm["task-title"].value = task.title;
                taskForm["task-content"].value = task.description;

                editStatus = true;
                id = doc.id;

                taskForm ["btn-task-save"].innerHTML = "Update";
                //task
            });
        });
    });
};

// CREATE
taskForm.addEventListener("submit", (e) => {
    // Evitamos que recargue la pagina
    e.preventDefault();
    
    //Fecha
 
    const fullDate = new Date();
    const date = getFormattedDate(fullDate);
    const time = getFormattedTime(fullDate);
    
    //Obtenemos el nombre
    const userName = userGlobAL.displayName;

    const title = taskForm["task-title"].value;
    const description = taskForm["task-content"].value;
    //Si no estoy editando el boton sirve para crear 
    if (!editStatus) {
        createTask(title, description, userName, date, time);
    }
    else {
        updateTask( id, ({
            title : title,
            description : description

        }));
        editStatus = false;

        taskForm["btn-task-save"].innerHTML = "Create";
        //taskText.innerHTML = "New Task";

    }
    taskForm.reset();
});

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  }

  function getFormattedTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours < 10) {
        hours = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }