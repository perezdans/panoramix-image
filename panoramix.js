/* global jQuery, module, require */

/*
Panoramix v1.0
jQuery plugin to display a 360 degree panoramic image
Jaime Pérez
Strongly based on https://github.com/seancoyne/pano

https://github.com/perezdans/panoramix-image
https://perezdans.com/experiments/panoramix
*/

(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(function($) {

    $.fn.panoramix = function(options){

        this.version = "1.0";

        // get a handle on the panorama and controls
        var img, imgWidth, screenWidth, leftLimit, rightLimit;
        var $panoramix = img = $(this).parent().find('img.panoramixImg');
        var $leftCtrl = $(this).find(".controls").find("a.left");
        var $rightCtrl = $(this).find(".controls").find("a.right");

        var getImageWidth = function(imgSrc) {
            return imgWidth;
        };

        var moveImageTo = function(newPos, duration, cb) {
            duration = duration || 0;
            cb = cb || function(){};
            if (newPos<0 && newPos>rightLimit) {
                $panoramix.animate({
                    "left": newPos.toString() + "px"
                }, duration, "linear", cb);
            }
        };

        var moveImageBy = function(distance, duration, cb) {
            duration = duration || 0;
            cb = cb || function(){};
            moveImageTo(getCurrentPosition() + distance, duration, cb);
        };

        var getCurrentPosition = function() {
            reloadValues();
            return parseInt($panoramix.css("left").split(" ")[0].replace("px", ""));
        };

        var reloadValues = function() {
            imgWidth = jQuery(img).width();
            screenWidth = jQuery('body').innerWidth();
            leftLimit = 0;
            rightLimit = -imgWidth + screenWidth;
        };

        var indicateMovement = function() {
            $panoramix.addClass("moving");
        };

        var noMovement = function() {
            $panoramix.removeClass("moving");
        };

        var insideImage = function(mouseXPos) {
            var $offsetLeft = $panoramix.offset().left;
            var maxLeft = $offsetLeft;
            var maxRight = $offsetLeft + $panoramix.width();
            if( mouseXPos < maxLeft || mouseXPos > maxRight) {
                return false;
            }
            return true;
        };

        var dragMove = function(xPos, startPosition, cb) {

            // dont move if you're outside the image
            if (!insideImage(xPos)) {
                return false;
            }

            // calculate the change in position
            var diff = (xPos - startPosition);

            // move it
            moveImageBy(diff, 0, cb);

        };

        var leftMover,
            rightMover,
            ctrlInterval = options.interval || 100,
            ctrlSpeed = options.speed || 50;

        // setup the initial styling
        reloadValues();

        //Posicionamos inicialmente la imagen al centro
        center = (imgWidth/2)-(screenWidth/2);
        $panoramix.css("left","-"+center+'px');


        var moveLeft = function(interval, speed) {

            interval = interval || ctrlInterval;
            speed = speed || ctrlSpeed;

            // indicate movement
            indicateMovement();

            // immediately move
            moveImageBy(speed, 100);

            // move left on interval
            leftMover = setInterval(function(){
                moveImageBy(speed, 100);
            }, interval);

        };

        var moveRight = function(interval, speed) {

            interval = interval || ctrlInterval;
            speed = speed || ctrlSpeed;

            // indicate movement
            indicateMovement();

            // immediately move
            moveImageBy(-speed, 100);

            // move right on interval
            rightMover = setInterval(function(){
                moveImageBy(-speed, 100);
            }, interval);
        };

        var stopMoving = function() {
            $panoramix.off("touchmove");
            $panoramix.off("mousemove");
            $panoramix.stop(true, true);
            clearInterval(leftMover);
            clearInterval(rightMover);
            noMovement();
        };

        $leftCtrl.on("mouseover", function(event){

            // dont process the drag events
            event.stopPropagation();

            moveLeft();


        }).on("mouseout", function(event){
            event.stopPropagation();
            stopMoving();

        }).on("touchstart", function(event){

            // dont process the drag events
            event.stopPropagation();

            // don't show the context menu while holding
            event.preventDefault();

            moveLeft();

        });

        $rightCtrl.on("mouseover", function(event){

            // dont process the drag events
            event.stopPropagation();

            moveRight();

        }).on("mouseout", function(event){
            //event.stopPropagation();
            stopMoving();

        }).on("touchstart", function(event){

            // dont process the drag events
            event.stopPropagation();

            // don't show the context menu while holding
            event.preventDefault();

            moveRight();

        });

        $panoramix.on("mousedown", function(event){

            // indicate movement
            indicateMovement();

            // don't show the context menu while holding
            event.preventDefault();

            var startPosition = event.pageX;

            $panoramix.on("mousemove", function(event){

                var xPos = event.pageX;
                dragMove(xPos, startPosition, function(){
                    // after animation is complete, set the "start" position to the current position
                    startPosition =xPos;
                });

            });
        }).on("touchstart", function(event){

            // indicate movement
            indicateMovement();

            // don't show the context menu while holding
            event.preventDefault();

            //var startPosition = event.pageX;
            var startPosition = event.originalEvent.touches[0].pageX;

            $panoramix.on("touchmove", function(event){

                var xPos = event.originalEvent.changedTouches[0].pageX;
                dragMove(xPos, startPosition, function(){
                    // after animation is complete, set the "start" position to the current position
                    startPosition = xPos;
                });

            });

        });

        $("body").on("mouseup", function(){
            stopMoving();
        }).on("touchend", function(){
            stopMoving();
        });

        $(window).on('resize',reloadValues);

        return {
            moveLeft: moveLeft,
            moveRight: moveRight,
            stopMoving: stopMoving
        };

    };

}));




