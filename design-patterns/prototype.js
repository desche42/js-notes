/**
 * Real prototype inheritance with Object.create
 */

 const cloud = {
     condense: () => 'It\'s raining!'
 }

 const nimbus = Object.create(cloud, {
     verticalDevelopment: {
         value: true
     }
 });

 console.log(nimbus.condense())