var UIModule = (function globalFunction() {
  function updateUserProfile() {
    // const and let only exist since ES6, so we use var instead
    // [!code --]
    var userData = fetchUserData();
    // [!code ++]
    var userData = ApiModule.fetchUserData();
    var profileDiv = getUserProfileElement();

    // Template literals (strings with backticks) only exist since ES6, so we use concatenation instead
    profileDiv.innerHTML = '<h2>' + userData.name + '</h2>' + '<p>' + userData.email + '</p>';
  }

  // [!code highlight]
  // This will stay private
  function getUserProfileElement() {
    return document.getElementById('userProfile');
  }

  // [!code ++]
  return { updateUserProfile };
})();
