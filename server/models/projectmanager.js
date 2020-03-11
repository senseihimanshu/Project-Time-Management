const mongoose = require("mongoose");
const schema = require("../schemas");
const projectManagerSchema = new mongoose.Schema(schema.projectManager);

class projectManager {
  constructor() {
    this.model = mongoose.model("ProjectManger", projectManagerSchema);
  }

  async get(criteria = {}, columns = {}) {
    return this.model.find(criteria, (columns = {}));
  }
  async save(projectObj) {
    const newProject = await this.model.create(projectObj);
    return newProject;
  }
  async update(criteria = {}, updatedProjectObj) {
    console.log(criteria, updatedProjectObj, 'Inside update of projectManagerModel')
    return this.model.updateOne(criteria, updatedProjectObj);
  }
  async delete(criteria = {}) {
    return this.model.deleteOne(criteria);
  }
  async log(criteria = {}) {
    return this.model.find(criteria);
  }
}

module.exports = new projectManager();
