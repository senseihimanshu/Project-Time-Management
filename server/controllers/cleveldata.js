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
         
            res.send([{data}]);
          }    
       }catch(error){
        console.error(error);
      }
   }
    async timesheetsStatusData(req,res){
        let data=[];

        try{
        if(req.query.graphicaldata==='true'){
          let approvedTimesheets = 0;
          let declinedTimesheets = 0; 
          let pendingTimesheets = 0; 

        for(let day=0;day<5;day++){
          const timesheet = await model.timesheet.model.find({}, {"week": 1});
          let newArr = timesheet.filter((cur) => {
            if(cur.week[day].status === "pending") pendingTimesheets++;
            if(cur.week[day].status === "approved") approvedTimesheets++;
            if(cur.week[day].status === "declined") declinedTimesheets++;
          });
          }
            data=[approvedTimesheets,declinedTimesheets,pendingTimesheets];

             res.send([{data}]);
              }
        }catch(error){
         console.error(error);
       }
   }
}
module.exports = new Cleveldata();
