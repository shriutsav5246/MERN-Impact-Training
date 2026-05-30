const neighbours = ["Pakistan", "China", "Nepal"];
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if (!neighbours.includes("Germany"))
  {
    console.log("Probably not a central european country :D");
  }
neighbours[neighbours.indexOf("China")] = "Republic of China";
console.log(neighbours);