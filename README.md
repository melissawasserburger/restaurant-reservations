# Periodic Tables: Restaurant Reservation System

Easy to use reservation system directly made for restaurant personnel.  Help your company keep track, edit, create, update and delete specified tables, reservations, and statuses.

## Demo

You can view the app here: https://thinkful-tables-frontend.herokuapp.com

## Installation

1. Run `npm install` under the root folder to install project dependencies.
1. Run `npm run start` to start your server.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than http://localhost:5001.

## Features

### Reservation Management

The main focus of this application is to allow the user to easily manage guests. The main features include:

1. Create: You can head to the top right of the dashboard and click "New Reservation" which will prompt a screen that allows you to create a detailed reservation: 

<img width="1440" alt="Screen Shot of reservation form" src="./front-end/src/photos/create-res-sc.png">

2. Edit: Once a reservation has been created you will be redirected to the dashboard page of the date of that reservation. The reservation card on that page will include options to seat, edit, or cancel your reservation.

<img width="1440" alt="Screen Shot of reservation form" src="./front-end/src/photos/res-list-sc.jpg">

Upon clicking edit, will direct you to the initial form upon which you created the reservation, with all fields filled with current and editable information: 

<img width="1440" alt="Screen Shot of filled form" src="./front-end/src/photos/edit-res-sc.png">

3. Delete: If you wish to click the cancel button on the reservation, you will be prompted with the following message which will either delete the reservation or cancel the request to delete it:

<img width="1440" alt="Screen Shot of delete confirmation" src="./front-end/src/photos/delete-confirm-sc.png">

4. Assigning Tables to Reservations: Clicking the "seat" button will allow you to assign this reservation a table:

<img width="1440" alt="Screen Shot of seat table form" src="./front-end/src/photos/seat-table-sc.png">

Once the reservation at any table is done with their table you can click the "finish" button to clear the table to be available for other reservations:

<img width="1440" alt="Screen Shot of clear table" src="./front-end/src/photos/finish-confirm-sc.png">

5. Additional Features: Creating new tables: On the top right of the dashboard there is a nav link for creating new tables. Upon clicking the new table option you will be prompted to a new screen where you can create a new table and submit it to be available for reservations:

<img width="1440" alt="Screen Shot of table form" src="./front-end/src/photos/create-table-sc.png">

Searching a Reservation by Phone Number: Upon clicking the search button on the top of the dashboard you will be prompted to a page where you can input a phone number that will retreive and list all reservations associated with that number: 

<img width="1440" alt="Screen Shot of search form" src="./front-end/src/photos/search-sc.png">

## Plans for App Expansion

As this app is functional, I have plans for extensive styling and additional features. If you would like to submit any feature requests or bugs, head to the issues tab, and I will review it!
