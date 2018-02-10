// Keep this code in app.js
app.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.cordova) {
        cordova.getAppVersion(function(version) {
        appVersion = version;
        localStorage.appVersion = appVersion;
        console.log("appVersion: " + appVersion);
      });
    }

    var SERVER_URL = 'ws://000.000.0.00:8100';  //add your system local IP address

    /**websocket connect */
    function connect() {
        ws = new WebSocket(SERVER_URL, []);
        // Set the function to be called when a message is received.
        ws.onmessage = $rootScope.handleMessageReceived;
        // Set the function to be called when we have connected to the server.
        ws.onopen = $rootScope.handleConnected;
        // Set the function to be called when an error occurs.
        ws.onerror = $rootScope.handleError;
    }

    /**listner method */
    $rootScope.handleMessageReceived = function(data) {
        var message = data.data;
        console.log("Msg_From_Server: " + message);
   
        //send received message to specific client 
        $rootScope.$broadcast("ctrl11", data);
        $rootScope.$broadcast("ctrl2", data);
    }


    /**Websocket connected */
    $rootScope.handleConnected = function(data) {
        //If you want to show event once connected
        $rootScope.$broadcast("ctrl1", data);
    }

    $rootScope.handleError = function(err) {
        console.log(err)
    }

    //Websocket connect
    connect();
    
  });

})

//controller1
app.controller("controller1", function ($scope, $rootScope,$state) {

    //handle connected
    $scope.$on("connected", function (evt, data) {
         console.log("Websocket connected")
    });


    //handle message received
    $scope.$on("ctrl1", function (evt, data) {
         console.log("Message received inside controller2 : " + data)
         $scope.$apply();
         $scope.message = data;
    });

});

//controller2
app.controller("controller2", function ($scope, $rootScope,$state) {

    //handle message received
    $scope.$on("ctrl2", function (evt, data) {
         console.log("Message received inside controller2 : " + data)
         $scope.$apply();
         $scope.message = data;
    });
});
