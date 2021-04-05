// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/index/', url: 'index.html',},
      {path: '/registroUser/', url: 'registroUser.html',},
      {path: '/registroAdmin/', url: 'registroAdmin.html',},
      {path: '/pag1User/', url: 'pag1User.html',},
      {path: '/pag2User/', url: 'pag2User.html',},
      {path: '/pag3User/', url: 'pag3User.html',},  
      {path: '/pag4User/', url: 'pag4User.html',},
      {path: '/pag5User/', url: 'pag5User.html',}, 
      {path: '/pag1Admin/', url: 'pag1Admin.html',},
      {path: '/pag2Admin/', url: 'pag2Admin.html',},
      {path: '/pag3Admin/', url: 'pag3Admin.html',},     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colPersonas = db.collection("Personas");
var colEstacionamiento = db.collection("Estacionamiento");

var id = "";
var cat = "";
var nomEst = "";
var nom = "";
var email = "";
var estAdmin = "";
var nomCochera = "";
var cocheraReservada = "";
var nomCocheraReservada = "";
var horaEntrada = "";
var hora = "";
var cNombre = "";
var cliente = "";
var horaSalida = "";
var horasTotal = "";
var plataTotal = "";
//var emailAdmin = "";

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

        // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccessGPS = function(position) {
        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
    };
 
    // onError Callback receives a PositionError object
    //
    function onErrorGPS(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
});




// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})


$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  
  console.log("vista index")
  $$('#regEnLogin').on('click', fnIrAlRegUser);  
  $$('#btnLogin').on('click', fnLogin);
  $$('#btnIrAlRegAdmin').on('click', fnIrAlRegAdmin);
  
});

$$(document).on('page:init', '.page[data-name="registroUser"]', function (e) {
    
    console.log("vista registro");
    $$('#btnRegistro').on('click', fnRegistroUser);
          
    }); 

$$(document).on('page:init', '.page[data-name="registroAdmin"]', function (e) {
    
    console.log("vista registro");
    $$('#btnRegAdmin').on('click', fnRegistroAdmin);    
        
    }); 


//------------- PAGINAS ADMIN -------------------------------


$$(document).on('page:init', '.page[data-name="pag1Admin"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log("vista pag1Admin");

    $$('.open-dialog').on('click', function () {
          alert('Vuelva pronto');
        });
    
    $$('#power1A').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

    docRef = colPersonas.doc(email);   
    docRef.get()
     .then((doc) => {
        if (doc.exists) {
          nomEst = doc.data().Estacionamiento;
          //$$("#nomEst").append(nomEst);
          console.log();
        } else {
          console.log("No such document!");
          }
      }).catch((error) => {
       console.log("Error getting document:", error);
    });
      
    $$('#crearCochera').on('click', fnCrearCochera);
    $$('#eliminarCochera').on('click', function(){mainView.router.navigate('/pag2Admin/');});

      
    var consultaCocheras = db.collectionGroup("Cocheras").orderBy("Nombre","asc");

      consultaCocheras.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        cLibres = doc.data().Estado;
        cNombre = doc.data().Nombre;
        cliente = doc.data().Usuario;
        horaEntrada = doc.data().Reserva;
        horaSalida = doc.data().Salida;
        id = doc.id;

        
        console.log(doc.id, ' => ', doc.data());

        $$('#cocherasLibres').append("<button class='eliminar col button button-raised button-fill button-round color-yellow' id='btn_"+id+"'>Cochera - "+cNombre+": "+cLibres+"</button>");
        $$('#btn_'+id).on('click', function(){ 

              var consultaCocheras = db.collection('Estacionamientos').doc('nico@gmail.com').collection('Cocheras').doc(doc.id);

      consultaCocheras.get()
      .then(() => {
      

        cLibres = doc.data().Estado;
        cNombre = doc.data().Nombre;
        cliente = doc.data().Usuario;
        horaEntrada = doc.data().Entrada;
        horaSalida = doc.data().Salida;
        timestamp = doc.data().Timestamp
        timestamps = doc.data().TimestampS
        id = doc.id;

        
        console.log(doc.id, ' => ', doc.data());

          mainView.router.navigate('/pag3Admin/')

        });    
        });

      });
    });  



});
 
