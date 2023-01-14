# Project micro-api-ecommerce

## Description
The project is a simple API for an e-commerce. The purpose of the project is to demonstrate BE skills.

## How it works
The application load in memory (sqlite) from csv files the products, users and the orders in the boostrap phase. The products are loaded from the file `items.csv`, users are loaded from the file `users.csv` and the orders from the file `orders.csv`.

Then it expose the data through the following endpoints:
* /items
* /orders
* /users

You can find example files with relative schema in the mock_files folder.

## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000/`


## Environment variables
 * API_PORT - port for the API - default 3000
 * FILE_PATH - path to the file with data - default ./mock_files

## Testing
Run `npm test`