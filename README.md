# asciijs

A javascript library designed to let you easily output ascii artwork from still images, gifs, and video.

## Usage

Include the ascii.js in your head
    
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
            myASCII.gen( document.getElementById("catimage") );
        }
    </script>
    
That is all the script you need to do to start exporting.
For a more thorough example, see the example index page.

## Settings

The following are all options you can set to determine the style of your output ASCII. These commands are assuming you've initialized the asciijs function to the variable `myASCII` and that your content has fully loaded.

In addition to being able to set all these preferences individually, you can optionally define them with one object using the settings function:

    myASCII.settings({
        theme: "defaultInvert",
        target: document.body,
        width: 128,
        height: 48,
        mono: true
    });
    
Anywhere between an individual preference and all of them at once can be set in this manner. Invalid properties will be ignored and will not throw an error.

------------

### Theme

Determines what ascii theme will be used to generate your outputted text. Themes are strings of plain text using characters organized from lightest to darkest. See themes in the data var for an example.
    
    myASCII.set.theme( string );
    
The current list of themes is: `"default"` , `"defaultInvert"` , `"mono"` , & `"dot"`.

In addition, you can define your own custom theme. Simply pass an object with a unique id and define your theme to the char parameter, ordering characters from lightest to darkest. This will add your theme to the theme array and apply it as your current theme.

    myASCII.set.theme({
        id: string,
        char: string,
    });

Default value: `"default"`
    
------------

### Color / Monochromatic

Applys the color of the pixel the character is replacing to the text if set to false, uses the containers text color if set to true. Very render intensive to display in full color, poor for animations.

    myASCII.set.mono( bool );

Default value: `true`

------------

### Target

Determines what object you will place the outputted html into. Note: make sure you are using a monospace typeface for best effect.

    myASCII.set.target( object );
    
Default value: `document.body`
    
------------

### Width

Sets the width in characters of your outputted ascii. If width is unset and height is set, width is determined in proportion to the height you've chosen and the height of the source image. If neither height nor width are set, the default width will be used and the height will be scaled to match your source image.

    myASCII.set.height( int );
    
Default value: `128`
    
------------

### Height

Sets the height in characters of your outputted ascii. If height is unset and width is set, height is determined in proportion to the width you've chosen and the width of the source image. If neither height nor width are set, the default width will be used and the height will be scaled to match your source image.

    myASCII.set.height( int );
    
Default value: `48`
    
------------
