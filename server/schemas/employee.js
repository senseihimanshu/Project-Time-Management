module.exports = {
    name: {
      type: String,
      default: null
    },
    phoneNo: {
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "consultant 1"
    },
    password: {
      type: String,
      default: null
    }
  };
  