# TheVintageStore_V2
This project is based on trade domain i.e. user can trade product for his own product

* **Development Stack:**
  * Front-end: Vue,js, Javascript,HTML,CSS
  * Back-end: Nodejs, Express
  * Database: MongoDB

* **Project Software requirement:**
  * Nodejs version 16.X
  * Vue.js version 2.X
  * MongoDB

**Steps to run the application:**
1. Open the project folder in a VS code.
2. In thevintagestoreapp_client run npm install.
3. Run client using npm run serve.
4. Open another terminal, go to thevintagestoreapp_server and run npm install.
5. Run backend server using npm start.

* **Project Structure:**
  * It uses MVC architecture using MVC separation of concern.
  * App.js acts as an entry point for back-end servers.
  * Main.js acts as an entry point for the front-end server.
  * The model which is responsible for data and its business logic is present in the back-end server.
  * The controller which is responsible for communication between the back-end and front-end is present in the back-end server.
  * View which is responsible for displaying data in the browser is present in the front-end server.
  * All the images and CSS are stored in the assets folder on the front-end as the vue.js standard helps to retain static files from the assets folder while building the project. 
  * The database used is MongoDB and the library used for connection is the mongoose.

* **Working of Project:**
  * Front-end calls an API from event-service using Axios calls.
  * It hits the request on the back-end server.
  * When the back-end server receives the request it calls the respective controller function for the URL.
  * Then the controller function requests a model for the data requested from the client using MongoDB queries.
  * Then the model function processes the request and responds to the controller.
  * Depending on the model response controller functions send the response to the client and then the client access the response and use it for display purpose.
  * As two servers are used, cors is used for cross-origin requests.
  * Data is retrieved from the database using MongoDB queries.

* **Authentication and Authorization:**

  * Package Used: JSON web token
  * When a user is successfully logged in, a web token is generated using user information, secret key, and expiration time. And then a token is sent in response to a     successful login.
  * Once a token is received in the front-end it is stored in local storage and for every restricted route token is sent as a header in the form of authorization.
  * Then every restricted route token is verified in the back-end and if the token is valid and not expired the user is allowed to access the route or else an           * unauthorized message is sent with status code 401.




