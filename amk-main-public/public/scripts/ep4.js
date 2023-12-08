////https://www.tulaprivod.ru/dokument/rukovodstva/EP_4_2022_15_v3.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    $(document).on('click', '#ve2-table th, #ve2-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById('v2' + target);
        $('.cur-vexecution2-value').text(target).val(target);
        $('#ve2-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });
    $(document).on('click', '#ve2-table16 th, #ve2-table16 td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById('v' + target);
        $('.cur-vexecution2e16-value').text(target).val(target);
        $('#ve2-table16 th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    $(document).on('change', function (e) {
        if ($('#controle-blocks2').val()) {
            document.querySelector("#PanelOptionLabel").checked = false;
            $('#PanelOptionLabel').hide();
        }
        else {
            $('#PanelOptionLabel').show();
        }
    });

    // КОНСТАНТЫ ДЛЯ JSON
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

    const executions = {
        ep4: {
            Н: ' Общепромышленное исполнение',
            В: ' Взрывозащищенное исполнение для подгруппы IIB',
            Ш: ' Рудничное (шахтное) исполнение',
            S: ' Искробезопасное рудничное (шахтное) исполнение',
            С: ' Взрывозащищенное исполнение для подгруппы IIС',
        },
    };

    const execution_wrap = $('#execution-wrap');

    const tuMp = {
        60: {
            '24...60': {
                '6-15': ['5'],
                '5.5-13': ['10'],
                '3-6.5': ['20'],
            },
        },

        120: {
            '48...120': {
                '12...30': ['5'],
                '11...26': ['10'],
                '6...13': ['20'],
            },
        },
    };

    //ПРОГРУЗКА МП МОДУЛЯ НА СТРАНИЦЕ

    //ОТКРЫТИЕ БЛОКА С МП МОДУЛЕМ
    $('.tuMpCheck').on('change', function (e) {
        let check = document.querySelector('#tuMpCheck > input[type=checkbox]');
        if (check.checked) {
            $('#tuMpField').removeClass('none');
        } else if (!check.checked) {
            $('#tuMpField').addClass('none');
        }
    });

    // ЗАПОЛНЕНИЕ НОМИНАЛЬНОГО КРУТЯЩЕГО МОМЕНТА С JSON
    $('#executionWrapLegend').on('change', function (e) {
        // $('#step-3').show();

        let select = $(document.querySelector('#roundMomentMp'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = tuMp;
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            });
        });
        selectArr.sort((a, b) => a - b);
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // ЗАПОЛНЕНИЕ КРУТЯЩЕГО МОМЕНТА ПРИВОДА С JSON
    $('#roundMomentMp').on('change', function (e) {
        // $('#step-3').show();

        let execVal = $('#roundMomentMp').val();
        // console.log(execVal);

        let select = $(document.querySelector('#roundMomentEngine'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = tuMp[execVal];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            });
        });
        selectArr.sort((a, b) => a - b);
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // ЗАПОЛНЕНИЕ ДиапазонА усилий на штоке модуля С JSON
    $('#roundMomentEngine').on('change', function (e) {
        // $('#step-3').show();

        let execVal = $('#roundMomentMp').val();
        let execVal2 = $('#roundMomentEngine').val();
        // console.log(execVal);

        let select = $(document.querySelector('#roundMomentInterval'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = tuMp[execVal][execVal2];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            });
        });
        selectArr.sort((a, b) => b - a);
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // ЗАПОЛНЕНИЕ ХОДА ШТОКА МОДУЛЯ ЗА ОДИН ОБОРОТ С JSON
    $('#roundMomentInterval').on('change', function (e) {
        // $('#step-3').show();

        let execVal = $('#roundMomentMp').val();
        let execVal2 = $('#roundMomentEngine').val();
        let execVal3 = $('#roundMomentInterval').val();
        // console.log(execVal);

        let select = $(document.querySelector('#stepForOne'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = tuMp[execVal][execVal2][execVal3];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(
            [
                ...new Set(
                    ValuesArr.sort(function (a, b) {
                        return a - b;
                    })
                ),
            ],
            function (index, item) {
                select.append(new Option(item, item, false, !selectArr.includes(item)));
            }
        );

        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });


    // ПРОГРУЗКА ОСНОВНОЙ СТРАНИЦЫ
    let cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();

    // ПРОГРУЗКА ДАННЫХ ПРЕДЕЛА С ТАБЛИЦЫ
    $('#executionWrapLegend').on('change', function (e) {
        upLimSelectCreate();
    });
    $('#connection-type-wrap').on('change', function (e) {
        upLimSelectCreate();
    });
    function upLimSelectCreate() {
        let uplim = document.getElementById('upper-limit');
        let execution = $("input[name='execution']:checked").val();
        let connectionType = $("input[name='connection-type']:checked").val();
        $(uplim).empty();
        uplim.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

        if (!connectionType) { return }
        let fetchResult = [];

        fetch('https://emk.websto.pro/DBep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, connectionType],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(uplim).append(new Option(item, item));
                });
            });
    }

    // ПРОГРУЗКА ДАННЫХ МОЩНОСТИ С ТАБЛИЦЫ
    $('#upper-limit').on('change', function (e) {
        function Vv() {
            let execution = $("input[name='execution']:checked").val();
            let connectionType = $("input[name='connection-type']:checked").val();
            let upLim = document.querySelector('#upper-limit').value;
            let vPower = document.getElementById('vPower');
            $(vPower).empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }

            vPower.innerHTML = '<option value="0" selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭП4', execution, connectionType, upLim],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(vPower).append(new Option(item, item));
                    });
                });
        }
        Vv();
    });

    // Формула от частоты вращения и двигателя
    $('#stepClose').on('change', function (e) {
        rotationFrequencySelectCreate();
        // $('#rotation-frequency').trigger('change');
    })

    // ПРОГРУЗКА ДАННЫХ ЧАСТОТЫ ВРАЩЕНИЯ С ТАБЛИЦЫ
    $('#vPower').on('change', function (e) {
        rotationFrequencySelectCreate();
        // $('#rotation-frequency').trigger('change');
    });

    // ПРОГРУЗКА ДАННЫХ ЧАСТОТЫ ВРАЩЕНИЯ С ТАБЛИЦЫ ПОСЛЕ ЗАПОЛНЕНИЯ МОЩНОСТИ
    $('#upper-limit').on('change', function (e) {
        $('#vPower').val('0');
        $('#closeNumbers').val('');
        $('#closingTime').val('');
        rotationFrequencySelectCreate();
        // $('#stepClose').trigger('change');
        // $('#rotation-frequency').trigger('change');
    });

    function rotationFrequencySelectCreate() {
        let execution = $("input[name='execution']:checked").val();
        let closeNumbers = document.querySelector('#closeNumbers').value;
        let closingTime = document.querySelector('#closingTime').value;
        let expression = (closeNumbers && closingTime) ? (closeNumbers / closingTime) : (1 / 60);
        let vPower = document.querySelector("#vPower").value;
        let upLim = document.querySelector('#upper-limit').value;
        let connectionType = $("input[name='connection-type']:checked").val();
        let rotationFrequency = document.getElementById('rotation-frequency');

        if (!upLim) {
            return alert('Пропущен верхний предел');
        }
        else if (!connectionType) {
            return alert('Пропущен тип присоединения фланца');
        }

        $(rotationFrequency).empty();
        let fetchResult = [];

        fetch('https://emk.websto.pro/DBep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭП4', execution, connectionType, upLim, vPower],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                for (i in res) fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    if (item > Math.round(60 * (expression))) {
                        $(rotationFrequency).append(new Option(Number(item), Number(item)));
                    }
                    $('#step-2').trigger('change');
                    $(document).trigger('change');
                });
                if (rotationFrequency.length == 0) {
                    alert('С указанной комбинацией оборотов и времени закрытия нет подходящей частоты вращения');
                } else {
                    $('#rotation-frequency').trigger('change');
                }
            });
    }

    // ПРОГРУЗКА ДАННЫХ КОНСТРУКТИВНЫХ СХЕМ С ТАБЛИЦЫ
    $('#rotation-frequency').on('change', function (e) {
        function SchemeSelectCreate() {
            let vPower = document.querySelector("#vPower").value;
            let execution = $("input[name='execution']:checked").val();
            let upLim = document.querySelector('#upper-limit').value;
            let connectionType = $("input[name='connection-type']:checked").val();
            let rotationFrequency = document.getElementById('rotation-frequency').value;
            $('#constructive-scheme-wrap').empty();
            $('#constructive-scheme-img').empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }

            else if (!rotationFrequency) {
                return alert('Пропущена частота вращения выходного вала');
            }

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭП4', execution, connectionType, upLim, vPower, rotationFrequency],
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
                                        class: 'form-check-input ch-mark'
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
                    });
                    if (fetchResult[0].length == 1) {
                        let a = document.getElementsByName('constructive-scheme');
                        a[0].checked = true;
                        $('#constructive-scheme-wrap').trigger('change');
                    };
                });
        }
        SchemeSelectCreate();
    });

    $('#constructive-scheme-wrap').on('change', function (e) {
        let cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        if (cur_constructive_scheme !== '41' && cur_constructive_scheme !== '410') {
            $('#E1SinSelect').hide();
        } else {
            $('#E1SinSelect').show();
        }

        $('#constructive-scheme-img')
            .empty()
            .append(
                $('<img>').prop({
                    src: './img/' + cheme_img['ep4'][cur_constructive_scheme],
                    class: 'img-fluid',
                })
            );

        function flangeSelectCreate() {
            let execution = $("input[name='execution']:checked").val();
            let vPower = document.querySelector("#vPower").value;
            let upLim = document.querySelector('#upper-limit').value;
            let connectionType = $("input[name='connection-type']:checked").val();
            let rotationFrequency = document.getElementById('rotation-frequency').value;
            let scheme = $("input[name='constructive-scheme']:checked").val();
            let flange = document.querySelector('#flange');

            $(flange).empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }

            else if (!rotationFrequency) {
                return alert('Пропущена частота вращения выходного вала');
            }
            else if (!scheme) {
                return alert('Пропущена схема');
            }

            flange.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭП4', execution, connectionType, upLim, vPower, rotationFrequency, scheme],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(flange).append(new Option(item));
                        if (fetchResult[0].length == 1) {
                            flange.selectedIndex = 1;
                            $('#flange').trigger('change');
                        };
                    });
                });
        }

        flangeSelectCreate();
    });

    $('#constructive-scheme-wrap').on('change', function () {
        cur_constructive_scheme = $("input[name='constructive-scheme']").val();

        // СОКРЫТИЕ КАБЕЛЬНЫЙ ПОДКЛЮЧЕНИЙ ДЛЯ СХем 43/44/430
        if (cur_constructive_scheme == '43' || cur_constructive_scheme == '430' || cur_constructive_scheme == '44') {
            $("input[name='connectionForEp4']:checked").prop('checked', false);
            $(document).trigger('change');
            document.querySelector("#connectionForEp4-0div").style.display = 'flow';
            document.querySelector("#connectionForEp4-1div").style.display = 'none';
            // document.querySelector("#connectionForEp4-2div").checked = '';
            // document.querySelector("#connectionForEp4-3div").style.display = 'flow';
            document.querySelector("#connectionForEp4-4div").style.display = 'none';
            // document.querySelector("#connectionForEp4-5div").style.display = 'flow';
            document.querySelector("#connectionForEp4-6div").style.display = 'none';
            // document.querySelector("#connectionForEp4-7div").style.display = 'flow';
        }
        else {
            document.querySelector("#connectionForEp4-0div").style.display = 'flow';
            document.querySelector("#connectionForEp4-1div").style.display = 'flow';
            // document.querySelector("#connectionForEp4-3div").style.display = 'flow';
            document.querySelector("#connectionForEp4-4div").style.display = 'flow';
            // document.querySelector("#connectionForEp4-5div").style.display = 'flow';
            document.querySelector("#connectionForEp4-6div").style.display = 'flow';
            // document.querySelector("#connectionForEp4-7div").style.display = 'flow';
        }

    });


    // ОБРАБОТКА ИСПОЛНЕНИЯ
    $('#executionWrapLegend').on('change', function () {
        switch (true) {
            case document.querySelector("#execution-Ш").checked:
            case document.querySelector("#execution-S").checked:
                $('#M1SinSelect').hide();
                break;
            default:
                $('#M1SinSelect').show();
                break;
        }
    })

    // Открываю кабели и исполнение с вандальной крышкой под блоки
    $('#controle-blocks-series').on('change', function (e) {
        let cbs = document.querySelector('#controle-blocks-series');
        if (cbs.value == 'Э1' || cbs.value == 'Э2' || cbs.value == 'Э1S') {
            $('.specialConnection').show();
            $('#special-6Field').show();
        }
        else {
            $('.specialConnection').hide();
            document.querySelector("#connectionForEp4-7").checked = false;
            document.querySelector("#connectionForEp4-6").checked = false;
            $('#special-6Field').hide();
            document.querySelector("#special-6").checked = false;
        }
    });

    // Убираю исполнению под вибрацию при схемах != 41 && != 410
    $('.row').on('change', function () {
        let scheme = $("input[name='constructive-scheme']:checked").val();
        if ((scheme == '41' || scheme == '410')) {
            $('#special-2Field').show();
        }
        else {
            document.querySelector("#special-2").checked = false;
            $('#special-2Field').hide();
        }
    });

    // УБИРАЮ 660В(спец исполнение)
    $('.row').on('change', function () {
        let scheme = $("input[name='constructive-scheme']:checked").val();
        if ((((scheme == '41' || scheme == '410') && document.querySelector("#controle-blocks-series").value == 'Э1') || (document.querySelector("#controle-blocks-series").value == 'М1'))) {
            $('#special-4Field').show();
        }
        else if ((document.querySelector("#execution-С").checked) && (((scheme == '41' || scheme == '410' || scheme == '40') && (document.querySelector("#controle-blocks-series").value == 'М1')) || ((scheme == '41' || scheme == '410') && (document.querySelector("#controle-blocks-series").value == 'Э1')))) {
            $('#special-4Field').show();
        }
        else if ((scheme == '41' || scheme == '410') && (document.querySelector("#controle-blocks-series").value == 'Э1') && (document.querySelector("#execution-Ш").checked)) {
            $('#special-4Field').show();
        }
        else if ((scheme == '41' || scheme == '410') && (document.querySelector("#controle-blocks-series").value == 'Э1S') && (document.querySelector("#execution-S").checked)) {
            $('#special-4Field').show();
        }
        else {
            document.querySelector("#special-4").checked = false;
            $('#special-4Field').hide();
        }
    });

    // ОГРАНИЧЕНИЕ ПО IP КЛИМАТИЧЕСКИХ УСЛОВИЙ
    $('#climatic-modification').on('change', function () {
        if (document.querySelector("#climatic-modification").value == '4' || document.querySelector("#climatic-modification").value == '5' || document.querySelector("#climatic-modification").value == '6') {
            $('#ip67div').hide();
            document.querySelector("#protection-1").checked = false;
        }
        else {
            $('#ip67div').show();
        };
    });

    // Обработка доп полей кабелей
    $('#cabelsTypeField').on('change', function () {
        if (document.querySelector("#protCabel").checked) {
            $("#protCabelDiv").show();
        }
        else {
            $("#protCabelInput").val('');
            $("#protCabelNum").val('');
            $("#protCabelDiv").hide();
        }

        if (document.querySelector("#metal").checked) {
            $("#metalDiv").show();
        }
        else {
            $("#metalInput").val('');
            $("#metalNum").val('');
            $("#metalDiv").hide();
        }

        if (document.querySelector("#protectMetal").checked) {
            $("#protectMetalDiv").show();
        }
        else {
            $("#protectMetalInput").val('');
            $("#protectMetalNum").val('');
            $("#protectMetalDiv").hide();
        }

        if (document.querySelector("#stubs").checked) {
            $("#stubsDiv").show();
        }
        else {
            $("#stubsNum").val('');
            $("#stubsDiv").hide();
        }
    })

    // Открытие стандартов вариантов кабелей
    $('#electricityField').on('change', function () {
        let scheme = $("input[name='constructive-scheme']:checked").val();

        // СТАНДАРТЫ КАБЕЛЕЙ ОБЩЕПРОМ
        if (document.querySelector("#execution-Н").checked) {
            if (scheme == '40') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();
                    $('#standart').val('С двумя кабельными вводами под кабели без брони диаметром 13-18 мм и одним кабельным вводом под кабель без брони диаметром 9-14 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();
                    $('#standart').val('С двумя кабельными вводами под кабели без брони диаметром 13-18 мм и двумя-четырьмя кабельными вводами под кабель без брони диаметром 9-14 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }
            }
            else if (scheme == '41' || scheme == '410') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();
                    $('#standart').val('С тремя кабельными вводами под кабели без брони диаметром 13-18 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();
                    $('#standart').val('С четырьмя-шестью кабельными вводами под кабели без брони диаметром 9-14 мм и 13-18 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }

            }
            else if (scheme == '44' || scheme == '43' || scheme == '430') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();

                    $('#standart').val('С тремя кабельными вводами под кабели без брони диаметром 18-25 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();

                    $('#standart').val('С четырьмя-шестью кабельными вводами под кабели без брони диаметром 9-14 мм и 18-25 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }
            }
        }
        // СТАНДАРТЫ КАБЕЛЕЙ ВЗРЫВНИКОВ
        else {
            if (scheme == '40') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();
                    $('#standart').val('С двумя кабельными вводами под кабели без брони диаметром 16-17 мм и одним кабельным вводом под кабель без брони диаметром 10.5-12 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();
                    $('#standart').val('С двумя кабельными вводами под кабели без брони диаметром 16-17 мм и двумя-четырьмя кабельными вводами под кабель без брони диаметром 10.5-12 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }
            }
            else if (scheme == '41' || scheme == '410') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();
                    $('#standart').val('С тремя кабельными вводами под кабели без брони диаметром 16-17 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();
                    $('#standart').val('С четырьмя-шестью кабельными вводами под кабели без брони диаметром 10.5-12 мм и 16-17 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }
            }
            else if (scheme == '44' || scheme == '43' || scheme == '430') {
                if (document.querySelector("#connectionForEp4-1").checked || document.querySelector("#connectionForEp4-2").checked) {
                    $('#standartField').show();
                    $('#standart').val('С тремя кабельными вводами под кабели без брони диаметром 21.5-23 мм.');
                }
                else if (document.querySelector("#connectionForEp4-6").checked || document.querySelector("#connectionForEp4-7").checked) {
                    $('#standartField').show();
                    $('#standart').val('С четырьмя-шестью кабельными вводами под кабели без брони диаметром 10.5-12 мм и 21.5-23 мм.');
                }
                else {
                    $('#standart').val('');
                    $('#standartField').hide();
                }
            }
        }
    });

    // ЗАПОЛНЕНИЕ ИСПОЛНЕНИЯ ДЛЯ ЕП4
    $.each(executions['ep4'], function (key, item) {
        execution_wrap.append(
            $('<div>')
                .prop({ class: 'form-check' })
                .append(
                    $('<input>').prop({
                        class: 'form-check-input ch-mark',
                        type: 'radio',
                        name: 'execution',
                        id: 'execution-' + key,
                        value: key,
                    })
                )
                .append(
                    $('<label>')
                        .prop({
                            class: 'form-check-label',
                            for: 'execution-' + key,
                        })
                        .text(item)
                )
        );
    });

    let m1BlockModal = new bootstrap.Modal($('#block-configure-m1'));
    let m2BlockModal = new bootstrap.Modal($('#block-configure-m2'));
    let vimuBlockModal = new bootstrap.Modal($('#block-configure-e1'));
    let e2BlockModal = new bootstrap.Modal($('#block-configure-e2'));
    let e1SBlockModal = new bootstrap.Modal($('#e1SModal'));

    // Обработка доп платы
    let vimuBlock2ModalForE16 = new bootstrap.Modal($("#ve2ConfigE16"));
    let vimuBlock2Modal = new bootstrap.Modal($("#ve2Config"));

    $("#closeve2E16modal").on("click", function (e) {
        vimuBlock2ModalForE16.hide();
    });
    $("#closeve2modal").on("click", function (e) {
        vimuBlock2Modal.hide();
    });

    $("#ve2E16c-submit").on("click", function (e) {
        $("#controle-blocks2").val($("input.cur-vexecution2e16-value").text()).trigger("change");
        vimuBlock2ModalForE16.hide();
    });

    $('#ve2E16Clear').on('click', function (e) {
        $('#controle-blocks2').val('');
        vimuBlock2ModalForE16.hide();
        $('#control-block-fieldset').trigger('change');
    });
    $("#ve2c-submit").on("click", function (e) {
        $("#controle-blocks2").val($("input.cur-vexecution2-value").text()).trigger("change");
        vimuBlock2Modal.hide();
    });

    $('#ve2Clear').on('click', function (e) {
        $('#controle-blocks2').val('');
        vimuBlock2Modal.hide();
        $('#control-block-fieldset').trigger('change');
    });

    $('#control-block-fieldset').on('change', function (e) {
        $('#controle-blocks2').val() ? $('#sumBlocks').val($('#controle-blocks').val() + '/' + $('#controle-blocks2').val()) : $('#sumBlocks').val($('#controle-blocks').val());
    });

    $('#controle-blocks').on('change', function () {
        let BU = $('#controle-blocks').val();
        if (BU == 'Э16') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                vimuBlock2ModalForE16.show();
            })
        }
        else if (BU == 'Э18' || BU == 'Э19' || BU == 'Э110' || BU == 'Э14') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                vimuBlock2Modal.show();
            })
        }
        else {
            $("#control-block2-config").hide();
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
        }
    })

    $('#control-block-fieldset').on('change', function (e) {
        if ($("#controle-blocks-series").val() !== 'Э1') {
            $("#control-block2-config").hide();
            $("#controle-blocks2").val('');
            $('#sumBlocks').show();
        }
        else {
            $('#sumBlocks').show();
        }

        if ($('#controle-blocks-series').val() == 'Э0') {
            $('#sumBlocks').hide();
        }
    });

    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');
        let x2;

        let x0 = 'ЭП4';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : ''; // Назначение по режимам работы

        x2 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : 'X'; // Исполнение по взрывозащите
        switch (x2) {
            case 'X':
                $("input[name='execution']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='execution']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='execution']").closest('fieldset').removeClass('noReqValue');
                $("input[name='execution']").closest('fieldset').addClass('ReqValueOk');
        }
        let x3 = document.querySelector("#flange").value ? document.querySelector("#flange").value : 'X'; // Тип присоединения к арматуре
        switch (x3) {
            case 'X':
                $('#flange').closest('fieldset').removeClass('ReqValueOk');
                $('#flange').closest('fieldset').addClass('noReqValue');
                break;
            default:
                if (x3.includes('А')) {
                    x3 = 'А';
                }
                else if (x3.includes('М')) {
                    x3 = 'М';
                }
                $('#flange').closest('fieldset').removeClass('noReqValue');
                $('#flange').closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = document.querySelector("#upper-limit").value ? document.querySelector("#upper-limit").value : 'X'; // Верхний предел настройки ограничителя крутящего момента, Н·м
        switch (x4) {
            case 'X':
                $('#upper-limit').closest('fieldset').removeClass('ReqValueOk');
                $('#upper-limit').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#upper-limit').closest('fieldset').removeClass('noReqValue');
                $('#upper-limit').closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = document.querySelector("#rotation-frequency").value ? document.querySelector("#rotation-frequency").value : 'X'; // Частота вращения выходного вала, об/мин
        switch (x5) {
            case 'X':
                $('#rotation-frequency').closest('fieldset').removeClass('ReqValueOk');
                $('#rotation-frequency').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#rotation-frequency').closest('fieldset').removeClass('noReqValue');
                $('#rotation-frequency').closest('fieldset').addClass('ReqValueOk');
        }

        let VE = document.querySelector('#commandBlockType-2').checked ? 'В' : '';

        let x6 = $('#controle-blocks').val() ? VE + $('#controle-blocks').val() : 'X';
        switch (x6) {
            case 'X':
                $('#controle-blocks').closest('fieldset').removeClass('ReqValueOk');
                $('#controle-blocks').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#controle-blocks').closest('fieldset').removeClass('noReqValue');
                $('#controle-blocks').closest('fieldset').addClass('ReqValueOk');
        }

        // ДОП ОПЦИИ ДЛЯ БЛОКА
        let tOption = '';
        document.querySelector('#tOption').checked ? (tOption = document.querySelector('#tOption').value) : '';

        let PanelOption = '';
        document.querySelector('#PanelOption').checked ? (PanelOption = document.querySelector('#PanelOption').value) : '';

        let bluetoothOption = '';
        document.querySelector('#bluetoothOption').checked ? (bluetoothOption = document.querySelector('#bluetoothOption').value) : '';

        let regOption = '';
        document.querySelector('#regOption').checked ? (regOption = document.querySelector('#regOption').value) : '';

        let optionssetCheckBox = tOption + PanelOption + bluetoothOption + regOption;

        // //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let x7 = $('#climatic-modification').val() ? $('#climatic-modification').val() : 'X'; // Номер варианта температурного исполнения
        switch (x7) {
            case 'X':
                $('#climatic-modification').closest('fieldset').removeClass('ReqValueOk');
                $('#climatic-modification').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#climatic-modification').closest('fieldset').removeClass('noReqValue');
                $('#climatic-modification').closest('fieldset').addClass('ReqValueOk');
        }

        let x8 = $("input[name='connection-type']:checked").val() ? $("input[name='connection-type']:checked").val() : 'X'; // Тип присоединения выходного вала привода к валу арматуры
        switch (x8) {
            case 'X':
                $("input[name='connection-type']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='connection-type']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='connection-type']").closest('fieldset').removeClass('noReqValue');
                $("input[name='connection-type']").closest('fieldset').addClass('ReqValueOk');
        }

        let x9 = $("input[name='rotating']:checked").val() ? $("input[name='rotating']:checked").val() : 'X'; // Направление вращения выходного вала
        switch (x9) {
            case 'X':
                $("input[name='rotating']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='rotating']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='rotating']").closest('fieldset').removeClass('noReqValue');
                $("input[name='rotating']").closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $("input[name='protection']:checked").val() ? $("input[name='protection']:checked").val() : 'X'; // Степень защиты от проникновения пыли и воды по ГОСТ 14254-2015
        switch (x10) {
            case 'X':
                $("input[name='protection']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='protection']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='protection']").closest('fieldset').removeClass('noReqValue');
                $("input[name='protection']").closest('fieldset').addClass('ReqValueOk');
        }

        let x11 = $("input[name='color']:checked").val() ? $("input[name='color']:checked").val() : 'X'; // Цвет окраски
        if ($("input[name='color']:checked").val() == '1' || document.querySelector('#ralColor').value != '') {
            $("input[name='color']").closest('fieldset').removeClass('noReqValue');
            $("input[name='color']").closest('fieldset').addClass('ReqValueOk');
        } else {
            $("input[name='color']").closest('fieldset').removeClass('ReqValueOk');
            $("input[name='color']").closest('fieldset').addClass('noReqValue');
        }

        let x12 = $("input[name='connectionForEp4']:checked").val() ? $("input[name='connectionForEp4']:checked").val() : 'X'; // Электрическое подключение
        switch (x12) {
            case 'X':
                $("input[name='connectionForEp4']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='connectionForEp4']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='connectionForEp4']").closest('fieldset').removeClass('noReqValue');
                $("input[name='connectionForEp4']").closest('fieldset').addClass('ReqValueOk');
        }
        // let special1 = document.querySelector("#special-1").checked ? document.querySelector("#special-1").value : '';
        let special2 = document.querySelector("#special-2").checked ? document.querySelector("#special-2").value : '';
        let special3 = document.querySelector("#special-3").checked ? document.querySelector("#special-3").value : '';
        let special4 = document.querySelector("#special-4").checked ? document.querySelector("#special-4").value : '';
        let special5 = document.querySelector("#special-5").checked ? document.querySelector("#special-5").value : '';
        let special6 = document.querySelector("#special-6").checked ? document.querySelector("#special-6").value : '';
        let specialSum = special2 + special3 + special4 + special5 + special6;
        let x13 = specialSum ? '-' + specialSum : ''; // Специальное исполнение

        let secondVimuBlock = $('#controle-blocks2').val() ? '/' + VE + $('#controle-blocks2').val() : '';

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        let tuMpX1 = document.querySelector('#maxStepMp').value;
        let tuMpX2 = document.querySelector('#stepForOne').value;

        let constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        let suffix = '';

        if (constructive_scheme === '40') {
            suffix += '-40';
        }
        //
        if (document.querySelector('#controle-blocks-series').value === 'Э0') {
            x6 = 'Э01';
            // suffix += '\\ВИМУ-';
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12].includes('X');
        let check = document.querySelector('#tuMpCheck > input[type=checkbox]');
        if (check.checked) {
            mark_gen.text(
                x0 +
                x1 +
                x2 +
                '-' +
                x3 +
                '-' +
                x4 +
                '-' +
                x5 +
                '-' +
                x6 +
                optionssetCheckBox +
                optForBu +
                '-' +
                x7 +
                '-' +
                x8 +
                x9 +
                x10 +
                x11 +
                x12 +
                x13 +
                suffix +
                '/' +
                'МП40' +
                '-' +
                tuMpX1 +
                '-' +
                tuMpX2
            )
        }
        else {
            mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + secondVimuBlock +
                optionssetCheckBox + optForBu + '-' + x7 + '-' + x8 + x9 + x10 + x11 + x12 + x13 + suffix);
        }
    });

    // Обработка пропусков
    $(document.querySelector('#download')).on('click', function () {
        if ($("input[name='constructive-scheme']:checked").value == '') {
            goTo = document.querySelector("#schemeFieldSet");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрана конструктивная схема')
        } else if (document.querySelector("#flange").value == '') {
            goTo = document.querySelector("#flange");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран фланец')
        } else if (document.querySelector("#upper-limit").value == '') {
            goTo = document.querySelector("#upper-limit");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран верхний предел крутящего момента')
        } else if (document.querySelector("#rotation-frequency").value == '') {
            goTo = document.querySelector("#rotation-frequency");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрана частота вращения')
        }
        else if (document.querySelector("#controle-blocks").value == '') {
            goTo = document.querySelector("#control-block-fieldset");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен конфигуратор')
        }
        else if (document.querySelector("#cap").checked && document.querySelector("#stockForCap").value == '') {
            goTo = document.querySelector("#cap");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('При выборе защитного колпака необходимо указать вылет штока в мм.')
        }
        else if (document.querySelector("#pointer").checked && document.querySelector("#stockForPointer").value == '') {
            goTo = document.querySelector("#pointer");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('При выборе механического указателя необходимо указать ход штока в мм.')
        }
        else if (document.querySelector("#color-2").checked && document.querySelector("#ralColor").value == '') {
            goTo = document.querySelector("#color-2");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не указан цвет краски')
        }
        else if (document.querySelector("#controle-blocks-series").value == 'Э1' && !document.querySelector("#commandBlockType-1").checked && !document.querySelector("#commandBlockType-2").checked) {
            goTo = document.querySelector(".commandBlockType");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не указан тип блока управления')
        }
        else if (document.querySelector("#controle-blocks-series").value == 'Э1' && document.querySelector("#control-block-optionsset").classList.contains('noReqValue')
        ) {
            goTo = document.querySelector("#control-block-optionsset");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не указано оснащение привода')
        };

        let BoMark = document.querySelector('#controle-blocks-series').value;

        let tuMpX1 = document.querySelector('#maxStepMp').value ? 'МП40-' + document.querySelector('#maxStepMp').value : '';
        let tuMpX2 = document.querySelector('#stepForOne').value;
        let TuMp = tuMpX1 ? tuMpX1 + '-' + tuMpX2 : '';
        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';
        let secondBlock = document.querySelector("#controle-blocks2").value;
        // CХЕМА
        let schemeForSend = $("input[name='constructive-scheme']:checked").val();

        // ДОП ОПЦИИ
        let addOption1 = document.querySelector('#PanelOption').checked ? 'Механический селектор переключения режима работы местн./дист.' : '';
        let addOption2 = '';
        if (BoMark == 'Э1' || BoMark == 'ВЭ1' || BoMark == 'Э1S' || BoMark == 'ВЭ') {
            addOption2 = 'Плата регистратор';
        } else { addOption2 = '' };

        let addOptions = addOption1 ? addOption1 + ' ' + '' + ' ' + addOption2 : addOption2;
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
        let j10 = 'Электроприводы многообортные ЭП4'; //тип арматуры
        let j11 = TuMp ? document.querySelector('#mark-gen').innerText + '/' + TuMp : document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j13 = document.querySelector('#closingTime').value ? document.querySelector('#closingTime').value : ' '; //время закрытия
        let j14 = document.querySelector('#upper-limit').value; //Максимальный крутящий момент
        let j15 = document.querySelector('#flange').value; //присоединение к приводу
        let j16 = ''; // установка
        let j17 = document.querySelector('#rotation-frequency').value; // частота вращения
        let j18 = schemeForSend; // конструктивная схема 
        let j19 = document.querySelector('#closeNumbers').value ? document.querySelector('#closeNumbers').value : ' '; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text().trim(); //исполнение по назначению
        let j21 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text().trim(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Влагозащита
        let j23 = $("input[name='rotating']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Вращение вых вала
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3
        let j30 = document.querySelector("#sumBlocks").value; // тип бу
        let j31 = checkSecondCommandBlock() ? 'Основная плата: ' + checkCommandBlock() + '; ' + checkSecondCommandBlock() : checkCommandBlock(); // Тип управления
        let j32 = selectRemoteSignal(); // сигналы дист управления

        let j33 = ''; //Тип БКВ
        if (BoMark == 'Э0') {
            j33 = 'ЭМД';
        } else if (BoMark == 'Э2') {
            j33 = 'ЭБКВ';
        } else if (BoMark == 'М1') {
            j33 = 'МБКВ';
        } else if (BoMark == 'Э1S') {
            j33 = 'ЭИМУИ';
        } else if (BoMark == 'Э1') {
            document.querySelector('#commandBlockType-1').checked ? (j33 = 'ЭИМУ') : document.querySelector('#commandBlockType-2').checked ? (j33 = 'ВИМУ') : 'Конфигуратор пропущен';
        }

        let j34 = ''; //Механический указатель
        if (document.querySelector('#pointer').checked) {
            j34 = 'Есть,' + ' ход штока: ' + document.querySelector("#stockForPointer").value + 'мм.';
        } else {
            j34 = 'Отсутствует';
        }

        let j35 = selectPositionSignalSecondCommandBlock() ? 'Основная плата: ' + selectPositionSignal() + '; ' + selectPositionSignalSecondCommandBlock() : selectPositionSignal(); // Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if ((BoMark == 'Э13' || BoMark == 'Э15' || BoMark == 'Э17' || BoMark == 'ВЭ13' || BoMark == 'ВЭ15' || BoMark == 'ВЭ17') || (secondBlock == 'Э13' || secondBlock == 'Э15' || secondBlock == 'Э17' || secondBlock == 'ВЭ13' || secondBlock == 'ВЭ15' || secondBlock == 'ВЭ17')) {
            j36 = 'Есть';
        }
        else {
            j36 = 'Отсутствует';
        }

        let j37 = ''; // Дублирование RS485
        if ((j30 == 'Э18' || j30 == 'Э110' || j30 == 'Э24' || j30 == 'Э26') || (secondBlock == 'Э18' || secondBlock == 'Э110' || secondBlock == 'Э24' || secondBlock == 'Э26')) {
            j37 = 'Есть';
        } else {
            j37 = 'Отсутствует';
        }

        let j38 = 'Одиночные';
        if (optForBu == 'Z' || optForBu == 'W') {
            j38 = 'Сдвоенные';
        } // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели
        if (optForBu == 'Z' || optForBu == 'W') {
            j39 = 'Сдвоенные';
        } // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели
        if (optForBu == 'Z' || optForBu == 'W') {
            j310 = 'Сдвоенные';
        } // Концевые выключатели

        let j311 = ''; // Монтаж БУ
        if (BoMark == 'Э1') {
            j311 = 'Выносной';
        } else {
            j311 = 'На приводе';
        }

        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];
        // Кабели
        let connectionCableType = (document.querySelector("#protCabelNum").value ? 'Бронированный кабель, кол-во: ' + document.querySelector("#protCabelNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protCabelInput").value + 'мм.; ' : '') +
            (document.querySelector("#metalNum").value ? 'Кабель под металлорукавом, кол-во: ' + document.querySelector("#metalNum").value + 'шт.' + ' Диаметр металлорукава: ' + document.querySelector("#metalInput").value + 'мм.; ' : '') +
            (document.querySelector("#protectMetalNum").value ? 'Кабель под бронированным в металлорукаве, кол-во: ' + document.querySelector("#protectMetalNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protectMetalInput").value + 'мм.; ' : '') +
            (document.querySelector("#stubsNum").value ? 'Заглушки, кол-во: ' + document.querySelector("#stubsNum").value + 'шт.; ' : '');
        let addTuMp = TuMp ? 'Прямоходный модуль: ' + TuMp + '; ' : '';
        let addReq = document.querySelector('#addReqarea').value ? document.querySelector('#addReqarea').value + '; ' : '';
        //json4
        let j40 = $("input[name='connectionForEp4']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = document.querySelector('#cap').checked ? 'Есть,' + ' вылет штока: ' + document.querySelector("#stockForCap").value + 'мм.' : 'Отсутствует'; //Защитный колпак
        let j42 = document.querySelector('#color-1').checked ? 'Серый' : document.querySelector('#ralColor').value; //Цвет
        let j43 = ''; //Механический селектор
        let j44 = addOptions; //Доп опции
        let j45 = connectionCableType ? addReq + 'Требования по кабелям: ' + connectionCableType + addTuMp : addReq + addTuMp; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Назначение по режиму работы
        let j51 = $("input[name='connectionForEp4']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Электрическое подключение (расшифровка)
        let j52 = 'SIL-3'; // SIL

        // let special1 = document.querySelector("#special-1").checked ? $("#special-1").siblings('label').text() : '';
        let special2 = document.querySelector("#special-2").checked ? $("#special-2").siblings('label').text() + '; ' : '';
        let special3 = document.querySelector("#special-3").checked ? $("#special-3").siblings('label').text() + '; ' : '';
        let special4 = document.querySelector("#special-4").checked ? $("#special-4").siblings('label').text() + '; ' : '';
        let special5 = document.querySelector("#special-5").checked ? $("#special-5").siblings('label').text() + '; ' : '';
        let special6 = document.querySelector("#special-6").checked ? $("#special-6").siblings('label').text() + '; ' : '';
        let specialSumTxt = special2 + special3 + special4 + special5 + special6;
        let j53 = specialSumTxt ? specialSumTxt : 'Нет специального исполнения'; //Специальное исполнение

        let j54 = ''; //Масса
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = '?'; //Номинальное давление
        let j61 = $("input[name='connection-type']:checked").closest('.form-check').find('.form-check-label').text(); //Тип присоединения выходного вала
        let j62 = '?'; //Кабельные вводы
        let j63 = '?'; //Штепсельные разъемы
        let j64 = '?'; //Тип подводимых кабелей
        let j65 = '380В';
        if (document.querySelector('#special-4').checked) {
            j65 = '660В';
        }

        // json6 = [j60, j61, j62, j63];
        //json7
        let j70 = ''; //Защита от коррозии
        let j71 = ''; //Ручной маховик
        let j72 = ''; //Наличие обогрев
        let j73 = ''; //Наличие типа функции
        let j74 = ''; //Функция при питании
        let j75 = ''; //Условие для запуска функции
        // json7 = [j70, j71, j72, j73, j74, j75];

        console.log(
            [j00, j01, j02, j03, j04, j05],
            [j10, j11, j12, j13, j14, j15, j16, j17, j18, j19],
            [j20, j21, j22, j23, j24],
            [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311],
            [j40, j41, j42, j43, j44, j45],
            [j50, j51, j52, j53, j54],
            [j60, j61, j62, j63, j64, j65],
            [j70, j71, j72, j73, j74, j75]
        );

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
                    let mark = data.mark
                    let id = data.id;
                    let name = data.name;
                    DOCX(id, name, mark);
                    EXEL(id, name, mark);
                    allInPdf(id, name, mark);
                });
        }
        sendToServer();
    });

    // сокрытия пункта Ral
    $('#colorType').on('change', function (e) {
        if (document.querySelector('#color-2').checked) {
            document.querySelector('#ralDiv').classList.remove('none');
        } else {
            document.querySelector('#ralDiv').classList.add('none');
            document.querySelector('#ralColor').value = '';
        }
    });
    // сокрытие/открытие вылета штока под колпаком
    $('#pointerAndCap').on('change', function (e) {
        if (document.querySelector("#pointer").checked) {
            document.querySelector('#stockForPointerDiv').classList.remove('none');
        } else {
            document.querySelector('#stockForPointerDiv').classList.add('none');
            document.querySelector('#stockForPointerDiv').value = '';
        }
    });
    // сокрытие/открытие вылета штока под колпаком
    $('#pointerAndCap').on('change', function (e) {
        if (document.querySelector("#cap").checked) {
            document.querySelector('#stockForCapDiv').classList.remove('none');
        } else {
            document.querySelector('#stockForCapDiv').classList.add('none');
            document.querySelector('#stockForCapDiv').value = '';
        }
    });

    // Обработка М1 блока по позиции в форме
    $('#m1-form').on('change', function (e) {
        let mod = 0;
        $.each($('#m1-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        });
        // let up = $('#upper-limitForM1').val() ? $('#upper-limitForM1').val() : '';
        spot = document.querySelector("#mLimitNum").value ? document.querySelector("#mLimitNum").value : '';

        $('.cur-m1-value')
            .text('М1' + mod + spot)
            .val('М1' + mod + spot);
    });

    $('#clear-m1').on('click', function (e) {
        $('#m1-form')[0].reset();
        $('.cur-m1-value').text('М10').val('M10');
    });

    // Проверка кол-ва оборотов
    $('#closeNumbersForM').on('change', function () {
        if (document.querySelector("#closeNumbersForM").value > 0.8 && document.querySelector("#closeNumbersForM").value < 1250 && document.querySelector("#controle-blocks-series").value == 'М1') {
            $('#m1-submit').prop('disabled', false)
        }
        else {
            if (document.querySelector("#closeNumbersForM").value) {
                $('#m1-submit').prop('disabled', true);
                alert('Возможное количество оборотов в диапазоне от 0.8 до 1250')
            }
        }
    })

    function yo() {
        let upLim = document.querySelector('#upper-limit').value;
        let rotationFrequency = document.getElementById('rotation-frequency').value;
        let scheme = $("input[name='constructive-scheme']:checked").val();
        let closeNumbers = document.querySelector('#closeNumbers').value;
        let fetchResult = [];

        if (!scheme) {
            return alert('Пропущена cхема');
        }
        else if (!upLim) {
            return alert('Пропущен верхний предел');
        }
        else if (!rotationFrequency) {
            return alert('Пропущена частота вращения');
        }

        if (upLim && rotationFrequency && scheme && closeNumbers > 0.8 && closeNumbers < 1250) {
            fetch('https://emk.websto.pro/m1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [scheme, upLim, rotationFrequency, closeNumbers],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    document.querySelector("#mLimitNum").value = fetchResult[0];
                    $('#m1-form').trigger('change');
                });
        }
    }

    $("#block-configure-m1").on('shown.bs.modal', function () {
        yo();
    });

    $('#closeNumbers').on('keyup', function (e) {
        document.querySelector("#closeNumbersForM").value = document.querySelector("#closeNumbers").value;
        // yo();
    });

    $('#closeNumbersForM').on('keyup', function (e) {
        document.querySelector("#closeNumbers").value = document.querySelector("#closeNumbersForM").value;
        yo();
    });

    // Стиль для оборотов закрытия 
    $(document).on('change', function () {
        if (document.querySelector('#closeNumbers').value != '') {
            document.querySelector('.closeNumbers').classList.add('ReqValueOk');
            document.querySelector('.closeNumbers').classList.remove('noReqValue');
        } else {
            document.querySelector('.closeNumbers').classList.add('noReqValue');
            document.querySelector('.closeNumbers').classList.remove('ReqValueOk');
        }
    })
    // Стили для оборотов м1
    $('#m1-form').on('change', function (e) {
        if (document.querySelector("#closeNumbersForM").value || document.querySelector("#closeNumbers").value) {
            document.querySelector('.closeNumbersFieldForM').classList.remove('noReqValue');
            document.querySelector('.closeNumbersFieldForM').classList.add('ReqValueOk');
        } else {
            document.querySelector('.closeNumbersFieldForM').classList.remove('ReqValueOk');
            document.querySelector('.closeNumbersFieldForM').classList.add('noReqValue');
        };
    })

    $('#m1-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-m1-value').val()).trigger('change');
        m1BlockModal.hide();
    });

    $('#m2-form input').on('change', function (e) {
        let mod = 0;
        $.each($('#m2-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        });

        $('.cur-m2-value')
            .text('М2' + mod)
            .val('М2' + mod);
    });

    $('#clear-m2').on('click', function (e) {
        $('#m2-form')[0].reset();
        $('.cur-m2-value').text('М20').val('M20');
    });

    $('#m2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-m2-value').val()).trigger('change');
        m2BlockModal.hide();
    });

    $('#e1-submit').on('click', function (e) {
        $('#controle-blocks').val($('input.cur-execution-value').val()).trigger('change');
        vimuBlockModal.hide();
    });

    $('#e1s-submit').on('click', function (e) {
        $('#controle-blocks').val($('input.cur-e1s-value').val()).trigger('change');
        e1SBlockModal.hide();
    });

    $('#e1SModal').on('change', function (e) {
        let mod = $("input[name='Э1Sopt']:checked").val();
        $('.cur-e1s-value').text(mod).val(mod);
    });

    $('#e2-form input').on('change', function (e) {
        let mod = $("input[name='e2']:checked").val();
        $('.cur-e2-value').text(mod).val(mod);
    });

    $('#clear-e2').on('click', function (e) {
        $('#e2-form')[0].reset();
        $('.cur-e2-value').text('Э21').val('Э21');
    });

    $('#e2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-e2-value').val()).trigger('change');
        e2BlockModal.hide();
    });

    // КНОПКИ В КОНФИГУРАТОР
    $('#controle-blocks-series').on('click', function (e) {
        console.log($(this).val());
        // $("#controle-blocks").val('');

        if ($(this).val() === 'Э0') {
            $(document.querySelector('#controle-blocks')).show();
            $('#controle-blocks').val('Э01');
            $('#control-block-config').hide();
        } else if ($(this).val() === '') {
            $('#control-block-config').hide();
        } else {
            $(document.querySelector('#controle-blocks')).hide();
            $('#control-block-config').show();
        }
    });

    $('#control-block-config').on('click', function (e) {
        let cbs = $('#controle-blocks-series').val();
        if (cbs === 'М1') {
            m1BlockModal.show();
            $('#closeNumbersForM').trigger('change');
        } else if (cbs === 'М2') {
            m2BlockModal.show();
        } else if (cbs === 'ВЭ' || cbs === 'Э0' || cbs === 'Э1') {
            vimuBlockModal.show();
        } else if (cbs === 'Э2') {
            e2BlockModal.show();
        } else if (cbs === 'Э1S') {
            e1SBlockModal.show();
        }
    });

    $('#controle-blocks-series').on('change', function (e) {
        let cbs = $('#controle-blocks-series').val();
        let cb = $('#controle-blocks');
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1' || cbs === 'Э1S') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });

    // открытие сертификатов и деклараций под общепром и взрыв
    $('#execution-wrap').on('change', function (e) {
        $('#electricityField').trigger('change');
        if (document.querySelector("#execution-Н").checked) {
            $('#declaration').show();
            $('#declarationV').hide();
            $('#certV').hide();
        }
        else {
            $('#declaration').hide();
            $('#declarationV').show();
            $('#certV').show();
        }
    });

    // Проверка на запорно-регулирующую арматуру для пм модуля
    $('.timeMode').on('change', function (e) {
        if ($("input[name='working-mode']:checked").val() == 'Р') {
            document.querySelector('.tuMpField').style.display = 'block';
        } else {
            document.querySelector('.tuMpField').style.display = 'none';
            document.querySelector("#tuMpCheck > input[type=checkbox]").checked = false;
            $('#tuMpCheck').trigger('change');
        }
    });

    $('#block-configure-e2').on('change', function (e) {
        if (document.querySelector("#e2-1").checked) {
            $('#e22signalDiv').show();
        }
        else {
            document.querySelector("#e22signal4").checked = false;
            document.querySelector("#e22signal0").checked = false;
            $('#e22signalDiv').hide();
        }
    });

    // Открытие пункта виму эиму для блока управления
    $('#control-block-fieldset').on('change', function (e) {
        if ($('#controle-blocks-series').val() == 'Э1') {
            document.querySelector('.commandBlockType').style.display = 'block';
        } else {
            document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
            document.querySelector('.commandBlockType').classList.add('noReqValue');
            document.querySelector('#commandBlockType-2').checked = false;
            document.querySelector('#commandBlockType-1').checked = false;
            document.querySelector('.commandBlockType').style.display = 'none';
        }
    });
    // Открытие доп оснащения для блока управления при Э1
    $('#control-block-fieldset').on('change', function (e) {
        if ($('#controle-blocks-series').val() == 'Э1') {
            document.querySelector('#control-block-optionsset').style.display = 'block';
            document.querySelector('#control-block-optionssetCheckBox').style.display = 'block';
        } else {
            $('#controle-blocks-options').val('noValue');
            document.querySelector('#PanelOption').checked = false;
            document.querySelector('#tOption').checked = false;
            document.querySelector('#bluetoothOption').checked = false;
            document.querySelector('#regOption').checked = false;
            document.querySelector('#control-block-optionsset').style.display = 'none';
            document.querySelector('#control-block-optionssetCheckBox').style.display = 'none';
            document.querySelector('#control-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.add('noReqValue');
        }
    });

    // СТИЛЬ ДЛЯ ПОЛЯ С ДАННЫМИ
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
    // СТИЛЬ ДЛЯ ПОЛЯ Со схемами
    $('№schemeFieldSet').on('change', function (e) {
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
    // Стиль для модуля Модуль прямоходный
    $('.tuMpField').on('change', function (e) {
        if (document.querySelector('#tuMpCheck > input[type=checkbox]').checked) {
            document.querySelector('.tuMpField ').classList.add('ReqValueOk');
            document.querySelector('.tuMpField ').classList.remove('noReqValue');
        } else {
            document.querySelector('.tuMpField ').classList.add('noReqValue');
            document.querySelector('.tuMpField ').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Наибольший ход, мм
    $('#maxStepMpField').on('change', function (e) {
        if (document.querySelector('#maxStepMp').value != '') {
            document.querySelector('.maxStepMp').classList.add('ReqValueOk');
            document.querySelector('.maxStepMp').classList.remove('noReqValue');
        } else {
            document.querySelector('.maxStepMp').classList.add('noReqValue');
            document.querySelector('.maxStepMp').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Номинальный крутящий момент
    $('#tuMpField').on('change', function (e) {
        if (document.querySelector('#roundMomentMp').value != '') {
            document.querySelector('#roundMomentMpField').classList.add('ReqValueOk');
            document.querySelector('#roundMomentMpField').classList.remove('noReqValue');
        } else {
            document.querySelector('#roundMomentMpField').classList.add('noReqValue');
            document.querySelector('#roundMomentMpField').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Крутящий момент привода
    $('#tuMpField').on('change', function (e) {
        if (document.querySelector('#roundMomentEngine').value != '') {
            document.querySelector('.roundMomentEngine').classList.add('ReqValueOk');
            document.querySelector('.roundMomentEngine').classList.remove('noReqValue');
        } else {
            document.querySelector('.roundMomentEngine').classList.add('noReqValue');
            document.querySelector('.roundMomentEngine').classList.remove('ReqValueOk');
        }
    });

    // Стиль для модуля Диапазон усилий на штоке модуля при настройке привода на крутящий момент
    $('#tuMpField').on('change', function (e) {
        if (document.querySelector('#roundMomentInterval').value != '') {
            document.querySelector('.roundMomentInterval').classList.add('ReqValueOk');
            document.querySelector('.roundMomentInterval').classList.remove('noReqValue');
        } else {
            document.querySelector('.roundMomentInterval').classList.add('noReqValue');
            document.querySelector('.roundMomentInterval').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Ход штока модуля за один оборот
    $('#tuMpField').on('change', function (e) {
        if (document.querySelector('#stepForOne').value != '') {
            document.querySelector('.stepForOne').classList.add('ReqValueOk');
            document.querySelector('.stepForOne').classList.remove('noReqValue');
        } else {
            document.querySelector('.stepForOne').classList.add('noReqValue');
            document.querySelector('.stepForOne').classList.remove('ReqValueOk');
        }
    });

    // Стиль для модуля требуемого время закрытия
    $('#stepClose').on('change', function (e) {
        if (document.querySelector('#closingTime').value !== '') {
            console.log('uslovue');
            document.querySelector('.closingTime').classList.remove('noReqValue');
            document.querySelector('.closingTime').classList.add('ReqValueOk');
        } else {
            document.querySelector('.closingTime').classList.remove('ReqValueOk');
            document.querySelector('.closingTime').classList.add('noReqValue');
        }
    });

    // Тип блока концевых выключателей
    $('.typeEndSwich').on('change', function (e) {
        if (document.querySelector('#typeEndSwich-1').checked || document.querySelector('#typeEndSwich-2').checked) {
            document.querySelector('.typeEndSwich').classList.add('ReqValueOk');
            document.querySelector('.typeEndSwich').classList.remove('noReqValue');
        } else {
            document.querySelector('.typeEndSwich').classList.add('noReqValue');
            document.querySelector('.typeEndSwich').classList.remove('ReqValueOk');
        }
    });
    // Тип блока управления привода
    $('.commandBlockType').on('change', function (e) {
        if (document.querySelector('#commandBlockType-1').checked || document.querySelector('#commandBlockType-2').checked) {
            document.querySelector('.commandBlockType').classList.add('ReqValueOk');
            document.querySelector('.commandBlockType').classList.remove('noReqValue');
        } else {
            document.querySelector('.commandBlockType').classList.add('noReqValue');
            document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
        }
    });
    // Сигнализация положения
    $('.signal').on('change', function (e) {
        if (document.querySelector('#signal').value != '') {
            document.querySelector('.signal').classList.add('ReqValueOk');
            document.querySelector('.signal').classList.remove('noReqValue');
        } else {
            document.querySelector('.signal').classList.add('noReqValue');
            document.querySelector('.signal').classList.remove('ReqValueOk');
        }
    });
    // Сигналы дист управления
    $('.commandSignal').on('change', function (e) {
        if (document.querySelector('#commandSignal').value != '') {
            document.querySelector('.commandSignal').classList.add('ReqValueOk');
            document.querySelector('.commandSignal').classList.remove('noReqValue');
        } else {
            document.querySelector('.commandSignal').classList.add('noReqValue');
            document.querySelector('.commandSignal').classList.remove('ReqValueOk');
        }
    });

    // кол-во приводов
    $('#numbersOfEp').on('keyup', function (e) {
        if (document.querySelector('#numbersOfEp').value !== '') {
            $('#step-9').trigger('change');
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    // СТИЛИ ДЛЯ РЕЖИМА РАБОТЫ
    $('.timeMode').on('change', function (e) {
        if ($("input[name='working-mode']:checked")) {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        } else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');
        }
    });

    // стили оснащения для блока управления при Э1
    $('#control-block-optionsset').on('change', function (e) {
        if ($('#controle-blocks-options option:selected').val() !== 'noValue') {
            document.querySelector('#control-block-optionsset').classList.add('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.remove('noReqValue');
        } else {
            document.querySelector('#control-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.add('noReqValue');
        }
    });

    // ОБРАБОТКА ОПРЕДЕЛЕНИЯ БЛОКА УПРАВЛЕНИЯ
    function checkCommandBlock() {
        let e22signal = '';
        if (document.querySelector("#e22signal4").checked) {
            e22signal = '4-20Ма'
        }
        else {
            e22signal = '0-5мА'
        };

        let m1 = document.querySelector('#m1-1').checked ? 'Сигнализация о двух промежуточных положениях выходного вала посредством двух путевых промежуточных выключателей; ' : '';
        let m2 = document.querySelector('#m1-2').checked ? 'Сигнализация о текущем положении выходного вала посредством изменения сопротивления потенциометра; ' : '';
        let m3 = document.querySelector('#m1-3').checked
            ? 'Сигнализация о текущем положении выходного вала посредством токового сигнала, изменяющегося пропорционально пути, пройденному выходным валом привода; '
            : '';
        let m5 = document.querySelector('#m1-5').checked
            ? 'Сигнализация о достигаемых положениях и моментах посредством 4 контактных микровыключателей (код z5=0) или 3-контактных микровыключателей (код z5=1); '
            : '';
        let m6 = document.querySelector('#m1-6').checked
            ? 'Блокировка сигнала превышения заданного при настройке блока значения крутящего момента привода (байпас сигнала превышения момента) в начальный период движения из состояния, соответствующего открытому и закрытому состоянию арматуры (с раздельной настройкой для движения на открытие и на закрытие арматуры), на протяжении заданного при настройке блока пути, проходимого выходным валом привода; '
            : '';
        let m7 = document.querySelector('#m1-7').checked
            ? 'Блокировка возможности повторного включения двигателя привода по электрической цепи, содержащей нормально замкнутый контакт моментного выключателя, размыканием которого был выключен двигатель привода при достижении крутящего момента, заданного при настройке блока (фиксация моментных выключателей); '
            : '';

        let base = document.querySelector('#controle-blocks').value;
        switch (base) {
            case 'Э11':
                return 'Базовый набор функций';
            case 'Э12':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'Э13':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э14':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э15':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э16':
                return '1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э17':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э18':
                return '1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э19':
                return '1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э110':
                return '1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э22':
                return 'Передача информации о положении выходного вала привода посредством токового сигнала ' + e22signal;
            case 'Э23':
                return 'Передача информации о состоянии и настройках привода, изменение настроек привода посредством цифрового канала связи, интерфейс RS485, протокол обмена - MODBUS RTU';
            case 'Э24':
                return 'Передача информации о состоянии и настройках привода, изменение настроек привода посредством дублированного цифрового канала связи, интерфейс RS485, протокол обмена - MODBUS RTU';
            case 'Э25':
                return 'Передача информации о состоянии привода посредством цифрового канала связи, интерфейс RS485, протокол обмена - PROFIBUS DP';
            case 'Э26':
                return 'Передача информации о состоянии привода посредством дублированного цифрового канала связи, интерфейс RS485, протокол обмена - PROFIBUS DP';
            case '':
                return 'Пропущен конфигуратор';
            case 'Э1':
                return 'Пропущен конфигуратор';
            case 'Э1S':
                return 'Пропущен конфигуратор';
            case 'М1':
                return 'Пропущен конфигуратор';
            case 'Э2':
                return 'Пропущен конфигуратор';
            case 'Э01':
                return 'Электронный модуль датчиков';
            case 'Э0':
                return 'Электронный модуль датчиков';
            case 'Э1S1':
                return 'Базовый набор функций. Цифровое управление и настройка привода посредством цифрового канала связи, интерфейс RS485, протокол обмена - MODBUS';
            case 'Э1S2':
                return 'Базовый набор функций. Цифровое управление и приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена - PROFIBUS';
            default:
                console.log(base);
                return (g6 = m1 + m2 + m3 + m5 + m6 + m7);
        }
    }

    // Проверка доп платы
    function checkSecondCommandBlock() {
        let secondBlock = document.querySelector("#controle-blocks2").value;
        switch (secondBlock) {
            case 'Э11':
                return ' Дополнительная плата: Базовый набор функций';
            case 'Э12':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'Э13':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э14':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э15':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э16':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления. 5)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА).';
            case 'Э17':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э18':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э19':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э110':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            default:
                return '';
        }
    }

    function selectRemoteSignal() {
        let BoMark = document.querySelector('#controle-blocks-series').value;
        optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        if (BoMark == 'Э2') {
            return (remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В/220 В; ');
        }
        else if (BoMark == 'Э0' || BoMark == 'Э1S') {
            return (remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В; ');
        }
        else if (BoMark == 'М1') {
            return (remoteSignal = 'Сигналы дистанционного управления: пункт только для ЭИМУ или ВИМУ; ');
        }
        else if (BoMark == 'Э1') {
            if (optForBu == 'X') {
                return (remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В; ');
            }
            if (optForBu == 'Y') {
                return (remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В; ');
            }
            if (optForBu == 'Z') {
                return (remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В; ');
            }
            if (optForBu == 'V') {
                return (remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В; ');
            }
            if (optForBu == 'W') {
                return (remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В; ');
            } else {
                return (remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В; ');
            }
        }
        else {
            return (remoteSignal = 'Сигналы дистанционного управления: пункт только для ЭИМУ или ВИМУ; ');
        }
    }


    function selectPositionSignal() {
        let BoMark = document.querySelector('#controle-blocks').value;

        if (BoMark == 'Э11') {
            return (positionSignal = 'Отсутствует');
        } else if (BoMark == 'Э12' || BoMark == 'Э13' || BoMark == 'Э16' || BoMark == 'Э17') {
            return (positionSignal = '4–20 мА');
        } else if (BoMark == 'Э14' || BoMark == 'Э18' || BoMark == 'Э01' || BoMark == 'Э1S1') {
            return (positionSignal = 'RS485 Modbus');
        } else if (BoMark == 'Э15') {
            return (positionSignal = '4–20 мА и RS485 Modbus');
        } else if (BoMark == 'Э19' || BoMark == 'Э110' || BoMark == 'Э1S2') {
            return (positionSignal = 'Profibus DP');
        } else if (BoMark == 'Э22') {
            return (positionSignal = '4-20мА');
        } else if (BoMark == 'Э23' || BoMark == 'Э24') {
            return (positionSignal = 'RS485 Profibus');
        } else if (BoMark == 'Э25' || BoMark == 'Э26') {
            return (positionSignal = 'RS485 Profibus');
        } else if (document.querySelector('#m1-2').checked) {
            return (positionSignal = 'Сигнализация положения: потенциометр 100 Ом');
        } else if (document.querySelector('#m1-3').checked) {
            return (positionSignal = 'Сигнализация положения: 4-20мА');
        } else {
            return (positionSignal = '');
        }
    }

    // Обработка сигналов второго блока
    function selectPositionSignalSecondCommandBlock() {
        let BoMark = document.querySelector("#controle-blocks2").value;
        if (BoMark == 'Э11') {
            return positionSignal = ' Дополнительная плата: Отсутствуют';
        }
        else if (BoMark == 'Э12' || BoMark == 'Э13' || BoMark == 'Э16' || BoMark == 'Э17') {
            return positionSignal = ' Дополнительная плата: 4–20 мА';
        }
        else if (BoMark == 'Э14' || BoMark == 'Э18') {
            return positionSignal = ' Дополнительная плата: RS485 Modbus';
        }
        else if (BoMark == 'Э15') {
            return positionSignal = ' Дополнительная плата: 4–20 мА и RS485 Modbus';
        }
        else if (BoMark == 'Э19' || BoMark == 'Э110') {
            return positionSignal = ' Дополнительная плата: Profibus DP';
        }
        else {
            return positionSignal = '';
        }
    }

    // ОТКРЫТИЕ ПО ШАГАМ
    $('#step-1').on('change', function (e) {
        if ($("input[name='working-mode']:checked").val() != undefined && $("input[name='execution']:checked").val() != undefined) {
            $('#step-2').show();
        }
    });
    $('#step-2').on('change', function (e) {
        if ($("input[name='connection-type']:checked").val() != undefined && document.querySelector('#upper-limit') != '') {
            $('#step-3').show();
        }
    });
    $('#step-3').on('change', function (e) {
        if (document.querySelector('#rotation-frequency').value != '') {
            $('#step-4').show();
        }
    });
    $('#step-4').on('change', function (e) {
        if ($("input[name='constructive-scheme']:checked").val() != '1' && document.querySelector('#flange').value) {
            $('#step-5').show();
        }
    });
    $('#step-5').on('change', function (e) {
        if (document.querySelector('#control-block-fieldset').classList.contains('ReqValueOk') && document.querySelector('#climatic-modification').value != '') {
            $('#step-6').show();
        }
    });
    $('#step-6').on('change', function (e) {
        if ($("input[name='rotating']:checked").val() != undefined && $("input[name='protection']:checked").val() != undefined) {
            $('#step-7').show();
        }
    });
    $('#step-7').on('change', function (e) {
        if ($("input[name='color']:checked").val() != undefined && $("input[name='connectionForEp4']:checked").val() != undefined) {
            $('#step-8').show();
            $('#step-9').show();

        }
    });

    $('#step-9').on('change', function (e) {
        if (
            document.querySelector('#organization').value != '' &&
            document.querySelector('#fio').value != '' &&
            document.querySelector('#phone').value != '' &&
            document.querySelector('#email').value != '' &&
            document.querySelector('#numbersOfEp').value != ''
        ) {
            $('#step-10').show();
        }
    });
});
