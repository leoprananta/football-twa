var dbPromised = idb.open("football-data", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil disimpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByName(name) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      var nameIndex = store.index("name");
      var range = IDBKeyRange.bound(name, name + "\uffff");
      return nameIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}
function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(data) {
        resolve(data);
        console.log(data);
      });
  });
}


function deleteById(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(team.id);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil dihapus.");
    });
}

