class DOMNodeCollection {
  constructor(array){
    this.htmlElements = array;
  }

  html(_string){
    if(!_string){
      this.htmlElements = this.htmlElements.map((htmlElement) => {
        htmlElement.innerHtml = _string;
      });
    }else{
      return this.htmlElements[0].innerHtml;
    }
  }
  empty(){
    for (let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i].innerHTML = '';
    }
  }

  append(element){
    if(typeof element === 'string'){
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML += element;
      }
    }else if (element instanceof HTMLElement) {
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML += element.outerHTML;
      }
    }else {
      for (let k = 0; k < this.htmlElements.length; k++) {
        for (let i = 0; i < element.length; i++) {
          this.htmlElements[k].innerHTML += element[i].outerHTML;
        }
      }
    }
  }

  attr(attribute, tag) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i][attribute] = tag;
   }
 }

 addClass(newClass) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     if (this.htmlElements[i].className !== "") {
       this.htmlElements[i].className += ` ${newClass}`;
     } else {
       this.htmlElements[i].className += `${newClass}`;
     }
   }
 }

 removeClass(oldClass) {
   for (let i = 0; i < this.htmlElements.length; i++) {
     let newClassArr = [];
     let classes = this.htmlElements[i].className.split(" ");
     for (let i = 0; i < classes.length; i++) {
       if (classes[i] !== oldClass) {
         newClassArr.push(classes[i]);
       }
     }
     this.htmlElements[i].className = newClassArr.join(" ");
   }
 }

 children() {
   let childrenCollection = [];
   for (var i = 0; i < this.htmlElements.length; i++) {
     const child = new DOMNodeCollection(this.htmlElements[i].children);
     childrenCollection.push(child);
   }
   return childrenCollection;
 }

 parent() {
   let parentCollection = [];
   for (var i = 0; i < this.htmlElements.length; i++) {
     const parent = new DOMNodeCollection(this.htmlElements[i].parentElement);
     parentCollection.push(parent);
   }
   return parentCollection;
 }

 find(selector){
   let found = [];
   for (let i = 0; i < this.htmlElements.length; i++) {
   found = found.concat(this.htmlElements[i].querySelectorAll(selector));
   }
   for (let i = 0; i < found.length; i++) {
     found[i] = new DOMNodeCollection(found[i]);
   }
   return found[0];
 }

 remove() {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].remove();
   }
   this.htmlElements = [];
 }

 on(type, listener) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].addEventListener(type, listener);
     this.htmlElements[i].eventListerReference = listener;
   }
 }

 off(type) {
   for (var i = 0; i < this.htmlElements.length; i++) {
     this.htmlElements[i].removeEventListener(type, this.htmlElements[i].eventListerReference);
     this.htmlElements[i].eventListerReference = '';
   }
 }
}


module.exports = DOMNodeCollection;
