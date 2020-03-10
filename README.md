# project-portal
This project creates a portal for timesheets management of all employees to be submitted weekly and monthly and reviewed accordingly by their respective Project Managers.
Admin by itself creates  all the employees and assign different roles to them and also creates projects and assign to different project Managers and project members.
Any employee who is doing login will be redirected to his/her dashboard as according to roles
The project works differently for different roles of employees:-
 1.Admin:- 1) Admin can create new employees,update and delete,get data of any employee as he wishes to do.he can also 
              view data of all the employees  in tabular form.
           2) Admin can create new project,update and delete project and assign it to employees to whom he wishes.
              That project will also be assigned to project manager to handle it.
           3) Admin can view all the timesheets and their status whether they are approved,declined and pending.

2. Employee:- 1)An employee can only view and  create timesheets.he can view all his timeshhets which are 
                approved,pending or declined.

*****In the timesheet creation,employee has to fill details such as in which project he is enrolled in,client name,task type(which includes he is onshore,offshore) or he has taken some leave(sick leave,earned leave).he has to pick the startdate of timesheet to be filled,end date will automatically be picked wich will be 5 days ahead of startdate
he has to fill no. of hours he worked on particular project.next whether the hours he worked are billable or not.
if it is leave,it may not be bilable******

3.ProjectMananger:- 1)A projectmanger can only create his  timesheets and review timesheets of his/her project members.

4.C-Level-Manager:- 1)A C-Level-Manager can view graphical data of all the projects(which are Completed,Discarded and 
                      In Progress  ) and timesheets(which are Pending,Approved,Declined).
                    2)A C-Level-Manager can also create his timesheet and review timesheet of memebers who belong to 
                      his  project.


