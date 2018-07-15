const functions = require('firebase-functions');
const Express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser');
const Entity = require('./entity');
const TOKEN = "lJFtEYxdLF0x8rk2RdeJKLyo92Fr8ajo";

export class Api {

  private rest;
  private entity;

  constructor() {
    this.rest = Express();
    this.rest.use(Cors({origin: true}));
    this.prepare();
    this.entity = new Entity();
  }

  prepare() {
    this.rest.use(BodyParser.json());
    this.rest.use(BodyParser.urlencoded({extended: true}));
    this.rest.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', false);

      next();
    });
  }

  init() {
    this.endpoint('/list', this.entity, "list");
    this.endpoint('/view', this.entity, "view");
    this.endpoint('/add', this.entity, "add");
    this.endpoint('/edit', this.entity, "edit");
    this.endpoint('/delete', this.entity, "delete");
    return functions.https.onRequest(this.rest);
  }

  endpoint(endpoint, object, callback) {
    this.rest.post(endpoint, function (req, res) {
      if (req.body !== null && req.body.token === TOKEN) {
        object[callback](req.body, function (err, ok) {
          if (!err && ok !== false) {
            res.json(ok);
            res.status(200);
            res.end();
          } else {
            console.log(err);
            res.status(400);
            res.end();
          }
        });
      } else {
        res.status(400);
        res.end();
      }
    });
  }
}