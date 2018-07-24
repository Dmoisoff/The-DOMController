// const DOMNodeCollection = require("./dom_node_collection.js");

const functionQueue = [];

window.$l = (input) =>{
  if (document.readyState !== "complete" && typeof input === "function" ) {
     functionQueue.push(input);
     return;
 }

  let nodeList;
  if(typeof input  === 'string'){
    nodeList = document.querySelectorAll(input);
    nodeList = Array.from(nodeList);
  }else if (typeof input === 'function') {
    return input();
  }else{
    nodeList = [input];
  }
  return new DOMNodeCollection(nodeList);
};

$l.extend = (...objects) =>{
  let accumulator = objects[0];
  for (let i = 1; i < objects.length; i++) {
    const currentObj = objects[i];
    for(let key in currentObj){
      accumulator[key] = currentObj[key];
    }
  }
  return accumulator;
};



document.addEventListener('DOMContentLoaded',function(){
  for (let i = 0; i < functionQueue.length; i++) {
    functionQueue[i]();
  }
});
