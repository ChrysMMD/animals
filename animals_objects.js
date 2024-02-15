"use strict";

window.addEventListener("DOMContentLoaded", start);


let Animal = {
    name: "default name",
    desc: "no description",
    type: "uknown",
    age: 0
}

const allAnimals = [];

function start() {
    console.log("ready");
    registerButtons()
    loadJSON();
}

function registerButtons() {
    document.querySelectorAll("[data-action='filter']")
        .forEach(button => button.addEventListener("click", selectFilter));
}

function loadJSON() {
    fetch("animals.json")
        .then(response => response.json())
        .then(jsonData => {
            // when loaded, prepare objects
            prepareObjects(jsonData);
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

    displayList(allAnimals);
}

function selectFilter(event) {
    const filter = event.target.dataset.filter;
    console.log(`user selected ${filter}`);
    filterList(filter);
}

function filterList(filterBy) {
    let filteredList = allAnimals;
    if (filterBy === "cat") {
        //create a filter list of only cats
        filteredList = allAnimals.filter(isCat);
    }

    else if (filterBy === "dog") {
        filteredList = allAnimals.filter(isDog);

    }


    displayList(filteredList);
}

function isCat(animal) {
    return animal.type === "cat";
}

function isDog(animal) {
    return animal.type === "dog";
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}


