"use strict";

window.addEventListener("DOMContentLoaded", start);

let Animal = {
    name: "default name",
    desc: "no description",
    type: "uknown",
    age: 0
}

const allAnimals = [];

let animals;

function start() {
    console.log("ready");

    loadJSON();
}

function loadJSON() {
    fetch("animals.json")
        .then(response => response.json())
        .then(jsonData => {
            animals = jsonData;

            prepareObjects(jsonData);
            // when loaded, display the list

        });

}

function prepareObjects(jsonData) {
    jsonData.forEach(jsonObject => {

        //Create new object
        const animal = Object.create(Animal);

        //Extract data from json
        const fullname = jsonObject.fullname;

        const firstSpace = fullname.indexOf(" ");
        const secondSpace = fullname.indexOf(" ", firstSpace + 1);
        const lastSpace = fullname.lastIndexOf(" ");

        const name = fullname.substring(0, firstSpace);
        const desc = fullname.substring(secondSpace + 1, lastSpace);
        const type = fullname.substring(lastSpace + 1);

        // put cleaned data into newly created object
        animal.name = name;
        animal.desc = desc;
        animal.type = type;
        animal.age = jsonObject.age;

        //add the object to the global array
        allAnimals.push(animal);

    });

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=fullname]").textContent = animal.fullname;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list").appendChild(clone);
}

