![CF](http://i.imgur.com/7v5ASc8.png) LAB   
=================================================  
  
## Lab 19 - API  
  
### Author: Morgana Spake  
  
### Links and Resources  
* [submission PR](https://github.com/401-advanced-javascript-mspake/lab-19-api/pull/1)  
  
### Modules  
#### `app.js, v1.js, 404.js, 500.js, model-finder.js, mongo-model,js, players-model.js, players-schema.js, teams-model.js, teams-schema.js`  
  
##### Exported Values and Methods  
  
###### `app -> express server`  
###### `router -> express Router instance`   
###### `404 -> middelware`  
###### `500 -> middelware error handler`  
###### `model-finder -> middelware`  
###### `mongo-model -> Model class constructor`  
###### `players-model -> new instance of the Players class`  
###### `teams-model -> new instance of the Teams class`  
###### `teams-schema -> mongoose schema`  
###### `players-schema -> mongoose schema`  


### Setup   
#### `.env` requirements  
* `PORT` - Port Number (ie: 3000)  
* `MONGODB_URI` - URL to the running mongo instance/db (ie: mongodb://localhost:27017/databaseName)  
#### Running the app  
* `npm start`  
  
Endpoints:  
* `/api/v1/:model`  
* `/api/v1/:model`  
* `/api/v1/:model/:id`  
* `/api/v1/:model/:id`  
* `/api/v1/:model/:id`  
  
#### UML
![uml](https://github.com/401-advanced-javascript-mspake/lab-19-api/blob/refactor-api-with-nmq/assets/uml.jpg)