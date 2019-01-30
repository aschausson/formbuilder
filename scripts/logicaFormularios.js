
function logicaFormularios() {

    $(".inputNumero").inputFilter(function (value) {
        return /^\d*$/.test(value);
    });

    logicaDeshabilitarOcultar();

    prepararRepetir();
}


function logicaDeshabilitarOcultar() {
    $("[class*='deshabilitado_']").each(function () {
        elementoDeshabilitar(this);
    });

    $("[class*='oculto_']").each(function () {
        elementoOcultar(this);
    });
}


function elementoDeshabilitar(elemento) {
    var listaClases = $(elemento).attr('class').split(/\s+/);
    listaClases.forEach(function (clase) {
        var padreCondicion = getPadreCondicion(clase);
        if (padreCondicion != null) {
            escucharPadreCondicion(padreCondicion);
            var valorCondicion = getValorCondicion(clase);
            var valorChecked = $('.' + padreCondicion + ':checked').val();

            if ((valorChecked + '').localeCompare(valorCondicion) == 0) {
                elemento.disabled = false;
            }
            else {
                $(elemento).val('');
                elemento.disabled = true;
            }
        }
    });
}


function elementoOcultar(elemento) {
    var listaClases = $(elemento).attr('class').split(/\s+/);
    listaClases.forEach(function (clase) {
        var padreCondicion = getPadreCondicion(clase);
        escucharPadreCondicion(padreCondicion);
        var valorCondicion = getValorCondicion(clase);
        var valorInput = $('.' + padreCondicion).val();

        if (parseInt(valorInput) >= parseInt(valorCondicion)) {
            $(elemento).parent().show();
            elemento.disabled = false;
        }
        else {
            $(elemento).val('');
            $(elemento).parent().hide();
            elemento.disabled = true;
        }
    });
}


function prepararRepetir() {
    var mapeoRepetir = {};
    crearAgrupacion(mapeoRepetir);

    for (let key in mapeoRepetir) {
        if (mapeoRepetir.hasOwnProperty(key)) {
            $('.' + key).on('input', function () {
                let repeticionesAntes = $(this).siblings('.card').length;
                let repeticionesDespues = $(this).val();
                
                if (($.isNumeric(repeticionesAntes)) && ($.isNumeric(parseInt(repeticionesDespues)))){
                    repetir(key, mapeoRepetir, repeticionesAntes, parseInt(repeticionesDespues));
                }
            });
        }
    }
}


function repetir(key, mapeoRepetir, repeticionesAntes, repeticionesDespues) {
    if (repeticionesAntes < repeticionesDespues){
        for (let i = repeticionesAntes; i < repeticionesDespues; i++) {
            $('.' + key).parent().append(mapeoRepetir[key].clone());
        }
    }

    if (repeticionesDespues < repeticionesAntes){
        
        var eliminar = repeticionesAntes - repeticionesDespues;
        for (let i = 0; i < eliminar; i++) {
            $('.' + key).siblings().last().remove();
        }
    }
}


function crearAgrupacion(mapeoRepetir) {
    var clasesUnicas = [];
    var clasesPadre = [];
    var listaElementosRepetir = $("[class*='repetir_']");
    listaElementosRepetir.each(function () {
        var listaClases = $(this).attr('class').split(/\s+/);
        listaClases.forEach(function (clase) {
            var nuevaClase = getPadreCondicion(clase);
            if (nuevaClase != null) {
                clasesPadre.push(getPadreCondicion(clase));
            }
        });
    });

    $.each(clasesPadre, function (i, el) {
        if ($.inArray(el, clasesUnicas) === -1) clasesUnicas.push(el);
    });

    clasesUnicas.forEach(function (clase) {
        listaElementosRepetir = $("[class$='_" + clase + "']");

        var card = $('<div class="card"></div>');
        var cardCabecera = $('<div class="card-header"></div>');
        var cardCuerpo = $('<div class="card-body"></div>');

        cardCuerpo.append(listaElementosRepetir.parent());
        cardCabecera.append($('<span>Repetición</span>'));
        //card.append(cardCabecera);
        card.append(cardCuerpo);

        mapeoRepetir[clase] = card.clone();
    });
}


function escucharPadreCondicion(padreCondicion) {
    if (!$('.' + padreCondicion).hasClass('escuchando')) {

        if ($('.' + padreCondicion).is('input')) {
            $('.' + padreCondicion).on('input', function () {
                $('.' + padreCondicion).addClass('escuchando');
                logicaDeshabilitarOcultar();
            });
        }
        else {
            $('.' + padreCondicion).change(function () {
                $('.' + padreCondicion).addClass('escuchando');
                logicaDeshabilitarOcultar();
            });
        }
    }
}


function getPadreCondicion(nombre) {
    var trozos = nombre.split('_');
    return trozos[1];
}

function getValorCondicion(nombre) {
    var trozos = nombre.split('_');
    return trozos[2];
}


(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));