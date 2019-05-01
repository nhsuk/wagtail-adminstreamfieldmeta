let elems, metaPanelElems;

document.addEventListener("DOMContentLoaded", function(event) {
  hideMetaFields();
  addSequenceControlsInfoButton();
});

window.onload = function() {
  document.addEventListener("DOMNodeInserted", function(event) {
    const elem = event.target;
    hideMetaFields();
    addSequenceControlsInfoButton();
  });
}

/**
 *  Hides all meta fields when the page loads.
 */
function hideMetaFields(newElem) {
  elems = [ newElem ];
  if (!newElem)
    elems = document.getElementsByClassName("wasm-meta-field");

  Array.prototype.forEach.call(elems, function(el) {
    if (el && !el.classList.contains('error'))
      el.parentElement.classList.add('wasm-hidden-field');
    else
      el.parentElement.classList.add('wasm-visible-field');
  });
}

/**
 *  Adds info buttons to all panels that have been given the wasm-meta-panel
 *  class.
 */
function addSequenceControlsInfoButton(newElem) {
  metaPanelElems = [ newElem ];
  if (!newElem)
    metaPanelElems = document.getElementsByClassName('wasm-meta-panel');

  Array.prototype.forEach.call(metaPanelElems, function(el) {
    const elParentType = el.parentElement.nodeName;
    if(elParentType == 'DIV') {
      const parentContainerEl = el.parentElement.parentElement;
      const n = parentContainerEl.id.lastIndexOf('-');
      const rootId = parentContainerEl.id.substr(0, n);     // Strip container suffix.
      const buttonGroupEl = parentContainerEl.querySelector(".sequence-controls > .button-group");
      addInfoButton(buttonGroupEl, rootId);
    }else if(elParentType == 'LI') {
      const sequenceControlsElem = el.querySelector(".sequence-controls");
      if (!sequenceControlsElem) {
        el.classList.add("sequence-member");
        const rootId = uuidv4();
        el.id = rootId + '-container';
        const buttonGroupEl = addButtonGroup(el, rootId);
        addInfoButton(buttonGroupEl, rootId, true);
      }
    }
  });
}

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addInfoButton(buttonGroup, rootId, isBlock=false) {
  const buttonId = rootId + '-info';
  const existingButton = document.getElementById(buttonId);
  if (existingButton) return;

  let button = document.createElement('button');
  button.id = buttonId;
  button.classList.add('button','icon', 'text-replace', 'icon-cogs');
  button.title = 'Info';

  const rootElem = document.getElementById(rootId + '-container');
  const childElems = rootElem.getElementsByTagName('li');
  Array.prototype.forEach.call(childElems, function(el) {
    if(el.children.length >= 2){
      if(!el.classList.contains("wasm-hidden-field")){
        el.classList.add("wasm-visible-field");
      }
    }
  });

  button.addEventListener("click", function(e) {
    e.preventDefault();
    const rootElem = document.getElementById(rootId + '-container');
    const childElems = rootElem.getElementsByTagName('li');
    Array.prototype.forEach.call(childElems, function(el) {
      el.classList.toggle('wasm-hidden-field');
      el.classList.toggle('wasm-visible-field');
    });
    let metaHeading = rootElem.getElementsByClassName("meta-field-title")[0];
    metaHeading.classList.toggle('wasm-hidden-field');
    metaHeading.classList.toggle('wasm-visible-field');
  });
  if(isBlock){
    buttonGroup.parentElement.classList.add("position-cog");
  }
  buttonGroup.appendChild(button);

  //add heading
  let metaHeading = document.createElement("H1");
  const metaHeadingCopy = document.createTextNode("Meta Field:");
  metaHeading.appendChild(metaHeadingCopy);
  metaHeading.classList.add('wasm-hidden-field');
  metaHeading.classList.add('meta-field-title');
  if(isBlock){
    rootElem.prepend(metaHeading);
  }else{
    var containerInner = rootElem.getElementsByClassName("wasm-meta-panel")[0];
    containerInner.prepend(metaHeading);
  }
}

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addButtonGroup(el) {
  let buttonGroup = document.createElement('div');
  buttonGroup.classList.add('sequence-controls');
  buttonGroup.style.cssText = "padding: 0";
  let group = document.createElement('div');
  group.classList.add('button-group', 'button-group-square');
  buttonGroup.appendChild(group);
  el.insertBefore(buttonGroup, el.childNodes[0]);
  return group;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
