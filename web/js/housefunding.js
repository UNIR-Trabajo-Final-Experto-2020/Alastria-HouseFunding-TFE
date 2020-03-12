      //FUNCIONES JS PARA PANTALLA ADMINISTRADOR

      function limpiarMensajes() {
        limpiarMensajesError("msgAdministradorPlataforma");
        limpiarMensajesError("msgPromotroresMensajes");        
      }

      function limpiarMensajesError(idElement) {
        $("#" + idElement).empty();
        $("#" + idElement).removeClass();

        $("#tblPromotor tbody").empty();
        $("#tblProyecto tbody").empty();
        $("#tblInversor tbody").empty();
        $("#promotorSeleccionado").empty();
        $("#proyectoSeleccionado").empty();
      }

       //Tranfiere numeroTokens a cuentaDestino (Promotor o Inversor) de la cuenta de la plataforma.
       async function tranferirTokens()
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

                const balancePromotor = await instPlatPromoInver.methods.balanceOf(cuentaDestino).call( {from: cuentaPlataforma, gas: 50000});
                document.getElementById("balancePromotorPro").innerHTML = balancePromotor;                 

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
            instPlatPromoInver.methods.transferirTokensParaInversor(cuentaDestino, numeroTokens).send( {from: cuentaPlataforma, gas: 100000}, function(error, result){
                  if(!error){
                      console.log(result);
                                            
                  } else {
                      console.error(error);
                  }
                })
          
                .on('receipt', function(receipt) {

                  if (receipt.events.TokensEmitidos) {

                    var resp = receipt.events.TokensEmitidos; 
                    mostrarMensaje("msgAdministradorPlataforma", "INFO", "Trannsferidos tokens a Inversor");

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
            instPlatPromoInver.methods.transferirTokensParaPromotor(cuentaDestino, numeroTokens).send( {from: cuentaPlataforma, gas: 100000}, function(error, result){
                  if(!error){
                      console.log(result);
                                            
                  } else {
                      console.error(error);
                  }
                })
          
                .on('receipt', function(receipt) {

                  if (receipt.events.TokensEmitidos) {

                    var resp = receipt.events.TokensEmitidos; 
                    mostrarMensaje("msgAdministradorPlataforma", "INFO", "Transferidos tokens a Promotor");

                  } else {
                    mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Tokens NO transferidos a Promotor: El promotor debe estar registrado previamente en la plataforma");
                  }

                });
          } catch (err) {
            console.error("Error: " + err);
            mostrarMensaje("msgAdministradorPlataforma", "ERROR", "Error realizando transferencia a Promotor: " + err);
          }
        }

        //Obtiene todos los promotores de la plataforma.
        async function obtenerPromotores()
        {
          try {      

              instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 50000}, function(error, result){
                  if(!error){
                      console.log(result);

                        $.each(result, function( index, value ) {
                            obtenerPromotorByAddress(index, value);
                        });

                                            
                  } else {
                      console.error(error);
                  }
                });
            

          } catch (err) {
            console.error("Error obteniendo promotores: " + err);
            mostrarMensaje("msgPromotroresMensajes", "ERROR", "Error obteniendo promotores: " + err);
          }
        }

        function obtenerPromotorByAddress(index, cuentaPromotor) {
          try {      

              instPlatPromoInver.methods.consultarPromotor(cuentaPromotor).call( {from: cuentaPlataforma, gas: 50000}, function(error, result){
                  if(!error) {
                      console.log(result);

                      renderRowPromotor(index, cuentaPromotor, result);
                                            
                  } else {
                      console.error(error);
                  }
                });
            

          } catch (err) {
            console.error("Error obteniendo promotor: " + err);
            mostrarMensaje("msgPromotroresMensajes", "ERROR", "Error obteniendo promotor: " + err);
          }          
        }

        function renderRowPromotor (index, cuentaPromotor, datosPromotor) {
          var newRowContent = "<tr><td>"+ datosPromotor.nombre + "</td>" + 
                              "<td>"+datosPromotor.cif+"</td>" +
                              "<td>"+datosPromotor.capacidad+"</td>" +
                              "<td><button id='rowProyectosId" + index +"'>Proyectos</button></td>" +
                              "<td><button id='rowPromoBalanceId" + index +"'>Balance</button></td>" +
                              "<td><button id='rowGetTokensId" + index +"'>Tokens</button></td></tr>";

          $("#tblPromotor tbody").append(newRowContent);

          $('#rowProyectosId' + index).click(function(){ listarProyectosDePromotor(cuentaPromotor, datosPromotor.listadoProyectos, datosPromotor.nombre); return false; });
          $('#rowPromoBalanceId' + index).click(function(){ calculaBalanceOf(cuentaPromotor); return false; });
          $('#rowGetTokensId' + index).click(function(){ selectObtenerTokens('PROMOTOR', cuentaPromotor); return false; });

        }

        function selectObtenerTokens(tipo, cuenta) {
          $('#selectTipoUsuario').val(tipo);
          $('#cuentaDestino').val(cuenta);
        }

        function calculaBalanceOf (cuenta) {
          
          try {      

              instPlatPromoInver.methods.balanceOf(cuenta).call( {from: cuentaPlataforma, gas: 50000}, function(error, result){
                  if(!error) {
                      console.log(result);
                      alert(cuenta + ':' + result + ' VAT');                                          
                  } else {
                      console.error(error);
                  }
                });
            

          } catch (err) {
            console.error("Error obteniendo balance: " + err);
            mostrarMensaje("msgPromotroresMensajes", "ERROR", "Error obteniendo balance: " + err);
          }           

          

        }

        function listarProyectosDePromotor(cuentaPromotor, cuentasProyectos, nombrePromotor) {
         try {      
              $("#promotorSeleccionado").html(":&nbsp;<u>"+ nombrePromotor + "</u>");
              $("#tblProyecto tbody").empty();

              $.each(cuentasProyectos, function( index, value ) {
                  //obtenerPromotorByAddress(index, value);
                  instPlatPromoInver.methods.consultarProyecto(value).call( {from: cuentaPromotor, gas: 50000}, function(error, result){
                      if(!error) {
                          console.log(result);

                          renderRowProyecto(index, cuentaPromotor, value, result);
                                                
                      } else {
                          console.error(error);
                      }
                    });                  
              });

          } catch (err) {
            console.error("Error obteniendo proyectos: " + err);
            mostrarMensaje("msgProyectosMensajes", "ERROR", "Error obteniendo proyectos: " + err);
          }             
        }

        function renderRowProyecto (index, cuentaPromotor, cuentaProyecto, datosProyecto) {
          var newRowContent = "<tr><td>"+ datosProyecto.nombre + "</td>" + 
                              "<td>"+datosProyecto.tokensGoal+"</td>" +
                              "<td>"+datosProyecto.rentabilidad+"</td>" +
                              "<td>"+formateaNumeroAFecha(datosProyecto.fechaInicioFinanciacion)+"</td>" +
                              "<td>"+formateaNumeroAFecha(datosProyecto.fechaFinFinanciacion)+"</td>" +
                              "<td>"+formateaNumeroAFecha(datosProyecto.fechaInicioEjecucion)+"</td>" +
                              "<td>"+formateaNumeroAFecha(datosProyecto.fechaFinEjecucion)+"</td>" +
                              "<td>"+traduceEstado(datosProyecto.estadoProyecto)+"</td>" +    
                              "<td><button id='rowProyectoBalanceId" + index +"'>Balance</button></td>" +
                              "<td><button id='rowInversorId" + index +"'>Inversores</button></td></tr>";
                              

          $("#tblProyecto tbody").append(newRowContent);

          $('#rowInversorId' + index).click(function(){ listarInversoresProyecto(cuentaPromotor, cuentaProyecto, datosProyecto.nombre); return false; });
          $('#rowProyectoBalanceId' + index).click(function(){ calculaBalanceOf(cuentaProyecto); return false; });

        }

        function listarInversoresProyecto(cuentaPromotor, cuentaProyecto, nombreProyecto) {
          
          
         try {      
              $("#tblInversor tbody").empty();
              $("#proyectoSeleccionado").html(":&nbsp;<u>"+ nombreProyecto + "</u>")
              
              //1- Se obtienen los inversores del proyecto
              instPlatPromoInver.methods.listarInversoresProyecto(cuentaPromotor, cuentaProyecto).call( {from: cuentaPlataforma, gas: 50000}, function(error, resultInversores){
                  if(!error) {
                      console.log(resultInversores);

                      //2 - Por cada inversor se obtienen sus datos
                      $.each(resultInversores, function( index, addressInversor ) {

                          instPlatPromoInver.methods.consultarInversor(addressInversor).call( {from: cuentaPlataforma, gas: 50000}, function(error, dataInversor){
                              if(!error) {
                                  console.log(dataInversor);

                                  renderRowInversor(index, addressInversor, dataInversor);
                                                        
                              } else {
                                  console.error(error);
                              }
                            });                  
                      });                      
                                            
                  } else {
                      console.error(error);
                  }
                });  



          } catch (err) {
            console.error("Error obteniendo Inversores: " + err);
            mostrarMensaje("msgInversoresMensajes", "ERROR", "Error obteniendo inversores: " + err);
          }  
        }


        function renderRowInversor (index, cuentaInversor, datosInversor) {
          var newRowContent = "<tr><td>"+ datosInversor.nombre + "</td>" + 
                              "<td>"+datosInversor.cif+"</td>" +   
                              "<td><button id='rowInversorBalanceId" + index +"'>Balance</button></td>" +
                              "<td>"+datosInversor.proyectos+"</td></tr>";
                              

          $("#tblInversor tbody").append(newRowContent);

          $('#rowInversorBalanceId' + index).click(function(){ calculaBalanceOf(cuentaInversor); return false; });

        }
