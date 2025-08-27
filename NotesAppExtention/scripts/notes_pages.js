const currentUserText = document.getElementById("current_user_text");
const logoutButton = document.getElementById("logout_button");

let allAccountsInfo = {};
let currentUser = ""
let currentNote = ""
window.addEventListener("load", () => {
  if (localStorage.getItem("allAccountsInfo")) {
    allAccountsInfo = JSON.parse(localStorage.getItem("allAccountsInfo"));
  }
  if (localStorage.getItem("currentUser")) {
    currentUser = localStorage.getItem("currentUser");
  }
  console.log(currentUser);
  console.log(allAccountsInfo[currentUser]['NotesData'])

  if(document.body.id === "notes_list_page"){
    localStorage.setItem("currentNote", "");
    const currentUserText = document.getElementById("current_user_text");
    currentUserText.innerHTML = `<h1>Current User: ${currentUser}</h1>`;
    displayNotes();
  }else if(document.body.id === "edit_note_page"){
    if (localStorage.getItem("currentNote")) {
      currentNote = localStorage.getItem("currentNote");
    }
    console.log(currentNote);
  }
});

if(document.body.id === "notes_list_page"){
  const logoutButton = document.getElementById("logout_button");
  const createNoteDiv = document.getElementById("create_note_div");
  const notesList = document.getElementById("notes_list");

  logoutButton.addEventListener("click", () => {
    window.location.replace('login.html')
  });

  function displayNotes(){
    notesList.innerHTML = ""
    Object.keys(allAccountsInfo[currentUser]['NotesData']).forEach(noteTitle => {
      let btn = document.createElement("button");
      btn.textContent = noteTitle;
      btn.addEventListener("click", (event) => {
        openNote(event.target.textContent);
      });
      notesList.appendChild(btn);
    });
  }

  function openNote(buttonText) {
    localStorage.setItem("currentNote", buttonText);
    console.log("open note: ", localStorage.getItem("currentNote"));
    window.location.assign("edit_note.html");
  }

  function createNewNote(){
    createNoteDiv.innerHTML = `<input type="text" id="note_title_input" placeholder="Enter Note Title" autocomplete="off"/>
                               <button onclick="addNote()">Add Note</button>
                               <p class="warning_text" id="invalid_title_text"></p>`
  }

  function addNote(){
    let noteTitleInput = document.getElementById("note_title_input");
    let invalidTitleText =  document.getElementById("invalid_title_text");

    newTitle = noteTitleInput.value.trim();
    if (newTitle === "" || newTitle in allAccountsInfo[currentUser]['NotesData']) {
        invalidTitleText.innerHTML = "This title is blank or already taken";
        return;
    }
    allAccountsInfo[currentUser]['NotesData'][newTitle] = "";
    localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
    console.log(allAccountsInfo[currentUser]['NotesData'])

    createNoteDiv.innerHTML = `<button onclick="createNewNote()">Create New Note</button>`
    displayNotes();
  }
}else if(document.body.id === "edit_note_page"){
  let deleteNoteDiv;
  let noteInput;
  window.addEventListener("load", () => {
    const saveButton = document.getElementById("save_button");
    noteInput = document.getElementById("note_input"); 
    const noteTitle = document.getElementById("note_title");
    deleteNoteDiv = document.getElementById("delete_note_div")

    noteTitle.innerHTML = currentNote
    noteInput.value = allAccountsInfo[currentUser]['NotesData'][currentNote];

    noteInput.addEventListener("input", () => {
      save();
    });

    saveButton.addEventListener("click", () => {
      save();
      window.location.replace('notes_list.html')
    });
  });

  function save(){
    allAccountsInfo[currentUser]['NotesData'][currentNote] = noteInput.value;
    localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
  }

  function deleteButtonClicked(){
    deleteNoteDiv.innerHTML = `<button id="delete_button" onclick="deleteNote()">ARE YOU SURE?</button>
                               <button id="nevermind_button" onclick="cancelDelete()">Never Mind</button>
                               <p class="warning_text">WARNING: This action is cannot be undone</p>`
  }

  function cancelDelete(){
    deleteNoteDiv.innerHTML = `<div id="delete_note_div"><button id="delete_button" onclick="deleteButtonClicked()">Delete Note</button></div>`
  }

  function deleteNote(){
    delete allAccountsInfo[currentUser]['NotesData'][currentNote]
    localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
    window.location.replace('notes_list.html')
  }
}