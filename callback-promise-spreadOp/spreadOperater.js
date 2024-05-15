const person = {
  name: "max",
  age: 34,
  greeting: () => {
    console.log("salm to all muslim");
  },
};

// spread operater

// spreadopertor is used for taking copy object and array

const hobbies = ["sprot", "reading"];
const hobbies2 = ["jumping", "programming",{name:'waqar',addres:'ghar khel'}];
const coppy = [...hobbies,...hobbies2];

console.log(coppy);

// rest operator

// restOperator is used for passing unknowing parameter in function

const resoperator = (...args)=>{
    return args
}

console.log('fun',resoperator(hobbies2));

// destrucging array and object

const persndes = ({ name, age }) => {
  return "object destructing  " + name + " " + age;
};

// console.log(persndes(person));

// In destructing object same name will be mention which already in objet like in PERSON OBJECT name , age
// but in array destruting will not bcs it work on index not value
const { name, greeting } = person;

greeting()
