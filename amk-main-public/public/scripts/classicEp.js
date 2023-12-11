// https://www.tulaprivod.ru/dokument/rukovodstva/BLTU_89_2022_v2.pdf
$(document).ready(function () {
    listToHtml();
    function listToHtml() {

        const jsonListToHtml = {
            // Исполнение
            '1': [
                {
                    "id": "Общего назначения",
                    "value": "Н"
                },
                {
                    "id": "Взрывозащищенное 1ExdbIIBT4Gb",
                    "value": "В"
                },
                {
                    "id": "Взрывозащищенное 1ExdbeIICT4Gb",
                    "value": "С"
                }
            ],

            // Модификация(Под кулачки, под квадрат)
            '2.1':
                [
                    {
                        "id": "Под кулачки",
                        "value": "К"
                    },
                    {
                        "id": "Под квадрат",
                        "value": "Ч"
                    }
                ],

            // Температура
            '11': [
                {
                    "id": "-45°C/+40°C - 100% при 25°C - (У1)",
                    "value": "У1"
                },
                {
                    "id": "-10°C/+50°C - 100% при 35°C - (Т1)",
                    "value": "Т1"
                },
                {
                    "id": "-60°C/+40°C - 100% при 25°C - (УХЛ1)",
                    "value": "УХЛ1"
                },
                {
                    "id": "-45°C/+40°C - 100% при 25°C - (У2)",
                    "value": "У2"
                },
                {
                    "id": "-10°C/+50°C - 100% при 35°C - (Т2)",
                    "value": "Т2"
                },
                {
                    "id": "-60°C/+40°C - 100% при 25°C - (УХЛ2)",
                    "value": "УХЛ2"
                }
            ],

            // Дополнительное оснащение
            '12': [
                {
                    "id": "Резистор",
                    "value": "Р"
                },
                {
                    "id": "Микровыключатели Д3031",
                    "value": "24DC"
                },
                {
                    "id": "Закрывание против часовой стрелке",
                    "value": "Л"
                }
            ]
        }

        $.each(jsonListToHtml[1], function (key, item) {
            $('#epPlace').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'epPlace-' + item.value,

                            name: 'epPlace',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'epPlace-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });

        $.each(jsonListToHtml[2.1], function (key, item) {
            $('#engineUpgrade').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'engineUpgrade-' + item.value,

                            name: 'engineUpgrade',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'engineUpgrade-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });

        $.each(jsonListToHtml[11], function (key, item) {
            // if (item.value == ' ') { item.value = '' };
            $('#climate').append(new Option(item.id, item.value));
        });

        $.each(jsonListToHtml[12], function (key, item) {
            $('#additionalFieldset').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'checkbox',
                            id: 'additional-' + item.value,

                            name: 'additional',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'additional-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });
    }

    //картинки типов 
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


    // ПРОГРУЗКА буквы привода С ТАБЛИЦЫ
    $('#epPlace').on('change', function (e) {
        function epTypeSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let select = document.getElementById('connectionTypeForclassicEpa');
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(item, item));
                    });
                });
        }
        epTypeSelectCreate();
    });

    // Вставка картинок по типу
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        $('#constructive-scheme-img').show();
        $('#constructive-scheme-img')
            .empty()
            .append(
                $('<img>').prop({
                    src: './img/' + cheme_img['epc'][document.querySelector("#connectionTypeForclassicEpa").value],
                    class: 'optionalField',
                })
            );
    });

    // ПРОГРУЗКА Мощности С ТАБЛИЦЫ
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        function enginePowerSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let select = document.querySelector("#enginePower");
            $(select).empty();
            select.innerHTML = '<option value="0" selected>Выберите значение</option>';

            if (!connect) {
                return alert('Пропущен тип электропривода');
            }

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(item, item));
                    });
                });
        }
        enginePowerSelectCreate();
    });

    // ПРОГРУЗКА числа оборотов С ТАБЛИЦЫ ПО МОЩНОСТИ
    $('#enginePower').on('change', function () {
        exNumSelectCreate();
    });

    // ПРОГРУЗКА числа оборотов С ТАБЛИЦЫ
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        exNumSelectCreate();
    });

    function exNumSelectCreate() {
        let execution = $("input[name='epPlace']:checked").val();
        let connect = document.getElementById('connectionTypeForclassicEpa').value;
        let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
        let select = document.querySelector("#roundNumbers");
        $(select).empty();
        select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

        if (!connect) {
            return alert('Пропущен тип электропривода');
        }

        let fetchResult = [];

        fetch('https://emk.websto.pro/DBclassic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: [execution, connect, power],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(item, item));
                });
            });
    }

    // Прогруз числа оборотов с таблицы
    $('#roundNumbers').on('change', function (e) {
        function outValSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
            let rNumber = document.querySelector("#roundNumbers").value;
            let select = document.querySelector("#outVal");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            if (!rNumber) {
                return alert('Пропущено число оборотов выходного вала');
            }
            else if (!connect) {
                return alert('Пропущен тип электропривода');
            }

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, power, rNumber],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(Number(item), Number(item)));
                        if (fetchResult[0].length == 1) {
                            select.selectedIndex = 1;
                            $('#outVal').trigger('change');
                        };
                    });
                });
        }
        outValSelectCreate();
    });

    // Прогрузка Крутящего момента
    $('#outVal').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            select = document.querySelector("#roundMoment");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            if (!outVal) {
                return alert('Пропущена частота вращения выходного вала');
            }
            else if (!rNumber) {
                return alert('Пропущено число оборотов выходного вала');
            }
            else if (!connect) {
                return alert('Пропущен тип электропривода');
            }


            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, power, rNumber, outVal],
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
                            $('#roundMoment').trigger('change');
                        };
                    });
                });
        }
        exNumSelectCreate();
    });

    // Прогрузка типа бкв с таблицы
    $('#roundMoment').on('change', function (e) {
        function exNumSelectCreate() {
            let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let select = document.querySelector("#bkvType");

            if (!rMoment) {
                return alert('Пропущен крутящий момент');
            }
            else if (!outVal) {
                return alert('Пропущена частота вращения выходного вала');
            }
            else if (!rNumber) {
                return alert('Пропущено число оборотов выходного вала');
            }
            else if (!connect) {
                return alert('Пропущен тип электропривода');
            }

            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, power, rNumber, outVal, rMoment],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(item, item))
                        if (fetchResult[0].length == 1) {
                            select.selectedIndex = 1;
                            $('#bkvType').trigger('change');
                        };
                    });
                });
        }
        exNumSelectCreate();
    });

    // Прогрузка кабелей с таблицы
    $('#bkvType').on('change', function (e) {
        function exNumSelectCreate() {
            let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let bkv = document.querySelector("#bkvType").value;

            if (!bkv) {
                return alert('Пропущен тип бкв');
            }
            else if (!rMoment) {
                return alert('Пропущен крутящий момент');
            }
            else if (!outVal) {
                return alert('Пропущена частота вращения выходного вала');
            }
            else if (!rNumber) {
                return alert('Пропущено число оборотов выходного вала');
            }
            else if (!connect) {
                return alert('Пропущен тип электропривода');
            }

            let select = document.querySelector("#salOrStepse");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, power, rNumber, outVal, rMoment, bkv],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        if (item == 'Штепсельный разъем или сальниковый ввод') {
                            $(select).append(new Option('Штепсельный разъем', 'Штепсельный разъем или сальниковый ввод'));
                            $(select).append(new Option('Cальниковый ввод', 'Штепсельный разъем или сальниковый ввод'));
                        }
                        else {
                            $(select).append(new Option(item, item));
                        }
                    });
                    if (select.length == 2) {
                        select.selectedIndex = 1;
                        $(select).trigger('change');
                    }
                });
        }
        exNumSelectCreate();
    });

    // Получение модернизации и номера исполнения
    $('.row').on('change', function (e) {
        if ($("#salOrStepse option:checked").text().includes('ввод')) {
            $('#standartField').show();
        }
        else {
            $('#standartField').hide();
        }
    });

    $('#salOrStepseField').on('change', function () {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let power = document.querySelector("#enginePower").value ? document.querySelector("#enginePower").value : '0';
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let bkv = document.querySelector("#bkvType").value;
            let salOrStepse = document.querySelector("#salOrStepse").value;
            let selectModern = document.querySelector("#upgradeNumber");
            let selectExec = document.querySelector("#executionclassicEpaNumber");

            if (!bkv) {
                return alert('Пропущен тип бкв');
            }
            else if (!rMoment) {
                return alert('Пропущен крутящий момент');
            }
            else if (!outVal) {
                return alert('Пропущена частота вращения выходного вала');
            }
            else if (!rNumber) {
                return alert('Пропущено число оборотов выходного вала');
            }
            else if (!connect) {
                return alert('Пропущен тип электропривода');
            }
            else if (!execution) {
                return alert('Пропущен тип электропривода');
            }

            $(selectModern).empty();
            $(selectExec).empty();
            // selectModern.innerHTML = '<option value="" disabled selected>Выберите значение</option>';
            // selectExec.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBclassic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, power, rNumber, outVal, rMoment, bkv, salOrStepse],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    console.log(fetchResult);
                    console.log(fetchResult[0][0][0]);
                    // fetchResult[0].sort((a, b) => a - b);
                    a = [fetchResult[0][0][0]];
                    b = [fetchResult[0][0][1]];
                    $.each(a, function (key, item) {
                        if (item == '0') { item = 'Отсутствует' }
                        $(selectModern).append(new Option(item, item));
                    });
                    $.each(b, function (key, item) {
                        if (item < 10) { item = '0' + item }
                        $(selectExec).append(new Option(item, item));
                    });
                    $(document).trigger('change');
                    $('#step-4').trigger('change');
                });
        }
        exNumSelectCreate();
    });

    // Заполнение стилей для перс инфо 
    $('.persInfo').on('change', function (e) {
        if (
            document.querySelector('#organization').value != '' &&
            document.querySelector('#fio').value != '' &&
            document.querySelector('#phone').value != '' &&
            document.querySelector('#email').value != ''
        ) {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {
            document.querySelector('.persInfo ').classList.remove('ReqValueOk');
            document.querySelector('.persInfo ').classList.add('noReqValue');
        }
    });

    // Стиль для кол-ва
    $('#numbersOfEp').on('change', function (e) {
        if (document.querySelector('#numbersOfEp').value !== '') {
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    //  стили для вводов
    $('#allInOneStyle').on('change', function (e) {
        if (document.querySelector("#salOrStepse").value != '') {
            document.querySelector("#salOrStepseField").classList.add('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#salOrStepseField").classList.remove('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.add('noReqValue');
        }
    });

    //  стили для бкв
    $('#allInOneStyle').on('change', function (e) {
        if (document.querySelector("#bkvType").value != '') {
            document.querySelector("#bkvTypeField").classList.add('ReqValueOk');
            document.querySelector("#bkvTypeField").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#bkvTypeField").classList.remove('ReqValueOk');
            document.querySelector("#bkvTypeField").classList.add('noReqValue');
        }
    });
    //  стили для крут моментов
    $('#allInOneStyle').on('change', function (e) {
        if (document.querySelector("#roundNumbers").value != '') {
            document.querySelector("#roundNumbersFieldSet").classList.add('ReqValueOk');
            document.querySelector("#roundNumbersFieldSet").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#roundNumbersFieldSet").classList.remove('ReqValueOk');
            document.querySelector("#roundNumbersFieldSet").classList.add('noReqValue');
        }
    });


    // Вывод сертификата и декларации
    $('#epPlace').on('change', function (e) {
        if (document.querySelector("#epPlace-Н").checked) {
            $('#declarationEpc').show();
            $('#declarationEpcV').hide();
            $('#certEpcV').hide();
        }
        else {
            $('#declarationEpc').hide();
            $('#declarationEpcV').show();
            $('#certEpcV').show();
        }
    });

    // сокрытие модификации
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        if (document.querySelector("#connectionTypeForclassicEpa").value == 'А' || document.querySelector("#connectionTypeForclassicEpa").value == 'М') {
            $('#engineUpgrade').show();
        } else {
            $('#engineUpgrade').hide();
            document.querySelector("#engineUpgrade-К").checked = false;
            document.querySelector("#engineUpgrade-Ч").checked = false;
        }
    });

    // заполнение маркировки
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');

        let x1 = $("input[name='epPlace']:checked").val() ? $("input[name='epPlace']:checked").val() : 'X';
        switch (x1) {
            case 'X':
                ($('#epPlace')).closest('fieldset').removeClass('ReqValueOk');
                ($('#epPlace')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#epPlace')).closest('fieldset').removeClass('noReqValue');
                ($('#epPlace')).closest('fieldset').addClass('ReqValueOk');
        }

        let x2 = $(document.querySelector("#connectionTypeForclassicEpa")).val() ? $(document.querySelector("#connectionTypeForclassicEpa")).val() : 'X';
        switch (x2) {
            case 'X':
                ($('#connectionTypeForclassicEpa')).closest('fieldset').removeClass('ReqValueOk');
                ($('#connectionTypeForclassicEpa')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#connectionTypeForclassicEpa')).closest('fieldset').removeClass('noReqValue');
                ($('#connectionTypeForclassicEpa')).closest('fieldset').addClass('ReqValueOk');
        }

        let x3 = $('#upgradeNumber').val() ? $('#upgradeNumber').val() : 'X';
        switch (x3) {
            case 'X':
                $('#upgradeNumber').closest('fieldset').removeClass('ReqValueOk');
                $('#upgradeNumber').closest('fieldset').addClass('noReqValue');
                break;
            case 'Отсутствует':
                $('#upgradeNumber').closest('fieldset').removeClass('noReqValue');
                $('#upgradeNumber').closest('fieldset').addClass('ReqValueOk');
                x3 = '';
            default:
                $('#upgradeNumber').closest('fieldset').removeClass('noReqValue');
                $('#upgradeNumber').closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#executionclassicEpaNumber').val() ? $('#executionclassicEpaNumber').val() : 'X';
        switch (x4) {
            case 'X':
                ($('#executionclassicEpaNumber')).closest('fieldset').removeClass('ReqValueOk');
                ($('#executionclassicEpaNumber')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#executionclassicEpaNumber')).closest('fieldset').removeClass('noReqValue');
                ($('#executionclassicEpaNumber')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $("input[name='engineUpgrade']:checked").val() ? $("input[name='engineUpgrade']:checked").val() : '';
        switch (x5) {
            case '':
                ($('#engineUpgrade')).closest('fieldset').removeClass('ReqValueOk');
                ($('#engineUpgrade')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#engineUpgrade')).closest('fieldset').removeClass('noReqValue');
                ($('#engineUpgrade')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = document.querySelector("#additional-Р").checked ? document.querySelector("#additional-Р").value : '';
        let x7 = document.querySelector("#additional-24DC").checked ? document.querySelector("#additional-24DC").value : '';
        let x8 = document.querySelector("#additional-Л").checked ? document.querySelector("#additional-Л").value : '';

        let x9 = $('#climate').val() ? $('#climate').val() : 'X';
        switch (x9) {
            case 'X':
                ($('#climate')).closest('fieldset').removeClass('ReqValueOk');
                ($('#climate')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#climate')).closest('fieldset').removeClass('noReqValue');
                ($('#climate')).closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $('#outVal').val();
        switch (x10) {
            case '':
                ($('#outVal')).closest('fieldset').removeClass('ReqValueOk');
                ($('#outVal')).closest('fieldset').addClass('noReqValue');
                break;
            case null:
                ($('#outVal')).closest('fieldset').removeClass('ReqValueOk');
                ($('#outVal')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#outVal')).closest('fieldset').removeClass('noReqValue');
                ($('#outVal')).closest('fieldset').addClass('ReqValueOk');
        }
        let x11 = $('#roundMoment').val();
        switch (x11) {
            case null:
                ($('#roundMoment')).closest('fieldset').removeClass('ReqValueOk');
                ($('#roundMoment')).closest('fieldset').addClass('noReqValue');
                break;
            case '':
                ($('#roundMoment')).closest('fieldset').removeClass('ReqValueOk');
                ($('#roundMoment')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#roundMoment')).closest('fieldset').removeClass('noReqValue');
                ($('#roundMoment')).closest('fieldset').addClass('ReqValueOk');
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7].includes('X');

        mark_gen.text(x1 + '-' + x2 + x3 + '-' + x4 + x5 + x6 + x7 + x8 + x9);
    });

    // ОТКРЫТИЕ ПО ШАГАМ
    $('#step-1').on('change', function (e) {
        if ($("input[name='epPlace']:checked").val() != undefined && document.querySelector("#connectionTypeForclassicEpa").value != '') {
            $('#step-2').show();
        }
    });
    $('#step-2').on('change', function (e) {
        if (document.querySelector("#roundNumbers").value != '' && document.querySelector("#outVal").value != '') {
            $('#step-3').show();
        }
    });
    $('#step-3').on('change', function (e) {
        if (document.querySelector("#roundMoment").value != '' && document.querySelector('#bkvType').value != '') {
            $('#step-4').show();
        }
    });
    $('#step-4').on('change', function (e) {
        if (document.querySelector("#salOrStepse").value != '' && document.querySelector("#upgradeNumber").value != '') {
            $('#step-5').show();
        }
    });
    $('#step-5').on('change', function (e) {
        if (document.querySelector("#climate").value != '') {
            $('#step-6').show();
        }
    });

    $('#step-6').on('change', function (e) {
        if (
            document.querySelector('#organization').value != '' &&
            document.querySelector('#fio').value != '' &&
            document.querySelector('#phone').value != '' &&
            document.querySelector('#email').value != '' &&
            document.querySelector('#numbersOfEp').value != ''
        ) {
            $('#step-7').show();
        }
    });

    // Скачать документацию
    $('#download').on('click', function () {
        // Обработка пропусков
        if ($("#connectionTypeForclassicEpa").val() == undefined) {
            goTo = document.querySelector("#connectionTypeForclassicEpa");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрана буква, означающая тип электропривода по присоединению')
        } else if ($("#roundNumbers").val() == undefined) {
            goTo = document.querySelector("#roundNumbers");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрано число оборотов выходного выла, необх. для закрывания арматуры')
        } else if ($("#outVal").val() == undefined) {
            goTo = document.querySelector("#outVal");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрана частота вращения')
        } else if ($("#roundMoment").val() == undefined) {
            goTo = document.querySelector("#roundMoment");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран крутящий момент')
        } else if ($("#bkvType").val() == undefined) {
            goTo = document.querySelector("#bkvType");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран тип БКВ')
        } else if ($("#salOrStepse").val() == undefined) {
            goTo = document.querySelector("#salOrStepse");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран тип ввода кабельного кабеля')
        } else if (document.querySelector("#organization").value == '') {
            goTo = document.querySelector("#organization");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено название организации')
        }
        else if (document.querySelector("#fio").value == '') {
            goTo = document.querySelector("#fio");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено контактное лицо')
        }
        else if (document.querySelector("#phone").value == '') {
            goTo = document.querySelector("#phone");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен телефон')
        }
        else if (document.querySelector("#numbersOfEp").value == '') {
            goTo = document.querySelector("#numbersOfEp");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено кол-во')
        }
        else if (document.querySelector("#email").value == '') {
            goTo = document.querySelector("#email");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен email')
        }
        else if (document.querySelector(`input[type='radio'][name='engineUpgrade']`).checked == false
            && (document.querySelector("#connectionTypeForclassicEpa").value == 'М' || document.querySelector("#connectionTypeForclassicEpa").value == 'А')) {
            goTo = document.querySelector("#engineUpgrade");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущена модификация')
        };

        Option1 = document.querySelector("#additional-Р").checked ? 'Резистор; ' : '';
        Option2 = document.querySelector("#additional-24DC").checked ? 'Микровыключатели Д3031; ' : '';
        addOptions = Option1 + Option2;
        // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // json0
        let j00 = document.querySelector('#organization').value; //Фирма
        let j01 = document.querySelector('#fio').value; // Фио
        let j02 = document.querySelector('#phone').value; // Телефон
        let j03 = document.querySelector('#email').value; // email
        let j04 = document.querySelector('#numbersOfEp').value; // кол-во
        let j05 = ''; //цена
        // json0 = [j00, j01, j02, j03, j04, j05];

        //json1
        let j10 = 'Многооборотные с двухсторонней муфтой'; //тип арматуры
        let j11 = document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j13 = ''; // оборотов на закрытие
        let j14 = document.querySelector("#roundMoment").value; //Крут момент
        let j15 = document.querySelector("#connectionTypeForclassicEpa").value; //присоединение к приводу
        let j16 = ''; // установка
        let j17 = document.querySelector("#outVal").value; // частота вращения
        let j18 = document.querySelector("#upgradeNumber").value; // номер модернизации
        let j19 = document.querySelector("#roundNumbers").value; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='epPlace']:checked").closest('.form-check').find('.form-check-label').text().trim(); //исполнение по назначению
        let j21 = 'Запорная'; //режим работы
        let j22 = 'IP54'; //Влагозащита
        let j23 = document.querySelector("#additional-Л").checked ? 'Закрывание против часовой стрелке' : 'Закрывание по часовой стрелке'; //Вращение вых вала
        let j24 = $("select[name='climate'] option:selected").text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3
        let j30 = ''; // тип бу 
        let j31 = ''; // Тип управления
        let j32 = '';// сигналы дист управления

        let j33 = document.querySelector("#bkvType").value; //Тип БКВ

        let j34 = ''; //Механический указатель

        let j35 = ''; // Сигнализация положения

        let j36 = ''; // Сигнал момэнт

        let j37 = ''; // Дублирование RS485;

        let j38 = 'Одиночные'; // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели

        let j311 = ''; // Монтаж БУ
        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];

        //json4
        let j40 = ''; //Электрическое подключение (цифра)
        let j41 = ''; //Защитный колпак
        let j42 = ''; //Цвет
        let j43 = '380В 3 фазы'; //механический селектор
        let j44 = addOptions;//Доп опции 
        let j45 = document.querySelector('#addReqarea').value; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = ''; //Назначение по режиму работы
        let j51 = $("select[name='salOrStepse'] option:selected").text(); //Электрическое подключение (расшифровка)
        let j52 = ''; // SIL
        let j53 = ''; //Специальное исполнение
        let j54 = document.querySelector("#executionclassicEpaNumber").value; //номер исполнения электропривода
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = $("input[name='epPlace']:checked").val(); //буква исполнения классики
        let j61 = document.querySelector("#engineUpgrade-Ч").checked ? 'Под квадрат' : 'Под кулачки';//Тип присоединения выходного вала
        let j62 = ''; //Кабельные вводы
        let j63 = ''; //Штепсельные разъемы
        let j64 = ''; //Тип подводимых кабелей
        let j65 = '';
        // json6 = [j60, j61, j62, j63];

        //json7
        let j70 = '';//Защита от коррозии
        let j71 = '';//Ручной маховик
        let j72 = '';//Наличие обогрев
        let j73 = '';//Наличие типа функции
        let j74 = '';//Функция при питании
        let j75 = ''; //Условие для запуска функции
        // json7 = [j70, j71, j72, j73, j74, j75];

        console.log([j00, j01, j02, j03, j04, j05],
            [j10, j11, j12, j13, j14, j15, j16, j17, j18, j19],
            [j20, j21, j22, j23, j24],
            [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311],
            [j40, j41, j42, j43, j44, j45],
            [j50, j51, j52, j53, j54],
            [j60, j61, j62, j63, j64, j65],
            [j70, j71, j72, j73, j74, j75]);


        function DOCX(id, name, mark) {
            window.open(`https://emk.websto.pro/Tula/${id + '/' + name + '/' + mark}`);
        }
        function EXEL(id, name, mark) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id + '/' + name + '/' + mark}`);
        }
        function allInPdf(id, name, mark) {
            window.open(`https://emk.websto.pro/TulaPDF/${id + '/' + name + '/' + mark}`);
        }
        function sendToServer() {
            let post = fetch('https://emk.websto.pro/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    jsn0: [j00, j01, j02, j03, j04, j05],
                    jsn1: [j10, j11, j12, j13, j14, j15, j16, j17, j18, j19],
                    jsn2: [j20, j21, j22, j23, j24],
                    jsn3: [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311],
                    jsn4: [j40, j41, j42, j43, j44, j45],
                    jsn5: [j50, j51, j52, j53, j54],
                    jsn6: [j60, j61, j62, j63, j64, j65],
                    jsn7: [j70, j71, j72, j73, j74, j75],
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    let id = data.id;
                    let name = data.name;
                    let mark = data.mark;
                    DOCX(id, name, mark);
                    EXEL(id, name, mark);
                    allInPdf(id, name, mark);
                });
        }
        sendToServer();
    });
});            
