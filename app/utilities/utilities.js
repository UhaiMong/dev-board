// Got Id

function getElementByID(id) {
  const element = document.getElementById(id);
  return element;
}
// Get textValueById

function getTextValueById(id) {
  const textValue = document.getElementById(id).innerText;
  const convertedTextValue = parseInt(textValue);
  return convertedTextValue;
}

// Set Text By Id

function setTextById(id, value) {
  document.getElementById(id).innerText = value;
}
// Redirect To
function redirectTo(url) {
  return (window.location.href = url);
}
