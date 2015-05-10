function initNativeEnv($ionicPlatform, $cordovaKeyboard, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
    $cordovaKeyboard.hideAccessoryBar(true);
    $cordovaStatusbar.style(1); // LightContent
  });
}

initNativeEnv.$inject = ['$ionicPlatform', '$cordovaKeyboard', '$cordovaStatusbar'];

export default initNativeEnv;
