const model = require('../models');

class ProjectManager{
    async get(){
      await model.projectManager.get();  
    }
}

module.exports = new ProjectManager();