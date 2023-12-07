// ЗАПОЛНЕНИЕ НОМИНАЛЬНОГО КРУТЯЩЕГО МОМЕНТА С JSON
$(document).ready(function (e) {
    const ruCollator = new Intl.Collator('ru-RU');

    $('#executionSelect').on('change', function () {
        flange();
    });
    $('#flangeSelect').on('change', function () {
        upLimSelect();
    });

    $('#upLimSelect').on('change', function () {
        vSelect();
    });

    $('#vSelect').on('change', function () {
        valTypeSelect();
    });

    $('#haveMarkBut').on('click', function (e) {
        $('#markModal').show();
    })
    $('#closeSub').on('click', function (e) {
        $('#markModal').hide();
    })

    $('#markModal').on('change', function (e) {
        let special1 = document.querySelector("#kspecial").checked ? 'К' : '';
        let special2 = document.querySelector("#vspecial").checked ? 'В' : '';
        let special3 = document.querySelector("#especial").checked ? 'Э' : '';
        let special4 = document.querySelector("#tspecial").checked ? 'Т' : '';
        let special5 = document.querySelector("#pspecial").checked ? 'П' : '';
        let special = special1 + special2 + special3 + special4 + special5;
        let speciali = special ? '-' + special : '';

        document.querySelector("#markMark").innerText =
            'ЭП4' +
            $("#rezhimSelect option:selected").val() + '' +
            $("#executionSelect option:selected").val() + '-' +
            $("#flangeSelect option:selected").val() + '-' +
            $("#upLimSelect option:selected").val() + '-' +
            $("#vSelect option:selected").val() + '-' +
            $("#blockSelect option:selected").val() + '-' +
            $("#temperatureSelect option:selected").val() + '-' +
            $("#conTupeSelect option:selected").val() + '' +
            $("#closeVectorSelect option:selected").val() + '' +
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
        if (document.querySelector("#markMark").innerText.includes('X')) {
            return alert('Пропущены поля в маркировке');
        }
        $('#markModal').hide();
        rezValue = document.querySelector("#rezhimSelect").value;
        document.querySelector(`input[type='radio'][name='working-mode'][value='${rezValue}']`).checked = true;
        $('.timeMode').trigger('change');

        execValue = document.querySelector("#executionSelect").value;
        document.querySelector(`input[type='radio'][name='execution'][value='${execValue}']`).checked = true;
        $('#step-1').trigger('change')

        conTupeValue = document.querySelector("#conTupeSelect").value;
        document.querySelector(`input[type='radio'][name='connection-type'][value='${conTupeValue}']`).checked = true;

        upValue = document.querySelector("#upLimSelect").value;
        uplim = document.querySelector("#upper-limit");
        uplim.innerHTML = `<option value=${upValue} disabled selected>${upValue}</option>`;
        $('#step-2').trigger('change')

        vValue = document.querySelector("#vSelect").value;
        vSelect = document.querySelector("#rotation-frequency");
        vSelect.innerHTML = `<option value=${vValue} disabled selected>${vValue}</option>`;
        $('#step-3').trigger('change')

        flangeValue = document.querySelector("#flangeSelect").value;
        flangeSelect = document.querySelector("#flange");
        flangeSelect.innerHTML = `<option value=${flangeValue} disabled selected>${flangeValue}</option>`;

        buValue = document.querySelector("#blockSelect").value;
        buSelect = document.querySelector("#controle-blocks-series");
        $(buSelect).val(buValue);
        $('#control-block-fieldset').trigger('change');
        $('#controle-blocks-series').trigger('click');

        $('#step-4').trigger('change');

        tempValue = document.querySelector("#temperatureSelect").value;
        tempSelect = document.querySelector("#climatic-modification");
        tempSelect.value = tempValue;
        $('#step-5').trigger('change');

        rotatingValue = document.querySelector("#closeVectorSelect").value;
        document.querySelector(`input[type='radio'][name='rotating'][value='${rotatingValue}']`).checked = true;

        protectionValue = document.querySelector("#protectionSelect").value;
        document.querySelector(`input[type='radio'][name='protection'][value='${protectionValue}']`).checked = true;
        $('#step-6').trigger('change');

        colorValue = document.querySelector("#colorSelect").value;
        document.querySelector(`input[type='radio'][name='color'][value='${colorValue}']`).checked = true;
        $(colorType).trigger('change');

        connectionValue = document.querySelector("#electroConnSelect").value;
        document.querySelector(`input[type='radio'][name='connectionForEp4'][value='${connectionValue}']`).checked = true;
        $('#step-7').trigger('change');

        document.querySelector("#kspecial").checked ? document.querySelector("#special-2").checked = true : '';
        document.querySelector("#vspecial").checked ? document.querySelector("#special-3").checked = true : '';
        document.querySelector("#especial").checked ? document.querySelector("#special-4").checked = true : '';
        document.querySelector("#tspecial").checked ? document.querySelector("#special-5").checked = true : '';
        document.querySelector("#pspecial").checked ? document.querySelector("#special-6").checked = true : '';
        $('#step-8').trigger('change');

        $(document).trigger('change');
        if (buValue != 'Э0') {
            buSelect = document.querySelector("#step-5");
            buSelect.scrollIntoView({ block: "center", behavior: "smooth" });
        }
        SchemeSelectCreate();
    })

    const cheme_img = {
        ep4: {
            40: 'ep4-scheme-40.png',
            41: 'ep4-scheme-41.png',
            410: 'ep4-scheme-410.png',
            43: 'ep4-scheme-43.png',
            430: 'ep4-scheme-430.png',
            44: 'ep4-scheme-44.png',
        },
    };

    function flange() {
        let select = document.getElementById('flangeSelect');
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Фланец</option>';
        let execution = document.querySelector("#executionSelect").value;
        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution]

            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => ruCollator.compare(a, b));
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                });
            });
    }

    function upLimSelect() {

        let select = document.getElementById('upLimSelect');
        let execution = document.querySelector("#executionSelect").value;
        let flange = document.getElementById('flangeSelect').value;
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Предел</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, flange],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                });
            });
    }

    function vSelect() {
        let execution = document.querySelector("#executionSelect").value;
        let upLim = document.getElementById('upLimSelect').value;
        let flange = document.getElementById('flangeSelect').value;
        select = document.querySelector("#vSelect");
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Частота</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, flange, upLim],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(Number(item), Number(item)));
                });
            });
    }
    function valTypeSelect() {
        let execution = document.querySelector("#executionSelect").value;
        let upLim = document.getElementById('upLimSelect').value;
        let flange = document.getElementById('flangeSelect').value;
        let v = document.querySelector("#vSelect").value;
        select = document.querySelector("#conTupeSelect");
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Тип вала</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, flange, upLim, v],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                });
            });
    }

    function SchemeSelectCreate() {
        let execution = document.querySelector("#executionSelect").value;
        let upLim = document.getElementById('upLimSelect').value;
        let flange = document.getElementById('flangeSelect').value;
        let v = document.querySelector("#vSelect").value;
        let conTupe = document.querySelector("#conTupeSelect").value;
        $('#constructive-scheme-wrap').empty();
        $('#constructive-scheme-img').empty();

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, flange, upLim, v, conTupe],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $('#constructive-scheme-wrap').append(
                        $('<div>')
                            .prop({ class: 'form-check' })
                            .append(
                                $('<input>').prop({
                                    type: 'radio',
                                    id: 'scheme-' + item,
                                    name: 'constructive-scheme',
                                    value: item,
                                    class: 'form-check-input ch-mark',
                                    checked: true
                                })
                            )
                            .append(
                                $('<label>')
                                    .prop({
                                        for: 'scheme-' + item,
                                        class: 'form-check-label',
                                    })
                                    .text(' Конструктивная схема ' + item)
                            )
                    );
                    $('#constructive-scheme-img')
                        .empty()
                        .append(
                            $('<img>').prop({
                                src: './img/' + cheme_img['ep4'][item],
                                class: 'img-fluid',
                            })
                        );
                });
            });
    }
});



