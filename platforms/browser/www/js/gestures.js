var app={
  inicio: function(){
  //  this.iniciaBotones();
    // this.iniciaFastClick();
    this.iniciaHammer();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBotones: function(){
    var botonClaro = document.querySelector('#claro');
    var botonOscuro = document.querySelector('#oscuro');

    botonClaro.addEventListener('click',this.ponloClaro,false);
    botonOscuro.addEventListener('click',app.ponloOscuro,false);
  },

  iniciaHammer: function() {
    var botonClaro = document.querySelector('#claro');
    var botonOscuro = document.querySelector('#oscuro');
    var zona = document.getElementById('zona-gestos');
    var hbotonclaro = new Hammer(botonClaro);
    var hbotonoscuro = new Hammer(botonOscuro);
    var hammertime = new Hammer(zona);

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });

// cuando se finaliza la animacion quito la clase
    zona.addEventListener('webkitAnimationEnd',function(e){
      zona.className='';
    });

    botonClaro.addEventListener('webkitAnimationEnd',function(e){
      botonClaro.className='';
    });

    botonOscuro.addEventListener('webkitAnimationEnd',function(e){
      botonOscuro.className='';
    });
// fin quitando la clase al final de la animación

     hammertime.on('doubletap', function(ev) {
      zona.className='doubletap';
    });

    hammertime.on('tap', function(ev) {
     zona.className='tap';
   });

    hammertime.on('press', function(ev) {
      zona.className='press';
    });

// lo mismo para botonClaro
    hbotonclaro.on('doubletap', function(ev) {
     botonClaro.className='doubletap';
   });

    hbotonclaro.on('press', function(ev) {
      botonClaro.className='press';
    });
//  fin lo mismo
// lo mismo para botonOscuro
    hbotonoscuro.on('doubletap', function(ev) {
     botonOscuro.className='doubletap';
   });

    hbotonoscuro.on('press', function(ev) {
      botonOscuro.className='press';
    });
//  fin lo mismo
    hammertime.on('swipe', function(ev) {
      var clase=undefined;
      direccion=ev.direction;

      if (direccion==4) clase='swipe-derecha';
      if (direccion==2) clase='swipe-izquierda';

      zona.className=clase;
    });


    hammertime.on('rotate', function(ev) {
      var umbral=25;
      if (ev.distance > umbral) zona.className='rotate';
    });
  },

  ponloClaro: function(){
    document.body.className = 'claro';
  },

  ponloOscuro: function(){
    document.body.className = 'oscuro';
  },

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}
