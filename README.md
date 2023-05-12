# UltraShop
eCommerce app

## General Information

UltraShop is an eCommerce online store project developed for the React SoftUni course (Feb 2023 – April 2023). The application is suitable for small businesses that aim to sell their goods online and features an easy-to-use interface for managing products, orders, and customers.  It has been built with the MERN stack (MongoDB, Express.js, React and Node.js) and uses React Redux as a state management solution. The app has been deployed and can be accessed through the following [URL](https://ultrashop.onrender.com) (it takes a while to load but it does load, give it a minute or two :)).  

![image](https://i.ibb.co/TY1fXrJ/Ultra-Shop-screenshot.jpg)
 

## Features

-	Shopping Cart that features functionality to add and remove items.
-	Functionality to review products and leave product ratings.
-	A carousel for top-rated products.
-	Product pagination
-	Product search functionality
-	User profile that allows for the update of user data (name, email and password) and user orders review. 
-	Admin product and user management that features the full CRUD operations.
-	Admin order details page that includes functionality to mark orders as delivered.
-	4-step checkout process: sign in, shipping, payment, order placement.
-	Order payment via PayPal.

## Usage
### Environment dependencies:

`NODE_ENV = development`  
`PORT = 5000`  
`MONGO_URI = **Developer’s MongoDB URI**`  
`JWT_SECRET = **JWT secret created by the developer**`  
`PAYPAL_CLIENT_ID = **Developer’s PayPal client ID**`  

### Install dependencies:

`npm install`  
`cd frontend`  
`npm install`  

### Run:
`# Run frontend (:3000) & backend (:5000)`  
`npm run dev`  
`# Run backend only`  
`npm run server`  

### Data seeding:

`# Import data`  
`npm run data:import`  

`# Destroy data`  
`npm run data:destroy`  

### Sample user logins:

`admin@example.com (Admin)`  
`123456`  
`john@example.com (Customer)`  
`123456`  
`Jane@example.com (Customer)`  
`123456`  

## Feedback and contributions:

Feedback and contributions are always welcome. If you find a bug or have an idea for a new feature, please create an issue or submit a pull request.

## License
This project is licensed under the MIT license.
