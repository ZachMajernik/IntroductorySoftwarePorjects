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
    const noteTitle = document.getElementById("note_title");
    noteTitle.innerHTML = currentNote
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
}