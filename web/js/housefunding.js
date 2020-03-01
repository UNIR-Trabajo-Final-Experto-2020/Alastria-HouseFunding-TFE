      //FUNCIONES JS PARA PANTALLA ADMINISTRADOR
      function loginAdministrador() {
        var cuenta = document.getElementById("loginAdministrador").value;
        if (cuentaPlataforma == cuenta) {
          muestra_oculta('accesosDiv', 'administradorDiv');
        } else {
          console.log("Cuenta administrador no valida");
          mostrarMensaje("msgAccesoAdministrador", "ERROR", "Cuenta administrador no valida");
        }
      }

       //Tranfiere numeroTokens a cuentaDestino (Promotor o Inversor) de la cuenta de la plataforma.
       function tranferirTokens()
       {

          var cuentaDestino = document.getElementById("cuentaDestino").value;
          var numeroTokens = document.getElementById("numeroTokens").value;
          var tipoUsuario = document.getElementById("selectTipoUsuario").value;


          if (cuentaDestino == '' || numeroTokens == '' || tipoUsuario == '') {
            
            mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Campos obligatorios: cuentaDestino, numeroTokens, tipoUsuario");
            return;
          }

          if (tipoUsuario == 'PROMOTOR') {
                
                mostrarMensaje("msgAdministradorPlataforma", "INFO", "Inicio de Transferencia a Promotor: " + cuentaDestino + " de " + numeroTokens + " VAT");

                console.log("Tranfiere a promotor");
                tranferirTokensPromotor(cuentaDestino, numeroTokens);

          } else if (tipoUsuario == 'INVERSOR') {    
                 
                mostrarMensaje("msgAdministradorPlataforma", "INFO", "Inicio de Transferencia a Inversor: " + cuentaDestino + " de " + numeroTokens + " VAT");

                console.log("Tranfiere a Inversor");     
                tranferirTokensInversor(cuentaDestino, numeroTokens);
  
          } else {
              console.log("Error: tipoUsuario no valido");
          }
                  
       }

        //Tranfiere numeroTokens a cuentaDestino (Promotor o Inversor) de la cuenta de la plataforma.
        async function tranferirTokensInversor(cuentaDestino, numeroTokens)
        {
          try {
            instPlatPromoInver.methods.transferirTokensParaInversor(cuentaDestino, numeroTokens).send( {from: cuentaPlataforma, gas: 50000}, function(error, result){
                  if(!error){
                      console.log(result);
                                            
                  } else {
                      console.error(error);
                  }
                })
          
                .on('receipt', function(receipt) {

                  if (receipt.events.TokensEmitidos) {

                    var resp = receipt.events.TokensEmitidos; 
                    mostrarMensaje("msgAdministradorPlataforma", "INFO", "Trannsferidos tokens a Inversor: " + cuentaDestino);

                  } else {
                    mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Tokens NO transferidos a Inversor. El inversor debe estar registrado previamente en la plataforma");
                  }

                });
          } catch (err) {
            console.error("Error: " + err);
            mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Error realizando transferencia a Inversor: " + err);
          }
               

        }

        //Tranfiere numeroTokens a cuentaDestino de Promotor de la cuenta de la plataforma.
        async function tranferirTokensPromotor(cuentaDestino, numeroTokens)
        {
          try {      
            instPlatPromoInver.methods.transferirTokensParaPromotor(cuentaDestino, numeroTokens).send( {from: cuentaPlataforma, gas: 50000}, function(error, result){
                  if(!error){
                      console.log(result);
                                            
                  } else {
                      console.error(error);
                  }
                })
          
                .on('receipt', function(receipt) {

                  if (receipt.events.TokensEmitidos) {

                    var resp = receipt.events.TokensEmitidos; 
                    mostrarMensaje("msgAdministradorPlataforma", "INFO", "Transferidos tokens a Promotor: " + cuentaDestino);

                  } else {
                    mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Tokens NO transferidos a Promotor: El promotor debe estar registrado previamente en la plataforma");
                  }

                });
          } catch (err) {
            console.error("Error: " + err);
            mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Error realizando transferencia a Promotor: " + err);
          }
        }




