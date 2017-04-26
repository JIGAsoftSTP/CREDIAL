/**
 * Created by ahmedjorge on 4/23/17.
 */

var gestClient = {
    idClientSeleted : undefined,
    valor_perquisa_credito : "",
    total_credito_cliente : undefined,
    more_information_about_client: function () {
        regUserActivity( "./bean/activity.php", -1, "Selecionou mais informações sobre crédito do(a) cliente com NIF: " + this.idClientSeleted, -1, LevelActivity.VISUALIZACAO );

        $( "#inf-cli-ano" ).text( "Cliente desde " + clienteShortData[ "DATA REGISTRO" ] + ((Number( clienteShortData[ "IDADE NA EMPRESA" ] ) > 1) ? " - Há " + clienteShortData[ "IDADE NA EMPRESA" ] + " Anos" : "" ) );
        $( "#inf-cred-porPa" ).text( clienteShortData[ "POR PAGAR" ] );
        $( "#inf-cred-Pagos" ).text( clienteShortData[ "PAGOS" ] );
        $( "#inf-cred-total" ).text( clienteShortData[ "TOTAL CREDITO" ] );

        $( "#inf-cred-val-Pedido" ).text( "$ " + clienteShortData[ "MONTANTE TOTAL SOLICITADO" ] );
        $( "#inf-cred-val-porPagar" ).text( "$ " + clienteShortData[ "MONTANTE TOTAL POR PAGAR" ] );
        $( "#inf-cred-val-amorti" ).text( "$ " + clienteShortData[ "MONTANTE TOTAL AMORTIZAR" ] );
        $( "#inf-cred-val-pago" ).text( "$ " + clienteShortData[ "MONTANTE TOTAL PAGO" ] );

        var lastName = clienteData[ 'SURNAME' ].split( " " );
        $( "#inf-cli-name" ).html( '<i class="icon-user-tie"></i>' + clienteData[ 'NAME' ] + " " + lastName[ lastName.length - 1 ] );
        $( "#inf-cli-career" ).text( clienteData[ "PROFISAO" ] );

        $( "#inf-cli-salario" ).text( ((listCredito[ "CLIENTE SALARIO" ] === null) ? "Indisponivel" : clienteData[ "CLIENTE SALARIO" ]) );

        setTimeout(function () {
            $('.history-selected').toggleClass('show');
        }, 700);
    },
    listPrestacao: [],
    iPrestacao: undefined,
    idCredSeleted: undefined,
    loadCreditoCliente: function ( _idCreito, jk, _asClassShow ) {
        this.iPrestacao = jk;
        this.idCredSeleted = _idCreito;
        if ( !_asClassShow ) {
            this.listPrestacao = this.get_pestacao_to_bd(_idCreito);
            var pre = new Prestacao();
            for ( var h = 0; h < this.listPrestacao.length; h++ ) {
                pre.id = this.listPrestacao[ h ][ "ID" ];
                pre.i = h;
                pre.reembolso( this.listPrestacao[ h ][ "REEMBOLSO" ] )
                    .prestacaoPaga( this.listPrestacao[ h ][ "PRESTACAO PAGA" ] )
                    .estado( this.listPrestacao[ h ][ "STATE" ] )
                    .dataEndosse( (this.listPrestacao[ h ][ "DATA ENDOSSADO" ] === null) ? " ---------------- " : this.listPrestacao[ h ][ "DATA ENDOSSADO" ] )
                    .dataEmissao( this.listPrestacao[ h ][ "DATA EMISAO" ] )
                    .addAmortizacao();
            }
            $( "#list-prestacao-" + _idCreito ).html( pre.getListAmortiza() );
        }
        else {
            $( "#list-prestacao-" + _idCreito ).empty();
        }
    },
    get_pestacao_to_bd : function(credito_id){
        var lista_prestacao = [];
        $.ajax( {
            url: "./bean/cliente.php",
            type: "POST",
            data: { "intensao": "loadPrestacaoCreditoClient", credito_id: credito_id },
            dataType: "json",
            async: false,
            success: function ( e ) {
                lista_prestacao = e.lista_prestacao;
            },
            beforeSend: function () { $(".mp-loading").fadeIn(); },
            complete: function () { $(".mp-loading").fadeOut(); }
        } );
        return lista_prestacao;
    },
    showDataCliente: function () {
        regUserActivity( "./bean/activity.php", clienteData[ "NIF" ], "Visualizou dados do(a) cliente " + clienteData[ "NAME" ] + " " + clienteData[ "SURNAME" ], -1, LevelActivity.VISUALIZACAO );

        $( "#inf-cli-geral-nif" ).text( clienteData[ "NIF" ] );
        $( "#inf-cli-geral-nome" ).text( clienteData[ "NAME" ] + " " + clienteData[ "SURNAME" ] );
        $( "#inf-cli-geral-dataNasc" ).text( clienteData[ "DATA NASCIMENTO" ] );
        $( "#inf-cli-geral-sexo" ).text( clienteData[ "SEXO" ] );
        $( "#inf-cli-geral-estadoCivil" ).text( clienteData[ "ESTADO CIVIL" ] );
        $( "#inf-cli-geral-morada" ).text( clienteData[ "MORADA" ] );

        $( "#inf-cli-geral-prof" ).text( clienteData[ "PROFISAO" ] );
        $( "#inf-cli-geral-salario" ).text( clienteData[ "CLIENTE SALARIO" ] );
        $( "#inf-cli-geral-lacali" ).text( clienteData[ "LOCALIDADE" ] );
        $( "#inf-cli-geral-localTrab" ).text( clienteData[ "LOCAL TRABALHA" ] );

        $( "#inf-cli-geral-telemo" ).text( clienteData[ "TELE MOVEL" ] );
        $( "#inf-cli-geral-telefo" ).text( clienteData[ "TELE FIXO" ] );
        $( "#inf-cli-geral-telSer" ).text( clienteData[ "TELE SERVICO" ] );
        $( "#inf-cli-geral-email" ).text( clienteData[ "MAIL" ] );

        $( "#inf-cli-geral-ano" ).text( clienteData[ "TRADOSSIER ANO" ] );
        $( "#inf-cli-geral-mes" ).text( clienteData[ "TRADOSSIER MES" ] );
        $( "#inf-cli-geral-letra" ).text( clienteData[ "TRADOSSIER LETRA" ] );
        $( "#inf-cli-geral-capa" ).text( clienteData[ "TRADOSSIER NUMERO DE CAPA" ] );
    },
    total_add : 0,
    credito_i : 0,
    listCreditoCliente: function () {
        var listaAmortizacao = $( "#cred-list-amort" );
        var add =0;
        for ( var jk = this.credito_i; jk < listCredito.length && add < this.total_add;  jk++ ) {
            if ( this.filter_credito_by_type === listCredito[ jk ][ "STATE COD" ] || this.filter_credito_by_type === "-1" ) {
                var bluider = new PrestacaoBluider();
                bluider.id = listCredito[ jk ][ "ID" ];
                bluider.idState = Number( listCredito[ jk ][ "STATE COD" ] );
                bluider.nunDossierCredito = listCredito[ jk ][ "DOSSIER" ];
                bluider.nunCheckCredito = listCredito[ jk ][ "CHEQUE USADO" ];
                bluider.dataInicioCredito = listCredito[ jk ][ "DATA INICIO" ];
                bluider.dataFimCredito = listCredito[ jk ][ "DATA FIM" ];
                bluider.dataCNTCredito = listCredito[ jk ][ "DATA FINALIZAR" ];
                bluider.penalidadeCretido = listCredito[ jk ][ "TAEG" ];
                bluider.capitalInicialCredito = listCredito[ jk ][ "CAPITAL INICIAL" ];
                bluider.totalEfetivoCredido = listCredito[ jk ][ "VALOR PAGO" ];
                bluider.totalCreditoAPagar = listCredito[ jk ][ "TOTAL CREDITO" ];
                bluider.numero_prestacao = Number(listCredito[ jk ].totalpagamento);
                bluider.tota_em_pagamento = Number(listCredito[ jk ].totalempagamento);
                bluider.bluider( jk );

                listaAmortizacao.append( bluider.credito );
                tableEstructure( $( "#table-amortizacao-" + bluider.id ) );
                this.credito_i = jk+1;
                add++;
            }
        }

    },
    load_all_credito : function (  ) {
        $.ajax( {
            url: "./bean/cliente.php",
            type: "POST",
            data: { "intensao": "loadCreditoClient", nifCliente: gestClient.idClientSeleted , pesquisa : gestClient.valor_perquisa_credito   },
            dataType: "json",
            success: function ( e ) {
                $( "#cred-list-amort" ).empty();
                listCredito = e.lista_credito;
                gestClient.total_add = 10;
                gestClient.credito_i = 0;
                gestClient.listCreditoCliente();
            },
            beforeSend: function () { $(".mp-loading").fadeIn(); },
            complete: function () { $(".mp-loading").fadeOut(); }
        });
    },
    filter_credito_by_type : "-1"
};

$(".history-selected").scroll(function (  ) {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        gestClient.listCreditoCliente()
    }
});