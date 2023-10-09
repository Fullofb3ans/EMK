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

    // Открытие шагов
    $(document).on('change', "input[name='roundControl']", function (e) {
        $("#step-3").show();
    });

    $(document).on('change', "input[name='engineStartType']", function (e) {
        $("#step-4").show();
    });

    $(document).on('change', "input[name='protection']", function (e) {
        $("#step-5").show();
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
        switch (x2) {
            case 'X':
                ($("input[name='roundControl']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='roundControl']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='roundControl']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='roundControl']")).closest('fieldset').addClass('ReqValueOk');
        }

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
        switch (x7) {
            case 'X':
                ($("input[name='color']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='color']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='color']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='color']")).closest('fieldset').addClass('ReqValueOk');
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

        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9].includes('X');

        mark_gen.text(x0 + x1 + '-' + x2 + x3 + '-' + x4 + '-' + x5 + '-' + x6 + x7 + x8 + x9);

        modal_button.toggle(!is_true);
        mark_gen.toggleClass("is-invalid", is_true).toggleClass('is-valid', !is_true);
    });

    // ФЕТЧ НА ДОКУМЕНТАЦИЮ
    $('#download').on('click', function () {
        let BoMark = document.querySelector("#controle-blocks-series").value;
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
        let j10 = 'Электроприводы неполноповоротные ЭПН'; //тип арматуры
        let j11 = document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j13 = 'частота вращения'; // частота вращения
        let j14 = document.querySelector("#upper-limit").value; //Максимальный крутящий момент
        let j15 = document.querySelector('#flange').value; //присоединение к приводу
        let j16 = $("input[name='placeForEnv']:checked").closest('.form-check').find('.form-check-label').text(); // установка
        let j17 = document.querySelector("#time-limit").value; //время закрытия
        let j18 = $("input[name='constructive-scheme']:checked").val(); // конструктивная схема
        let j19 = $("input[name='stroke']:checked").closest('.form-check').find('.form-check-label').text() + ' ' + 'градусов'; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text(); //Влагозащита
        let j23 = 'Закрывание по часовой стрелке'; //Вращение вых вала
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3

        let j30 = document.querySelector("#controle-blocks").value; // тип бу 
        let j31 = checkCommandBlock() ? checkCommandBlock() : ''; // Тип управления
        let j32 = selectRemoteSignal();// сигналы дист управления

        let j33 = ''; //Тип БКВ
        if (BoMark == 'М2') {
            j33 = 'МБКВ';
        }
        else if (BoMark == 'ВЭ1' || BoMark == 'ВЭ') {
            j33 = 'ВИМУ';
        }

        let j34 = ''; //Механический указатель
        if (document.querySelector("#pointer > input[type=checkbox]").checked) { j34 = 'Есть' }
        else { j34 = 'Отсутствует' };

        let j35 = selectPositionSignal(); // Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if (BoMark == 'ВЭ13' || BoMark == 'ВЭ15' || BoMark == 'ВЭ17') {
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
        let j40 = $("input[name='connection']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = document.querySelector("#cap > input[type=checkbox]").checked ? 'Есть' : 'Отсутствует'; //Защитный колпак
        let j42 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j43 = document.querySelector("#mechSelectorId > input[type=checkbox]") ? 'Есть' : 'Отсутствует'; //Механический указатель
        let j44 = addOptions;//Доп опции 
        let j45 = document.querySelector('#addReqarea').value; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //Назначение по режиму работы
        let j51 = $("input[name='connection']:checked").closest('.form-check').find('.form-check-label').text(); //Электрическое подключение (расшифровка)
        let j52 = 'SIL-3'; // SIL
        let j53 = $("input[name='specialForEpn']:checked").closest('.form-check').find('.form-check-label').text(); //Специальное исполнение
        let j54 = ''; //Масса
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = '?'; //Номинальное давление
        let j61 = 'Присоединение для фланцев из ряда F07...F40';//Тип присоединения выходного вала
        let j62 = '?'; //Кабельные вводы
        let j63 = '?'; //Штепсельные разъемы
        let j64 = '?'; //Тип подводимых кабелей
        let j65 = document.querySelector("#powerType").value;

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

    // КНОПКИ В ТАБЛИЦЕ
    $("#e1-submit").on("click", function (e) {
        $("#controle-blocks").val($("input.cur-execution-value").val()).trigger("change");
        vimuBlockModal.hide();
    });

    // КНОПКА КОНФИГУРАТОРА
    $("#controle-blocks-series").on("click", function (e) {
        console.log($(this).val());
        $("#controle-blocks").val('');

        if ($(this).val() === 'Э0') {
            $("#controle-blocks").val('Э01');
        }
    });

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

    $('#numbersOfEp').on('change', function (e) {
        if (document.querySelector('.numbersOfEp').value !== '') {
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

});
