'use strict';
const  db = require('../models');
const Note = db.note;
const Op = db.Sequelize.Op;

exports.createNote = async(newNote) => {
    const note = await Note.create(newNote);
    return note;
};

exports.allNote = async() => {
  const notes = await Note.findAll();
  return notes;
};

exports.readNote = async(id) => {
  const note = await Note.findByPk(id);
  return note;
};

exports.updateNote = async(newData,id) => {
  const note = await Note.update(newData,{where: { id: id }});
  if(note == 1){
    return "note was updated successfully.";
  }
  return "error note note found";
};

exports.deleteNote = async(id) => {
  const note = await Note.destroy({where: { id: id }});
  if(note == 1){
    return "note was deleted successfully.";
  }
  return "error note note found";
};

