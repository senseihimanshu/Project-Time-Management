# Timesheet Management System
A web portal to maintain the timesheets for employees working in an organization.

### Getting started
   * git clone `https://github.com/cybergroupdevs/project-portal.git`

### Prerequisites
Before the project setup, ensure to have the latest version of the following softwares on your system
   * Angular
   * NodeJS
   * MongoDB
 
### Installation(Front-end)
Run the following commands in the `client` directory of the project
   ```npm install```
   ```ng serve``` 
This will start the project on the browser at `localhost:4200`

### Installation(Back-end)
Run the following commands in the `server` directory of the project to start the server
   ```npm install```
   ```npm start```

### Tools used
   * `Mediaquery` and `Bootstrap`- used to make web pages responsive for different screens
   * `Nodemailer`- used to send emails to employees 
   * `chartJS`- used for visualizations

### About 
   * This project facilitates a portal for timesheets management of all employees to be submitted weekly and reviewed accordingly by their respective Project Managers.
 An employee can be assigned one these role : *admin* or *employee* or *project manager* or *c-level manager*. 
 According to the assigned role, he/she will be redirected to a dashboard.
 The project works differently for different roles of employees:-
 
   #### Admin
   * can add, update, delete and search employees and their relevant details
   * can add, update, delete and search projects and their relevant details.
   * can view all the submitted timesheets and their status.

   #### Employee
   * can view all the submitted timesheets along with their status (approved or declined by their respective project manager).
   * can create a new weekly timesheet or update a previous one(that is not already reviewed).

   ** In the timesheet creation,employee has to fill details of the project he/she is deployed in, task type(onshore/offshore) or leave type(sick leave/earned leave), select the week and fill the working hours/day for the selected week. **

   #### Project Mananger
   * can create a new weekly timesheet or update a previous one(that is not already reviewed).
   * can view all the submitted timesheets along with their status (approved or declined by their respective project manager).
   * can review timesheets submitted to him/her, by the members of his projects.

   #### C-Level-Manager
      * can view the statistics of projects and timesheets through visualizations on his dashboard.
      * can create a new weekly timesheet or update a previous one(that is not already reviewed).
      * can review timesheets submitted to him/her, by the members of his projects.

### Contributers
   * Abha Rana
   * Deepak Yadav 
   * Deepanshu Balani  
   * Himanshu Sharma
   * Kritika Sachdeva
 


