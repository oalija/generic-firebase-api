const admin = require('firebase-admin');
const Validate = require('./validate');

module.exports = class Entity {

  private validator;
  private db;

  constructor() {
    this.validator = new Validate();
    this.db = admin.firestore();
  }

  add(body, callback) {
    if (this.db && this.validator.validateEntity(body)) {
      this.db.collection(body.table).add(body.data)
        .then(document => {
          if (document.exists) {
            callback(false, document.data());
          } else {
            callback("Not entity created", false);
          }
        })
        .catch(error => {
          callback(error, false);
        });
    } else {
      callback("No valid parameters", false);
    }
  }

  edit(body, callback) {
    if (this.db && this.validator.validateEntity(body) && body.id !== undefined) {
      this.db.collection(body.table).doc(body.id).update(body.data)
        .then(document => {
          if (document.exists) {
            callback(false, document.data());
          } else {
            callback("Not entity edited", false);
          }
        })
        .catch(error => {
          callback(error, false);
        });
    } else {
      callback("No valid parameters", false);
    }
  }

  delete(body, callback) {
    if (this.db && body.table !== undefined && body.id !== undefined) {
      const document = this.db.collection(body.table).doc(body.id).delete()
        .then(() => {
          callback(false, true);
        })
        .catch((err) => {
          callback(err, false);
        });
    } else {
      callback("No valid parameters", false);
    }
  }

  view(body, callback) {
    if (this.db && body.table !== undefined && body.id !== undefined) {
      this.db.collection(body.table).doc(body.id).get()
        .then(document => {
          if (document.exists) {
            callback(false, document.data());
          } else {
            callback("Not entity found", false);
          }
        })
        .catch(error => {
          callback(error, false);
        });
    } else {
      callback("No valid parameters", false);
    }
  }

  list(body, callback) {
    if (this.db && body !== undefined && body.table !== undefined) {
      const ref = this.db.collection(body.table);

      if (body.min !== undefined && this.isNumber(body.min)) {
        ref.where('start', '>=', body.min);
      }

      if (body.max !== undefined && this.isNumber(body.max)) {
        ref.where('start', '<=', body.min);
      }

      if (body.order !== undefined && (body.order === "ASC" || body.order === "DESC")) {
        ref.orderBy('start', body.order);
      } else {
        ref.orderBy('start', 'desc');
      }

      if (body.limit !== undefined && this.isNumber(body.limit)) {
        ref.limit(body.limit);
      }

      ref.get()
        .then(documents => {
          let docs = [];
          documents.forEach(doc => {
            docs.push({"id": doc.id, "data" : doc.data()});
          });

          callback(false, docs);
        })
        .catch(error => {
          callback(error, false);
        });
    } else {
      callback("No valid parameters", false);
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
  }

}