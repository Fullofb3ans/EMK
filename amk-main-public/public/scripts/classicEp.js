// https://www.tulaprivod.ru/dokument/rukovodstva/BLTU_89_2022_v2.pdf
$(document).ready(function () {

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

            fetch('https://emk.websto.pro/classicDB', {
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

    // Вставка картинок по типа
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

    // ПРОГРУЗКА номера модернизации С ТАБЛИЦЫ
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        function upgradeNumberSelect() {
            let execution = $("input[name='epPlace']:checked").val();
            let connection = document.querySelector("#connectionTypeForclassicEpa").value;
            let select = document.querySelector('#upgradeField');
            $('#select').empty();


            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connection],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    $(select).empty();
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        console.log(item);
                        $(select).append(
                            $('<div>')
                                .prop({ class: 'form-check' })
                                .append(
                                    $('<input>').prop({
                                        type: 'radio',
                                        value: item == 'Отсутствует' ? 0 : item,
                                        name: 'upgradeNumber',
                                        id: item == 'Отсутствует' ? 'upEmpty' : 'up' + item,
                                    })
                                )
                                .append(
                                    $('<label>')
                                        .prop({
                                            for: 'upgradeNumber' + item,
                                            class: 'form-check-label',
                                        })
                                        .text(' ' + item)
                                )
                        );
                        $('#upОтсутствует') ? $('#upОтсутствует').val('') : '';
                    });
                });
        }
        upgradeNumberSelect();
    });

    // ПРОГРУЗКА номера исполнения С ТАБЛИЦЫ
    $('#upgradeField').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let upgrade = $("input[name='upgradeNumber']:checked").val();
            let select = document.querySelector("#executionclassicEpaNumber");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, upgrade],
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    for (i in res) fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        if (item < 10) {
                            item = '0' + item;
                        };
                        $(select).append(new Option(item, item));
                    });
                });
        }
        exNumSelectCreate();
    });

    // ПРОГРУЗКА числа оборотов С ТАБЛИЦЫ
    $('#executionclassicEpaNumber').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let upgrade = $("input[name='upgradeNumber']:checked").val() == '' ? $("input[name='upgradeNumber']:checked").val(0) : $("input[name='upgradeNumber']:checked").val();
            let number = document.querySelector("#executionclassicEpaNumber").value;
            let select = document.querySelector("#roundNumbers");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, upgrade, number],
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
        exNumSelectCreate();
    });

    // ПРОГРУЗКА частоты вращения С ТАБЛИЦЫ
    $('#roundNumbers').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let upgrade = $("input[name='upgradeNumber']:checked").val() == '' ? $("input[name='upgradeNumber']:checked").val(0) : $("input[name='upgradeNumber']:checked").val();
            let number = document.querySelector("#executionclassicEpaNumber").value;
            let roundNumbers = document.querySelector("#roundNumbers").value;
            let select = document.querySelector("#outVal");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, upgrade, number, roundNumbers],
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
        exNumSelectCreate();
    });

    // ПРОГРУЗКА крутящего момента С ТАБЛИЦЫ
    $('#outVal').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let upgrade = $("input[name='upgradeNumber']:checked").val() == '' ? $("input[name='upgradeNumber']:checked").val(0) : $("input[name='upgradeNumber']:checked").val();
            let number = document.querySelector("#executionclassicEpaNumber").value;
            let roundNumbers = document.querySelector("#roundNumbers").value;
            let outval = document.querySelector("#outVal").value;
            let select = document.querySelector("#roundMoment");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, upgrade, number, roundNumbers, outval],
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
        exNumSelectCreate();
    });

    //Открытие блока выбора вводов
    $('#checkStepse').on('change', function (e) {
        if ((document.querySelector("#epPlace-1").checked && document.querySelector("#connectionTypeForclassicEpa").value == 'М' && document.querySelector("#executionclassicEpaNumber").value < 5)
            || (document.querySelector("#epPlace-1").checked && document.querySelector("#connectionTypeForclassicEpa").value == 'А' && document.querySelector("#up2").checked && document.querySelector("#executionclassicEpaNumber").value < 17)) {
            $('#salOrStepseField').show();
        }
        else {
            $('#salOrStepseField').hide();
        };
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
        if (document.querySelector('.numbersOfEp').value !== '') {
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    //  стили для вводов
    $('#salOrStepseField').on('change', function (e) {
        if ($("input[name='salOrStepse']:checked").val() != undefined) {
            document.querySelector("#salOrStepseField").classList.add('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#salOrStepseField").classList.remove('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.add('noReqValue');
        }
    });

    //  стили для крутящего момента
    $('#roundNumbers').on('change', function (e) {
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
        if (document.querySelector("#epPlace-1").checked) {
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
            document.querySelector("#engineUpgrade-1").checked = false;
            document.querySelector("#engineUpgrade-2").checked = false;
        }
    });

    //  Стиль для блока установки
    $('.placeForEnv').on('change', function (e) {
        if (document.querySelector('#placeForEnv-1').checked || document.querySelector('#placeForEnv-2').checked) {
            document.querySelector('.placeForEnv').classList.add('ReqValueOk');
            document.querySelector('.placeForEnv').classList.remove('noReqValue');
        } else {
            document.querySelector('.placeForEnv').classList.add('noReqValue');
            document.querySelector('.placeForEnv').classList.remove('ReqValueOk');
        }
    });

    // заполнение маркировки
    $(document).on('change', function (e) {


        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');

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

        let x3 = $("input[name='upgradeNumber']:checked").val() ? $("input[name='upgradeNumber']:checked").val() : 'X';
        switch (x3) {
            case 'X':
                ($("input[name='upgradeNumber']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='upgradeNumber']")).closest('fieldset').addClass('noReqValue');
                break;
            case '0':
                ($("input[name='upgradeNumber']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='upgradeNumber']")).closest('fieldset').addClass('ReqValueOk');
                x3 = '';
            default:
                ($("input[name='upgradeNumber']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='upgradeNumber']")).closest('fieldset').addClass('ReqValueOk');
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

        let x5 = $("input[name='engineUpgrade']:checked").val() ? $("input[name='engineUpgrade']:checked").val() : 'X';
        switch (x5) {
            case 'X':
                ($('#engineUpgrade')).closest('fieldset').removeClass('ReqValueOk');
                ($('#engineUpgrade')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#engineUpgrade')).closest('fieldset').removeClass('noReqValue');
                ($('#engineUpgrade')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $("input[name='additional-1']:checked").val() ? $("input[name='additional-1']:checked").val() : '';
        let x7 = $("input[name='additional-2']:checked").val() ? $("input[name='additional-2']:checked").val() : '';
        let x8 = $("input[name='additional-3']:checked").val() ? $("input[name='additional-3']:checked").val() : '';

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

    // Скачать документацию
    $('#download').on('click', function () {
        console.log('hea');
        Option1 = document.querySelector("#additional-1").checked ? 'Резистор' : '';
        Option2 = document.querySelector("#additional-2").checked ? 'Микровыключатели Д3031' : '';
        addOptions = Option1 + ' ' + Option2;
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
        let j16 = $("input[name='placeForEnv']:checked").closest('.form-check').find('.form-check-label').text(); // установка
        let j17 = document.querySelector("#outVal").value; // частота вращения
        let j18 = $("input[name='upgradeNumber']:checked").val(); // номер модернизации
        let j19 = document.querySelector("#roundNumbers").value; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='epPlace']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = 'Запорная'; //режим работы
        let j22 = 'IP54'; //Влагозащита
        let j23 = document.querySelector("#additional-3").checked ? 'Закрывание против часовой стрелке' : 'Закрывание по часовой стрелке'; //Вращение вых вала
        let j24 = document.querySelector("#climate").value; //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3

        let j30 = ''; // тип бу 
        let j31 = ''; // Тип управления
        let j32 = '6 реле';// сигналы дист управления

        let j33 = 'БКВ'; //Тип БКВ

        let j34 = ''; //Механический указатель

        let j35 = ''; // Сигнализация положения

        let j36 = ''; // Сигнал момэнт

        let j37 = ''; // Дублирование RS485;

        let j38 = 'Одиночные'; // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели

        let j311 = 'На приводе'; // Монтаж БУ
        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];

        //json4
        let j40 = ''; //Электрическое подключение (цифра)
        let j41 = ''; //Защитный колпак
        let j42 = ''; //Цвет
        let j43 = '380В 6 фаз'; //механический селектор
        let j44 = addOptions;//Доп опции 
        let j45 = document.querySelector('#addReqarea').value; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = ''; //Назначение по режиму работы
        let j51 = $("input[name='salOrStepse']:checked").val() ? $("input[name='salOrStepse']:checked").val() : ''; //Электрическое подключение (расшифровка)
        let j52 = ''; // SIL
        let j53 = ''; //Специальное исполнение
        let j54 = document.querySelector("#executionclassicEpaNumber").value; //номер исполнения электропривода
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = $("input[name='epPlace']:checked").val(); //буква исполнения классики
        let j61 = document.querySelector("#engineUpgrade-2").checked ? 'Под квадрат' : 'Под кулачки';//Тип присоединения выходного вала
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


        function DOCX(id) {
            window.open(`https://emk.websto.pro/Tula/${id}`);
        }
        function EXEL(id) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id}`);
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
                    DOCX(id);
                    EXEL(id);
                });
        }
        sendToServer();
    });

});            