//--------------------- ADMIN 2----------------------------

$$(document).on('page:init', '.page[data-name="pag2Admin"]', function (e) {
    
  console.log("vista pag2Admin");
  $$('.open-alert').on('click', function () {
        alert('Vuelva pronto');
      });

  $$('#power2A').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

    $$('#volverAdmin2').on('click', function(){mainView.router.navigate('/pag1Admin/')});

    var consultaCocheras = db.collectionGroup("Cocheras").orderBy("Nombre","asc");

      consultaCocheras.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        cLibres = doc.data().Estado;
        cNombre = doc.data().Nombre;
        hora = doc.data().Entrada;
        id = doc.id;

        /*if (cLibres === "Ocupada") {
          $$('#cocheraEliminar').removeClass('reservaSi');
          $$('#cocheraEliminar').addClass('reservaNo');
        } else if (cLibre === "Desocupa") {
          $$('#cocheraEliminar').removeClass('reservaNo');
          $$('#cocheraEliminar').addClass('reservaSi');
          } else {
          }*/

          
          $$('#cocheraEliminar').append("<button class='col reservSi button button-raised button-fill button-round color-red' id='btn_"+id+"'>"+cNombre+" - click para eliminar</button>");
          
          $$('.open-alert').on('click', function () {
            confirm('Esta accion no se puede deshacer', function () {
            
            });
          });
          $$('#btn_'+id).on('click',  function() {
        
     
        
        db.collection("Estacionamiento").doc("nico@gmail.com").collection("Cocheras").doc(doc.id).delete().then(() => {
            console.log("Document successfully deleted!");
            mainView.router.navigate('/pag1Admin/'); 
        }).catch((error) => {
            console.error("Error removing document: ", error);
          });
         
        });
      
      });
     
    });

});

//-------------------------ADMIN 3 --------------------------------

$$(document).on('page:init', '.page[data-name="pag3Admin"]', function (e) {
    
  console.log("vista pag3Admin");
  console.log(id);

  $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

  $$('#power3A').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

  if (horaSalida === "") {
      $$('#cobrar').removeClass('reservaSi');
      $$('#cobrar').addClass('reservaNo');
      $$('#horasTotal').removeClass('reservaSi');
      $$('#horasTotal').addClass('reservaNo');
      $$('#horaSalida').removeClass('reservaSi');
      $$('#horaSalida').addClass('reservaNo');
      $$('#plataTotal').removeClass('reservaSi');
      $$('#plataTotal').addClass('reservaNo');
    }

    var tt = timestamps - timestamp;
    var ms = tt % 1000;
    tt = (tt - ms) / 1000;
    var secs = tt % 60;
    tt = (tt - secs) / 60;
    var mins = tt % 60;
    var hrs = (tt - mins) / 60;
    
    horasTotal = hrs+":0"+mins;

    plataTotal = (hrs+mins)*100;

    $$('#cocheraOcupada').append("<p>Cochera: "+cNombre+"</p>");  
    $$('#userOcupando').append("<p>Cliente: "+cliente+"</p>");
    $$('#horaEntrada').append("<p>Hora de entrada: "+horaEntrada+"</p>");
    $$('#horaSalida').append("<p>Hora de salida: "+horaSalida+"</p>");
    $$('#horasTotal').append("<p>Tiempo Estacionada: "+horasTotal+"</p>");
    $$('#plataTotal').append("<p>Precio: "+plataTotal+"</p>");


    
                

    $$('#volverpag3a').on('click', function (){mainView.router.navigate('/pag1Admin/')});
    $$('#cobrar').on('click', function(){
      var reservaRef = db.collection('Estacionamiento').doc('nico@gmail.com').collection('Cocheras').doc(id);
            //console.log(emailAdmin);
              
            reservaRef.update({
                    Entrada:"",                     
                    Salida: "",
                    Estado: "Libre",
                    User:"",
                    TimestampS: "",
                    Timestamp:"",
                    User:"",
                    Usuario:"",
                    Pago:false,


            })
                  .then(() => mainView.router.navigate('/pag1Admin/'))
                  .catch((error) => console.error("hay algo mal que no esta bien ", error));

    });
      

});
  


