var ascii = function(){
    
    // change these to set your own defaults
    // use the set functions to update on the fly with some error support
    
    var pref = {
        width: 128,
        height: 48,
        target: document.body,
        theme: 0,
        heightHasBeenSet: false,
        widthHasBeenSet: false,
        ratio: 0.5 / 1,
        mono: true,
    };
    
    // add themes as objects here, make sure the char value is ordered lightest to darkest
    // and that id is unique
    // use the escape character to add quotes
    
    // if you take a theme you didn't make please include the src to not be rude
    
    var data = {
        themes: [
            {
                id: "default",
                char: " .`,'-_~;:!/+=O0X8M",
                src: "alex bergin",
            },{
                id: "defaultInvert",
                char: "M8X0O=+/!:;~_-',`. ",
                src: "alex bergin",
            },{
                id: "mono",
                char: "-+",
                src: "alex bergin",
            },{
                id: "dot",
                char: " .,`'\":;*",
                src: "alex bergin",
            }
        ],
    };
    
    // actually do things here
    this.gen = function( src ){
        
        // set height automatically if not defined
        // might need to adjust 'pref.ratio' ( width / height of characters) depending on your typeface
        
        // default the height
        if ( pref.widthHasBeenSet === true && pref.heightHasBeenSet === false ){
            pref.height = Math.round(( pref.width * ( src.width / src.height )) * pref.ratio );
        }
        
        // default the width
        if ( pref.widthHasBeenSet === false && pref.heightHasBeenSet === true ){
            pref.width = Math.round(( pref.height / pref.ratio ) * ( src.height / src.width ));
        }
        
        // scale the image to the default width
        if ( pref.widthHasBeenSet === false && pref.heightHasBeenSet === false ){
            pref.height = Math.round(( pref.width * ( src.width / src.height )) * pref.ratio );
        }
        
        // create a temporary canvas
        var tempCanvas = document.createElement("canvas");
            tempCanvas.setAttribute("style","position:absolute;top:-" + pref.height.toString() + "px;left:-" + pref.width.toString() + "px;width:" + pref.width.toString() + "px;height:" + pref.height.toString() + "px;");
            tempCanvas.setAttribute("id","tempCanvas");
        
        // place the canvas in the dom
        document.body.appendChild( tempCanvas );
        
        // scale canvas to requested output
        var canvas = tempCanvas.getContext("2d");
            tempCanvas.width = pref.width;
            tempCanvas.height = pref.height;
        
        // draw the image
        canvas.drawImage( src , 0 , 0, pref.width , pref.height );
        
        // get the image data from the canvas we've scaled and setup the output html
        var outputText = "",
            imgData = canvas.getImageData( 0 , 0 , pref.width , pref.height );
        
        // init the rows and columns
        var row = 0,
            column = 0;
        
        // the magic
        for ( var i = 0 , idur = imgData.data.length ; i < idur ; i += 4 ){
            
            // read the opacity / greyscale value of the pixel we're on
            var r = imgData.data[ i + 0 ],
                g = imgData.data[ i + 1 ],
                b = imgData.data[ i + 2 ],
                a = imgData.data[ i + 3 ],
                value = ((( 255 - (( r + g + b ) / 3 )) * ( a / 255 )) / 255 ),
                char = data.themes[pref.theme].char.charAt( Math.floor( value * ( data.themes[ pref.theme ].char.length - 1 )));
                
            
            if ( pref.mono === true ){
                outputText += char;
            } else {
                outputText += "<span style='color:rgb("+r+","+g+","+b+")'>" + char + "</span>";
            }
            
            
            // determine where to put the breaks
            // this is where you'd want to modify asciijs to output to console
            
            column ++;
            if ( column > pref.width - 1 ){
                column = 0;
                row++;
                outputText += "<br />";
            }
            
        }
        
        // obliterate the temporary canvas
        tempCanvas.parentNode.removeChild( tempCanvas );
        
        pref.target.innerHTML = outputText;
    };
    
    // mass preference setting
    this.settings = function( prefs ){
        if ( typeof prefs != "undefined" ){
            var props = [ "theme" , "target" , "width" , "height" , "mono" ];
            for( var i = 0 , idur = props.length ; i < idur ; i++ ){
                if ( prefs.hasOwnProperty( props[i] )){
                    this.set[ props[i] ]( prefs[ props[i] ]);
                }
            }
        } else {
            error( "no preferences defined" );
        }
    };
    
    // individual preference setting functions
    this.set = {
        
        // set the theme of the ascii, return error if it doesn't exist
        theme: function( type ){
            var err = true;
            for( var i = 0 , idur = data.themes.length ; i < idur ; i++ ){
                if ( data.themes[i].id == type ){
                    err = false;
                    pref.theme = i;
                }
                
                if ( err === true ){
                    error( "invalid theme selection" );
                }
            }
        },
        
        // set target to an object that accepts innerHTML, return error if invalid
        // set the target to preserve whitespace
        
        target: function( object ){
            console.log( object );
            if ( typeof object == "object" && typeof object.innerHTML == "string" ){
                pref.target = object;
                object.style.whiteSpace = "pre";
            } else {
                error( "invalid target - '" + object.toString() + "' either does not exist (yet) or does not have an innerHTML property" );
            }
        },
        
        // set width, return error if invalid
        width: function( int ){
            if ( Math.round( int ) == int && int > 0 ){
                pref.width = int;
            } else {
                error( "invalid width value - needs to be an integer greater than 0" );
            }
            
            pref.widthHasBeenSet = true;
        },
        
        // set height, return error if invalid
        height: function( int ){
            if ( Math.round( int ) == int && int > 0 ){
                pref.height = int;
            } else {
                error( "invalid height value - needs to be an integer greater than 0" );
            }
            
            pref.heightHasBeenSet = true;
        },
        
        // set use of color / monochome
        mono: function( bool ){
            if ( bool === false ){
                pref.mono = false;
            } else {
                pref.mono = true;
            }
        }
        
    };
    
    // tell yourself when you messed up
    var error = function( message ){
        var string = "ascii.js err: " + message;
        console.log( string );
    };
    
};