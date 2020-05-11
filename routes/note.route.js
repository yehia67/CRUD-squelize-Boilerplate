const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')

const { 
  createNote,
  allNotes,
  readNote,
  updateNote,
  deleteNote
 } = require('../controllers/note.controller').Note;

router.post('/', createNote);
router.get('/', allNotes);

router.get('/:id', readNote);
router.put('/:id', updateNote);
router.delete('/:id',deleteNote);

exports.Router = router;