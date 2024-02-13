// Create an object prototype - name it Animal
function Animal() {

}

//Create a function names prepareObjects
function prepareObjects(jasonObject) {

  //an Array to store the created animal objects in the json file.
  let animals = []

  //Use forEach on the json
  jasonObject.forEach(item => {

    //new object (named animal) from the Animal prototype
    let animal = new Animal();

    //Find the values for name, desc and type from the json file.
    let name = item.name;
    let desc = item.desc;
    let type = item.type;

    //Set properties in the new objects to the values
    animal.name = name;
    animal.desc = desc;
    animal.type = type;

    //Add new object to the array
    animals.push(animal);
  });

  //The array of created animal object is returned
  return animals;
}

let jsonObject = [
  {
    "name": "Mandu",
    "type": "cat",
    "desc": "amazing",
    "age": 10
  },

  {
    "name": "Mia",
    "type": "cat",
    "desc": "black",
    "age": 10
  },
  {
    "name": "Leelo",
    "type": "dog",
    "desc": "growing",
    "age": 3
  },
  {
    "name": "Toothless",
    "type": "dragon",
    "desc": "trained",
    "age": 14
  },
  {
    "name": "ScoobyDoo",
    "type": "dog",
    "desc": "wondering",
    "age": 58
  },
  {
    "name": "Horsey",
    "type": "horse",
    "desc": "horsing",
    "age": 10
  },

];

let animalObjects = prepareObjects(jsonObject);
console.log(animalObjects);

jsonObject.push({
  "name": "Mindy",
  "type": "horse",
  "desc": "eating",
  "age": 12
}
);

let updatedAnimalObjects = prepareObjects(jsonObject)

console.log(updatedAnimalObjects);
