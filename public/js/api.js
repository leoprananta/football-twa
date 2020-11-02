const base_url = "https://api.football-data.org/v2/";
const token = 'ef7fc3016bad4228b1438732d3d60540';

var liga = 2021;
const endpoint_standing = `${base_url}competitions/${liga}/standings`;
const endpoint_team = `${base_url}teams/`;
const endpoint_match = `${base_url}/competitions/${liga}/matches`;

const fetchAPI = url =>{
  return fetch(url, {
    headers : {
      'X-Auth-Token' : token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//Blok kode untuk melakukan request data json league
function getMatch(){
  if('caches' in window){
    caches.match(endpoint_match).then(function(response){
      if(response){
        response.json().then(function(data){
          
          var listMatch = "";
          var match = data.matches;
          var maxLoopData = match.length;
  
        //Menampilkan 25 pertandingan
        if (match.length > 24) {
          maxLoopData = 24;
        }
  
        for (let i = 0; i < maxLoopData; i++) {
  
            listMatch += `
                  <div class="row">
                    <div class="col s3">
                      <p>${match[i].homeTeam.name}</p>
                    </div>
                    <div class="col s2">
                      <p>${match[i].score.fullTime.homeTeam}</p>
                    </div>
                    <div class="col s2">
                      <p>Vs</p>
                    </div>
                    <div class="col s2">
                      <p>${match[i].score.fullTime.awayTeam}</p>
                    </div>
                    <div class="col s3">
                      <p>${match[i].awayTeam.name}</p>
                    </div>
                  </div>
                  <hr color="red">
                `;
          // Sisipkan komponen card ke dalam elemen dengan id #list
          document.getElementById("list").innerHTML = listMatch;
          //console.log(match);
          }
        });
      }
    });
  }

  fetchAPI(endpoint_match)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen list pertandingan secara dinamis
        var listMatch = "";
        var match = data.matches;
        var maxLoopData = match.length;

      //Menampilkan 25 pertandingan
      if (match.length > 24) {
        maxLoopData = 24;
      }

      for (let i = 0; i < maxLoopData; i++) {

          listMatch += `
                <div class="row">
                  <div class="col s3">
                    <p>${match[i].homeTeam.name}</p>
                  </div>
                  <div class="col s2">
                    <p>${match[i].score.fullTime.homeTeam}</p>
                  </div>
                  <div class="col s2">
                    <p>Vs</p>
                  </div>
                  <div class="col s2">
                    <p>${match[i].score.fullTime.awayTeam}</p>
                  </div>
                  <div class="col s3">
                    <p>${match[i].awayTeam.name}</p>
                  </div>
                </div>
                <hr color="red">
              `;
        // Sisipkan komponen card ke dalam elemen dengan id #list
        document.getElementById("list").innerHTML = listMatch;
        //console.log(match);
      }
    })
    .catch(error);
}

//Blok kode untuk melakukan request data json team
function getTeam(){
  if('caches' in window){
    caches.match(endpoint_standing).then(function(response){
      if(response){
        response.json().then(function(data){
          
          data.standings.forEach(function(klasemen) {
            var listTeam = "";

            klasemen.table.forEach(function(teams){

              listTeam += `
                    <div class="col s12 m8 offset-m2 l6 offset-l3">
                      <div class="card-panel grey lighten-5 z-depth-1">
                        <a href="./detail.html?id=${teams.team.id}">
                          <div class="row valign-wrapper">
                            <div class="col s3">
                              <img src="${teams.team.crestUrl}" alt="" class="responsive-img">
                            </div>
                            <div class="col s9">
                              <span class="black-text">
                                ${teams.team.name}
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #list
            document.getElementById("list").innerHTML = listTeam;
            //console.log(data);
          });
        })
      }
    });
  }

  fetchAPI(endpoint_standing, {
    mode : 'no-cors'
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen secara dinamis
      data.standings.forEach(function(klasemen) {
        var listTeam = "";

        klasemen.table.forEach(function(teams){

          listTeam += `
                <div class="col s12 m8 offset-m2 l6 offset-l3">
                  <div class="card-panel grey lighten-5 z-depth-1">
                    <a href="./detail.html?id=${teams.team.id}">
                      <div class="row valign-wrapper">
                        <div class="col s3">
                          <img src="${teams.team.crestUrl}" alt="" class="responsive-img">
                        </div>
                        <div class="col s9">
                          <span class="black-text">
                            ${teams.team.name}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #list
        document.getElementById("list").innerHTML = listTeam;
        //console.log(data);
      });
    })
    .catch(error);

}

function getTeamById(){
  return new Promise(function(resolve, reject){
    //Ambil nilai query parameter (?=id)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if('caches' in window){
      caches.match(endpoint_team + idParam).then(function(response){
        if(response){
          response.json().then(function(data){
            var detailHTML = "";
      // Menyusun komponen secara dinamis
            var detailHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <p>Since ${data.founded}</p>
                  <p>Stadium : ${data.venue} Stadium</p>
                  <a href="${data.website}">${data.website}</a>
                </div>
              </div>
            `;
            //Sisipkan komponen card ke dalam elemen dengan id #info
            document.getElementById("info").innerHTML = detailHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data); 

            var squadHTML = "";
            data.squad.forEach(function(players){
              squadHTML += `
                <div class="card">
                  <div class="card-content">
                      <p>${players.name} as ${players.position}</p>
                  </div>
                </div>
              `;
              document.getElementById("squad").innerHTML = squadHTML;
              resolve(players)
            });
          });
        }
      });
    }

    fetchAPI(endpoint_team + idParam, {
      mode : 'no-cors'
    })
    .then(status)
    .then(json)
    .then(function(data){
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      var detailHTML = "";
      // Menyusun komponen secara dinamis
      var detailHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <p>Since ${data.founded}</p>
            <p>Stadium : ${data.venue} Stadium</p>
            <a href="${data.website}">${data.website}</a>
            </div>
          </div>
      `;
      //Sisipkan komponen card ke dalam elemen dengan id #info
      document.getElementById("info").innerHTML = detailHTML;

      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data); 

      var squadHTML = "";
      data.squad.forEach(function(players){
        squadHTML += `
          <div class="card">
            <div class="card-content">
                <p>${players.name} as ${players.position}</p>
            </div>
          </div>
        `;
        document.getElementById("squad").innerHTML = squadHTML;
        resolve(players)
      });
    });
  });
}

function getSavedTeam() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen secara dinamis
    var listTeam = "";

    data.forEach(function(teams){

    listTeam += `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
              <div class="card-panel grey lighten-5 z-depth-1">
                <a href="./detail.html?id=${teams.id}&saved=true">
                  <div class="row valign-wrapper">
                    <div class="col s3">
                      <img src="${teams.crestUrl}" alt="" class="responsive-img">
                    </div>
                    <div class="col s9">
                      <span class="black-text">
                        ${teams.name}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #list
      document.getElementById("list").innerHTML = listTeam;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));
  
  getById(idParam).then(function(data) {

    var detailHTML = "";
      var detailHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <p>Since ${data.founded}</p>
            <p>Stadium : ${data.venue} Stadium</p>
            <a href="${data.website}">${data.website}</a>
            </div>
          </div>
      `;

      //Sisipkan komponen card ke dalam elemen dengan id #info
      document.getElementById("info").innerHTML = detailHTML;

      var squadHTML = "";
      data.squad.forEach(function(players){
        squadHTML += `
          <div class="card">
            <div class="card-content">
                <p>${players.name} as ${players.position}</p>
            </div>
          </div>
        `;
        document.getElementById("squad").innerHTML = squadHTML;
      });
  });
}
