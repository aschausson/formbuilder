jQuery(function ($) {

    var fbEditor = document.getElementById('build-wrap');

    var fields = [{
        "type": "starRating",
        "label": "Rating",
        "name": "star-1492424082853",
        icon: '🌟'
    },
    {
        "type": "separador",
        "label": "Separador",
        "name": "separador",
        icon: '⊱⊰'
    }
    ];

    var templates = {
        starRating: function (fieldData) {
            return {
                field: '<span id="' + fieldData.name + '">',
                onRender: function () {
                    $(document.getElementById(fieldData.name)).rateYo({
                        rating: 3.6
                    });
                }
            };
        },
        separador: function (fieldData) {
            return {
                
            }
        }
    };


    var formBuilder = $(fbEditor).formBuilder(fields, templates);

    formBuilder.promise.then(function (fb) {
        formBuilder.actions.setLang('es-ES');
    });



    document.getElementById('guardar').addEventListener('click', function () {
        save(formBuilder);
    });


    document.getElementById('cargar').addEventListener('click', function () {
        load(formBuilder);
    });
});






function save(formBuilder) {
    var json = formBuilder.actions.getData('json', true)

    //crear un elemento de link HTML temporal (soportan nombre de archivo)
    var a = document.createElement('a');
    //var table_div = document.getElementById('participantsTable');
    var dataStr = "data:text/json;charset=utf-8," + json
    a.href = dataStr;
    //creando el nombre del archivo
    a.download = 'formulario.json';
    a.click();

    localStorage.setItem('testForm', json);
}




function load(formBuilder) {
    var data = $('#areaCargar').val();
    formBuilder.actions.setData(data);
}