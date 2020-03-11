const model = require("../models");
class Cleveldata{
  constructor(){ }
   async projectsStatusData(req,res){
        try{
         const  completedProjects=await model.project.count({status:"Completed"});
          const discardedProjects=await model.project.count({status:"Discarded"});
          const InProgressProjects=await model.project.count({status:"In Progress"});
          const data=[completedProjects,discardedProjects,InProgressProjects];
         
            res.send([{data}]);
               
       }catch(error){
        console.log(error);
      }
   }
    async timesheetsStatusData(req,res){
        
        try{
         const  approvedTimesheets=await model.timesheet.count({status:"Approved"});
           const declinedTimesheets=await model.timesheet.count({status:"Declined"});
           const PendingTimesheets=await model.timesheet.count({status:"Pending"});
           const data=[approvedTimesheets,declinedTimesheets,PendingTimesheets];
          
             res.send([{data}]);
          }catch(error){
         console.log(error);
       }
   }
}
module.exports = new Cleveldata();
