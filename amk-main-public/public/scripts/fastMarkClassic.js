// ЗАПОЛНЕНИЕ НОМИНАЛЬНОГО КРУТЯЩЕГО МОМЕНТА С JSON
$(document).ready(function (e) {
    const ruCollator = new Intl.Collator('ru-RU');

    $('#modeDiv').show()

    $('#executionSelect').on('change', function () {
        typeSelect();
    });
    $('#typeSelect').on('change', function () {
        upgrSelect();
    });

    $('#upgrSelect').on('change', function () {
        numSelect();
    });

    $('#haveMarkBut').on('click', function (e) {
        $('#markModal').show();
    })
    $('#closeSub').on('click', function (e) {
        $('#markModal').hide();
    })

    $('#markModal').on('change', function (e) {
        let special1 = document.querySelector("#rspecial").checked ? 'Р' : '';
        let special2 = document.querySelector("#microspecial").checked ? 'DC' : '';
        let special3 = document.querySelector("#lspecial").checked ? 'Л' : '';
        let special = special1 + special2 + special3;
        let speciali = special ? '-' + special : '';
        let upgr = $("#upgrSelect option:selected").val() == '0' ? '' : $("#upgrSelect option:selected").val();

        document.querySelector("#markMark").innerText =
            $("#executionSelect option:selected").val() + '-' +
            $("#typeSelect option:selected").val() +
            upgr + '-' +
            $("#numSelect option:selected").val() + "" +
            $("#mode").val() + '' +
            speciali +
            $("#temperatureSelect option:selected").val();
    })

    $('#markSub').on('click', function (e) {
        if (document.querySelector("#markMark").innerText.includes('X')) {
            return alert('Пропущены поля в маркировке');
        }
        $('#step-1, #step-2,#step-3,#step-4,#step-5,#step-6,#step-7,#step-8').show()
        $('#markModal').hide();

        execValue = document.querySelector("#executionSelect").value;
        document.querySelector(`input[type='radio'][name='epPlace'][value='${execValue}']`).checked = true;
        $('#step-1').trigger('change')

        typeSelect = document.querySelector("#connectionTypeForclassicEpa");
        typeValue = document.querySelector("#typeSelect").value;
        $(typeSelect).append($('<option>', {
            value: typeValue,
            text: typeValue
        }));
        $(typeSelect).val(typeValue);
        $('#step-2').trigger('change');

        upgrValue = document.querySelector("#upgrSelect").value == '0' ? 'Отсутствует' : document.querySelector("#upgrSelect").value;
        upgrSelect = document.querySelector("#upgradeNumber");
        $(upgrSelect).append($('<option>', {
            value: upgrValue,
            text: upgrValue
        }));
        $(upgrSelect).val(upgrValue);
        $('#step-2').trigger('change')

        numValue = document.querySelector("#numSelect").value;
        numSelect = document.querySelector("#executionclassicEpaNumber");
        $(numSelect).append($('<option>', {
            value: numValue,
            text: numValue
        }));
        $(numSelect).val(numValue);
        $('#step-3').trigger('change')

        let mode = $("#mode").val();
        if (mode != '') {
            $('#engineUpgrade').show()
            document.querySelector(`input[type='radio'][name='engineUpgrade'][value='${mode}']`).checked = true
        } else {
            $('#engineUpgrade').hide()
            document.querySelector(`input[type='radio'][name='engineUpgrade']`).checked = false;
        }
        tempValue = document.querySelector("#temperatureSelect").value;
        tempSelect = document.querySelector("#climate");
        tempSelect.value = tempValue;
        $('#step-5').trigger('change');

        $('#step-7').trigger('change');

        document.querySelector("#rspecial").checked ? document.querySelector("#additional-Р").checked = true : '';
        document.querySelector("#microspecial").checked ? document.querySelector("#additional-24DC").checked = true : '';
        document.querySelector("#lspecial").checked ? document.querySelector("#additional-Л").checked = true : '';
        $('#step-8').trigger('change');

        $(document).trigger('change');
        allInOne();

        persInfo = document.querySelector(".persInfo");
        persInfo.scrollIntoView({ block: "center", behavior: "smooth" });
    })

    // Вставка картинок по типу
    $('#typeSelect').on('change', function (e) {
        $('#constructive-scheme-img').show();
        $('#constructive-scheme-img')
            .empty()
            .append(
                $('<img>').prop({
                    src: './img/' + cheme_img['epc'][document.querySelector("#typeSelect").value],
                    class: 'optionalField',
                })
            );
    });

    const cheme_img = {
        epc: {
            'М': 'epcTypeM.png',
            'А': 'epcTypeA.jpg',
            'Б': 'epcTypeB.jpg',
            'В': 'epcTypeV.jpg',
            'Г': 'epcTypeG.jpg',
            'Д': 'epcTypeD.jpg',
        },
    };

    function typeSelect() {
        let execution = document.querySelector("#executionSelect").value;
        let select = document.getElementById('typeSelect');
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Тип</option>';
        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['Classic', execution]

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

    function upgrSelect() {
        let execution = document.querySelector("#executionSelect").value;
        let type = document.getElementById('typeSelect').value;
        let select = document.getElementById('upgrSelect');
        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Номер модернизации</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['Classic', execution, type],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    if (item == '0') {
                        $(select).append(new Option('Отсутствует', item));
                    }
                    else {
                        $(select).append(new Option(item, item));
                    }
                });
            });
    }

    function numSelect() {
        let execution = document.querySelector("#executionSelect").value;
        let flange = document.getElementById('typeSelect').value;
        let upgr = document.getElementById('upgrSelect').value;
        let select = document.getElementById('numSelect');

        $(select).empty();
        select.innerHTML = '<option value="X" disabled selected>Номер исполнения</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['Classic', execution, flange, upgr],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    if (item < 10) { item = '0' + item }
                    $(select).append(new Option(item), (item));
                });
            });
    }

    function allInOne() {
        let execution = document.querySelector("#executionSelect").value;
        let flange = document.getElementById('typeSelect').value;
        let upgr = document.getElementById('upgrSelect').value;
        let num = document.getElementById('numSelect').value;
        let fetchResult = [];

        fetch('https://emk.websto.pro/Mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['Classic', execution, flange, upgr, num],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                roundNumbers = document.querySelector("#roundNumbers");
                $(roundNumbers).append($('<option>', {
                    value: fetchResult[0]['Обороты'],
                    text: fetchResult[0]['Обороты'],
                    selected: true
                }));

                roundMoment = document.querySelector("#roundMoment");
                $(roundMoment).append($('<option>', {
                    value: fetchResult[0]['Крутящий момент'],
                    text: fetchResult[0]['Крутящий момент'],
                    selected: true
                }));

                bkvType = document.querySelector("#bkvType");
                $(bkvType).append($('<option>', {
                    value: fetchResult[0]['Тип БКВ'],
                    text: fetchResult[0]['Тип БКВ'],
                    selected: true
                }));

                outVal = document.querySelector("#outVal");
                $(outVal).append($('<option>', {
                    value: fetchResult[0]['Частота'],
                    text: fetchResult[0]['Частота'],
                    selected: true
                }));

                salOrStepse = document.querySelector("#salOrStepse");
                $(salOrStepse).append($('<option>', {
                    value: fetchResult[0]['Электричеcкое подключение'],
                    text: fetchResult[0]['Электричеcкое подключение'],
                    selected: true
                }));

                $('#allInOneStyle').trigger('change');
            });
    }

    // сокрытие модификации
    $('#markModal').on('change', function (e) {
        if (document.querySelector("#typeSelect").value == 'А' || document.querySelector("#typeSelect").value == 'М') {
            $('#mode').prop('disabled', false);
        } else {
            $('#mode').val('');
            $('#mode').prop('disabled', true);
        }
    });

});

