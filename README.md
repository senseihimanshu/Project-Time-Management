# project-portal
### Assuming you have installed these things in your system:-
   * nodejs
   * mongoDB
   * Angular
 Git clone Install the dependencies and start the project
### Installation(Front-end):-

   * npm install
   * ng serve
### Installation(Back-end):-

   * npm install
   * npm start

### Technologies used:-
   * [Angular]-Angular is used for front end
   * [nodejs]-backend is implemented using nodejs
   * [mongoDb]-A noSql database is used in the project.
   * [Bootstrap]-Bootstrap is used to make web pages responsive for different screens
   * [Mediaquery]-Mediaquery is also used to make web pages responsive for different screens
   * [nodemailer]-nodemailer is used to send emails to employees 
### Contributers:-
   * Abha Rana
   * Himanshu Sharma
   * Kritika Sachdeva
   * Deepanshu Balani
   * Deepak Yadav   
 
* This project creates a portal for timesheets management of all employees to be submitted weekly and monthly and reviewed accordingly by their respective Project Managers.
 Admin by itself creates  all the employees and assign different roles to them and also creates projects and assign to different project Managers and project members.
 Any employee who is doing login will be redirected to his/her dashboard as according to roles
 The project works differently for different roles of employees:-
 
 * Admin:- * Admin can create new employees,update and delete,get data of any employee as he wishes to do.he 
             can  also view data of all the employees  in tabular form.
           * Admin can create new project,update and delete project and assign it to employees to whom he wishes.
               That project will also be assigned to project manager to handle it.
           * Admin can view all the timesheets and their status whether they are approved,declined and pending.

 * Employee:- * An employee can only view and create timesheets.he can view all his timesheets which are 
                approved,pending or declined.

***** In the timesheet creation,employee has to fill details such as in which project he is enrolled in,client name,task type(which includes he is onshore,offshore) or he has taken some leave(sick leave,earned leave).he has to pick the startdate of timesheet to be filled,end date will automatically be picked wich will be 5 days ahead of startdate
he has to fill no. of hours he worked on particular project.next whether the hours he worked are billable or not.
if it is leave,it may not be bilable*****


* ProjectMananger:- * A projectmanger can only create his  timesheets and review timesheets of his/her 
                       project  members.

* C-Level-Manager:- * A C-Level-Manager can view graphical data of all the projects(which are Completed,Discarded and 
                      In Progress  ) and timesheets(which are Pending,Approved,Declined).
                    * A C-Level-Manager can also create his timesheet and review timesheet of memebers who belong to 
                      his  project.