//---------------- PAGINAS USER ---------------------------------

$$(document).on('page:init', '.page[data-name="pag1User"]', function (e) {
    
    console.log("vista pag1User");

    $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

    $$('#power1U').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

    $$('#nomUser').html('<div class="block-title"><h2 class="text-align-center">Hola '+nom+' !</h2></div>'); 
    $$('#selEst').append("<option value="+nomEst+">Nicolas</option>"); 
    $$('#btnSelCochera').on('click', function(){estAdmin = app.smartSelect.get('.estacion').getValue();mainView.router.navigate('/pag2User/')});  
    $$('#reservada').on('click', function(){ mainView.router.navigate('/pag4User/')});
    var consultaCocheras = db.collectionGroup("Cocheras").where("User","==", email);

      consultaCocheras.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        horaEntrada = doc.data().Entrada;
        nomCochera = doc.data().Nombre;
        nomEst = "Nicolas";
        id = doc.id;
        

        if (email) {
          
          $$('#reservada').removeClass('reservaNo');
          $$('#reservada').addClass('reservaSi');
          $$('#btnSelCochera').removeClass('reservaSi');
          $$('#btnSelCochera').addClass('reservaNo'); 
          $$('#muestra').removeClass('reservaSi');
          $$('#muestra').addClass('reservaNo');    
          
          } else {

        }

        console.log(email + horaEntrada + nomCochera + nomEst);

      }); 
    });
});

//-------------------------PAGINA 2 USER   ENTRADA---------------------------  
 
$$(document).on('page:init', '.page[data-name="pag2User"]', function (e) {
    
  console.log("vista page2User");

  $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

  $$('#power2U').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

  $$('#volverpag2u').on('click', function(){mainView.router.navigate('/pag1User/')});
    
    var consultaCocheras = db.collection('Estacionamiento').doc('nico@gmail.com').collection('Cocheras').where("Estado", "==", "Libre").orderBy("Nombre","asc");

      consultaCocheras.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var cLibres = doc.data().Estado;
        var cNombre = doc.data().Nombre;
        id = doc.id;
             
        $$('#cocherasList').append("<button class='verde reservaSi col button button-raised button-fill button-round color-yellow' id='ac_"+id+"'>Cochera - "+cNombre+": "+cLibres +"</button>");
        
        $$('#ac_'+id).on('click', function (){
          cocheraReservada = doc.id;
          nomCocheraReservada = cNombre;
          console.log("Cochera "+nomCocheraReservada+" Reservada");
          
          var date = new Date();
          console.log(date);
          var timestamp = date .getTime();
          console.log(timestamp);
          var horas = date.getHours();
          var minutos = "0" + date.getMinutes();
          
          hora = horas + ':' + minutos.substr(-2);

                     
    var reservaRef = db.collection('Estacionamiento').doc('nico@gmail.com').collection('Cocheras').doc(doc.id);
                          
      reservaRef.update({
               Estado: "Ocupada",
               Entrada: hora,
               User: email,
               Usuario: email,
               Timestamp: timestamp
            })
            .then(() => mainView.router.navigate('/pag3User/'))
            .catch((error) => console.error("hay algo mal que no esta bien ", error));
            });
      });
   
    });

}); 

//-----------------------------USER 3   ENTRADA  ----------------------------------

