// https://www.tulaprivod.ru/dokument/shema/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%AD%D0%9F%D0%9D.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text('В' + target).val('В' + target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    const certs_pdf = {
        epn: {
            Н: {
                cert: 'epnn-cert.pdf',
                decl: 'epnn-decl.pdf',
            },
            В: {
                cert: 'epnv-cert.pdf',
                decl: 'epnv-decl.pdf',
            },
        },
    };
    const cheme_img = {
        epn: {
            0: 'epn0.png',
            1: 'epn1_11.png',
            11: 'epn1_11.png',
            12: 'epn2.png',
            3: 'epn3_31.png',
            31: 'epn3_31.png',
            32: 'epn32.png',
        },
    };

    const control_blocks = {
        М2Z: ['М20', 'М21', 'М22', 'М23', 'М24', 'М25'],
        ВЭZ: ['ВЭ11', 'ВЭ12', 'ВЭ13', 'ВЭ14', 'ВЭ15', 'ВЭ16', 'ВЭ17', 'ВЭ18', 'ВЭ19', 'ВЭ110'],
        ВЭ1: ['ВЭ1'],
    };

    let m1BlockModal = new bootstrap.Modal($('#block-configure-m1'));
    let m2BlockModal = new bootstrap.Modal($('#block-configure-m2'));
    let vimuBlockModal = new bootstrap.Modal($('#block-configure-e1'));
    let e2BlockModal = new bootstrap.Modal($('#block-configure-e2'));

    // ЗАПОЛНЕНИЕ КрутяЩИХ МОМЕНТОВ ЧЕРЕЗ БД
    $('#testStep1').on('change', function (e) {
        function rMomentSelectCreate() {
            let uplim = document.getElementById('upper-limit');
            $(uplim).empty();
            uplim.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', '3'],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(uplim).append(new Option(item, item))
                    }
                    );
                })
        }
        rMomentSelectCreate();
    });

    // ЗАПОЛНЕНИЕ Времени Хода ЧЕРЕЗ БД
    $('#testStep-2').on('change', function (e) {
        function stepTimeSelectCreate() {
            let uplim = document.querySelector("#upper-limit").value;
            let select = document.querySelector("#time-limit");
            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', '3', uplim],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(item, item))
                    }
                    );
                })
        }
        stepTimeSelectCreate();
    });

    // ПРОГРУЗКА ДАННЫХ КОНСТРУКТИВНЫХ СХЕМ С ТАБЛИЦЫ 
    $('#workStep').on('change', function (e) {
        function SchemeSelectCreate() {
            let upLim = document.querySelector("#upper-limit").value;
            let timeLim = document.querySelector("#time-limit").value;
            $('#constructive-scheme-wrap').empty();

            let fetchResult = [];

            fetch('https://emk.websto.pro/DB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', '3', upLim, timeLim],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {

                        $('#constructive-scheme-wrap').append(
                            $('<div>')
                                .prop({ class: 'form-check' })
                                .append(
                                    $('<input>').prop({
                                        type: 'radio',
                                        id: '/img/' + 'scheme-' + item,
                                        name: 'constructive-scheme',
                                        value: item,
                                        class: 'form-check-input ch-mark',
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
                        )
                    }
                    );
                }
                );
        }
        SchemeSelectCreate();
    });

    // ПРОГРУЗКА ФЛАНЦЕВ С БД
    $('#schemeFieldSet').on('change', function (e) {
        function flangeSelectCreate() {
            let upLim = document.querySelector("#upper-limit").value;
            let timeLim = document.querySelector("#time-limit").value;
            let scheme = $("input[name='constructive-scheme']:checked").val();

            let flange = document.querySelector("#flange");
            $(flange).empty();
            flange.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', "3", upLim, timeLim, scheme],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0][0], function (key, item) {
                        $(flange).append(new Option(item))
                    }
                    );
                })
        }
        flangeSelectCreate();
    });


    // ПРОГРУЗКА ТИПА СИЛОВОГО ПИТАНИЯ 
    $('#testStep-5').on('change', function (e) {
        function PowerTypeSelectCreate() {
            let upLim = document.querySelector("#upper-limit").value;
            let select = document.querySelector("#powerType");
            let timeLim = document.querySelector("#time-limit").value;
            let scheme = $("input[name='constructive-scheme']:checked").val();
            let flange = document.querySelector("#flange").value;

            $(select).empty();
            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', '3', upLim, timeLim, scheme, flange],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0][0], function (key, item) {
                        $(select).append(new Option(item, item))
                    }
                    );
                })
        }
        PowerTypeSelectCreate();
    });

    $('#schemeFieldSet').on('change', function (e) {
        cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();
        let series = {
            epn: {
                М2: 'Серия М2',
                ВЭ: 'Серия ВЭ',
                ВЭ1: 'Серия ВЭ1',
            },
        };

        if (!!cur_constructive_scheme) {
            let control_select = $('#controle-blocks-series');
            let control_block = $('#controle-blocks');
            let cur_control_block = $('#controle-blocks').val();
            execution = $("input[name='execution']:checked").val();

            $("#controle-blocks").empty().append(new Option('Выберите значение', ''));
            control_select.empty().append(new Option('Выберите тип блока управления', ''));
            control_block.val('');

            if (cur_constructive_scheme == 0) {
                // При конструктивной схеме №0 ...
                $.each({ М2: 'Серия М2' }, function (key, item) {
                    control_select.append(new Option(item, key, false, true));
                });
                $('#controle-blocks').val('М21');
                $('#control-block-fieldset').attr('disabled', true);
            } else {
                $('#control-block-fieldset').attr('disabled', false);
                $.each(series['epn'], function (key, item) {
                    control_select.append(new Option(item, key, false, cur_control_block == item));
                });
            }
            // Загрузка изображений
            $('#constructive-scheme-Epnimg')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + cheme_img['epn'][cur_constructive_scheme],
                        class: 'img-fluid',
                    })
                );

            $('#constructive-schemeFull-img')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + 'fullepn0.png',
                        class: 'img-fluid',
                    })
                );
        }
    });

    $('#control-block-fieldset').on('change', function (e) {
        let x6 = $('#controle-blocks-series').val();
        console.log(x6);

        if (x6 === 'ВЭ1') {
            $(document.querySelector('#control-block-config')).hide();
            $('#controle-blocks').val('ВЭ1');
            $(document.querySelector('#controle-blocks')).show();
        } else if (x6 === 'М2') {
            // $('#controle-blocks').val('');
            $(document.querySelector('#control-block-config')).show();
            $(document.querySelector('#controle-blocks')).hide();
        } else if (x6 === 'ВЭ') {
            // $('#controle-blocks').val('');
            $(document.querySelector('#control-block-config')).show();
            $(document.querySelector('#controle-blocks')).hide();
        }
    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');

        let x0 = 'ЭПН';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : '';


        let x2 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : 'X';
        switch (x2) {
            case 'X':
                $("input[name='execution']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='execution']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='execution']").closest('fieldset').removeClass('noReqValue');
                $("input[name='execution']").closest('fieldset').addClass('ReqValueOk');
        }

        let x3 = $('#flange').val() ? $('#flange').val() : 'X';
        switch (x3) {
            case 'X':
                ($('#flange')).closest('fieldset').removeClass('ReqValueOk');
                ($('#flange')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#flange')).closest('fieldset').removeClass('noReqValue');
                ($('#flange')).closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#upper-limit').val() ? $('#upper-limit').val() : 'X';
        switch (x4) {
            case 'X':
                ($('#upper-limit')).closest('fieldset').removeClass('ReqValueOk');
                ($('#upper-limit')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#upper-limit')).closest('fieldset').removeClass('noReqValue');
                ($('#upper-limit')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#time-limit').val() ? $('#time-limit').val() : 'X';
        switch (x5) {
            case 'X':
                ($('#time-limit')).closest('fieldset').removeClass('ReqValueOk');
                ($('#time-limit')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#time-limit')).closest('fieldset').removeClass('noReqValue');
                ($('#time-limit')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $('#controle-blocks').val() ? $('#controle-blocks').val() : 'X';
        switch (x6) {
            case 'X':
                ($('#controle-blocks')).closest('fieldset').removeClass('ReqValueOk');
                ($('#controle-blocks')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#controle-blocks')).closest('fieldset').removeClass('noReqValue');
                ($('#controle-blocks')).closest('fieldset').addClass('ReqValueOk');
        }


        // ПЕРЕНАЗНАЧЕНИЕ ЗНАЧЕНИЯ В МАРКИРОВКУ
        let x7 = rebuildX7();

        function rebuildX7() {
            let x7check = document.querySelector("#powerType").value;
            switch (x7check) {
                case ('220B 1 фаз(ы) '):
                    return '1';
                case ('220B 3 фаз(ы) '):
                    return '3';
                case ('380B 3 фаз(ы) '):
                    return '3';
                case ('24B 6 фаз(ы) '):
                    return '6';
                default:
                    return 'X';
            }
        }

        switch (x7) {
            case 'X':
                ($(document.querySelector("#powerType"))).closest('fieldset').removeClass('ReqValueOk');
                ($(document.querySelector("#powerType"))).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($(document.querySelector("#powerType"))).closest('fieldset').removeClass('noReqValue');
                ($(document.querySelector("#powerType"))).closest('fieldset').addClass('ReqValueOk');
        }

        let x8 = $('#climatic-modification').val() ? $('#climatic-modification').val() : 'X';
        switch (x8) {
            case 'X':
                ($('#climatic-modification')).closest('fieldset').removeClass('ReqValueOk');
                ($('#climatic-modification')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#climatic-modification')).closest('fieldset').removeClass('noReqValue');
                ($('#climatic-modification')).closest('fieldset').addClass('ReqValueOk');
        }

        let x9 = $("input[name='stroke']:checked").val() ? $("input[name='stroke']:checked").val() : 'X';
        switch (x9) {
            case 'X':
                ($("input[name='stroke']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='stroke']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='stroke']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='stroke']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $("input[name='protection']:checked").val() ? $("input[name='protection']:checked").val() : 'X';
        switch (x10) {
            case 'X':
                ($("input[name='protection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='protection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='protection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='protection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x11 = $("input[name='color']:checked").val() ? $("input[name='color']:checked").val() : 'X';
        switch (x11) {
            case 'X':
                ($("input[name='color']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='color']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='color']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='color']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x12 = $("input[name='connection']:checked").val() ? $("input[name='connection']:checked").val() : 'X';
        switch (x12) {
            case 'X':
                ($("input[name='connection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='connection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='connection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x13 = $("input[name='specialForEpn']:checked").val() ? $("input[name='specialForEpn']:checked").val() : 'X';
        switch (x13) {
            case 'X':
                ($("input[name='specialForEpn']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='specialForEpn']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='specialForEpn']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='specialForEpn']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x14 = $("input[name='connection-type']:checked").val() ? 1 : 0;
        switch (x14) {
            case 1:
                ($("input[name='connection-type']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connection-type']")).closest('fieldset').addClass('ReqValueOk');
                break;
            case 2:
                ($("input[name='connection-type']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connection-type']")).closest('fieldset').addClass('ReqValueOk');
                break;
            case 3:
                ($("input[name='connection-type']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connection-type']")).closest('fieldset').addClass('ReqValueOk');
                break;
            default:
                ($("input[name='connection-type']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='connection-type']")).closest('fieldset').addClass('noReqValue');
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13].includes('X');

        mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + '/' + x7 + '-' + x8 + '-' + x9 + '-' + x10 + x11 + x12 + x13);

        // modal_button.toggle(!is_true);
        mark_gen.toggleClass('is-invalid', is_true).toggleClass('is-valid', !is_true);
    });

    $('#download').on('click', function () {
        console.log('hea');
        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        // CХЕМА
        let schemeForSend = ''
        if (document.querySelector("#\\/img\\/scheme-40") && document.querySelector("#\\/img\\/scheme-40").checked) {
            schemeForSend = '40';
        } else if (document.querySelector("#\\/img\\/scheme-41") && document.querySelector("#\\/img\\/scheme-41").checked) {
            schemeForSend = '41';
        } else if (document.querySelector("#\\/img\\/scheme-410") && document.querySelector("#\\/img\\/scheme-410").checked) {
            schemeForSend = '410';
        } else if (document.querySelector("#\\/img\\/scheme-43") && document.querySelector("#\\/img\\/scheme-43").checked) {
            schemeForSend = '43';
        } else if (document.querySelector("#\\/img\\/scheme-430") && document.querySelector("#\\/img\\/scheme-430").checked) {
            schemeForSend = '430';
        } else if (document.querySelector("#\\/img\\/scheme-44") && document.querySelector("#\\/img\\/scheme-44").checked) {
            schemeForSend = '44';
        }

        // ДОП ОПЦИИ
        // let addOption1 = document.querySelector("#PanelOption").checked ? 'Механический селектор переключения режима работы местн./дист.' : ''; 
        let addOption2 = document.querySelector("#boardRegId > input[type=checkbox]").checked ? 'Плата регистратор' : '';
        // let addOptions = addOption1 ? addOption1 + ' ' + '' + ' ' +  addOption2 : addOption2;
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
        let j23 = $("input[name='rotating']:checked").closest('.form-check').find('.form-check-label').text(); //Вращение вых вала
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3
        let BoMark = document.querySelector("#controle-blocks-series").value;

        let j30 = document.querySelector("#controle-blocks").value; // тип бу 
        let j31 = checkCommandBlock() ? checkCommandBlock() : ''; // Тип управления
        let j32 = selectRemoteSignal();// сигналы дист управления

        let j33 = ''; //Тип БКВ
        if (BoMark == 'Э0') {
            j33 = 'ЭИМУ';
        }
        else if (BoMark == 'Э2') {
            j33 = 'ЭБКВ';
        }
        else if (BoMark == 'М1') {
            j33 = 'МБКВ';
        }
        else if (BoMark == 'Э1') {
            document.querySelector("#commandBlockType-1").checked ? j33 = 'ЭИМУ' : document.querySelector("#commandBlockType-2").checked ? j33 = 'ВИМУ' : 'Конфигуратор пропущен';
        }

        let j34 = ''; //Механический указатель
        if (document.querySelector("#pointer > input[type=checkbox]").checked) { j34 = 'Есть' }
        else { j34 = 'Отсутствует' };

        let j35 = selectPositionSignal();// Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if (document.querySelector("#signalMoment-1").checked) { j36 = 'Есть' }
        else { j36 = 'Отсутствует' };

        let j37 = ''; // Дублирование RS485
        if (j30 == 'Э18' || j30 == 'Э110' || j30 == 'Э24' || j30 == 'Э26') { j37 = 'Есть' }
        else { j37 = 'Отсутствует' };

        let j38 = 'Одиночные';
        if (optForBu == 'Z' || optForBu == 'W') { j38 = 'Сдвоенные' }; // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели
        if (optForBu == 'Z' || optForBu == 'W') { j39 = 'Сдвоенные' }; // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели
        if (optForBu == 'Z' || optForBu == 'W') { j310 = 'Сдвоенные' }; // Концевые выключатели

        let j311 = ''; // Монтаж БУ
        if (BoMark == 'Э1') {
            j311 = 'Выносной';
        } else {
            j311 = 'На приводе';
        };

        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];

        //json4
        let j40 = $("input[name='connection']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = document.querySelector("#cap > input[type=checkbox]").checked ? 'Есть' : 'Отсутствует'; //Защитный колпак
        let j42 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j43 = document.querySelector("#mechSelectorId > input[type=checkbox]") ? 'Есть' : 'Отсутствует'; //Механический селектор
        let j44 = addOption2;//Доп опции 
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
            let post = fetch('/download', {
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


    // сокрытия пункта Ral
    $('#colorType').on('change', function (e) {
        if (document.querySelector('#color-2').checked) {
            document.querySelector('#ralDiv').classList.remove('none');
        } else {
            document.querySelector('#ralDiv').classList.add('none');
            document.querySelector('#ralColor').value = '';
        }
    });

    // Кнопки в таблицу
    $('#m1-form').on('change', function (e) {
        let mod = 0;
        $.each($('#m1-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        });
        let up = $('#upper-limitForM1').val() ? $('#upper-limitForM1').val() : '';

        $('.cur-m1-value')
            .text('М1' + mod + '.' + up)
            .val('М1' + mod + '.' + up);
    });

    $('#clear-m1').on('click', function (e) {
        $('#m1-form')[0].reset();
        $('.cur-m1-value').text('М10').val('M10');
    });

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

    $('#e2-form input').on('change', function (e) {
        let mod = $("input[name='e2']:checked").val();
        $('.cur-e2-value').text(mod).val(mod);
    });

    $('#clear-e2').on('click', function (e) {
        $('#e2-form')[0].reset();
        $('.cur-e2-value').text('E21').val('E21');
    });

    $('#e2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-e2-value').val()).trigger('change');
        e2BlockModal.hide();
    });


    $('#control-block-config').on('click', function (e) {
        let cbs = $('#controle-blocks-series').val();
        if (cbs === 'М1') {
            m1BlockModal.show();
        } else if (cbs === 'М2') {
            m2BlockModal.show();
        } else if (cbs === 'ВЭ' || cbs === 'Э0' || cbs === 'Э1') {
            vimuBlockModal.show();
        } else if (cbs === 'Э2') {
            e2BlockModal.show();
        }
    });

    $('#controle-blocks-series').on('change', function (e) {
        let cbs = $('#controle-blocks-series').val();
        let cb = $('#controle-blocks');
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1' || cbs === 'М2') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });


    // стиль для режима работы
    $('.timeMode').on('change', function (e) {
        if ($("input[name='working-mode']:checked")) {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');

        }
    });
    // стиль для силового электропитания
    $('.power-type-wrap').on('change', function (e) {
        if (document.querySelector("#powerType").value !== '') {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');

        }
    });
    // стиль для кол-ва
    $('#numbersOfEp').on('change', function (e) {
        if (document.querySelector('.numbersOfEp').value !== '') {
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });
    // СТИЛЬ ДЛЯ ПОЛЯ С ДАННЫМИ
    $('.persInfo').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '') {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {
            document.querySelector('.persInfo ').classList.remove('ReqValueOk');
            document.querySelector('.persInfo ').classList.add('noReqValue');
        }
    });
    // СТИЛЬ ДЛЯ ПОЛЯ Со схемами
    $('№schemeFieldSet').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '') {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {
            document.querySelector('.persInfo ').classList.remove('ReqValueOk');
            document.querySelector('.persInfo ').classList.add('noReqValue');
        }
    });

    // Стиль для блока установки
    $('.placeForEnv').on('change', function (e) {
        if (document.querySelector("#placeForEnv-1").checked || document.querySelector("#placeForEnv-2").checked) {
            document.querySelector('.placeForEnv').classList.add('ReqValueOk');
            document.querySelector('.placeForEnv').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.placeForEnv').classList.add('noReqValue');
            document.querySelector('.placeForEnv').classList.remove('ReqValueOk');
        }
    });
    // Тип блока концевых выключателей
    $('.typeEndSwich').on('change', function (e) {
        if (document.querySelector("#typeEndSwich-1").checked || document.querySelector("#typeEndSwich-2").checked) {
            document.querySelector('.typeEndSwich').classList.add('ReqValueOk');
            document.querySelector('.typeEndSwich').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.typeEndSwich').classList.add('noReqValue');
            document.querySelector('.typeEndSwich').classList.remove('ReqValueOk');
        }
    });
    // Тип блока управления привода
    $('.commandBlockType').on('change', function (e) {
        if (document.querySelector("#commandBlockType-1").checked || document.querySelector("#commandBlockType-2").checked) {
            document.querySelector('.commandBlockType').classList.add('ReqValueOk');
            document.querySelector('.commandBlockType').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.commandBlockType').classList.add('noReqValue');
            document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
        }
    });
    // Сигнализация положения
    $('.signal').on('change', function (e) {
        if (document.querySelector("#signal").value != '') {
            document.querySelector('.signal').classList.add('ReqValueOk');
            document.querySelector('.signal').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.signal').classList.add('noReqValue');
            document.querySelector('.signal').classList.remove('ReqValueOk');
        }
    });
    // Сигналы дист управления 
    $('.commandSignal').on('change', function (e) {
        if (document.querySelector("#commandSignal").value != '') {
            document.querySelector('.commandSignal').classList.add('ReqValueOk');
            document.querySelector('.commandSignal').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.commandSignal').classList.add('noReqValue');
            document.querySelector('.commandSignal').classList.remove('ReqValueOk');
        }
    });
    // Обработка конфигуратура БУ
    function checkCommandBlock() {
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
            default:
                console.log(base);
        }
    }
    // МЕСТНЫЕ И ДИСТ СИГНАЛЫ
    function selectRemoteSignal() {

        let BoMark = document.querySelector("#controle-blocks-series").value;
        optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        if (BoMark == 'Э0' || 'Э1S') {
            return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В';
        }
        else if (BoMark == 'Э1') {
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
        else {
            return remoteSignal = 'Пункт только для ЭИМУ или ВИМУ';
        }
    }

    function selectPositionSignal() {

        let BoMark = document.querySelector("#controle-blocks").value;

        if (BoMark == 'Э11') {
            return positionSignal = 'отсутсвуют';
        }
        else if (BoMark == 'Э12' || BoMark == 'Э13' || BoMark == 'Э16' || BoMark == 'Э17') {
            return positionSignal = '4–20 мА';
        }
        else if (BoMark == 'Э14' || BoMark == 'Э18' || BoMark == 'Э01' || BoMark == 'Э1S1') {
            return positionSignal = 'RS485 Modbus';
        }
        else if (BoMark == 'Э15') {
            return positionSignal = '4–20 мА и RS485 Modbus';
        }
        else if (BoMark == 'Э19' || BoMark == 'Э110' || BoMark == 'Э1S2') {
            return positionSignal = 'Profibus DP';
        }
        else if (BoMark == 'Э22') {
            return positionSignal = '4-20мА';
        }
        else if (BoMark == 'Э23' || BoMark == 'Э24') {
            return positionSignal = 'RS485 Profibus';
        }
        else if (BoMark == 'Э25' || BoMark == 'Э26') {
            return positionSignal = 'RS485 Profibus';
        }
        else if (document.querySelector("#m1-2").checked) {
            return positionSignal = 'Потенциометр 100 Ом';
        }
        else if (document.querySelector("#m1-3").checked) {
            return positionSignal = '4-20мА';
        }
        else {
            return positionSignal = 'отсутсвуют';
        }
    }
});
