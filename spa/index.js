/* eslint-disable complexity */
/* eslint-disable func-names */
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import * as states from "./store";
import { capitalize } from "lodash";
import Navigo from "navigo";
import axios from "axios";
import { Member } from "./components/pages";
// var mysql = require('mysql');
// var express = require('express');
var session = require("express-session");
// var bodyParser = require('body-parser');
var path = require("path");
const root = document.querySelector("#root");

const router = new Navigo(window.location.origin);

function render(state) {
  root.innerHTML = `
        ${Header(state)}
        ${Navigation(state)}
        ${Main(state)}
        ${Footer(state)}
    `;
  router.updatePageLinks();
  clickHandler(state);
}

function handleRoutes(params) {
  render(states[capitalize(params.path)]);
}
// Handel routing of pages when called
router
  .on(":path", handleRoutes)
  .on("/", () => render(states.Login))
  .resolve();

//  Adds event listeners and renders pages depending on if statement
function clickHandler(state) {
  console.log(state);

  if (state.pageContent === "Login") {
    const form = document.querySelector("#login");

    form.addEventListener("submit", event => {
      // Might need to stop propigation
      event.preventDefault();

      // Get username and password values from form
      let userName = document.getElementById("usrName");
      let passwrd = document.getElementById("password");

      // Create json request
      const data = {
        usrName: userName.value,
        password: passwrd.value
      };

      // Send json request via fetch or axios
      axios
        .post("http://localhost:3004/login", data)
        .then(function(response) {
          // console.log(response.data);
          if (response.data.error) {
            console.log(response.data.error);
            // render(states.Login);
            let err = document.getElementById("err");

            err.innerText = response.data.error;
          } else {
            render(states.Member);
            let err = document.getElementById("err");
            let top = document.getElementById("top");
            let uName = response.data[0].username;
            let email = response.data[0].email;

            top.innerText = `Email: ${email}`;
            err.innerText = `${uName}`

            axios
              .get("http://localhost:3004/meetings", data)
              .then(function(response) {
                
                if (response.data.error) {
                  // window.location.href = '/register';
                } else {
                  let list = document.getElementById("list");
                  let bio = document.getElementById("top");

                
                let dbData, dbtime, realtime;

                Object.entries(response.data).forEach(function(key, value) {
                  //
                  dbData = key[1];
                  dbData['date'] = new Date(dbData['date']).toDateString();
                  dbtime = dbData["time"].split(":")
                  if (dbtime[0]>12){
                    realtime = parseInt(dbtime[0]-12) +':'+dbtime[1]+"pm"
                  } else {
                    realtime = parseInt(dbtime[0]) +':'+dbtime[1]+'am';
                  }
                  
                  console.log(parseInt(dbtime[0]-12))
                  console.log(realtime)
        
                  list.innerHTML +=
                  ' <tr><td width = "10%">' +'<a href ="">' +
                  dbData["name"]+'</a>'+
                  '</td><td width="30%">' +
                  dbData["date"] + ' at'
                   +realtime
                  "</td> </tr>";

                    ;},

                
               
                
                axios
              .get("http://localhost:3004/meetingsPast", data)
              .then(function(response) {
                // console.log(response.data);
                if (response.data.error) {
                  // window.location.href = '/register';
                } else {
                  let list2 = document.getElementById("list2");

                
                let dbData, dbtime, realtime;

                Object.entries(response.data).forEach(function(key, value) {
                  //
                  dbData = key[1];
                  dbData['date'] = new Date(dbData['date']).toDateString();
                  dbtime = dbData["time"].split(":")
                  if (dbtime[0]>12){
                    realtime = parseInt(dbtime[0]-12) +':'+dbtime[1]+"pm"
                  } else {
                    realtime = parseInt(dbtime[0]) +':'+dbtime[1]+'am';
                  }
                  
                  console.log(parseInt(dbtime[0]-12))
                  console.log(realtime)
        
                  list2.innerHTML +=
                  ' <tr><td width = "10%">' +'<a href ="">' +
                  dbData["name"]+'</a>'+
                  '</td><td width="30%">' +
                  dbData["date"] + ' at'
                   +realtime
                  "</td> </tr>";

                    ;}

                
                )}
              
              
                }
                
                
                
                )
                )}
              
              
              }
                )
              .catch(function(error) {
                console.log(error);
              });
              
          }

          // console.log(request.session.username);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  if (state.pageContent === "Register") {
    console.log("i am still working");
    const form = document.getElementById("register");

    console.log(form);

    form.addEventListener("submit", event => {
      // Might need to stop propigation
      event.preventDefault();

      // Get username and password values from form
      let userName = document.getElementById("usrName");
      let passwrd = document.getElementById("password");
      let firstName = document.getElementById("create_first_name");
      let lastName = document.getElementById("create_last_name");
      let email = document.getElementById("email");

      // Create json request
      const data = {
        usrName: userName.value,
        password: passwrd.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
      };

      // console.log(usrName.value);
      // console.log(password.value);

      axios
        .post("http://localhost:3004/register", data)
        .then(function(response) {
          console.log(response.data);
          if (response.data.error) {
            window.location.href = "/register";
          } else {
            window.location.href = "/login";
          }

          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  if (state.pageContent === "Office") {
    console.log("i am doing my best");
    const form = document.getElementById("create");

    form.addEventListener("submit", event => {
      // Might need to stop propigation
      event.preventDefault();

      // Get username and password values from form
      let title = document.getElementById("title");
      let topic = document.getElementById("topic");
      let date = document.getElementById("date");
      let time = document.getElementById("time");
      let notes = document.getElementById("notes");
      let location = document.getElementById("location");

      // Create json request
      const data = {
        title: title.value,
        topic: topic.value,
        date: date.value,
        time: time.value,
        notes: notes.value,
        location: location.value
      };

      // console.log(title);
      // console.log(password.value);

      axios
        .post("http://localhost:3004/office", data)
        .then(function(response) {
          console.log(response.data);
          if (response.data.error) {
            console.log(response);
            window.location.href = "/office";
          } else {
            console.log(response);
            window.location.href = "/meetings";
          }

          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  if (state.pageContent === "Members") {
    // Create json request
    const data = {};

    axios
      .get("http://localhost:3004/members", data)
      .then(function(response) {
        // console.log(response.data);
        if (response.data.error) {
          window.location.href = "/register";
        }

        let list = document.getElementById("list");

        Object.entries(response.data).forEach(
          ([key, value]) =>
            (list.innerHTML += `<tr><td width = "30%"><a href = "#">${
              value.username
            }</a></td><td width="70%">${value.email}</td></tr>`)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (state.pageContent === "Meetings") {
    // Create json request
    const data = {};

    axios
      .get("http://localhost:3004/meetings", data)
      .then(function(response) {
        // console.log(response.data);
        if (response.data.error) {
          window.location.href = "/register";
        }

        let list = document.getElementById("list");
        let dbData, dbtime, realtime;

        Object.entries(response.data).forEach(function(key, value) {
          //
          dbData = key[1];
          dbData['date'] = new Date(dbData['date']).toDateString();
          dbtime = dbData["time"].split(":")
          if (dbtime[0]>12){
            realtime = parseInt(dbtime[0]-12) +':'+dbtime[1]+"pm"
          } else {
            realtime = parseInt(dbtime[0]) +':'+dbtime[1]+'am';
          }
          
          console.log(parseInt(dbtime[0]-12))
          console.log(realtime)

          list.innerHTML +=
            ' <tr><td width = "10%">' +'<a href ="">' +
            dbData["name"]+'</a>'+
            '</td><td width="30%">' +
            dbData["date"] + ' at'
             +realtime
            "</td> </tr>";
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  if (state.pageContent === "Forgot") {
    forgot.addEventListener("submit", event => {
      // Might need to stop propigation
      event.preventDefault();

      // Get username and password values from form
      let username = document.getElementById("username");
      let email = document.getElementById("email");

      console.log(username.value);
      console.log(email.value);

      // Create json request
      const data = {
        username: username.value,
        email: email.value
      };

      axios.post("http://localhost:3004/forgot", data).then(function(response) {
        // console.log(response.data);
        if (response.data.error) {
          console.log(response.data.error);
          // render(states.Login);
          let err = document.getElementById("err");

          err.innerText = response.data.error;
        } else {
          render(states.Login);
          let err = document.getElementById("err");
          let uName = response.data[0].username;
          let email = response.data[0].email;

          console.log(response.data);
        }
      });
    });
  }

  if (state.pageContent === "Meeting") {
  // Start google map interaction
  // Set variables tto be used in map and marker generation
  
    let map;
    let infoWindow = new google.maps.InfoWindow();
    let infowindow = new google.maps.InfoWindow();
    let geocoder = new google.maps.Geocoder();

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
      });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            geocodeLatLng(geocoder, map, infowindow);

            infoWindow.setPosition(pos);
            // infoWindow.setContent('You are here!');
            // infoWindow.open(map);
            // map.setCenter(pos);
            function geocodeLatLng(geocoder, map, infowindow) {
              // var input = document.getElementById('latlng').value;
              // var latinsStr = input.split(',', 2);
              // var latlng = {'lat': parseFloat(lat), 'lng': parseFloat(lng)};
              console.log(pos);

              geocoder.geocode({ location: pos }, function(results, status) {
                if (status === "OK") {
                  if (results[0]) {
                    map.setZoom(11);
                    var marker = new google.maps.Marker({
                      position: pos,
                      map: map
                    });

                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                  } else {
                    window.alert("No results found");
                  }
                } else {
                  window.alert("Geocoder failed due to: " + status);
                }
              });
            }
          },
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
    initMap();
  }
}

function geocodeLatLng(geocoder, map, infowindow) {
  var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };

  geocoder.geocode({ location: pos }, function(results, status) {
    if (status === "OK") {
      if (results[0]) {
        map.setZoom(10);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });

        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
