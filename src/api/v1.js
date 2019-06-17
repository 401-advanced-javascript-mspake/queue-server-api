'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();

const express = require('express');
const client = require('@nmq/q/client');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

// router.use('/web/path/to/docs', express.static('path/to/docs/on/server'))

// Evaluate the model, dynamically
router.param('model', modelFinder);


// API Routes
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers

/**
 * Handles a get request to the '/api/v1/:model' route. Gets all entries at the specefied route.
 * @param {Object} request - The request object, originally passed in from an HTTP request, may have been modified by middleware. 
 * @param {Object} response - The response object, used to pass data back to the front end.  
 * @param {function} next - Next function, indicates middleware, in this case, used to pass an error into the error handler module. 
 */
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      client.publish('database', 'read', request.model);
      response.status(200).json(output);
    })
    .catch( error => {
      client.publish('database', 'error', error);
      next(error);
    } );
}
/**
 * Handles a get request to the '/api/v1/:model/:id' route. Gets a single entry at the specefied id.
 * @param {Object} request - The request object, originally passed in from an HTTP request, may have been modified by middleware. 
 * @param {Object} response - The response object, used to pass data back to the front end.  
 * @param {function} next - Next function, indicates middleware, in this case, used to pass an error into the error handler module. 
 */
function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => {
      client.publish('database', 'read', request.model);      
      response.status(200).json(result[0]);
    } )
    .catch( error => {
      client.publish('database', 'error', error);
      next(error);
    } );
}

/**
 * Handles a post request to the '/api/v1/:model' route. Posts a singe entry to the specified route.
 * @param {Object} request - The request object, originally passed in from an HTTP request, may have been modified by middleware. 
 * @param {Object} response - The response object, used to pass data back to the front end.  
 * @param {function} next - Next function, indicates middleware, in this case, used to pass an error into the error handler module. 
 */
function handlePost(request,response,next) {
  request.model.post(request.body)
    .then( result => {
      client.publish('database', 'create', request.model);      
      response.status(200).json(result);
    } )
    .catch( error => {
      client.publish('database', 'error', error);
      next(error);
    } );
}

/**
 * Handles a put request to the '/api/v1/:model/:id' route. Updates a single entry at the specefied id. 
 * @param {Object} request - The request object, originally passed in from an HTTP request, may have been modified by middleware. 
 * @param {Object} response - The response object, used to pass data back to the front end.  
 * @param {function} next - Next function, indicates middleware, in this case, used to pass an error into the error handler module. 
 */
function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => {
      client.publish('database', 'update', request.model);      
      response.status(200).json(result);
    } )
    .catch( error => {
      client.publish('database', 'error', error);
      next(error);
    } );
}

/**
 * Handles a delete request to the '/api/v1/:model/:id' route. Deletes a single entry at the specefied id.
 * @param {Object} request - The request object, originally passed in from an HTTP request, may have been modified by middleware. 
 * @param {Object} response - The response object, used to pass data back to the front end.  
 * @param {function} next - Next function, indicates middleware, in this case, used to pass an error into the error handler module. 
 */
function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => {
      client.publish('database', 'delete', request.model);      
      response.status(200).json(result);
    } )
    .catch( error => {
      client.publish('database', 'error', error);
      next(error);
    } );
}

module.exports = router;
