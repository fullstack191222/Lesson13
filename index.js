const starks =["Arya", "Rob", "Ned"]
const lannisters = ['Cercei', "Jeimmie", 'Thyrion']

//to make bigger all array.
const allGuys = []
for (const guy of starks) {
    allGuys.push(guy)
}
for (const guy of lannisters) {
    allGuys.push(guy)
}

// console.log("everyone regular way : " + allGuys);


//with spread operator ...
const allGuys2 = [...starks, ...lannisters]


//usefull to copy arrays.
const allGuys3 = [...allGuys2]

///spread with object.
const myObject = {name : "Arya", age : 20, lastName : "Stark"}
//to copy object
const myObjectCopy = {...myObject}
// console.log(myObjectCopy);
//this is not copy this is reference to the same object.
const myObject2 = myObject
myObject2.lastName = "Lannister"
// console.log(myObject);
// console.log(myObject2);

//exercise.
//Create three different arrays.
//1. first array have 3 Strings
//2. second array have 3 numbers
//3. third  array have two objects.
//create function which gets 3 arrays as parameters and prints big object with all the values.
const aggregate = (arr1, arr2, arr3)=> {
    return [...arr1, ...arr2, ...arr3]
}
const bigArray = aggregate(allGuys3, [1,2,3], [myObject, myObjectCopy])
// console.log(bigArray);

newAr = starks.map((el)=> el+"lala")
console.log(newAr);

const numbers = [4, 9, 16, 25];
// numbers.forEach((el) =>
//     {numbers[el] = el += 5}
// )


numbers.forEach(
    (el)=>{
        console.log(el);
})

console.log(numbers.map(Math.sqrt))

const upp = require('upper-case')
const guys = ['Arya', 'Sansa', 'Rob', 'John']
const newGuys = guys.map(upp.upperCase)
const result = newGuys.find((element)=>{
    return element.length < 4
})
console.log(result);