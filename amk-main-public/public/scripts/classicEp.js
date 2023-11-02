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

    // ПРОГРУЗКА числа оборотов С ТАБЛИЦЫ
    $('#connectionTypeForclassicEpa').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let select = document.querySelector("#roundNumbers");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
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
        exNumSelectCreate();
    });

    // Прогруз частоты вращения с таблицы
    $('#roundNumbers').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let select = document.querySelector("#outVal");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, rNumber],
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

    // Прогрузка крутящего момента на выходном валу с таблицы
    $('#outVal').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            select = document.querySelector("#roundMoment");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, rNumber, outVal],
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

    // Прогрузка типа бкв с таблицы
    $('#roundMoment').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let select = document.querySelector("#bkvType");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, rNumber, outVal, rMoment],
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

    // Прогрузка кабелей с таблицы
    $('#bkvType').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let bkv = document.querySelector("#bkvType").value;
            let select = document.querySelector("#salOrStepse");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, rNumber, outVal, rMoment, bkv],
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
                });
        }
        exNumSelectCreate();
    });

    // Получение модернизации и номера исполнения
    $('#salOrStepse').on('change', function (e) {
        function exNumSelectCreate() {
            let execution = $("input[name='epPlace']:checked").val();
            let connect = document.getElementById('connectionTypeForclassicEpa').value;
            let rNumber = document.querySelector("#roundNumbers").value;
            let outVal = document.querySelector("#outVal").value;
            let rMoment = document.querySelector("#roundMoment").value;
            let bkv = document.querySelector("#bkvType").value;
            let salOrStepse = document.querySelector("#salOrStepse").value;
            selectModern = document.querySelector("#upgradeNumber");
            selectExec = document.querySelector("#executionclassicEpaNumber");

            $(selectModern).empty();
            $(selectExec).empty();
            // selectModern.innerHTML = '<option value="" disabled selected>Выберите значение</option>';
            // selectExec.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/classicDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: [execution, connect, rNumber, outVal, rMoment, bkv, salOrStepse],
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

    //  стили для оборотов на закрытие
    $('.row').on('change', function (e) {
        if (document.querySelector("#bkvType").value != '') {
            document.querySelector("#bkvTypeField").classList.add('ReqValueOk');
            document.querySelector("#bkvTypeField").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#bkvTypeField").classList.remove('ReqValueOk');
            document.querySelector("#bkvTypeField").classList.add('noReqValue');
        }
    });
    //  стили для оборотов на закрытие
    $('.row').on('change', function (e) {
        if (document.querySelector("#roundNumbers").value != '') {
            document.querySelector("#roundNumbersFieldSet").classList.add('ReqValueOk');
            document.querySelector("#roundNumbersFieldSet").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#roundNumbersFieldSet").classList.remove('ReqValueOk');
            document.querySelector("#roundNumbersFieldSet").classList.add('noReqValue');
        }
    });

    $('.row').on('change', function (e) {
        if (document.querySelector("#salOrStepse").value != '') {
            document.querySelector("#salOrStepseField").classList.add('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.remove('noReqValue');
        }
        else {
            document.querySelector("#salOrStepseField").classList.remove('ReqValueOk');
            document.querySelector("#salOrStepseField").classList.add('noReqValue');
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

        let x3 = $('#upgradeNumber').val() ? $('#upgradeNumber').val() : 'X';
        switch (x3) {
            case 'X':
                $('#upgradeNumber').closest('fieldset').removeClass('ReqValueOk');
                $('#upgradeNumber').closest('fieldset').addClass('noReqValue');
                break;
            case '0':
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

    // Формула для требуемого времени закрытия по оборотам
    $('#changeTime').on('change', function (e) {
        closeNumbers = document.querySelector('#roundNumbers').value;
        rotAtMin = document.querySelector('#outVal').value;
        if (closeNumbers && rotAtMin) {
            document.querySelector('#closingTime').value = closingTime = Math.round(closeNumbers / (rotAtMin / 60));
            $('#closingTime').trigger('change');
        }
    });

    // Стиль для времени закрытия
    $('.closingTime').on('change', function (e) {
        if (document.querySelector('#closingTime').value != '') {
            document.querySelector('.closingTime').classList.add('ReqValueOk');
            document.querySelector('.closingTime').classList.remove('noReqValue');
        } else {
            document.querySelector('.closingTime').classList.add('noReqValue');
            document.querySelector('.closingTime').classList.remove('ReqValueOk');
        }
    });

    // ОТКРЫТИЕ ПО ШАГАМ
    $('#step-1').on('change', function (e) {
        if ($("input[name='epPlace']:checked").val() != undefined && document.querySelector("#connectionTypeForclassicEpa").value != '') {
            $('#step-2').show();
        } else {
            $('#step-2').hide();
        }
    });
    $('#step-2').on('change', function (e) {
        if (document.querySelector("#roundNumbers").value != '' && document.querySelector("#outVal").value != '') {
            $('#step-3').show();
        } else {
            $('#step-3').hide();
        }
    });
    $('#step-3').on('change', function (e) {
        if (document.querySelector("#roundMoment").value != '' && document.querySelector('#bkvType').value != '') {
            $('#step-4').show();
        } else {
            $('#step-4').hide();
        }
    });
    $('#step-4').on('change', function (e) {
        if (document.querySelector("#salOrStepse").value != '' && document.querySelector("#upgradeNumber").value != '') {
            $('#step-5').show();
        } else {
            $('#step-5').hide();
        }
    });
    $('#step-5').on('change', function (e) {
        if (document.querySelector("#climate").value != '') {
            $('#step-6').show();
        } else {
            $('#step-6').hide();
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
        } else {
            $('#step-7').hide();
        }
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
        let j16 = ''; // установка
        let j17 = document.querySelector("#outVal").value; // частота вращения
        let j18 = document.querySelector("#upgradeNumber").value; // номер модернизации
        let j19 = document.querySelector("#roundNumbers").value; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='epPlace']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = 'Запорная'; //режим работы
        let j22 = 'IP54'; //Влагозащита
        let j23 = document.querySelector("#additional-3").checked ? 'Закрывание против часовой стрелке' : 'Закрывание по часовой стрелке'; //Вращение вых вала
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
        let j43 = '380В 6 фаз'; //механический селектор
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


        function DOCX(id, name) {
            window.open(`https://emk.websto.pro/Tula/${id + '/' + name}`);
        }
        function EXEL(id, name) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id + '/' + name}`);
        }
        function allInPdf(id, name) {
            window.open(`https://emk.websto.pro/TulaPDF/${id + '/' + name}`);
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
                    let name = name.id;
                    DOCX(id, name);
                    EXEL(id, name);
                    allInPdf(id, name);
                });
        }
        sendToServer();
    });
});            
