// http://www.tulaprivod.ru/dokument/rukovodstva/VIMU_2021.pdf
$(document).ready(function () {
    listToHtml();

    function listToHtml() {
        const jsonListToHtml = {
            // Исполнение
            '1': [
                {
                    "id": "Взрывозащищенное исполнение",
                    "value": "В"
                },
                {
                    "id": "Общепромышленное исполнение в металлическом корпусе",
                    "value": "Н"
                },
                {
                    "id": "Общепромышленное исполнение в пластиковом корпусе",
                    "value": "П"
                }
            ],

            // Контроль
            '2': [{
                "id": "Контроль по микровыключателям или потенциометрам привода",
                "value": "1"
            },
            {
                "id": "Контроль по цифровым датчикам привода",
                "value": "2"
            }
            ],

            // Питание ВИМУ
            '3': [{
                "id": "Трехфазовое электропитание (380 В, 50 Гц), электромеханический пускатель в ВИМУ",
                "value": "1"
            },
            {
                "id": "Трехфазовое электропитание (380 В, 50 Гц), твердотельный пускатель в ВИМУ",
                "value": "2"
            },
            {
                "id": "Однофазное электропитание (220 В, 50 Гц), электромеханический пускатель ВИМУ, двигатель привода с конденсатором",
                "value": "3"
            },
            {
                "id": "Однофазное электропитание (220 В, 50 Гц), твердотельный пускатель ВИМУ, двигатель привода с конденсатором",
                "value": "4"
            }
            ],

            // ДОП ОСНАЩЕНИЕ
            '4.1': [
                {
                    "id": "Стандартное оснащение",
                    "value": ""
                },
                {
                    "id": "Шесть сигнальных реле и дискретное управление с использованием пятиканальной линии связи 220 В",
                    "value": "X"
                },
                {
                    "id": "Восемь сигнальных реле и дискретное управление с использованием пятиканальной линии связи 24 В",
                    "value": "Y"
                },
                {
                    "id": "Двенадцать сигнальных реле и дискретное управление с использованием пятиканальной линии связи 24 В",
                    "value": "Z"
                },
                {
                    "id": "Восемь сигнальных реле и дискретное управление с использованием пятиканальной линии связи 220 В",
                    "value": "V"
                },
                {
                    "id": "Двенадцать сигнальных реле и дискретное управлением с использованием пятиканальной линии связи 220 В",
                    "value": "W"
                }
            ],

            // ДОП ОСНАЩЕНИЕ
            '4.2': [
                {
                    "id": "Твердотельный пускатель",
                    "value": "T"
                },
                {
                    "id": "Переключатель режимов работы на панели управления",
                    "value": "S"
                },
                {
                    "id": "Канал связи Bluetooth",
                    "value": "B"
                },
                {
                    "id": "Регистратор параметров состояния и конфигурации привода",
                    "value": "R"
                }
            ],

            // ТЕМПЕРАТУРА
            '5': [
                {
                    "id": "25°C/+60°C - 100% при 25°C - (У1)",
                    "value": "1"
                },
                {
                    "id": "40°C/+60°C - 100% при 25°C - (У1)",
                    "value": "2"
                },
                {
                    "id": "60°C/+60°C - 100% при 25°C - (УХЛ1)",
                    "value": "3"
                },
                {
                    "id": "10°C/+60°C - 100% при 45°C - (Т1)",
                    "value": "4"
                },
                {
                    "id": "40°C/+40°C - 100% при 25°C - (М1)",
                    "value": "5"
                },
                {
                    "id": "40°C/+40°C - 98% при 25°C - (М5.1)",
                    "value": "6"
                }
            ],

            // ЗАЩИТА
            '6': [
                {
                    "id": "IP67",
                    "value": "1"
                },
                {
                    "id": "IP68",
                    "value": "2"
                }
            ],

            // ЦВЕТ
            '7': [
                {
                    "id": "Серый",
                    "value": "1"
                },
                {
                    "id": "По спецификации заказа",
                    "value": "2"
                }
            ],

            // Электр подключение
            '8': [
                {
                    "id": "Заглушки на местах трех кабельный вводов, штепсельное подключение внутри привода",
                    "value": "0"
                },
                {
                    "id": "Кабельные вводы, 3 штуки, клеемное подключение внутри привода",
                    "value": "1"
                },
                {
                    "id": "Кабельные вводы, 3 штуки, штепсельное подключение внутри привода",
                    "value": "2"
                },
                {
                    "id": "Заглушки на местах кабельных вводов, клеемное подключение внутри привода",
                    "value": "4"
                },
                {
                    "id": "Кабельные вводы, 4-7шт. по спецификации заказа, клеммное подключение внутри привода",
                    "value": "6"
                },
                {
                    "id": "Кабельные вводы, 4-7шт. по спецификации заказа, штепсельное подключение внутри привода",
                    "value": "7"
                }
            ],

            // Специальное исполнение
            '9': [
                {
                    "id": "Нет специального исполнения",
                    "value": ""
                },
                {
                    "id": "Комплектуется кабелями для подключения привода",
                    "value": "К"
                },
                {
                    "id": "Исполнение ВИМУ для комплектования приводов серии ЭПН",
                    "value": "Э"
                }
            ]
        }

        $.each(jsonListToHtml[1], function (key, item) {
            $('#execution-wrap').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'execution-' + item.value,

                            name: 'execution',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'execution-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // ПРОГРУЗКА Контроля положения и крутящего момента
        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[2], function (key, item) {
            $('#roundControl').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'roundControl-' + item.value,
                            name: 'roundControl',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'roundControl-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // ПРОГРУЗКА Напряжение питания двигателя:
        $.each(jsonListToHtml[3], function (key, item) {
            $('#engineStartType').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'engineStartType-' + item.value,
                            name: 'engineStartType',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'engineStartType-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // Прогрузка доп оснащения
        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[4.1], function (key, item) {
            // if (item.value == ' ') { item.value = '' };
            $('#controle-blocks-options').append(new Option(item.id, item.value));
        });


        // ПРОГРУЗКА чекбокса доп оснащения:
        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[4.2], function (key, item) {
            $('#control-block-optionssetCheckBox').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'checkbox',
                            id: 'blockOption-' + item.value,
                            name: 'blockOption',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'blockOption-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // Прогрузка Температуры
        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[5], function (key, item) {
            $('#climatic-modification').append(new Option(item.id, item.value));
        });



        // ПРОГРУЗКА IP ЗАЩИТЫ:
        $.each(jsonListToHtml[6], function (key, item) {
            $('#waterProtection').append(
                $('<div>')
                    .prop({ class: 'form-check', id: item.id + 'div' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'protection-' + item.value,
                            name: 'protection',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'protection-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // ПРОГРУЗКА цвета:

        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[7], function (key, item) {
            $('#colorHere').append(
                $('<div>')
                    .prop({ class: 'form-check' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'color-' + item.value,
                            name: 'color',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'color-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });


        // ПРОГРУЗКА электрического подключения:

        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[8], function (key, item) {
            $('#electricity').append(
                $('<div>')
                    .prop({ class: 'form-check', id: 'electr' + item.value + 'div' })
                    .append(
                        $('<input>').prop({
                            type: 'radio',
                            id: 'connectionForVimu-' + item.value,
                            name: 'connectionForVimu',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'connectionForVimu-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });

        // ПРОГРУЗКА СПЕЦИАЛЬНОГО ИСПОЛНЕНИЯ:

        // fetchResult[0].sort((a, b) => a - b);
        $.each(jsonListToHtml[9], function (key, item) {
            $('#speciality').append(
                $('<div>')
                    .prop({ class: 'form-check', id: 'special' + item.value + 'div' })
                    .append(
                        $('<input>').prop({
                            type: 'checkbox',
                            id: 'specialForVimu-' + item.value,
                            name: 'specialForVimu',
                            value: item.value,
                            class: 'form-check-input ch-mark'
                        })
                    )
                    .append(
                        $('<label>')
                            .prop({
                                for: 'specialForVimu-' + item.value,
                                class: 'form-check-label',
                            })
                            .text(' ' + item.id)
                    )
            );
        });
    }

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

    $(document).on('click', '#ve2E16-table th, #ve2E16-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById('v216' + target);
        $('.cur-vexecution2e16-value').text(target).val(target);
        $('#ve2E16-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    $(document).on('change', function (e) {
        if ($('#controle-blocks2').val()) {
            document.querySelector("#blockOption-S").checked = false;
            $('#blockOption-S').closest('.form-check').hide();
        }
        else {
            $('#blockOption-S').closest('.form-check').show();
        }
    });

    // Обработка исполнений
    $('#speciality').on('change', function (e) {
        if (document.querySelector("#specialForVimu-").checked) {
            document.querySelector("#specialForVimu-К").disabled = true;
            document.querySelector("#specialForVimu-К").checked = false;
            document.querySelector("#specialForVimu-Э").disabled = true;
            document.querySelector("#specialForVimu-Э").checked = false;
        }
        else {
            document.querySelector("#specialForVimu-К").disabled = false;
            document.querySelector("#specialForVimu-Э").disabled = false;
        }
    })

    let vimuBlockModal = new bootstrap.Modal($("#block-configure-e1"));

    // Открытие потенциометра и микровыкл
    $('#roundControl').on('change', function (e) {
        if (document.querySelector("#roundControl-1").checked) {
            $(".microOrPotField").show();
        }
        else {
            $("#microOrPot").val('');
            $(".microOrPotField").hide();
        }
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

    // стиль потенциометра и микровыкл
    $('#roundControl').on('change', function (e) {
        if ((document.querySelector("#roundControl-2").checked) || (document.querySelector("#microOrPot").value != '')) {
            document.querySelector("#roundControl").classList.add('ReqValueOk');
        }
        else {
            document.querySelector("#roundControl").classList.add('noReqValue');
            document.querySelector("#roundControl").classList.remove('ReqValueOk');
        }
    });

    // Открытие по шагам
    $('#step-1').on('change', function (e) {
        if (document.querySelector("#executionWrapLegend").classList.contains('ReqValueOk') && document.querySelector("#roundControl").classList.contains('ReqValueOk')) {
            $('#step-2').show();
        }

    });

    $('#step-2').on('change', function (e) {
        if (document.querySelector("#engineStartType").classList.contains('ReqValueOk') && document.querySelector("#control-block-fieldset").classList.contains('ReqValueOk') && document.querySelector("#control-block-optionsset").classList.contains('ReqValueOk')) {
            $('#step-3').show();
        }

    });

    $('#step-3').on('change', function (e) {
        if (document.querySelector("#climatic-modification").value !== ''
            && (document.querySelector("#protection-1").checked || document.querySelector("#protection-2").checked)) {
            $('#step-4').show();
        }

    });

    $('#step-4').on('change', function (e) {
        if ($("input[name='connectionForVimu']:checked").val() && (document.querySelector("#color-1").checked || document.querySelector("#ralColor").value !== '')) {
            $('#step-5').show();
            $('#step-6').show();
        }

    });

    $('#step-6').on('change', function (e) {
        if (document.querySelector("#organization").value !== '' && document.querySelector("#fio").value !== '' && document.querySelector("#phone").value !== '' && document.querySelector("#email").value !== '' && document.querySelector("#numbersOfEp").value !== '') {
            $('#step-7').show();
        }

    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');

        let x0 = 'ВИМУ';
        let x1 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : ''; //взрывозащита
        switch ($("input[name='execution']:checked").val()) {
            case undefined:
                ($("input[name='execution']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='execution']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='execution']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='execution']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x2 = $("input[name='roundControl']:checked").val() ? $("input[name='roundControl']:checked").val() : 'X'; //контроль положения и крутящего момента

        let x3 = $("input[name='engineStartType']:checked").val() ? $("input[name='engineStartType']:checked").val() : 'X'; //способ включения двигателя привода
        switch (x3) {
            case 'X':
                ($("input[name='engineStartType']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='engineStartType']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='engineStartType']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='engineStartType']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#controle-blocks').val() ? $('#controle-blocks').val() : 'X'; //функциональные возможности
        switch (x4) {
            case 'X':
                ($('#controle-blocks')).closest('fieldset').removeClass('ReqValueOk');
                ($('#controle-blocks')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#controle-blocks')).closest('fieldset').removeClass('noReqValue');
                ($('#controle-blocks')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#climatic-modification').val() ? $('#climatic-modification').val() : 'X'; //температурное исполнение
        switch (x5) {
            case 'X':
                ($('#climatic-modification')).closest('fieldset').removeClass('ReqValueOk');
                ($('#climatic-modification')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#climatic-modification')).closest('fieldset').removeClass('noReqValue');
                ($('#climatic-modification')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $("input[name='protection']:checked").val() ? $("input[name='protection']:checked").val() : 'X'; //gost 14254-2015
        switch (x6) {
            case 'X':
                ($("input[name='protection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='protection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='protection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='protection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x7 = $("input[name='color']:checked").val() ? $("input[name='color']:checked").val() : 'X'; //color
        if ($("input[name='color']:checked").val() == '1' || document.querySelector('#ralColor').value != '') {
            $("input[name='color']").closest('fieldset').removeClass('noReqValue');
            $("input[name='color']").closest('fieldset').addClass('ReqValueOk');
        } else {
            $("input[name='color']").closest('fieldset').removeClass('ReqValueOk');
            $("input[name='color']").closest('fieldset').addClass('noReqValue');
        }

        let x8 = $("input[name='connectionForVimu']:checked").val() ? $("input[name='connectionForVimu']:checked").val() : 'X'; //электрическое подключение
        switch (x8) {
            case 'X':
                ($("input[name='connectionForVimu']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='connectionForVimu']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='connectionForVimu']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connectionForVimu']")).closest('fieldset').addClass('ReqValueOk');
        }

        let special1 = document.querySelector("#specialForVimu-").checked ? document.querySelector("#specialForVimu-").value : '';
        let special2 = document.querySelector("#specialForVimu-К").checked ? document.querySelector("#specialForVimu-К").value : '';
        let special3 = document.querySelector("#specialForVimu-Э").checked ? document.querySelector("#specialForVimu-Э").value : '';
        let specialSum = special1 + special2 + special3;
        let x9 = specialSum ? '-' + specialSum : ''; //специальное исполнение

        secondVimuBlock = $('#controle-blocks2').val() ? '/' + $('#controle-blocks2').val() : '';

        // ДОП ОПЦИИ ДЛЯ БЛОКА
        let blockOptionT = '';
        document.querySelector('#blockOption-T').checked ? (blockOptionT = document.querySelector('#blockOption-T').value) : '';

        let blockOptionS = '';
        document.querySelector('#blockOption-S').checked ? (blockOptionS = document.querySelector('#blockOption-S').value) : '';

        let blockOptionB = '';
        document.querySelector('#blockOption-B').checked ? (blockOptionB = document.querySelector('#blockOption-B').value) : '';

        let blockOptionR = '';
        document.querySelector('#blockOption-R').checked ? (blockOptionR = document.querySelector('#blockOption-R').value) : '';

        let optionssetCheckBox = blockOptionT + blockOptionS + blockOptionB + blockOptionR;

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        mark_gen.text(x0 + x1 + '-' + x2 + x3 + '-' + x4 + secondVimuBlock + optionssetCheckBox + optForBu + '-' + x5 + '-' + x6 + x7 + x8 + x9);

    });

    // ФЕТЧ НА ДОКУМЕНТАЦИЮ
    $('#download').on('click', function () {
        if (document.querySelector("#roundControl-1").checked == true && document.querySelector("#microOrPot").value == '') {
            goTo = document.querySelector("#roundControl");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран контроль')
        }
        else if (document.querySelector("#controle-blocks").value == '') {
            goTo = document.querySelector("#control-block-fieldset");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен конфигуратор')
        }
        else if (document.querySelector("#organization").value == '') {
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
        else if (document.querySelector("#color-2").checked && document.querySelector("#ralColor").value == '') {
            goTo = document.querySelector("#color-2");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не указан цвет краски')
        };

        secondBlock = document.querySelector("#controle-blocks2").value;
        let BoMark = 'ВЭ1';
        console.log('hea');
        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        // ДОП ОПЦИИ
        let addOption1 = document.querySelector("#blockOption-S").checked ? 'Механический селектор переключения режима работы местн./дист.' : '';
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
        let j10 = 'ВИМУ'; //тип арматуры
        let j11 = document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j13 = ''; // частота вращения
        let j14 = ''; //Крут момент
        let j15 = ''; //присоединение к приводу
        let j16 = ''; // установка
        let j17 = ''; //время закрытия
        let j18 = ''; // конструктивная схема
        let j19 = ''; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text().trim(); //исполнение по назначению
        let j21 = $("input[name='roundControl']:checked").closest('.form-check').find('.form-check-label').text().trim(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Влагозащита
        let j23 = $("input[name='engineStartType']:checked").closest('.form-check').find('.form-check-label').text().trim(); //способ включения двигателя
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3
        let j30 = document.querySelector("#sumBlocks").value; // тип бу 
        let j31 = checkSecondCommandBlock() ? 'Основная плата: ' + checkCommandBlock() + '; ' + checkSecondCommandBlock() : checkCommandBlock(); // Тип управления

        let microOrPot = document.querySelector("#roundControl-1").checked ? ' + ' + document.querySelector("#microOrPot").value + '; ' : '';
        let j32 = selectRemoteSignal() + microOrPot;// сигналы дист управления

        let j33 = 'ВИМУ'; //Тип БКВ

        let j34 = ''; //Механический указатель

        let j35 = selectPositionSignalSecondCommandBlock() ? 'Основная плата: ' + selectPositionSignal() + '; ' + selectPositionSignalSecondCommandBlock() : selectPositionSignal(); // Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if ((j30 == 'ВЭ13' || j30 == 'ВЭ15' || j30 == 'ВЭ17') || (secondBlock == 'ВЭ13' || secondBlock == 'ВЭ15' || secondBlock == 'ВЭ17')) {
            j36 = 'Есть';
        }
        else {
            j36 = 'Отсутствует';
        }

        let j37 = ''; // Дублирование RS485
        if ((j30 == 'ВЭ18' || j30 == 'ВЭ110' || j30 == 'ВЭ24' || j30 == 'ВЭ26') || (secondBlock == 'ВЭ18' || secondBlock == 'ВЭ110' || secondBlock == 'ВЭ24' || secondBlock == 'ВЭ26')) { j37 = 'Есть' }
        else { j37 = 'Отсутствует' };

        let j38 = 'Одиночные';
        if (optForBu == 'Z' || optForBu == 'W' || document.querySelector("#controle-blocks") == 'М21') { j38 = 'Сдвоенные' }; // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели
        if (optForBu == 'Z' || optForBu == 'W') { j39 = 'Сдвоенные' }; // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели
        if (optForBu == 'Z' || optForBu == 'W' || document.querySelector("#controle-blocks") == 'М25') { j310 = 'Сдвоенные' }; // Концевые выключатели

        let j311 = ''; // Монтаж БУ
        if (BoMark == 'ВЭ1') {
            j311 = 'Выносной';
        } else {
            j311 = 'На приводе';
        };
        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];
        let connectionCableType = (document.querySelector("#protCabelNum").value ? 'Бронированный кабель, кол-во: ' + document.querySelector("#protCabelNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protCabelInput").value + 'мм.; ' : '') +
            (document.querySelector("#metalNum").value ? 'Кабель под металлорукавом, кол-во: ' + document.querySelector("#metalNum").value + 'шт.' + ' Диаметр металлорукава: ' + document.querySelector("#metalInput").value + 'мм.; ' : '') +
            (document.querySelector("#protectMetalNum").value ? 'Кабель под бронированным в металлорукаве, кол-во: ' + document.querySelector("#protectMetalNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protectMetalInput").value + 'мм.; ' : '') +
            (document.querySelector("#stubsNum").value ? 'Заглушки, кол-во: ' + document.querySelector("#stubsNum").value + 'шт.;' : '');
        // Доп требования
        let addReq = document.querySelector('#addReqarea').value ? document.querySelector('#addReqarea').value + '; ' : '';
        //json4
        let j40 = $("input[name='connectionForVimu']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = ''; //Защитный колпак
        let j42 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j43 = ''; //Механический указатель
        let j44 = addOptions;//Доп опции 
        let j45 = connectionCableType ? addReq + 'Требования по кабелям: ' + connectionCableType : addReq; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = $("input[name='engineStartType']:checked").closest('.form-check').find('.form-check-label').text(); //Назначение по режиму работы
        let j51 = $("input[name='connectionForVimu']:checked").closest('.form-check').find('.form-check-label').text().trim(); //Электрическое подключение (расшифровка)
        let j52 = 'SIL-3'; // SIL

        let special1 = document.querySelector("#specialForVimu-").checked ? $("#specialForVimu-").siblings('label').text() : '';
        let special2 = document.querySelector("#specialForVimu-К").checked ? $("#specialForVimu-К").siblings('label').text() + '; ' : '';
        let special3 = document.querySelector("#specialForVimu-Э").checked ? $("#specialForVimu-Э").siblings('label').text() + '; ' : '';
        let specialSumTxt = special1 + special2 + special3;
        let j53 = specialSumTxt ? specialSumTxt.trim() : 'Нет специального исполнения'; //Специальное исполнение

        let j54 = ''; //Масса
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = '?'; //Номинальное давление
        let j61 = '?';//Тип присоединения выходного вала
        let j62 = '?'; //Кабельные вводы
        let j63 = '?'; //Штепсельные разъемы
        let j64 = '?'; //Тип подводимых кабелей
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
                    let mark = data.mark;
                    let id = data.id;
                    let name = data.name;
                    DOCX(id, name, mark);
                    EXEL(id, name, mark);
                    allInPdf(id, name, mark);
                });
        }
        sendToServer();
    });

    // КНОПКИ В ТАБЛИЦЕ
    $("#e1-submit").on("click", function (e) {
        $("#controle-blocks").val($("input.cur-execution-value").val()).trigger("change");
        vimuBlockModal.hide();
    });

    // ОГРАНИЧЕНИЕ ПО IP КЛИМАТИЧЕСКИХ УСЛОВИЙ
    $('#climatic-modification').on('change', function () {
        if (document.querySelector("#climatic-modification").value == '4' || document.querySelector("#climatic-modification").value == '5' || document.querySelector("#climatic-modification").value == '6') {
            $('#IP67div').hide();
            document.querySelector("#protection-1").checked = false;
        }
        else {
            $('#IP67div').show();
        };
    });

    // СОКРЫТИе 'Э' спешла при метал корпусе
    $('#executionWrapLegend').on('change', function () {
        if (document.querySelector("#execution-П").checked) {
            $('#specialЭdiv').hide();
            document.querySelector("#specialForVimu-Э").checked = false;
            $('#electr0div').hide();
            document.querySelector("#connectionForVimu-0").checked = false;
            $('#electr2div').hide();
            document.querySelector("#connectionForVimu-2").checked = false;
            $('#electr6div').hide();
            document.querySelector("#connectionForVimu-6").checked = false;
            $('#electr7div').hide();
            document.querySelector("#connectionForVimu-7").checked = false;
        }
        else {
            $('#specialЭdiv').show();
            $('#electr0div').show();
            $('#electr2div').show();
            $('#electr6div').show();
            $('#electr7div').show();
        }
    })

    // КНОПКА КОНФИГУРАТОРА
    function checkCommandBlock() {
        let base = document.querySelector('#controle-blocks').value;
        switch (base) {
            case 'ВЭ11':
                return 'Базовый набор функций';
            case 'ВЭ12':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'ВЭ13':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ14':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ15':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ16':
                return '1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления. 5)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА). ';
            case 'ВЭ17':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ18':
                return '1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ19':
                return '1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ110':
                return '1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
        }
    }

    function checkSecondCommandBlock() {
        let secondBlock = document.querySelector("#controle-blocks2").value;
        switch (secondBlock) {
            case 'ВЭ11':
                return ' Дополнительная плата: Базовый набор функций';
            case 'ВЭ12':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'ВЭ13':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ14':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ15':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ16':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления. 5)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ17':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ18':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ19':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ110':
                return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            default:
                return '';
        }
    }
    // МЕСТНЫЕ И ДИСТ СИГНАЛЫ
    function selectRemoteSignal() {
        optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        if (optForBu == 'X') {
            return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
        }
        if (optForBu == 'Y') {
            return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
        }
        if (optForBu == 'Z') {
            return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
        }
        if (optForBu == 'V') {
            return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
        }
        if (optForBu == 'W') {
            return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
        }
        else {
            return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
        }
    }


    function selectPositionSignal() {
        let BoMark = document.querySelector("#controle-blocks");
        if (BoMark == 'ВЭ11') {
            return positionSignal = 'Отсутствуют';
        }
        else if (BoMark == 'ВЭ12' || BoMark == 'ВЭ13' || BoMark == 'ВЭ16' || BoMark == 'ВЭ17') {
            return positionSignal = '4–20 мА';
        }
        else if (BoMark == 'ВЭ14' || BoMark == 'ВЭ18') {
            return positionSignal = 'RS485 Modbus';
        }
        else if (BoMark == 'ВЭ15') {
            return positionSignal = '4–20 мА и RS485 Modbus';
        }
        else if (BoMark == 'ВЭ19' || BoMark == 'ВЭ110') {
            return positionSignal = 'Profibus DP';
        }
        else {
            return positionSignal = '';
        }
    }

    // Обработка сигналов второго блока
    function selectPositionSignalSecondCommandBlock() {
        let BoMark = document.querySelector("#controle-blocks2").value;
        if (BoMark == 'ВЭ11') {
            return positionSignal = ' Дополнительная плата: Отсутствуют';
        }
        else if (BoMark == 'ВЭ12' || BoMark == 'ВЭ13' || BoMark == 'ВЭ16' || BoMark == 'ВЭ17') {
            return positionSignal = ' Дополнительная плата: 4–20 мА';
        }
        else if (BoMark == 'ВЭ14' || BoMark == 'ВЭ18') {
            return positionSignal = ' Дополнительная плата: RS485 Modbus';
        }
        else if (BoMark == 'ВЭ15') {
            return positionSignal = ' Дополнительная плата: 4–20 мА и RS485 Modbus';
        }
        else if (BoMark == 'ВЭ19' || BoMark == 'ВЭ110') {
            return positionSignal = ' Дополнительная плата: Profibus DP';
        }
        else {
            return positionSignal = '';
        }
    }

    $("#control-block-config").on("click", function (e) {
        vimuBlockModal.show();
    });

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

    $('#numbersOfEp').on('keyup', function (e) {
        if (document.querySelector('#numbersOfEp').value !== '') {
            $('#step-6').trigger('change');
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    // Сертификаты и декларации
    $('#execution-wrap').on('change', function (e) {
        if (document.querySelector("#execution-В").checked) {
            $('#vimuV').show();
            $('#vimuO').hide();
        }
        else {
            $('#vimuV').hide();
            $('#vimuO').show();
        }
    });

    // стили доп опций для бу 
    $('#control-block-optionsset').on('change', function (e) {
        if ($('#controle-blocks-options option:selected').val() !== 'noValue') {
            document.querySelector('#control-block-optionsset').classList.add('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.remove('noReqValue');
        } else {
            document.querySelector('#control-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.add('noReqValue');
        }
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

    $('#controle-blocks').on('change', function () {
        let BU = $('#controle-blocks').val();
        if (BU == 'ВЭ16') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                vimuBlock2ModalForE16.show();
            })
        }
        else if (BU == 'ВЭ18' || BU == 'ВЭ19' || BU == 'ВЭ110' || BU == 'ВЭ14') {
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
        $('#controle-blocks2').val() ? $('#sumBlocks').val($('#controle-blocks').val() + '/' + $('#controle-blocks2').val()) : $('#sumBlocks').val($('#controle-blocks').val());
    });

});