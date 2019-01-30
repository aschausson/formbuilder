
jQuery($ => {
    document.getElementById('cargar').addEventListener('click', function () {
        cargaJson();
    });


    $('.fb-render').submit(function (event) {
        console.log('submit');
        //   event.preventDefault();
    });

    $('#mostrarjson').on('click', function(){
        if ($('#codigo').is(":visible")){
            $('#codigo').hide();
        }
        else{
            $('#codigo').show();
        }
    });

    $('#formresultado').on('click', function(){
        const resultado = document.getElementById("resultado");
        stringresultado = JSON.stringify($('form').serializeArray());
        stringresultado = stringresultado.replaceAll('{', '\n{')
        resultado.innerText = stringresultado;
        console.log($('form').serializeArray());
    });

});

function cargaJson() {
    var json = localStorage.getItem('testForm');
    muestraJson(json);

    logicaFormularios();
}





function muestraJson(json) {
    const code = document.getElementById("codigo");
    code.innerText = json;

    const formData = json;

    //'[{"type":"textarea","label":"Text Area","className":"form-control","name":"textarea-1492616908223","subtype":"textarea"},{"type":"select","label":"Select","className":"form-control","name":"select-1492616913781","values":[{"label":"Option 1","value":"option-1","selected":true},{"label":"Option 2","value":"option-2"},{"label":"Option 3","value":"option-3"}]},{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1492616915392","values":[{"label":"Option 1","value":"option-1","selected":true}]}]';
    // const addLineBreaks = html => html.replace(new RegExp("><", "g"), ">\n<");

    // Grab markup and escape it
    const $form = $("#formulario");
    $form.formRender({ formData });

}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};