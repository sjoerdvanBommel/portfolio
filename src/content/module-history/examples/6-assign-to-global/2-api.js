// [!code ++]
var ApiModule = (function() {
  function fetchUserData() {
    // In real code, this would be an actual XMLHttpRequest
    // (fetch didn't exist back then)
    return {
      name: 'John Doe',
      email: 'john@example.com',
    };
  }
  
  // [!code --]
};
// [!code word:return { fetchUserData }]
// [!code ++:2]
  return { fetchUserData };
})();
