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
  let newNoteButton;
  let addNoteButton;
  let cancelButton;

  window.addEventListener("load", () => {
    resetNewNoteButton();
  });

  function resetNewNoteButton(){
    createNoteDiv.innerHTML = `<button id="new_note_button">Create New Note</button><div id="spacer"></div>`;
    newNoteButton = document.getElementById("new_note_button");

    newNoteButton.addEventListener("click", () => {
      createNoteDiv.innerHTML = `<input type="text" id="note_title_input" placeholder="Enter Note Title" autocomplete="off"/>
                                 <button id="add_note_button">Add Note</button><button id="cancel_button">Cancel</button>
                                 <p class="warning_text" id="invalid_title_text"></p>`
      
      addNoteButton = document.getElementById("add_note_button");
      cancelButton = document.getElementById("cancel_button");

      addNoteButton.addEventListener("click", () => {
        addNote();
      });

      cancelButton.addEventListener("click", () => {
        resetNewNoteButton();
      });
    });
  }

  logoutButton.addEventListener("click", () => {
    window.location.replace('login.html')
  });

  function displayNotes(){
    notesList.innerHTML = "";

    Object.keys(allAccountsInfo[currentUser]['NotesData']).forEach(noteTitle => {
      let btn = document.createElement("button");
      btn.textContent = noteTitle;
      btn.classList.add("note_button");

      let wrapper = document.createElement("div");
      wrapper.classList.add("edit_note_button");

      wrapper.appendChild(btn);
      notesList.appendChild(wrapper);
    });
  }

  notesList.addEventListener("click", (event) => {
    if (event.target.classList.contains("note_button")) {
      openNote(event.target.textContent);
    }
  });
  
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

    resetNewNoteButton();
    displayNotes();
  }

  function openNote(buttonText) {
    localStorage.setItem("currentNote", buttonText);
    console.log("open note: ", localStorage.getItem("currentNote"));
    window.location.assign("edit_note.html");
  }

}else if(document.body.id === "edit_note_page"){
  let deleteNoteDiv;
  let noteInput;
  let deleteButton1;
  let deleteButton2;
  let nevermindButton;
  window.addEventListener("load", () => {
    const noteTitle = document.getElementById("note_title");
    const saveButton = document.getElementById("save_button");
    noteInput = document.getElementById("note_input"); 
    deleteNoteDiv = document.getElementById("delete_note_div")
    resetDeleteButton();

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
  
  function resetDeleteButton(){
    deleteNoteDiv.innerHTML = `<button id="delete_button_1">Delete Note</button>`
    deleteButton1 = document.getElementById("delete_button_1");
    
    deleteButton1.addEventListener("click", () => {
      deleteNoteDiv.innerHTML = `<button id="delete_button_2">Yes Delete</button><button id="nevermind_button">Never Mind</button>
                                 <p class="warning_text">WARNING: This action cannot be undone</p>`;
  
      deleteButton2 = document.getElementById("delete_button_2");
      nevermindButton = document.getElementById("nevermind_button");
  
      deleteButton2.addEventListener("click", () => {
        delete allAccountsInfo[currentUser]['NotesData'][currentNote]
        localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
        window.location.replace('notes_list.html')
      });
    
      nevermindButton.addEventListener("click", () => {
        resetDeleteButton();
      });
    });
  }

  function save(){
    allAccountsInfo[currentUser]['NotesData'][currentNote] = noteInput.value;
    localStorage.setItem("allAccountsInfo", JSON.stringify(allAccountsInfo));
  }

}