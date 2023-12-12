// ЗАПОЛНЕНИЕ НОМИНАЛЬНОГО КРУТЯЩЕГО МОМЕНТА С JSON
$(document).ready(function (e) {
    const ruCollator = new Intl.Collator('ru-RU');

    $('#markModal').on('change', function (e) {
        let special1 = document.querySelector("#kspecial").checked ? 'К' : '';
        let special2 = document.querySelector("#especial").checked ? 'Э' : '';
        let special = special1 + special2;
        let speciali = special ? '-' + special : '';

        document.querySelector("#markMark").innerText =
            'ВИМУ' +
            $("#executionSelect option:selected").val() + '-' +
            $("#flangeSelect option:selected").val() + '-' +
            $("#upLimSelect option:selected").val() + '-' +
            $("#blockSelect option:selected").val() +
            $("#BlockOptions option:selected").val() + '-' +
            $("#temperatureSelect option:selected").val() + '' +
            $("#protectionSelect option:selected").val() + '' +
            $("#colorSelect option:selected").val() + '' +
            $("#electroConnSelect option:selected").val() + '' + speciali;

        // Исключение IP
        if (document.querySelector("#temperatureSelect").value > 3) {
            $('#temperature1').hide();
        }
        else { $('#temperature1').show() };
    })

    $('#markSub').on('click', function (e) {
        // if (document.querySelector("#markMark").innerText.includes('X')) {
        //     return alert('Пропущены поля в маркировке');
        // }
        $('#step-1, #step-2,#step-3,#step-4,#step-5,#step-6,#step-7,#step-8').show()

        $('#markModal').hide();
        execValue = document.querySelector("#executionSelect").value;
        document.querySelector(`input[type='radio'][name='execution'][value='${execValue}']`).checked = true;

        flangeValue = document.querySelector("#flangeSelect").value;
        document.querySelector(`input[type='radio'][name='roundControl'][value='${flangeValue}']`).checked = true;
        $('#step-1').trigger('change')
        $('#roundControl').trigger('change')

        upLimSelect = document.querySelector("#upLimSelect").value;
        document.querySelector(`input[type='radio'][name='engineStartType'][value='${upLimSelect}']`).checked = true;

        buValue = document.querySelector("#blockSelect").value;
        $(`#${buValue}`).trigger('click');
        $("#e1-submit").trigger('click');

        fastBlockOpt = document.querySelector("#BlockOptions").value;
        blockOpt = document.querySelector("#controle-blocks-options");
        blockOpt.value = fastBlockOpt;

        $('#controle-blocks-options').trigger('change');
        $('#step-2').trigger('change');
        tempValue = document.querySelector("#temperatureSelect").value;
        tempSelect = document.querySelector("#climatic-modification");
        tempSelect.value = tempValue;

        protectionValue = document.querySelector("#protectionSelect").value;
        document.querySelector(`input[type='radio'][name='protection'][value='${protectionValue}']`).checked = true;
        $('#step-3').trigger('change');

        colorValue = document.querySelector("#colorSelect").value;
        document.querySelector(`input[type='radio'][name='color'][value='${colorValue}']`).checked = true;
        $(colorType).trigger('change');

        connectionValue = document.querySelector("#electroConnSelect").value;
        document.querySelector(`input[type='radio'][name='connectionForVimu'][value='${connectionValue}']`).checked = true;
        $('#step-4').trigger('change');

        document.querySelector("#kspecial").checked ? document.querySelector("#specialForVimu-К").checked = true : '';
        document.querySelector("#especial").checked ? document.querySelector("#specialForVimu-Э").checked = true : '';
        if (!document.querySelector("#kspecial").checked && !document.querySelector("#especial").checked) {
            document.querySelector("#specialForVimu-").checked = true;
        }
        $('#step-5').trigger('change');
        $('#step-6').trigger('change');
        $('#step-7').trigger('change');
        $('#step-8').trigger('change');

        document.querySelector('#control-block-optionssetCheckBox').scrollIntoView({ block: "center", behavior: "smooth" });
    })

    $('#haveMarkBut').on('click', function (e) {
        $('#markModal').show();
    })
    $('#closeSub').on('click', function (e) {
        $('#markModal').hide();
    })
});



