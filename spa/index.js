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

function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} , Longitude: ${longitude} `;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function handleRoutes(params) {
  render(states[capitalize(params.path)]);
}

router
  .on(":path", handleRoutes)
  .on("/", () => render(states.Login))
  .resolve();

// render(states.Login);

function clickHandler(state) {
  console.log(state);

  if (state.pageContent === "Login") {
    console.log("i am working");
    const form = document.querySelector("#login");

    form.addEventListener("submit", event => {
      // Might need to stop propigation
      event.preventDefault();

      // Get username and password values from form
      let userName = document.getElementById("usrName");
      let passwrd = document.getElementById("password");

      console.log(userName.value);
      console.log(passwrd.value);

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
            let uName = response.data[0].username;
            document
              .querySelector("#find-me")
              .addEventListener("click", geoFindMe);
            err.innerText = `Welcome Back ${uName}!!!`;
            console.log(response.data);
            // Member.user = response.data;

            axios
              .get("http://localhost:3004/meetings", data)
              .then(function(response) {
                // console.log(response.data);
                if (response.data.error) {
                  // window.location.href = '/register';
                }

                let list = document.getElementById("list");

                Object.entries(response.data).forEach(
                  ([key, value]) =>
                    (list.innerHTML += `
                                <tr><td width = "10%">${
                                  value.name
                                } </td><td width="30%">${
                      value.time
                    } </td><td width="60%">${value.date}</td></tr>`)
                );
              })
              .catch(function(error) {
                console.log(error);
              });
          }

          console.log(request.session.username);
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
            (list.innerHTML += `<tr><td width = "30%">${
              value.username
            } </td><td width="70%">${value.email}</td></tr>`)
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

        Object.entries(response.data).forEach(
          ([key, value]) =>
            (list.innerHTML += `
                    <tr><td width = "10%">${value.name} </td><td width="30%">${
              value.time
            } </td><td width="60%">${value.date}</td></tr>`)
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
