const express = require('express');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://localhost:27017/inventoryDB`;

let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

app.post('/create', (req, res) => {
  // The title and author will be provided by the request body
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get('/read', (req, res) => {
  db.collection('bookCollection')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

app.get('/read/:id', (req, res) => {
  db.collection('bookCollection')
    .findOne(
      {_id: ObjectId(req.params.id)},
      (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// TODO: Add Delete route that deletes by id provided in the request body

app.delete('/delete', (req, res) => {
  db.collection('bookCollection').deleteOne(
    {_id: ObjectId(req.body._id)}, 
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
})

app.put('/update/:id', (req, res) => {
  db.collection('bookCollection').update(
    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
})