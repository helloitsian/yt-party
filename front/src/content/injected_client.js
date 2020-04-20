'use strict';

function makeClient(state) {
    const wrap = document.createElement("DIV"); 
          wrap.appendChild(document.createTextNode("Hello World"));
    return wrap;
}

function injectClient() {
    document.querySelector("body").appendChild(makeClient());
}
