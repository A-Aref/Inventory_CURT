# Inventory Management System

This repository contains the source code for an Inventory Management System built with React for the frontend and Node.js/Express for the backend. The system allows users to manage different categories of inventory items, including mechanical parts, raw materials, and electrical parts.


## Installation

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)
-   MongoDB

### Steps

1.  Clone the repository:
    
    git  clone  https://github.com/A-Aref/Inventory_CURT.git
    
    cd  Inventory_CURT

2. Create a MongoDB
    
3.  Create a  `.env`  file in the  `server`  directory and add your MongoDB connection string and other environment variables:
    
    MONGOCONNECTION=your_mongodb_connection_string
    
    PORT=5000
    
4.  Start the development servers:
    
    ## In one terminal, start the backend server
    
    cd  server

	  npm install
    
    npm  run dev
    
    ## In another terminal, start the frontend server
    
    cd  client\Inventory_CURT

	  npm install
    
    npm  run dev
    

## Usage

Once the servers are running, you can access the application at  `http://localhost:5173`. The backend server will be running at  `http://localhost:5000`.

## Notes
Admin privillages must be given manually by editing the user role in database from `regular` to `admin` as user are by default given a role of `regular`
