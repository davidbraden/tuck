(function() {
'use strict';

angular.module('qrScanner', ["ng"]).directive('qrScanner', ['$interval', '$window', function($interval, $window) {
  return {
    restrict: 'E',
    scope: {
      ngSuccess: '&ngSuccess',
      ngError: '&ngError',
      ngVideoError: '&ngVideoError'
    },
    link: function(scope, element, attrs) {
    
      window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
      var height = attrs.height || 300;
      var width = attrs.width || 250;
    
      var video = $window.document.createElement('video');
      video.setAttribute('autoplay', null);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      video.setAttribute('style', '-moz-transform:rotateY(-180deg);-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg);');
      var canvas = $window.document.createElement('canvas');
      canvas.setAttribute('id', 'qr-canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('style', 'display:none;');

      var videoToggle = $window.document.createElement('button');
      videoToggle.innerText = "Cycle cameras";
      videoToggle.addEventListener("click", cycleCameras, false);
    
      angular.element(element).append(video);
      angular.element(element).append(canvas);
      angular.element(element).append(videoToggle);
      var context = canvas.getContext('2d'); 
      var stopScan;
      var videoSources = [];
      var index = 0;

      MediaStreamTrack.getSources(function(sourceInfos) {
        var videoSources = [];

        for (var i = 0; i != sourceInfos.length; ++i) {
          var sourceInfo = sourceInfos[i];
          if (sourceInfo.kind === 'video') {

            videoSources.push(sourceInfo.id);
          }
        }

        var sourceId = videoSources[0];

        startCamera(sourceId)
      });

      function cycleCameras() {
        if (videoSources) {
          index = index + 1 % videoSources.length;
          console.log(videoSources[index]);
          startCamera(videoSources[index]);
        }
      }

      function startCamera(sourceId) {
        if (navigator.getUserMedia) {
          navigator.getUserMedia({
            video: {
              optional: [{sourceId: sourceId}]
            }
          }, successCallback, function(e) {
            scope.ngVideoError({error: e});
          });
        } else {
          scope.ngVideoError({error: 'Native web camera streaming (getUserMedia) not supported in this browser.'});
        }
      }
    
      function scan() {
        if ($window.localMediaStream) {
          context.drawImage(video, 0, 0, 307,250);
          try {
            qrcode.decode();
          } catch(e) {
            scope.ngError({error: e});
          }
        }
      }

      function successCallback(stream) {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        $window.localMediaStream = stream;

        scope.video = video;
        stopScan = $interval(scan, 500);
      }

      qrcode.callback = function(data) {
        scope.ngSuccess({data: data});
      };

      element.bind('$destroy', function() {
        if ($window.localMediaStream) {
          $window.localMediaStream.stop();
        }
        if (stopScan) {
          $interval.cancel(stopScan);
        }
      });
    }
  }
}]);
})();
