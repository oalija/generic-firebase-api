module.exports = class Validate {

  constructor() {
  }

  validateEntity(body) {
    if (body !== undefined && body.table !== undefined && body.data !== undefined) {
      return true;
    }
    return false;
  }

}
