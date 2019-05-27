import interactiveUIConfigNotes  from "../notes/interactiveUIConfig.md";


/**
 * This is to dynamically add common notes to a note
 * @param string Note
 * @param array Globals A list of arrays each containing a string to replace and the note
 * used in the replacement
 * @return String An updated note embedded with the global notes
*/
const addGlobalNotes = (note, globals = []) => {
  let updatedNote = note;

  [
    ['{{interactiveUIConfig}}', interactiveUIConfigNotes],
    ...globals
  ].forEach(globalNote => {
    updatedNote = updatedNote.replace(...globalNote);
  });

  return updatedNote;
}


/**
 * This is used to load notes in a specific directory and save them in an object to be used
 * by storybook's notes addon
 * @param Require
 * @param array globalNotes A list of arrays each containing a string to replace and the note
 * @return object An object of notes
*/
const loadNotes = (req, globalNotes = []) => {
  const notes = {};

  req.keys().forEach((filename) => {
    const noteTitle = filename.replace('./', '').replace('.md', '')
    notes[noteTitle] = addGlobalNotes(req(filename), globalNotes);
  });

  return notes;
}

/**
 * Gets the notes object that storybook requires to render the notes
 * @param sring Markdown
 * @param object
*/
const getNotes = markdown => ({ notes: { markdown } });

export {
  loadNotes,
  getNotes
};
