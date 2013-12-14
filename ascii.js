// ascii.js takes an image input and outputs ascii
// use it for w/e idc

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
    },
    
    // add themes as objects here, make sure the char value is ordered lightest to darkest
    // and that id is unique
    
    data = {
        themes: [
            { 
                id: "defult",
                char: " ._=o+x@",
                src: "author",
            },
        ],
    };
    
    // actually do things here
    
    this.gen = function( src ){
        
        // set height automatically if not defined
        // might need to adjust 'ratio' ( width / height of characters) depending on your typeface
        
        var ratio = 0.15 / 1;
        
        if ( pref.widthHasBeenSet == true && pref.heightHasBeenSet == false ){
            pref.height = Math.round(( pref.width * ( src.width / src.height )) * ratio );
        }
            
        if ( pref.widthHasBeenSet == false && pref.heightHasBeenSet == true ){
            pref.width = Math.round(( pref.height / ratio ) * ( src.height / src.width ));
        }
        
        // scale the image to the default width
        if ( pref.widthHasBeenSet == false && pref.heightHasBeenSet == false ){
            pref.height = Math.round(( pref.width * ( src.width / src.height )) * ratio );
        }
        
        console.log( pref.width + " x " + pref.height );
        
        // create a temporary canvas
        var tempCanvas = document.createElement("canvas");
            tempCanvas.setAttribute("style","position:absolute;top:-" + pref.height.toString() + "px;left:-" + pref.width.toString() + "px;width:" + pref.width.toString() + "px;height:" + pref.height.toString() + "px;");
            tempCanvas.setAttribute("id","tempCanvas");
            
        document.body.appendChild( tempCanvas );
        
        // scale canvas to requested output
        var canvas = tempCanvas.getContext("2d");
            tempCanvas.width = pref.width;
            tempCanvas.height = pref.height;
        
        // draw the image
        canvas.drawImage( src , 0 , 0, pref.width , pref.height );
        
        var outputText = "",
            imgData = canvas.getImageData( 0 , 0 , pref.width , pref.height );
            
        console.log( imgData );
        
        var row = 0;
            column = 0;
        
        // the magic
        for ( var i = 0 , idur = imgData.data.length ; i < idur ; i += 4 ){
            
            var value = ((( 255 - (( imgData.data[ i ] + imgData.data[ i + 1 ] + imgData.data[ i + 2 ] ) / 3 )) * ( imgData.data[ i + 3 ] / 255 )) / 255 ),
                char = data.themes[pref.theme].char.charAt( Math.floor( value * data.themes[ pref.theme ].char.length ));
            
            outputText += char;
            
            column ++;
            
            if ( column > pref.width - 1 ){
                column = 0;
                row++;
                outputText += "<br />";
            }
            
        }
        
        tempCanvas.parentNode.removeChild( tempCanvas );
        
        pref.target.innerHTML = outputText;
    };
    
    // preference setting
    
    this.set = {
        
        theme: function( type ){
            var err = true;
            for( var i = 0 , idur = data.themes.length ; i < idur ; i++ ){
                if ( data.themes[i].name == type ){
                    err = false;
                    pref.theme = i;
                }
                
                if ( err == true ){
                    error( "invalid theme selection" );
                }
            }
        },
        
        target: function( object ){
            console.log( object );
            if ( typeof object == "object" && typeof object.innerHTML == "string" ){
                pref.target = object;
                object.style.whiteSpace = "pre";
            } else {
                error( "invalid target - '" + object.toString() + "' either does not exist (yet) or does not have an innerHTML property" );
            }
        },
        
        width: function( int ){
            if ( Math.round( int ) == int && int > 0 ){
                pref.width = int;
            } else {
                error( "invalid width value - needs to be an integer greater than 0" );
            }
            
            pref.widthHasBeenSet = true;
        },
        
        height: function( int ){
            if ( Math.round( int ) == int && int > 0 ){
                pref.height = int;
            } else {
                error( "invalid height value - needs to be an integer greater than 0" );
            }
            
            pref.heightHasBeenSet = true;
        },
        
    };
    
    // tell yourself when you messed up
    
    var error = function( message ){
        var string = "ascii.js err: " + message;
        console.log( string );
    }
    
}