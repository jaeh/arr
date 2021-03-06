"use strict";

window.onload = function () {
  var canvas = document.createElement('canvas')
    , ctx = canvas.getContext('2d')
    , img = document.createElement('img')
    , times_animated = 0;

  // redirect the old browsers
  if ( !canvas || !canvas.getContext ) {
    console.log('ooold browser');
    return;
  }
    
  new Processing(canvas, function (p) {
    img.src = 'http://ayris.jaeh.at/js/arr/piratebay.png';
    
    canvas.id = 'waves';
    canvas.style.position = 'fixed';
    canvas.style.bottom = 0;
    canvas.style.left = 0;

    document.body.style['min-width'] = 300;

    document.body.appendChild(canvas);

    
    var _cradiusx = 350
      , _cradiusy = 50
      , _amplitude = 23
      , _wavelength = 2500
      , _w = screen.width + (screen.width * 0.2)
      , _h = 155
      , _twopi = 2 * Math.PI
      , _wspace = 7
      , _winc = _twopi / (_w / _wspace)
      , _wrads
      , _wcount = 0
      , _i
      , _xind
      , _tdx
      , _tdy
      , anim_playing = true
    
      , ship = {
          img: img
        , height: 107
        , width: 100
        , yminus: 130
      } 
      , rotate = 0;

    
    p.draw = function() {

      if ( anim_playing ) {     
        _winc = (_twopi * (_w / _wavelength)) / (_w / _wspace);
        
          
        p.background(255, 255, 255);
        p.fill(46, 46, 46);
          
        //background wave
        for(_i = 0; _i< _w; _i+=_wspace ){
          
          _xind = _i*5; 
          
          _wrads = (_wcount - _i) * _winc + Math.PI / 2;
          
          _tdx = 0;
          _tdy = Math.sin(_wrads) * _amplitude;
          
          p.ellipse( _xind + _tdx, _h + _tdy, _cradiusx, _cradiusy );
          
        }
        
        _wrads = (_wcount - 10) * _winc;
        _tdy = Math.sin(_wrads) * _amplitude;
        
        //draw the ship, reset transform
        
        ctx.drawImage(ship.img, 15, _tdy + _h - ship.yminus, ship.width, ship.height);

        if (document.body.clientWidth > 400) {
          ctx.font = 'italic 15px Verdana';
          ctx.fillText("A PIRATE I WAS MEANT TO BE!", document.body.clientWidth - 250, 50);
        }
        //foreground wave
        p.fill(15, 15, 15);

        for(_i = 0; _i< _w; _i+=_wspace ){
          
          _xind = _i*5;
          _wrads = (_wcount - _i) * _winc;
          
          _tdx = 0;
          _tdy = Math.sin(_wrads) * _amplitude;
          
          p.ellipse( _xind + _tdx, _h + _tdy, _cradiusx, _cradiusy);
        }
        
        times_animated = 1;
      
        _wcount += _wspace;
      
      }
    }


    p.setup = function() {
      p.size(_w, _h);
      p.noStroke();
      p.frameRate( 27 );
    }

    //posts and admin-panel are the ids for soup.io, 
    //this needs to be individualised for each platform
    var wrappers =[
        document.getElementById('posts')
      , document.getElementById('admin-sidebar')
    ];

    wrappers.forEach(function(wrapper) {

      if (wrapper && typeof wrapper.addEventListener === 'function') {
        wrapper.addEventListener('mouseover', function (evt) {
        if (times_animated) { anim_playing = false; }
        canvas.style['z-index'] = 0;
        wrapper.style['z-index'] = 10;
        }, false);
        wrapper.addEventListener('mouseout', function (evt) {
        if (times_animated) { anim_playing = true; } 
        canvas.style['z-index'] = 10;
        wrapper.style['z-index'] = 0;
        }, false);
      }
    });
  });
}
