function initNativeEnv($ionicPlatform, $cordovaKeyboard, $cordovaStatusbar, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
    $cordovaKeyboard.hideAccessoryBar(true);
    $cordovaStatusbar.style(1); // LightContent

    // for debug purpose
    $localStorage.$reset();
  });
}

initNativeEnv.$inject = ['$ionicPlatform', '$cordovaKeyboard', '$cordovaStatusbar', '$localStorage'];

export default initNativeEnv;
