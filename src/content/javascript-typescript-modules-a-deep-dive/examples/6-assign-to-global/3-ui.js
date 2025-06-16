// [!code --]
var UIModule = (function globalFunction() {
// [!code word:api:1]
// [!code ++]
var UIModule = (function(api) {
  function updateUserProfile() {
    // const and let only exist since ES6, so we use var instead
    // [!code --]
    var userData = fetchUserData();
    // [!code word:api:1]
    // [!code ++]
    var userData = api.fetchUserData();
    var profileDiv = getUserProfileElement();

    // Template literals (strings with backticks) only exist since ES6, so we use concatenation instead
    profileDiv.innerHTML = '<h2>' + userData.name + '</h2>' + '<p>' + userData.email + '</p>';
  }

  // [!code highlight]
  // This will stay private and is not accessible from outside of this file
  function getUserProfileElement() {
    return document.getElementById('userProfile');
  }

  // [!code ++]
  return { updateUserProfile };
  // [!code word:ApiModule]
  // [!code ++]
})(ApiModule);
