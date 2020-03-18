const mongoose = require("mongoose");
const schema = require("../schemas");
const projectManagerSchema = new mongoose.Schema(schema.projectManager);

class projectManager {
  constructor() {
    this.model = mongoose.model("ProjectManager", projectManagerSchema);
  }

  async get(criteria = {}, columns = {}) {
    return this.model.find(criteria, (columns = {}));
  }
  async save(projectObj) {
    const newProject = await this.model.create(projectObj);
    return newProject;
  }
  async update(criteria = {}, updatedProjectObj) {
    return this.model.updateOne(criteria, updatedProjectObj);
  }

  async updateAll(criteria = {}, updatedProjectObj) {
    return this.model.update(criteria, updatedProjectObj);
  }

  async delete(criteria = {}) {
    return this.model.deleteOne(criteria);
  }
  async deleteMany(criteria = {}){
    return this.model.deleteMany(criteria);
  }

  async log(criteria = {}, columns = {}) {
    return this.model.find(criteria, columns);
  }
}

module.exports = new projectManager();
