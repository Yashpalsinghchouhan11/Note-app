const btnE1 = document.getElementById("btn");
const containerE1 = document.getElementById("container");

getnotes().forEach((note)=>{
  const noteE1 = createNoteEl(note.id,note.content);
  containerE1.insertBefore(noteE1,btnE1);
});

function createNoteEl(id,content)
{
  const element = document.createElement("textarea");
  element.classList.add("textarea");
  element.placeholder = "Empty note";
  element.value = content;

  element.addEventListener("dblclick",()=>{
    const warning = confirm("do you want to delete this note ?");
    if (warning)
    {
      deletenote(id,element);
    }

  });

  element.addEventListener("input",()=>{
    updateNote(id,element.value);
  });

  return element;
}

function deletenote(id,element)
  {
    const notes = getnotes().filter((note) => note.id != id)
    savenote(notes);
    containerE1.removeChild(element);
  }

function updateNote(id,content)
  {
    const notes = getnotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    savenote(notes);
  }

function addNote()
{
  const notes = getnotes();
  const objNote = {
    id: Math.floor(Math.random()*10000),
    content:"",
  }

  const noteE1 = createNoteEl(objNote.id,objNote.content);
  containerE1.insertBefore(noteE1,btnE1);
  notes.push(objNote);
  savenote(notes);
  
}

function savenote(notes)
{
  localStorage.setItem("note-app" , JSON.stringify(notes));
}

function getnotes()
{
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
btnE1.addEventListener('click',addNote);