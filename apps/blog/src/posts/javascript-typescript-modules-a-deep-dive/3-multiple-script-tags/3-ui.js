function updateUserProfile() {
  // const and let only exist since ES6, so we use var instead
  var userData = fetchUserData();
  var profileDiv = getUserProfileElement();

  // Template literals (strings with backticks) only exist since ES6, so we use concatenation instead
  profileDiv.innerHTML = '<h2>' + userData.name + '</h2>' + '<p>' + userData.email + '</p>';
}

function getUserProfileElement() {
  return document.getElementById('userProfile');
}
