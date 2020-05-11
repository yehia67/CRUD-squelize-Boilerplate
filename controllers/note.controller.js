const logger = require('npmlog');

const note = require('../services/note.service')
const { ServerError } = require('../serverConfig');
const { handleError } = require('../util/functions')


exports.Note = new class Note {
    // self = this;

    async createNote(req, res, next) {
      logger.info('Request body is', req.body);
      try{
        const response = await note.createNote(req.body)
        res.json(response);
      }
      catch(error){
        handleError({
          error,
          next,
          ServerError,
          logger: logger.error
        });
      }
    }


    async allNotes(req, res, next) {
      try{
        const response = await note.allNote();
        res.json(response);
      }
      catch(error){
        handleError({
          error,
          next,
          ServerError,
          logger: logger.error
        });
      }
    }
   
    async readNote(req, res, next) {
      logger.info('Request params is', req.params);
      try{
        const response = await note.readNote(req.params.id);
        res.json(response);
      }
      catch(error){
         handleError({error, next, ServerError, logger: logger.error});
      }
   }

   async updateNote(req, res, next) {
    logger.info('Request body is', req.body);
    try{
      const response = await note.updateNote(req.body, req.params.id);
      res.json(response);
    } 
    catch(error){
       handleError({
         error,
         next,
         ServerError,
         logger: logger.error
       });
    }
  }

  async deleteNote(req, res, next) {
    logger.info('Request params is', req.params);
    try{
      const response = await note.deleteNote(req.params.id);
      res.json(response);
    } 
    catch(error){
       handleError({
         error,
         next,
         ServerError,
         logger: logger.error
       });
    }
  }
  

}
