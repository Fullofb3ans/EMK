// ЗАПОЛНЕНИЕ НОМИНАЛЬНОГО КРУТЯЩЕГО МОМЕНТА С JSON
$(document).ready(function (e) {
    const ruCollator = new Intl.Collator('ru-RU');
    getRn();

    // $('#haveMarkBut').on('click', function () {
    function getRn() {
        let select = document.getElementById('rnFastSelect');
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Редуктор</option>';
        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4РН']

            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => ruCollator.compare(a, b));
                // fetchResult[0].sort();
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                });
            });
    }
    //     getRn();
    // })
    $('#executionSelect').on('change', function () {
        flange();
    });
    $('#flangeSelect').on('change', function () {
        upLimSelect();
    });

    $('#upLimSelect').on('change', function () {
        vSelectCreate();
    });
    $('#vSelect').on('change', function () {
        timeTo90();
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
            $("#electroConnSelect option:selected").val() + '' + speciali + '/' + $("#rnFastSelect option:selected").val();

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
        $('#step-1, #step-2,#step-3,#step-4,#step-5,#step-6,#step-7,#step-8').show()

        $('#markModal').hide();

        $('#rn').val($('#rnFastSelect').val());
        $('#rn').trigger('change');

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
        $(uplim).append($('<option>', {
            value: upValue,
            text: upValue
        }));
        $(uplim).val(upValue);

        vSelect = document.querySelector("#rotation-frequency");
        vValue = document.querySelector("#vSelect").value;
        $(vSelect).append($('<option>', {
            value: vValue,
            text: vValue
        }));
        $(vSelect).val(vValue);
        $('#step-2').trigger('change')

        flangeSelect = document.querySelector("#flange");
        flangeValue = document.querySelector("#flangeSelect").value;
        $(flangeSelect).append($('<option>', {
            value: flangeValue,
            text: flangeValue
        }));
        $(flangeSelect).val(flangeValue);

        buValue = document.querySelector("#blockSelect").value;
        buSelect = document.querySelector("#controle-blocks-series");
        $(buSelect).val(buValue);
        $('#controle-blocks-series').trigger('change')
        $('#controle-blocks-series').trigger('click')
        $('#step-3').trigger('change');

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
        buSelect = document.querySelector("#step-5");
        buSelect.scrollIntoView({ block: "center", behavior: "smooth" });
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
        let rn = document.querySelector("#rnFastSelect").value;
        let select = document.getElementById('flangeSelect');
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Фланец</option>';
        let execution = document.querySelector("#executionSelect").value;
        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4РН', rn, execution]

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
        let rn = document.querySelector("#rnFastSelect").value;
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
                a: ['ЭП4РН', rn, execution, flange],
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

    function vSelectCreate() {
        let rn = document.querySelector("#rnFastSelect").value;
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
                a: ['ЭП4РН', rn, execution, flange, upLim],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(Number(item)), (Number(item)));
                });
            });
    }

    function timeTo90() {
        let rn = document.querySelector("#rnFastSelect").value;
        let execution = document.querySelector("#executionSelect").value;
        let flange = document.getElementById('flangeSelect').value;
        let upLim = document.getElementById('upLimSelect').value;
        let v = document.querySelector("#vSelect").value;
        let select = $('#turnTime');

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4РН', rn, execution, flange, upLim, v],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                    if (fetchResult[0].length == 1) {
                        select.selectedIndex = 1;
                        $("#turnTime").trigger('change');
                    };
                });
            });
    }

    function SchemeSelectCreate() {
        let rn = document.querySelector("#rnFastSelect").value;
        let execution = document.querySelector("#executionSelect").value;
        let upLim = document.getElementById('upLimSelect').value;
        let flange = document.getElementById('flangeSelect').value;
        let v = document.querySelector("#vSelect").value;
        let turnTime = $('#turnTime').val();
        // let conTupe = document.querySelector("#conTupeSelect").value;
        $('#constructive-scheme-wrap').empty();
        $('#constructive-scheme-img').empty();

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4РН', rn, execution, flange, upLim, v, turnTime],
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



