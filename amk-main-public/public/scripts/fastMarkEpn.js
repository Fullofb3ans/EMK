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
        let special1 = document.querySelector("#special1").checked ? '1' : '';
        let special2 = document.querySelector("#specialА").checked ? 'А' : '';
        let special = special1 + special2;
        let speciali = special ? '-' + special : '';
        let electricity = '';
        if ($("#electroConnSelect").is(':visible')) { $("#vimuElectroConnSelect").val('X'); electricity = $("#electroConnSelect option:selected").val() }
        else if ($("#vimuElectroConnSelect").is(':visible')) { $("#electroConnSelect").val('X'); electricity = $("#vimuElectroConnSelect option:selected").val() }

        document.querySelector("#markMark").innerText =
            'ЭПН' +
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
            electricity + '' + speciali;

        // Исключение IP
        if (document.querySelector("#temperatureSelect").value > 3) {
            $('#temperature1').hide();
        }
        else { $('#temperature1').show() };

        // Исключение питания по блоку
        if (document.querySelector("#blockSelect").value == 'ВЭ') {
            $('#vimuElectroConnSelect').show();
            $('#classForVimuEpn').show();
            $('#electroConnSelect').hide();
            $('#classicConnect').hide();
        }
        else {
            $('#electroConnSelect').show();
            $('#classicConnect').show();
            $('#vimuElectroConnSelect').hide();
            $('#classForVimuEpn').hide();
        }

        // Ислючение 3 каб от исполнения
        if (document.querySelector("#executionSelect").value == 'В') {
            $('#fastcon3').hide();
        }
        else {
            $('#fastcon3').show();
        }

    });

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

        upValue = document.querySelector("#upLimSelect").value;
        uplim = document.querySelector("#upper-limit");
        $(uplim).append($('<option>', {
            value: upValue,
            text: upValue
        }));
        $(uplim).val(upValue);

        vSelect = document.querySelector("#time-limit");
        vValue = document.querySelector("#vSelect").value;
        $(vSelect).append($('<option>', {
            value: vValue,
            text: vValue
        }));
        $(vSelect).val(vValue);

        rotateValue = document.querySelector("#closeVectorSelect").value;
        document.querySelector(`input[type='radio'][name='stroke'][value='${rotateValue}']`).checked = true;
        // $('#step-2').trigger('change')

        flangeSelect = document.querySelector("#flange");
        flangeValue = document.querySelector("#flangeSelect").value;
        $(flangeSelect).append($('<option>', {
            value: flangeValue,
            text: flangeValue
        }));
        $(flangeSelect).val(flangeValue);
        $('#step-2').trigger('change');

        buValue = document.querySelector("#blockSelect").value;
        buSelect = document.querySelector("#controle-blocks-series");
        $(buSelect).val(buValue);
        $('#controle-blocks-series').trigger('change')
        $('#step-3').trigger('change');

        voltType = document.querySelector("#powerType");
        voltValue = $("#conTupeSelect option:selected").text();
        $(voltType).append($('<option>', {
            value: voltValue,
            text: voltValue
        }));
        $(voltType).val(voltValue);
        $('#step-4').trigger('change');

        tempValue = document.querySelector("#temperatureSelect").value;
        tempSelect = document.querySelector("#climatic-modification");
        tempSelect.value = tempValue;
        $('#step-5').trigger('change');


        protectionValue = document.querySelector("#protectionSelect").value;
        document.querySelector(`input[type='radio'][name='protection'][value='${protectionValue}']`).checked = true;
        $('#step-6').trigger('change');

        colorValue = document.querySelector("#colorSelect").value;
        document.querySelector(`input[type='radio'][name='color'][value='${colorValue}']`).checked = true;
        $(colorType).trigger('change');

        if ($("#electroConnSelect").val() !== null) { document.querySelector(`input[type='radio'][name='connection'][value='${$("#electroConnSelect").val()}']`).checked = true; }
        else if ($("#vimuElectroConnSelect").val() !== null) { document.querySelector(`input[type='radio'][id='connectionForepn-${$("#vimuElectroConnSelect").val()}']`).checked = true; }

        $('#step-7').trigger('change');

        document.querySelector("#special1").checked ? document.querySelector("#specialForEpn-1").checked = true : '';
        document.querySelector("#specialА").checked ? document.querySelector("#specialForEpn-А").checked = true : '';
        $('#step-8').trigger('change');

        $(document).trigger('change');

        SchemeSelectCreate();
    })

    const cheme_img = {
        epn: {
            0: 'epn0.png',
            1: 'epn1_11.png',
            2: 'epn2.png',
            11: 'epn1_11.png',
            12: 'epn12.png',
            3: 'epn3_31.png',
            31: 'epn3_31.png',
            32: 'epn32.png',
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
                a: ['ЭПН', execution]

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
                a: ['ЭПН', execution, flange],
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
                a: ['ЭПН', execution, flange, upLim],
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
                a: ['ЭПН', execution, flange, upLim, v],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                $.each(fetchResult[0], function (key, item) {
                    if (item.includes('3 фазы') || item.includes('3 фаз(а/ы)')) {
                        $(select).append(new Option(item, '3'));
                    }
                    else if (item.includes('1 фаз(а/ы)')) {
                        $(select).append(new Option(item, '1'));
                    }
                    else {
                        $(select).append(new Option(item, '6'));
                    }
                });
            });
    }

    function SchemeSelectCreate() {
        let execution = document.querySelector("#executionSelect").value;
        let upLim = document.getElementById('upLimSelect').value;
        let flange = document.getElementById('flangeSelect').value;
        let v = document.querySelector("#vSelect").value;
        let conTupe = $("#conTupeSelect option:selected").text();
        let conForFetch = '';

        if (conTupe == '380 В 3 фазы') {
            conForFetch = ['380', '3'];
        }
        else if (conTupe == '220 В 3 фаз(а/ы)') {
            conForFetch = ['220', '3'];
        }
        else if (conTupe == '220 В 1 фаз(а/ы)') {
            conForFetch = ['220', '1'];
        }
        else if (conTupe == '24 В') {
            conForFetch = ['24', ''];
        }

        $('#constructive-scheme-wrap').empty();
        $('#constructive-scheme-img').empty();

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭПН', execution, flange, upLim, v, conForFetch],
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
                                src: './img/' + cheme_img['epn'][item],
                                class: 'img-fluid',
                            })
                        );
                    $('#schemeFieldSet').trigger('change');
                });
            });
    }
});



