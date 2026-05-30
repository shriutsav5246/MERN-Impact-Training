function percentageOfWorld1(population)
{
  return (population / 7900) * 100;
}
const populations = [1450, 331, 67, 83];
console.log(populations.length === 4);
const percentages = [ percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3]) ];
console.log(percentages);