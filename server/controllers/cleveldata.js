const model = require("../models");
class Cleveldata{
  constructor(){ }
   async projectsStatusData(req,res){
        try{
         
          if(req.query.graphicaldata==='true'){
           const  completedProjects=await model.project.count({status:"completed"});
           const discardedProjects=await model.project.count({status:"discarded"});
           const InProgressProjects=await model.project.count({status:"in-progress"});
           const data=[completedProjects,discardedProjects,InProgressProjects];
            res.status(200).send({
            success: true,
            payload: {
              message: "Projects data retrieved  successfully",
              data:[{data}]
            }
          });
            
          }    
       }catch(error){
        console.error(error);
      }
   }
    async timesheetsStatusData(req,res){
        let data=[];

        try{
        if(req.query.graphicaldata==='true'){
          const approvedTimesheets  =await model.timesheet.count({status:"approved"});
          const declinedTimesheets=await model.timesheet.count({status:"declined"});
          const pendingTimesheets=await model.timesheet.count({status:"pending"});
        
            data=[approvedTimesheets,declinedTimesheets,pendingTimesheets];
             res.status(200).send({
               success: true,
                payload: {
                  message: "Timesheet data retrieved  successfully",
                  data:[{data}]
                }
             });
           
          }
        }catch(error){
         console.error(error);
       }
   }
}
module.exports = new Cleveldata();
