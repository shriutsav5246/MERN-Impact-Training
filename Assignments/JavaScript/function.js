function describeCountry(country, population, capitalCity)
{
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}
const c1 = describeCountry("India", 1450, "New Delhi");
const c2 = describeCountry("Japan", 125, "Tokyo");
const c3 = describeCountry("Canada", 40, "Ottawa");
console.log(c1);
console.log(c2);
console.log(c3);