$$(document).on('page:init', '.page[data-name="pag3User"]', function (e) {
    
  console.log("vista pag3User");

  $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

  $$('#power3U').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      
      });
    });

    
    console.log(hora);
    $$('#nomEst').append('<div class="block-title"><h2 class="text-align-center">Estacionamiento: '+nomEst+'</h2></div>');
    $$('#cocheraReservada').append("<p id='"+id+"'>Cochera - "+nomCocheraReservada+"</p>");
    $$('#hora').append("<div>"+hora+"</div>");
    $$('#aceptar').on('click', function(){ mainView.router.navigate('/pag1User/')});
    
    $$('#cancelar').on('click', function(){
    console.log(cocheraReservada); 
    db.collection("Estacionamiento").doc("nico@gmail.com").collection("Cocheras").doc(cocheraReservada)
    .update({
      Estado:"Libre",
      Entrada:"",
      Timestamp:"",
      User:"",
      Usuario:"", 
      })
    mainView.router.navigate('/pag1User/');
    });

});

//---------------------------------USER 4 SALIDA  ---------------------------

$$(document).on('page:init', '.page[data-name="pag4User"]', function (e) {
    
  console.log("vista pag4User");

  $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

  $$('#power4U').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });

    $$('#nomEstacionamiento').append("<h2 class='text-align-center'>Estacionamiento: "+nomEst+"</h2></div>");
    $$('#tuCochera').append("<p>Cochera - "+nomCochera+"</p>");
    $$('#horario').append("<p>Tu reserva comenzo a las "+horaEntrada+"</p>");
    $$('#volver').on('click', function(){ mainView.router.navigate('/pag1User/')});
    $$('#finalizar').on('click', function(){

      var date = new Date();
          console.log(date);
          var timestamp = date .getTime();
          console.log(timestamp);
          var horas = date.getHours();
          var minutos = "0" + date.getMinutes();
          
          hora = horas + ':' + minutos.substr(-2);
          console.log(hora);

       var reservaRef = db.collection('Estacionamiento').doc('nico@gmail.com').collection('Cocheras').doc(id);
            //console.log(emailAdmin);
              
            reservaRef.update({
                                         
                    Salida: hora,
                    Estado: "Desocupada",
                    User:"",
                    TimestampS: timestamp

            })
                  .then(() => mainView.router.navigate('/pag5User/'))
                  .catch((error) => console.error("hay algo mal que no esta bien ", error));

    });
    
     
});

//---------------------------------USER 5---------------------------

$$(document).on('page:init', '.page[data-name="pag5User"]', function (e) {
    
    console.log("vista pag5User");

    $$('.open-alert').on('click', function () {
          alert('Vuelva pronto');
        });

    $$('#power5U').on('click', function(){
      console.log("power");
      firebase.auth().signOut().then(() => {
      mainView.router.navigate('/index/');
      }).catch((error) => {
      // An error happened.
      });
    });    

    $$('#salir').on('click',  function(){ mainView.router.navigate('/pag1User/')});

    db.collection("Estacionamiento").doc("nico@gmail.com").collection("Cocheras").where("Usuario","==", email).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

    var timestamp = doc.data().Timestamp; 
    var timestamps = doc.data().TimestampS;

    var tt = timestamps - timestamp;
    var ms = tt % 1000;
    tt = (tt - ms) / 1000;
    var secs = tt % 60;
    tt = (tt - secs) / 60;
    var mins = tt % 60;
    var hrs = (tt - mins) / 60;
    
    horasTotal = hrs+":0"+mins;

    plataTotal = (hrs+mins)*100;
    
  });

    console.log(horasTotal + plataTotal);

    $$('#nomEstacionamiento').append("<h2>Estacionamiento: "+nomEst+"</h2>");
    $$('#tuTiempo').append("<p>Tiempo estacionado: "+horasTotal+"</p>");
    $$('#tuDeuda').append("<p>Tu saldo es: "+plataTotal+"</p>");


  });

});    

    // Registro Usuario ----------------------------------------------------------

