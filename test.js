// const sortQuestsByProximity = (quests, key, currTime) =>
//   quests.sort((questA, questB) => 
//       key === `startTime` ? Math.abs(questA - currTime) - Math.abs(questB - currTime) : Math.abs(questA - currTime) - Math.abs(questB - currTime)
//   );

// console.log(sortQuestsByProximity([1, 8, 5], `startTime`, 5));

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime + ', ' + date.toDateString().split(` `).slice(1,3).join(` `);
}

console.log(formatAMPM(new Date(Date.now())));

// const groupArr = (arr, grpLen) => {
  
//   const arrToReturn = [];
//   let tempArr = [];
//   for (let i = 0; i < arr.length; i += grpLen) {
//     arrToReturn.push(arr.slice(i, i + grpLen));
//   }
//   return arrToReturn;

// }

// console.log(groupArr([1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 4));