# asciijs

A javascript library designed to let you easily output ascii artwork from still images, gifs, and video.

## Usage

First include the ascii.js in your head
    
    <script src="ascii.js"></script>
    
Usually you'll want to wait until your image has loaded before using this library. For the sake of simplicity, this demo will initialize asciijs on window load. This guarantees that our image has loaded.

    <script>
        window.onload = function(){
            var myASCII = new ascii();
        }
    </script>
    
First, set your target. In this case we'll be telling the ascii to output to a div called "textholder" in the body

    <script>
        window.onload = function(){
            var myASCII = new ascii();
            myASCII.set.target( document.getElementById("textholder") );
        }
    </script>
    
Next we take our image and pass it to the gen function of asciijs

    <script>
        window.onload = function(){
            var myASCII = new ascii();
            myASCII.set.target( document.getElementById("textholder") );
            myASCII.gen( document.getElementById("catimage.png") );
        }
    </script>
    
That is all the script you need to do to start exporting.
For a more thorough example, see the example index page.

## Settings

The following are all options you can set to determine the style of your output ASCII. These commands are assuming you've initialized the asciijs function to the variable `myASCII` and that your content has fully loaded.

------------

### Theme

Determines what ascii theme will be used to generate your outputted text. Themes are strings of plain text using characters organized from lightest to darkest. See themes in the data var for an example.
    
    myASCII.set.theme( string );
    
The current list of themes is: `default` , `defaultInvert` , `mono` , & `dot`.
    
------------

### Color / Monochromatic

Applys the color of the pixel the character is replacing to the text if set to false, uses the containers text color if set to true. Very render intensive to display in full color, poor for animations.

    myASCII.set.mono( bool );
    
------------

### Target

Determines what object you will place the outputted html into. Note: make sure you are using a monospace typeface for best effect.

    myASCII.set.target( object );
    
------------

### Width

Sets the width in characters of your outputted ascii. If width is unset and height is set, width is determined in proportion to the height you've chosen and the height of the source image. If neither height nor width are set, the default width will be used and the height will be scaled to match your source image.

    myASCII.set.height( int );
    
------------

### Height

Sets the height in characters of your outputted ascii. If height is unset and width is set, height is determined in proportion to the width you've chosen and the width of the source image. If neither height nor width are set, the default width will be used and the height will be scaled to match your source image.

    myASCII.set.height( int );
    
------------