function fnRegistroUser() {
  email = $$('#emUser').val();
  password = $$('#passUser').val(); 
  nombre = $$('#nomUser').val();
  apellido = $$('#apUser').val();
  cat = "User";

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {

      data = {Nombre: nombre, Apellido: apellido, Categoria: cat, Email: email};
      colPersonas.doc(email).set(data);
      mainView.router.navigate('/index/');



        dialog: {
    // set default title for all dialog shortcuts
    title: 'Registro Exitoso!';
    // change default "OK" button text
    buttonOk: 'OK';
   
  }
  })



    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      if (errorCode == 'auth/weak-password') {
        alert('Contrasena muy debil')
      } else {
        alert(errorCode + "-" + errorMessage);
      }
        console.log(error);
    });
}

//------------------------ Registro Admin ----------------------------------------

function fnRegistroAdmin() {

var nomAdmin = $$('#nomAdmin').val();
var apAdmin = $$('#apAdmin').val();
var email = $$('#emailAdmin').val();
var password = $$('#passAdmin').val(); 
var nomEst = $$('#nomEst').val();
var dirEst = $$('#dirEst').val(); 
var cat = "Admin";

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    alert("Registro de estacionamiento realizado con exito");
    var data = {Nombre: nomAdmin, Apellido: apAdmin, Email: email, Categoria: cat, Estacionamiento: nomEst};
    var dataE = {Estacionamiento: nomEst,Direccion: dirEst};
    colPersonas.doc(email).set(data);
    colEstacionamiento.doc(email).set(dataE);
    mainView.router.navigate('/index/');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    if (errorCode == 'auth/weak-password') {
      alert('Contrasena muy debil')
    } else {
      alert(errorCode + "-" + errorMessage);
    }
      console.log(error);
  });
}

// --------------------------- Login -----------------------------------------------------


function fnLogin() {
  email = $$('#emailLog').val();
  password = $$('#passLog').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    
    colPersonas.doc(email).get()
    .then((doc) => {
        
        if(doc.exists){  

        cat = doc.data().Categoria;
        nom = doc.data().Nombre;
        
          if(cat == "User"){
            mainView.router.navigate('/pag1User/');
          } else {
            mainView.router.navigate('/pag1Admin/');
          }
        
        } else {
          console.log('el doc no existe');
        }
            
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  docRef = colPersonas;   
    docRef.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            nomEst = doc.data().Estacionamiento;
                         
        });
            console.log(nomEst);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  
}

//-----------------------------------------

function fnCrearCochera(){
   
  var cochera = $$('#numCochera').val();
  var estado = "Libre";
  var entrada = "";
  var salida = "";
  var user = "";
  var usuario = "";
  var pago = false;
  var timestamp = "";
  var cocherasRef = db.collection('Estacionamiento').doc(email).collection('Cocheras');
  var data = {Nombre: cochera, Estado: estado, Entrada: entrada, Salida: salida, User: user, Usuario: usuario, Pago:pago, Timestamp: timestamp, TimestampS:""};
    colEstacionamiento.doc(email)
    cocherasRef.doc()
    .set(data);
    
    console.log("cochera creada "+cochera ); 

     var consultaCocheras = db.collectionGroup('Cocheras').orderBy("Nombre","desc").limit(1);

      consultaCocheras.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var cLibres = doc.data().Libre;
        var cNombre = doc.data().Nombre;
        var id = doc.id;
        
        console.log(doc.id, ' => ', doc.data());

        $$('#cocherasLibres').append("<button class='eliminar col button button-raised button-fill button-round color-yellow' id='"+id+"'>Cochera -"+cNombre+ ": Libre</button>");

      });

    });  

}

function fnIrAlIndex(){
  mainView.router.navigate('/index/');
}

function fnIrAlRegUser(){
  mainView.router.navigate('/registroUser/');
}
function fnIrAlRegAdmin(){
  mainView.router.navigate('/registroAdmin/');
}
