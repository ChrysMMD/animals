"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

const Animal = {
    name: "default name",
    desc: "no description",
    type: "uknown",
    age: 0
};

const settings = {
    filter: "all",
    sort: "name",
    sortDir: "asc"
};



function start() {
    console.log("ready");
    registerButtons()
    loadJSON();
};

function registerButtons() {
    document.querySelectorAll("[data-action='filter']")
        .forEach(button => button.addEventListener("click", selectFilter));

    document.querySelectorAll("[data-action='sort']")
        .forEach(button => button.addEventListener("click", selectSort));

};

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
    setFilter(filter);
}

function setFilter(filter) {
    settings.filterBy = filter;
    buildList()
}

function filterList(filteredList) {
    // let filteredList = allAnimals;
    if (settings.filterBy === "cat") {
        //create a filter list of only cats
        filteredList = allAnimals.filter(isCat);
    }

    else if (settings.filterBy === "dog") {
        filteredList = allAnimals.filter(isDog);

    }


    return filteredList;
}

function isCat(animal) {
    return animal.type === "cat";
}

function isDog(animal) {
    return animal.type === "dog";
}

function selectSort(event) {
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    //find "old" sortBy element, and remove .sortBy
    const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
    console.log(oldElement);
    // find "old" sortBy element and remove sortBy
    // oldElement.classList.remove("sortby");
    //   // indicate active sort
    event.target.classList.add("sortby");

    //toggle the direction
    if (sortDir === "asc") {
        event.target.dataset.sortDirection = "desc";
    }
    else {
        event.target.dataset.sortDirection = "asc";
    }


    console.log(`user selected ${sortBy} - ${sortDir}`);
    setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;
    buildList();
}

function sortList(sortedList) {
    let direcetion = 1;
    if (settings.sortDir === "desc") {
        direcetion = -1;
    }
    else {
        settings.direcetion = 1;
    }

    sortedList = sortedList.sort(sortByProperty);

    function sortByProperty(animalA, animalB) {
        if (animalA[settings.sortBy] < animalB[settings.sortBy]) {
            return -1 * direcetion;
        }
        else {
            return 1 * direcetion;
        }
    }

    return sortedList;
}

function buildList() {
    const currentList = filterList(allAnimals);
    const sortedList = sortList(currentList);

    displayList(sortedList)
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


