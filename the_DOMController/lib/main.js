const DOMNodeCollection = require("./dom_node_collection");


window.$l = (input) =>{
  if (document.readyState !== "complete" && typeof input === "function" ) {
     functionQueue.push(input);
     return;
 }
 if (input instanceof HTMLElement) {
   return new DOMNodeCollection([input]);
 }
 let html = input;
 if (input.includes('</')) {
   let htmlElement = html.match(/<\w\S/g)[0].slice(1);
   let htmlDoc = new DOMParser().parseFromString(html, 'text/html');
   input = htmlDoc.querySelectorAll(htmlElement);
 }
  let nodeList;
  if(typeof input  === 'string'){
    nodeList = document.querySelectorAll(input);
    nodeList = Array.from(nodeList);
  }else if (typeof input === 'function') {
    return input();
  // }else if (input instanceof HTMLElement) {
  //   return new DOMNodeCollection([input]);
  }else if (typeof input  === 'object') {
    return new DOMNodeCollection(input);
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

const functionQueue = [];

document.addEventListener('DOMContentLoaded',function(){
  for (let i = 0; i < functionQueue.length; i++) {
    functionQueue[i]();
  }
});
