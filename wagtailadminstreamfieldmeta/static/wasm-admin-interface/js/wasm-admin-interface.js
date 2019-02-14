document.addEventListener("DOMContentLoaded", function(event) {
  hideMetaFields();
  addSequenceControlsInfoButton();
});

document.addEventListener("DOMNodeInserted", function(event) {
  var elem = event.target;
  hideMetaFields();
  addSequenceControlsInfoButton();
});

/**
 *  Hides all meta fields when the page loads.
 */
function hideMetaFields(newElem) {
  var elems = [ newElem ];
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
  var metaPanelElems = [ newElem ];
  if (!newElem)
    metaPanelElems = document.getElementsByClassName('wasm-meta-panel');

  Array.prototype.forEach.call(metaPanelElems, function(el) {
    var parentContainerEl = el.parentElement.parentElement;
    var n = parentContainerEl.id.lastIndexOf('-');
    var rootId = parentContainerEl.id.substr(0, n);     // Strip container suffix.
    var buttonGroupEl = parentContainerEl.querySelector(".sequence-controls > .button-group");
    addInfoButton(buttonGroupEl, rootId);
  });
}

/**
 *  Adds a new info button to the given button groups allowing the user
 *  to toggle the meta fields on and off so that they can be hidden
 *  unless needed.
 */
function addInfoButton(buttonGroup, rootId) {
  var buttonId = rootId + '-info';
  var existingButton = document.getElementById(buttonId);
  if (existingButton) return;

  var button = document.createElement('button');
  button.id = buttonId;
  button.classList.add('button','icon', 'text-replace', 'icon-cogs');
  button.title = 'Info';

  var rootElem = document.getElementById(rootId + '-container');
  var childElems = rootElem.getElementsByTagName('LI');
  Array.prototype.forEach.call(childElems, function(el) {
    if(el.children.length >= 2){
      if(!el.classList.contains("wasm-hidden-field")){
        el.classList.add("wasm-visible-field");
      }
    }
  });

  button.addEventListener("click", function(e) {
    e.preventDefault();
    var rootElem = document.getElementById(rootId + '-container');
    var childElems = rootElem.getElementsByTagName('LI');
    Array.prototype.forEach.call(childElems, function(el) {
      el.classList.toggle('wasm-hidden-field');
      el.classList.toggle('wasm-visible-field');
    });
  });
  buttonGroup.appendChild(button);
}