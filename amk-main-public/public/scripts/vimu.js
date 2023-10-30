// http://www.tulaprivod.ru/dokument/rukovodstva/VIMU_2021.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

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
        else {
            $('#step-2').hide();
        }
    });

    $('#step-2').on('change', function (e) {
        if (document.querySelector("#engineStartType").classList.contains('ReqValueOk') && document.querySelector("#control-block-fieldset").classList.contains('ReqValueOk') && document.querySelector("#control-block-optionsset").classList.contains('ReqValueOk')) {
            $('#step-3').show();
        }
        else {
            $('#step-3').hide();
        }
    });

    $('#step-3').on('change', function (e) {
        if (document.querySelector("#climatic-modification").value !== ''
            && (document.querySelector("#protection-1").checked || document.querySelector("#protection-2").checked)) {
            $('#step-4').show();
        }
        else {
            $('#step-4').hide();
        }
    });


    $('#step-4').on('change', function (e) {
        if ($("input[name='connectionForVimu']:checked").val() && (document.querySelector("#color-1").checked || document.querySelector("#ralColor").value !== '')) {
            $('#step-5').show();
        }
        else {
            $('#step-5').hide();
        }
    });

    $('#step-5').on('change', function (e) {
        if ($("input[name='specialForVimu']:checked").val() || document.querySelector("#specialForVimu-1").checked) {
            $('#step-6').show();
        }
        else {
            $('#step-6').hide();
        }
    });

    $('#step-6').on('change', function (e) {
        if (document.querySelector("#organization").value !== '' && document.querySelector("#fio").value !== '' && document.querySelector("#phone").value !== '' && document.querySelector("#email").value !== '' && document.querySelector("#numbersOfEp").value !== '') {
            $('#step-7').show();
        }
        else {
            $('#step-7').hide();
        }
    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');
        let modal_button = $('#download');

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

        let x9 = $("input[name='specialForVimu']:checked").val() ? $("input[name='specialForVimu']:checked").val() : ''; //специальное исполнение
        switch ($('input[name="specialForVimu"]:checked').val()) {
            case undefined:
                ($("input[name='specialForVimu']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='specialForVimu']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='specialForVimu']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='specialForVimu']")).closest('fieldset').addClass('ReqValueOk');
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

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';


        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9].includes('X');

        mark_gen.text(x0 + x1 + '-' + x2 + x3 + '-' + x4 + optionssetCheckBox + optForBu + '-' + x5 + '-' + x6 + x7 + x8 + x9);

    });

    // ФЕТЧ НА ДОКУМЕНТАЦИЮ
    $('#download').on('click', function () {
        let BoMark = 'ВЭ1';
        console.log('hea');
        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        // ДОП ОПЦИИ
        let addOption1 = document.querySelector("#PanelOption").checked ? 'Механический селектор переключения режима работы местн./дист.' : '';
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
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = $("input[name='roundControl']:checked").closest('.form-check').find('.form-check-label').text(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text(); //Влагозащита
        let j23 = $("input[name='engineStartType']:checked").closest('.form-check').find('.form-check-label').text(); //способ включения двигателя
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3

        let j30 = document.querySelector("#controle-blocks").value; // тип бу 
        let j31 = checkCommandBlock() ? checkCommandBlock() : ''; // Тип управления

        let microOrPot = document.querySelector("#roundControl-1").checked ? ' + ' + document.querySelector("#microOrPot").value : '';
        let j32 = selectRemoteSignal() + microOrPot;// сигналы дист управления

        let j33 = 'ВИМУ'; //Тип БКВ

        let j34 = ''; //Механический указатель

        let j35 = selectPositionSignal(); // Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if (j30 == 'ВЭ13' || j30 == 'ВЭ15' || j30 == 'ВЭ17') {
            j36 = 'Есть';
        }
        else {
            j36 = 'Отсутствует';
        }


        let j37 = ''; // Дублирование RS485
        if (j30 == 'ВЭ18' || j30 == 'ВЭ110' || j30 == 'ВЭ24' || j30 == 'ВЭ26') { j37 = 'Есть' }
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

        //json4
        let j40 = $("input[name='connectionForVimu']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = ''; //Защитный колпак
        let j42 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j43 = ''; //Механический указатель
        let j44 = addOptions;//Доп опции 
        let j45 = document.querySelector('#addReqarea').value; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = $("input[name='engineStartType']:checked").closest('.form-check').find('.form-check-label').text(); //Назначение по режиму работы
        let j51 = $("input[name='connectionForVimu']:checked").closest('.form-check').find('.form-check-label').text(); //Электрическое подключение (расшифровка)
        let j52 = 'SIL-3'; // SIL
        let j53 = $("input[name='specialForVimu']:checked").closest('.form-check').find('.form-check-label').text(); //Специальное исполнение
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


        function DOCX(id, name) {
            window.open(`https://emk.websto.pro/Tula/${id + '/' + name}`);
        }
        function EXEL(id, name) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id + '/' + name}`);
        }
        function allInPdf(id, name) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id + '/' + name}`);
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
                    DOCX(id, name);
                    EXEL(id, name);
                    allInPdf(id, name);
                });
        }
        sendToServer();
    });

    // КНОПКИ В ТАБЛИЦЕ
    $("#e1-submit").on("click", function (e) {
        $("#controle-blocks").val($("input.cur-execution-value").val()).trigger("change");
        vimuBlockModal.hide();
    });

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
                return '1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
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
            return positionSignal = 'Отсутствуют';
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
        if (document.querySelector("#execution-1").checked) {
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
});