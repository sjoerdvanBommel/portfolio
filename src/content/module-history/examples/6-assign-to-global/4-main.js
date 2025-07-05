// Try to update the profile as soon as the page loads
// [!code --]
updateUserProfile();
// [!code ++:3]
(function (ui) {
  ui.updateUserProfile();
})(UIModule);
