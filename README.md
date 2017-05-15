=======
# Panoramix Image

**Panoramix** is a jQuery component to show panoramic images inside a container. **You can move your image left or right with your mouse or your finger**. If you need an Image Map, it will move with your image and adjust responsivily if neccessary.

There are lots of components to generate this effect with a background image but i couldn't find anything with an img tag. I needed a responsive container and the ability to create links on my image with image maps.

So i started working with [pano](https://seancoyne.github.io/pano), and changed background image for an img tag. Then I used [rwdImageMaps](https://github.com/stowball/jQuery-rwdImageMaps) to make my image map responsive.

## Requires

* [jQuery 1.11+:](https://jquery.com/)
* [jQuery RWD Image Maps:](https://github.com/stowball/jQuery-rwdImageMaps)

## Options
* `interval` - How often to trigger the move command when the user holds down the mouse button, touch or if you call the `moveLeft` or `moveRigh` API methods. (Default 100ms)
* `speed` - How fast should the animation move? (Default 50ms)
It will add a class of `.moving` whenever the background image is being moved (whether drag & drop or via the controls).

## API

The plugin returns a public API with 3 methods:

* `moveLeft(interval, speed)` - Starts moving the image to the left at the indicated interval and speed.  If the arguments are not provided, it will use the defaults.
* `moveRight(interval, speed)` - Starts moving the image to the right at the indicated interval and speed.  If the arguments are not provided, it will use the defaults.
* `stopMoving()` - Stops all motion.

## Example

See https://perezdans.com/experimentos/panoramix/ for working example.

```javascript
    jQuery(document).ready(function(){
        var panoramix = jQuery("#myPanoramix").panoramix({
            speed: 150,
            interval: 100
        });

        panoramix.moveLeft();
        panoramix.stopMoving();
        panoramix.moveRight();
        panoramix.stopMoving();

    });


## Based on
* [Pano](https://seancoyne.github.io/pano)

---
## Author
@perezdans
http://perezdans.com


