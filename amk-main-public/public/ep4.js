////https://www.tulaprivod.ru/dokument/rukovodstva/EP_4_2022_15_v3.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    // КОНСТАНТЫ ДЛЯ JSON
    const certs_pdf = {
        ep4: {
            Н: {
                cert: 'certEp4.pdf',
                decl: 'declarationEp4.pdf',
            },
            В: {
                cert: 'certEp4.pdf',
                decl: 'declarationEp4.pdf',
            },
        },
    };

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
            Н: 'Общепромышленное исполнение',
            В: 'Взрывозащищенное исполнение для подгруппы IIB',
            Ш: 'рудничное (шахтное) исполнение',
            S: 'искробезопасное рудничное (шахтное) исполнение',
            С: 'взрывозащищенное исполнение для подгруппы IIС',
        },
    };

    const execution_wrap = $('#execution-wrap');

    const torques = {
        ep4: {
            1: [15, 30, 60, 120, 250, 500, 630, 1000, 1500, 2000, 4000, 8000, 12000, 16000, 20000, 24000],
            2: [30, 60, 90, 120],
            3: [15, 30, 60, 120, 250, 500, 630, 1000, 1500, 2000, 4000, 8000, 12000, 16000, 20000, 24000],
        },
    };

    const time_limits = {
        ep4: {
            40: {
                15: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                30: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                60: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                120: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
            },
            41: {
                60: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                90: [180],
                120: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                250: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                400: [180],
                500: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125],
            },
            410: {
                630: [2, 4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90],
                1000: [2, 4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                1500: [2, 4, 5.6, 8, 11, 16, 22, 32, 45],
                2000: [2, 4, 5.6, 8, 11, 16, 22, 32],
                3000: [2, 4, 5.6, 8, 11, 16],
            },
            43: {
                2000: [45, 63, 90, 125],
                3000: [22, 32, 45, 63, 90],
                4000: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                6000: [4, 5.6, 8, 11, 16, 22, 32, 40],
                8000: [4, 5.6, 8, 11, 16, 22, 32],
            },
            430: {
                8000: [22],
                12000: [2, 2.8, 4, 5.6, 8, 11, 16, 22],
                16000: [2, 4, 5.6, 8, 11, 16],
                20000: [2, 4, 5.6, 8, 11],
                24000: [2, 4, 5.6, 8],
            },
            44: {
                16000: [22],
            },
        },
    };

    const flanges = {
        ep4: {
            40: {
                15: {
                    0: {
                        1: ['МК'],
                        3: ['F07'],
                    },
                },
                30: {
                    0: {
                        1: ['МК', 'АК'],
                        2: ['АЧ'],
                        3: ['F07'],
                    },
                },
                60: {
                    0: {
                        1: ['МК', 'АК'],
                        2: ['АЧ'],
                        3: ['F07', 'F10'],
                    },
                },
                120: {
                    0: {
                        1: ['АК'],
                        2: ['АЧ'],
                        3: ['F10'],
                    },
                },
            },
            41: {
                60: {
                    0: {
                        1: ['АК'],
                        2: ['АЧ'],
                        3: ['F07', 'F10'],
                    },
                },
                90: {
                    0: {
                        1: ['АК'],
                        2: ['АЧ'],
                        3: ['F07', 'F10'],
                    },
                },
                120: {
                    0: {
                        1: ['АК', 'Б'],
                        2: ['АЧ'],
                        3: ['F07', 'F10'],
                    },
                },
                250: {
                    0: {
                        1: ['Б'],
                        3: ['F14'],
                    },
                },
                400: {
                    0: {
                        1: ['Б'],
                        3: ['F14'],
                    },
                },
                500: {
                    0: {
                        1: ['Б'],
                        3: ['F14'],
                    },
                },
            },
            410: {
                630: {
                    0: {
                        1: ['В'],
                        3: ['F16'],
                    },
                },
                1000: {
                    0: {
                        1: ['В'],
                        3: ['F16'],
                    },
                },
                1500: {
                    0: {
                        1: ['В', 'Г'],
                        3: ['F25'],
                    },
                },
                2000: {
                    0: {
                        1: ['Г'],
                        3: ['F25'],
                    },
                },
                3000: {
                    0: {
                        1: ['Г'],
                        3: ['F25'],
                    },
                },
            },
            43: {
                2000: {
                    0: {
                        1: ['Г'],
                        3: ['F25'],
                    },
                },
                3000: {
                    0: {
                        1: ['Г'],
                        3: ['F25'],
                    },
                },
                4000: {
                    0: {
                        1: ['Г', 'Д'],
                        3: ['F30'],
                    },
                },
                6000: {
                    0: {
                        1: ['Г', 'Д'],
                        3: ['F30'],
                    },
                },
                8000: {
                    0: {
                        1: ['Г', 'Д'],
                        3: ['F30'],
                    },
                    4: { 1: ['Д'], 3: ['F30'] },
                    5.6: { 1: ['Д'], 3: ['F30'] },
                    8: { 1: ['Д'], 3: ['F30'] },
                },
            },
            430: {
                8000: {
                    0: {
                        1: ['Д'],
                        3: ['F40'],
                    },
                },
                12000: {
                    0: {
                        1: ['Д'],
                        3: ['F40'],
                    },
                },
                16000: {
                    0: {
                        1: ['Д'],
                        3: ['F40'],
                    },
                },
                20000: {
                    0: {
                        1: ['Д'],
                        3: ['F40'],
                    },
                },
                24000: {
                    0: {
                        1: ['Д'],
                        3: ['F40'],
                    },
                },
            },
            44: {
                8000: {
                    0: {
                        1: ['Д'],
                        3: ['F35', 'F40'],
                    },
                },
                16000: {
                    0: {
                        1: ['Д'],
                        3: ['F35', 'F40'],
                    },
                },
            },
        },
    };
    const control_blocks = {
        М2Z: ['М20', 'М21', 'М22', 'М23', 'М24', 'М25'],
        ВЭZ: ['ВЭ11', 'ВЭ12', 'ВЭ13', 'ВЭ14', 'ВЭ15', 'ВЭ16', 'ВЭ17', 'ВЭ18', 'ВЭ19', 'ВЭ110'],
        ВЭ1: ['ВЭ1'],
    };

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

    let cur_constructive_scheme = false;

    let execution_id = '';

    let m1BlockModal = new bootstrap.Modal($('#block-configure-m1'));
    let m2BlockModal = new bootstrap.Modal($('#block-configure-m2'));
    let vimuBlockModal = new bootstrap.Modal($('#block-configure-e1'));
    let e2BlockModal = new bootstrap.Modal($('#block-configure-e2'));

    $('.ch-upper-limit').on('change', function (e) {
        let connectionType = $("input[name='connection-type']:checked").val();
        console.log(connectionType);

        let execution = $("input[name='execution']:checked").val();
        var cur_upper_limit = $('#upper-limit').val();
        var upper_limit = $('#upper-limit').empty().append(new Option('Выберите значение', ''));

        torques_arr = torques['ep4'][connectionType];

        $('#step-3').show();
        $.each(
            [
                ...new Set(
                    torques_arr.sort(function (a, b) {
                        return a - b;
                    })
                ),
            ],
            function (index, item) {
                upper_limit.append(new Option(item, item, false, item == cur_upper_limit));
            }
        );
    });

    $('.ch-time-limit ').on('change', function (e) {
        $('#step-4').show();
        var upper_limit = $('#upper-limit').val();
        var cur_time_limit = $('#time-limit').val();
        var times_options = [];

        select_options = $('#rotation-frequency');
        time_limits_arr = time_limits['ep4'];
        console.log(time_limits_arr);

        select_options.empty().append(new Option('Выберите значение', ''));

        $.each(time_limits_arr, function (key, value) {
            $.each(value, function (up_lim, item) {
                if (upper_limit == up_lim) {
                    times_options.push(...item);
                }
            });
        });

        $.each(
            [
                ...new Set(
                    times_options.sort(function (a, b) {
                        return a - b;
                    })
                ),
            ],
            function (key, item) {
                select_options.append(new Option(item, item, false, item == cur_time_limit));
            }
        );
    });

    $('.ch-cs').on('change', function (e) {
        option_id = '#rotation-frequency';

        execution = $("input[name='execution']:checked").val();
        x4 = $('#upper-limit').val();
        x5 = $(option_id).val();

        constructive_scheme = [];
        time_limits_arr = time_limits['ep4'];

        $.each(time_limits_arr, function (key, item) {
            $.each(item, function (index, arr) {
                if (index == x4 && !!x5 && arr.includes(Number.parseFloat(x5))) {
                    constructive_scheme.push(key);
                }
            });
        });

        $('#constructive-scheme-wrap').empty();

        if (constructive_scheme.length > 0) {
            $.each(constructive_scheme, function (key, item) {
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
                                defaultChecked: constructive_scheme.length == 1,
                            })
                        )
                        .append(
                            $('<label>')
                                .prop({
                                    for:  'scheme-' + item,
                                    class: 'form-check-label',
                                })
                                .text('Конструктивная схема ' + item)
                        )
                );
            });

            $("input[name='constructive-scheme']").trigger('change');
        } else {
            $('#constructive-scheme-img').empty();
        }

        // if (document.getElementsByName('constructive-scheme').length < 2) {
        //     $('#schemeFieldSet').hide();
        // } else {
        //     $('#schemeFieldSet').show();
        // }
    });

    $(document).on('change', "input[name='constructive-scheme']", function (e) {
        $('#step-5').show();
        let execution = $("input[name='execution']:checked").val();

        let cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();
        let cur_flange_value = $('#flange').val();

        let upper_limit = $('#upper-limit').val();
        let rotation_frequency = $('#rotation-frequency').val();
        let connectionType = $("input[name='connection-type']:checked").val();

        let flanges_select = $('#flange').empty().append(new Option('Выберите значение', ''));
        let control_block = $('#controle-blocks');
        let cur_control_block = $('#controle-blocks').val();

        let control_select = $('#controle-blocks-series').empty().append(new Option('Выберите значение', ''));

        let flanges_arr = [];

        if (!!cur_constructive_scheme) {
            if (typeof flanges['ep4'][cur_constructive_scheme][upper_limit][rotation_frequency] !== 'undefined') {
                flanges_arr = flanges['ep4'][cur_constructive_scheme][upper_limit][rotation_frequency][connectionType];
            } else {
                flanges_arr = flanges['ep4'][cur_constructive_scheme][upper_limit][0][connectionType];
            }

            $.each(flanges_arr, function (key, item) {
                flanges_select.append(new Option(item, item, false, cur_flange_value == item));
            });
        }

        let series = {
            ep4: {
                Э0: 'Выносной интеллектуальный модуль управления с пускателем  Э0',
                Э1: 'Встроенный интеллектуальный модуль управления  с пускателем Э1',
                // 'Э1S': 'Серия Э1S',
                Э2: 'Электронный блок концевых выключателей без пускателя Э2',
                М1: 'Механический блок концевых выключателей без пускателя М1',
            },
        };

        if (!!cur_constructive_scheme) {
            // $("#controle-blocks").empty().append(new Option('Выберите значение', ''));
            control_select.empty().append(new Option('Выберите тип блока управления', ''));
            control_block.val('');

            $('#control-block-fieldset').attr('disabled', false);
            $.each(series['ep4'], function (key, item) {
                control_select.append(new Option(item, key, false, cur_control_block == item));
            });

            $('#constructive-scheme-img')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + cheme_img['ep4'][cur_constructive_scheme],
                        class: 'img-fluid',
                    })
                );
        }
    });

    // $(document).on("change", function(e){
    //     let flange = document.querySelector('#flange');
    //     let a = document.querySelector('#rotation-frequency');
    //     let b = document.querySelector('#time-limit')
    //     if (a.value === '' && b.value === '') {
    //         flange.value = '';
    //         $(flange).attr('disabled', true);
    //         }
    //         else {$(flange).attr('disabled', false);}
    //     }
    // );

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

    $(document).on('change', function (e) {
        let a = document.querySelector('.aVandalCap');
        let cbs = document.querySelector('#controle-blocks-series');
        if (cbs.value === 'Э1' || cbs.value === 'Э2') {
            $(a).show();
        } else {
            $(a).hide();
        }

        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');
        let x2;

        let x0 = 'ЭП4';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : ''; // Назначение по режимам работы
        // switch (x1) {
        //     case 'X':
        //         $("input[name='working-mode']").closest('fieldset').removeClass('ReqValueOk');
        //         $("input[name='working-mode']").closest('fieldset').addClass('noReqValue');
        //         break;
        //     default:
        //         $("input[name='working-mode']").closest('fieldset').removeClass('noReqValue');
        //         $("input[name='working-mode']").closest('fieldset').addClass('ReqValueOk');
        // }

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
        let x3 = $('#flange').val() ? $('#flange').val() : 'X'; // Тип присоединения к арматуре
        switch (x3) {
            case 'X':
                $('#flange').closest('fieldset').removeClass('ReqValueOk');
                $('#flange').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#flange').closest('fieldset').removeClass('noReqValue');
                $('#flange').closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#upper-limit').val() ? $('#upper-limit').val() : 'X'; // Верхний предел настройки ограничителя крутящего момента, Н·м
        switch (x4) {
            case 'X':
                $('#upper-limit').closest('fieldset').removeClass('ReqValueOk');
                $('#upper-limit').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#upper-limit').closest('fieldset').removeClass('noReqValue');
                $('#upper-limit').closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#rotation-frequency').val() ? $('#rotation-frequency').val() : 'X'; // Частота вращения выходного вала, об/мин
        switch (x5) {
            case 'X':
                $('#rotation-frequency').closest('fieldset').removeClass('ReqValueOk');
                $('#rotation-frequency').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#rotation-frequency').closest('fieldset').removeClass('noReqValue');
                $('#rotation-frequency').closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $('#controle-blocks').val() ? $('#controle-blocks').val() : 'X'; // Todo: Надо создать отдельный конфигуратор Исполнение блока управления
        switch (x6) {
            case 'X':
                $('#controle-blocks').closest('fieldset').removeClass('ReqValueOk');
                $('#controle-blocks').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#controle-blocks').closest('fieldset').removeClass('noReqValue');
                $('#controle-blocks').closest('fieldset').addClass('ReqValueOk');
        }

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
        switch (x11) {
            case 'X':
                $("input[name='color']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='color']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='color']").closest('fieldset').removeClass('noReqValue');
                $("input[name='color']").closest('fieldset').addClass('ReqValueOk');
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

        let x13 = $("input[name='special']:checked").val() ? $("input[name='special']:checked").val() : ''; // Специальное исполнение
        switch (x13) {
            case 'X':
                $("input[name='special']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='special']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='special']").closest('fieldset').removeClass('noReqValue');
                $("input[name='special']").closest('fieldset').addClass('ReqValueOk');
        }

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        let tuMpX1 = document.querySelector('#maxStepMp').value;
        let tuMpX2 = document.querySelector('#stepForOne').value;

        let constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        if (x3.search(/[МА][КЧ]/g) == 0) {
            x3 = x3.substr(0, 1);
        }

        let suffix = '';

        if (constructive_scheme === '40') {
            suffix += '-40';
        }
        //
        if (cbs === 'Э0') {
            x6 = 'Э01';
            // suffix += '\\ВИМУ-';
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12].includes('X');
        mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + optForBu +  '-' + x7 + '-' + x8 + x9 + x10 + x11 + x12 + x13 + suffix);
        let check = document.querySelector('#tuMpCheck > input[type=checkbox]');
        if (check.checked) {
            mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + '-' + x7 + '-' + x8 + x9 + x10 + x11 + x12 + x13 + suffix + '/' + 'МП40' + '-' + tuMpX1 + '-' + tuMpX2);
        }

        // $('#certs-pdf').empty();
        // if (!is_true && certs_pdf['ep4'][x2] !== undefined) {
        //     $('#certs-pdf').append(
        //         $('<a>')
        //             .attr({ href: 'pdf/' + certs_pdf['ep4'][x2]['cert'], target: '_blank' })
        //             .text('Сертификат')
        //             .css('padding', '1.5%'),
        //         $('<a>')
        //             .attr({ href: 'pdf/' + certs_pdf['ep4'][x2]['decl'], target: '_blank' })
        //             .text('Декларация')
        //             .css('padding', '1.5%')
        //     );
        // }

        modal_button.toggle(!is_true);
        mark_gen.toggleClass('is-invalid', is_true).toggleClass('is-valid', !is_true);
    });

    $(document.querySelector('#modal-button > button')).on('click', function () {
        let tuMpX1 = document.querySelector('#maxStepMp').value ? 'МП40-' + document.querySelector('#maxStepMp').value : '';
        let tuMpX2 = document.querySelector('#stepForOne').value;
        let TuMp = tuMpX1 ? tuMpX1 + '-' + tuMpX2 : '';

        let addOption1 = document.querySelector("#mechSelectorId > input[type=checkbox]") ? 'Механический селектор переключения режима работы местн./дист.' : ''; 
        let addOption2 = document.querySelector("#boardRegId > input[type=checkbox]") ? 'Механический селектор переключения режима работы местн./дист.' : ''; 
        let addOptions = addOption1 ? addOption1 + ' ' + 'и' + ' ' +  addOption2 : addOption2;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        h6 = $("input[name='typeEndSwich']:checked").val() ? $("input[name='typeEndSwich']:checked").val() : 2;
        h7 = $("input[name='commandBlockType']:checked").val() ? $("input[name='commandBlockType']:checked").val() : 2;
        h9 = document.querySelector('#signal').value ? document.querySelector('#signal').value : '0';
        h10 = document.querySelector('#commandSignal').value ? document.querySelector('#commandSignal').value : 0;
        h11 = $("input[name='signalMoment']:checked").val() ? $("input[name='signalMoment']:checked").val() : '0';

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // json0
        let j00 = document.querySelector('#organization').value; //Фирма
        let j01 = document.querySelector('#fio').value; // Фио
        let j02 = document.querySelector('#phone').value; // Телефон
        let j03 = document.querySelector('#email').value; // email
        let j04 = document.querySelector('#numbersOfEp').value; // кол-во
        let j05 = ''; //цена

        //json1
        let j10 = 'Электроприводы многообортные ЭП4'; //тип арматуры
        let j11 = document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j14 = document.querySelector("#closingTime").value; //время закрытия
        let j15 = '?';//макс крут момент
        let j16 = document.querySelector('#flange').value; //присоединение к приводу
        let j17 = $("input[name='placeForEnv']:checked").closest('.form-check').find('.form-check-label').text(); // установка

        //json2
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text(); //Влагозащита
        let j23 = $("input[name='rotating']:checked").closest('.form-check').find('.form-check-label').text(); //Вращение вых вала
        let j24 = $('#climatic-modification option:selected').text(); //Температура

        //json3
        let j30 = //Тип БУ
        let j31 = checkCommandBlock();// Тип управления
        let j32 = //Тип БКВ
        let j33 = //Механический указатель
        let j34 = // Сигнализация положения
        let j35 =  // Сигнал момэнт
        let j36 = // сигналы дист управления
        let j37 = // Дублирование RS485
        let j38 = 'одиночные';// Промежуточные выключатели
        let j39 = 'одиночные';// Моментные выключатели
        let j310 = 'одиночные';// Концевые выключатели
        let j311 = // Монтаж БУ

        //json4
        let j40 = document.querySelector("#cap > input[type=checkbox]").checked ? 'Есть' : 'Отсутствует'; //Защитный колпак
        let j41 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j42 = document.querySelector("#mechSelectorId > input[type=checkbox]") ? 'Есть' : 'Отсутствует'; //Механический селектор
        let j43 = addOptions;//Доп опции 
        let j44 = document.querySelector('#addReqarea').value ? document.querySelector('#addReqarea').value : '' + TuMp;

        //json5
        let j50 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //Назначение по режиму работы
        let j51 = $("input[name='connectionForEp4']:checked").val(); //Электрическое подключение (обозначение)
        let j52 = $("input[name='connectionForEp4']:checked").closest('.form-check').find('.form-check-label').text(); //Электрическое подключение (расшифровка)
        let j53 = 'SIL-3'; // SIL
        let j54 = $("input[name='special']:checked").val(); //Специальное исполнение
        let j55 = ''; //Масса

        //json6
        let j60 = '?';  //Кабельные вводы
        let j61 = '?'; //Штепсельные разъемы
        let j62 = '?'; //Тип подводимых кабелей
        
        //json7
        let j70 = $("input[name='connection-type']:checked").val();//Тип присоединения выходного вала
        let j71 = '';//Защита от коррозии
        let j72 = '';//Ручной маховик
        let j73 = '';//Наличие обогрев
        let j74 = '';//Наличие типа функции
        let j75 = '';//Функция при питании
        let j76 = ''; //Условие для запуска функции


        // CХЕМА
        let schemeForSend = '';

        if (document.querySelector('#scheme-40') && document.querySelector('#scheme-40').checked) {
            schemeForSend = 40;
        } else if (document.querySelector('#scheme-41') && document.querySelector('#scheme-41').checked) {
            schemeForSend = 41;
        } else if (document.querySelector('#scheme-410') && document.querySelector('#scheme-410').checked) {
            schemeForSend = 410;
        } else if (document.querySelector('#scheme-43') && document.querySelector('#scheme-43').checked) {
            schemeForSend = 43;
        } else if (document.querySelector('#scheme-430') && document.querySelector('#scheme-430').checked) {
            schemeForSend = 430;
        } else if (document.querySelector('#scheme-44') && document.querySelector('#scheme-44').checked) {
            schemeForSend = 44;
        }

        console.log([j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13]);
        console.log([h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23]);
        console.log([p1, p2, p3, p4, p5, p6]);
        console.log();

        function DOCX(id) {
            window.open(`http://217.144.103.121/Tula/${id}`);
        }
        function EXEL(id) {
            window.open(`http://217.144.103.121/TulaEXEL/${id}`);
        }
        function sendToServer() {
            let post = fetch('http://217.144.103.121/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    jsn1: [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13],
                    jsn2: [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23],
                    jsn3: [p1, p2, p3, p4, p5, p6, schemeForSend, document.querySelector('#upper-limit').value, document.querySelector('#rotation-frequency').value],
                    jsn4: [],
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

    // сокрытия пункта кабельных вводов
    $('.cableField').on('change', function (e) {
        if (!document.querySelector('#cabels-1').checked) {
            document.querySelector('#cabelsInput-1').disabled = true;
            document.querySelector('#cabelsInput-1').value = '';
        } else {
            document.querySelector('#cabelsInput-1').disabled = false;
        }
        document.querySelector('#cabels-1').value = document.querySelector('#cabelsInput-1').value;
    });

    // сокрытия пункта штепсельных вводов
    $('.stepseField').on('change', function (e) {
        if (!document.querySelector('#stepse-1').checked) {
            document.querySelector('#inputStepse').disabled = true;
            document.querySelector('#inputTypeStepse').disabled = true;
            document.querySelector('#inputStepse').value = '';
            document.querySelector('#inputTypeStepse').value = '';
        } else {
            document.querySelector('#inputStepse').disabled = false;
            document.querySelector('#inputTypeStepse').disabled = false;
        }
        document.querySelector('#inputStepse').value = document.querySelector('#inputStepse').value;
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
        } else {
            $(document.querySelector('#controle-blocks')).hide();
            $('#control-block-config').show();
        }
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
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });
    // // Открытия поля с чертежом
    // $('#drawing').on('change', function (e) {
    //     if (document.querySelector('#drawing').value != 3) {
    //         document.querySelector('#upload').classList.toggle('none');
    //     }
    // });
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
    // // Стиль для модуля Наибольший ход, мм
    // $('#maxStepMpField').on('change', function (e) {
    //     if (document.querySelector('#maxStepMp').value != '') {
    //         document.querySelector('.maxStepMp').classList.add('ReqValueOk');
    //         document.querySelector('.maxStepMp').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.maxStepMp').classList.add('noReqValue');
    //         document.querySelector('.maxStepMp').classList.remove('ReqValueOk');
    //     }
    // });
    // Стиль для модуля Номинальный крутящий момент
    // $('#roundMomentMp').on('change', function (e) {
    //     if (document.querySelector('#roundMomentMp').value != undefined) {
    //         document.querySelector('.roundMomentMp').classList.add('ReqValueOk');
    //         document.querySelector('.roundMomentMp').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.roundMomentMp').classList.add('noReqValue');
    //         document.querySelector('.roundMomentMp').classList.remove('ReqValueOk');
    //     }
    // });
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
    // Стиль для модуля номинальное давление
    $('#pressure').on('change', function (e) {
        if (document.querySelector('#pressure').value != '') {
            document.querySelector('.pressure').classList.add('ReqValueOk');
            document.querySelector('.pressure').classList.remove('noReqValue');
        } else {
            document.querySelector('.pressure').classList.add('noReqValue');
            document.querySelector('.pressure').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля диаметр
    $('#diameter').on('change', function (e) {
        if (document.querySelector('#diameter').value != '') {
            document.querySelector('.diameter').classList.add('ReqValueOk');
            document.querySelector('.diameter').classList.remove('noReqValue');
        } else {
            document.querySelector('.diameter').classList.add('noReqValue');
            document.querySelector('.diameter').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля требуемого время закрытия
    $('#stepClose').on('change', function (e) {
        if (document.querySelector('#closeNumbers').value != '' && document.querySelector('#rotation-frequency').value != '') {
            console.log('uslovue');
            document.querySelector('.closingTime').classList.remove('noReqValue');
            document.querySelector('.closingTime').classList.add('ReqValueOk');
        } else {
            document.querySelector('.closingTime').classList.remove('ReqValueOk');
            document.querySelector('.closingTime').classList.add('noReqValue');
        }
    });
    // // Стиль для модуля макс крут момент
    // $('.maxRMoment').on('change', function (e) {
    //     if (document.querySelector('#maxRMoment').value != '') {
    //         document.querySelector('.maxRMoment').classList.add('ReqValueOk');
    //         document.querySelector('.maxRMoment').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.maxRMoment').classList.add('noReqValue');
    //         document.querySelector('.maxRMoment').classList.remove('ReqValueOk');
    //     }
    // });
    // Стиль для модуля макс крут момент на закрывание
    // $('.maxRMoment2').on('change', function (e) {
    //     if (document.querySelector('#maxRMoment2').value != '') {
    //         document.querySelector('.maxRMoment2').classList.add('ReqValueOk');
    //         document.querySelector('.maxRMoment2').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.maxRMoment2').classList.add('noReqValue');
    //         document.querySelector('.maxRMoment2').classList.remove('ReqValueOk');
    //     }
    // });
    // Стиль для блока типа вала
    // $('.valType').on('change', function (e) {
    //     if (document.querySelector('#valType').value != '' && document.querySelector('#outStock').value != '' && document.querySelector('#dStock').value != '') {
    //         document.querySelector('.valType').classList.add('ReqValueOk');
    //         document.querySelector('.valType').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.valType').classList.add('noReqValue');
    //         document.querySelector('.valType').classList.remove('ReqValueOk');
    //     }
    // });
    // Стиль для блока обороты для закрытия
    $('.closeNumbers').on('change', function (e) {
        if (document.querySelector('#closeNumbers').value != '') {
            document.querySelector('.closeNumbers').classList.add('ReqValueOk');
            document.querySelector('.closeNumbers').classList.remove('noReqValue');
        } else {
            document.querySelector('.closeNumbers').classList.add('noReqValue');
            document.querySelector('.closeNumbers').classList.remove('ReqValueOk');
        }
    });
    // // Стиль для блока рабочей среды
    // $('.working-env').on('change', function (e) {
    //     if (document.querySelector('#working-env').value != '') {
    //         document.querySelector('.working-env').classList.add('ReqValueOk');
    //         document.querySelector('.working-env').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.working-env').classList.add('noReqValue');
    //         document.querySelector('.working-env').classList.remove('ReqValueOk');
    //     }
    // });
    // Стиль для блока установки
    $('.placeForEnv').on('change', function (e) {
        if (document.querySelector('#placeForEnv-1').checked || document.querySelector('#placeForEnv-2').checked) {
            document.querySelector('.placeForEnv').classList.add('ReqValueOk');
            document.querySelector('.placeForEnv').classList.remove('noReqValue');
        } else {
            document.querySelector('.placeForEnv').classList.add('noReqValue');
            document.querySelector('.placeForEnv').classList.remove('ReqValueOk');
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
    // Сигнал момент 4-20
    // $('.signalMoment').on('change', function (e) {

    //     if(document.querySelector("#signalMoment-1").checked)
    //     {document.querySelector('.signalMoment').classList.add('ReqValueOk');
    //      document.querySelector('.signalMoment').classList.remove('optionalField');
    //     }
    //     else
    //     {document.querySelector('.signalMoment').classList.add('optionalField');
    //      document.querySelector('.signalMoment').classList.remove('ReqValueOk');
    //     }
    // });
    // // Дублирование шины
    // $('.tire').on('change', function (e) {
    //     if(document.querySelector("#tire-1").checked)
    //     {document.querySelector('.tire').classList.add('ReqValueOk');
    //      document.querySelector('.tire').classList.remove('optionalField');
    //     }
    //     else
    //     {document.querySelector('.tire').classList.add('optionalField');
    //      document.querySelector('.tire').classList.remove('ReqValueOk');
    //     }
    // });
    // Кабельные вводы
    // $('.cableField').on('change', function (e) {
    //     if (document.querySelector('#cabels-2').checked || document.querySelector('#cabelsInput-1').value != '') {
    //         document.querySelector('.cableField').classList.add('ReqValueOk');
    //         document.querySelector('.cableField').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.cableField').classList.add('noReqValue');
    //         document.querySelector('.cableField').classList.remove('ReqValueOk');
    //     }
    // });
    // // Штепсельные разъемы
    // $('.stepseField').on('change', function (e) {
    //     if (!document.querySelector('#stepse-1').checked || (document.querySelector('#inputStepse').value != '' && document.querySelector('#inputTypeStepse').value != '')) {
    //         document.querySelector('.stepseField').classList.add('ReqValueOk');
    //         document.querySelector('.stepseField').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.stepseField').classList.add('noReqValue');
    //         document.querySelector('.stepseField').classList.remove('ReqValueOk');
    //     }
    // });
    // // Коррозийная защита
    // $('#corrosionProtection').on('change', function (e) {
    //     if ($("input[name='corrosionProtection']:checked").val()) {
    //         document.querySelector('.corrosionProtection').classList.add('ReqValueOk');
    //         document.querySelector('.corrosionProtection').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.corrosionProtection').classList.add('noReqValue');
    //         document.querySelector('.corrosionProtection').classList.remove('ReqValueOk');
    //     }
    // });
    // // концевые выключатели
    // $('#endTogglers').on('change', function (e) {
    //     if ($("input[name='endTogglers']:checked").val()) {
    //         document.querySelector('.endTogglers').classList.add('ReqValueOk');
    //         document.querySelector('.endTogglers').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.endTogglers').classList.add('noReqValue');
    //         document.querySelector('.endTogglers').classList.remove('ReqValueOk');
    //     }
    // });
    // промеж выключатели
    // $('#spaceTogglers').on('change', function (e) {
    //     if ($("input[name='spaceTogglers']:checked").val()) {
    //         document.querySelector('.spaceTogglers').classList.add('ReqValueOk');
    //         document.querySelector('.spaceTogglers').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.spaceTogglers').classList.add('noReqValue');
    //         document.querySelector('.spaceTogglers').classList.remove('ReqValueOk');
    //     }
    // });
    // // момент выключатели
    // $('#momentTogglers').on('change', function (e) {
    //     if ($("input[name='momentTogglers']:checked").val()) {
    //         document.querySelector('.momentTogglers').classList.add('ReqValueOk');
    //         document.querySelector('.momentTogglers').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.momentTogglers').classList.add('noReqValue');
    //         document.querySelector('.momentTogglers').classList.remove('ReqValueOk');
    //     }
    // });
    // Сигнализация включения ручного маховика
    // $('#handMach').on('change', function (e) {
    //     if ($("input[name='handMach']:checked").val()) {
    //         document.querySelector('.handMach').classList.add('ReqValueOk');
    //         document.querySelector('.handMach').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.handMach').classList.add('noReqValue');
    //         document.querySelector('.handMach').classList.remove('ReqValueOk');
    //     }
    // });
    // Питание
    // $('#heating').on('change', function (e) {
    //     if ($("input[name='heating']:checked").val()) {
    //         document.querySelector('.heating').classList.add('ReqValueOk');
    //         document.querySelector('.heating').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.heating').classList.add('noReqValue');
    //         document.querySelector('.heating').classList.remove('ReqValueOk');
    //     }
    // });
    // Монтаж
    // $('#montage').on('change', function (e) {
    //     if ($("input[name='montage']:checked").val()) {
    //         document.querySelector('.montage').classList.add('ReqValueOk');
    //         document.querySelector('.montage').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.montage').classList.add('noReqValue');
    //         document.querySelector('.montage').classList.remove('ReqValueOk');
    //     }
    // });
    // // Функция должна выполняться
    // $('#functionGo').on('change', function (e) {
    //     if ($("input[name='functionGo']:checked").val()) {
    //         document.querySelector('.functionGo').classList.add('ReqValueOk');
    //         document.querySelector('.functionGo').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.functionGo').classList.add('noReqValue');
    //         document.querySelector('.functionGo').classList.remove('ReqValueOk');
    //     }
    // });
    // // Условие для запуска
    // $('#functionStartIf').on('change', function (e) {
    //     if ($("input[name='functionStartIf']:checked").val()) {
    //         document.querySelector('.functionStartIf').classList.add('ReqValueOk');
    //         document.querySelector('.functionStartIf').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.functionStartIf').classList.add('noReqValue');
    //         document.querySelector('.functionStartIf').classList.remove('ReqValueOk');
    //     }
    // });
    // // SIL
    // $('#SIL').on('change', function (e) {
    //     if ($("input[name='SIL']:checked").val()) {
    //         document.querySelector('.SIL').classList.add('ReqValueOk');
    //         document.querySelector('.SIL').classList.remove('noReqValue');
    //     } else {
    //         document.querySelector('.SIL').classList.add('noReqValue');
    //         document.querySelector('.SIL').classList.remove('ReqValueOk');
    //     }
    // });
    // // esdType
    // $('#esdType').on('change', function (e) {
    //     if ($("input[name='esdType']:checked").val() == '1' || $("input[name='esdType']:checked").val() == '2') {
    //         document.querySelector('.esdType').classList.add('ReqValueOk');
    //         document.querySelector('.esdType').classList.remove('noReqValue');
    //         {
    //             document.querySelector('#inputForEsdType3').setAttribute('disabled', true);
    //             document.querySelector('#inputForEsdType3').value = '';
    //         }
    //     }
    //     if ($("input[name='esdType']:checked").val() == '3') {
    //         document.querySelector('#inputForEsdType3').removeAttribute('disabled');
    //         document.querySelector('.esdType').classList.remove('ReqValueOk');
    //         document.querySelector('.esdType').classList.add('noReqValue');
    //         if (document.querySelector('#inputForEsdType3').value !== '') {
    //             document.querySelector('.esdType').classList.add('ReqValueOk');
    //             document.querySelector('.esdType').classList.remove('noReqValue');
    //         }
    //     }
    // });
    // кол-во приводов
    $('#numbersOfEp').on('change', function (e) {
        if (document.querySelector('.numbersOfEp').value !== '') {
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    // ОБРАБОТКА ОПРЕДЕЛЕНИЯ БЛОКА УПРАВЛЕНИЯ
    function checkCommandBlock() {
        let m1 = document.querySelector('#m1-1').checked ? 'Сигнализация о двух промежуточных положениях выходного вала посредством двух путевых промежуточных выключателей; ' : '';
        let m2 = document.querySelector('#m1-2').checked ? 'Сигнализация о текущем положении выходного вала посредством изменения сопротивления потенциометра; ' : '';
        let m3 = document.querySelector('#m1-3').checked ? 'Сигнализация о текущем положении выходного вала посредством токового сигнала, изменяющегося пропорционально пути, пройденному выходным валом привода; ' : '';
        let m4 = document.querySelector('#m1-4').checked
            ? 'Сигнализация факта вращения выходного вала привода посредством замыкания и размыкания сухих контактов выключателя (блинкера) при изменении положения входного путевого вала блока (1 импульс на 1 оборот выходного вала привода (оснащение блока управления блинкером — по отдельному заказу)); '
            : '';
        let m5 = document.querySelector('#m1-5').checked ? 'Сигнализация о достигаемых положениях и моментах посредством 4 контактных микровыключателей (код z5=0) или 3-контактных микровыключателей (код z5=1); ' : '';
        let m6 = document.querySelector('#m1-6').checked
            ? 'Блокировка сигнала превышения заданного при настройке блока значения крутящего момента привода (байпас сигнала превышения момента) в начальный период движения из состояния, соответствующего открытому и закрытому состоянию арматуры (с раздельной настройкой для движения на открытие и на закрытие арматуры), на протяжении заданного при настройке блока пути, проходимого выходным валом привода; '
            : '';
        let m7 = document.querySelector('#m1-7').checked
            ? 'Блокировка возможности повторного включения двигателя привода по электрической цепи, содержащей нормально замкнутый контакт моментного выключателя, размыканием которого был выключен двигатель привода при достижении крутящего момента, заданного при настройке блока (фиксация моментных выключателей); '
            : '';
        let m8 = 'Верхний предел настройки путевых выключателей в оборотах выходного вала:' + ' ' + document.querySelector('#upper-limitForM1').value;

        let base = document.querySelector('#controle-blocks').value;
        switch (base) {
            case 'Э11':
                return 'Базовый набор функций ВИМУ';
            case 'Э12':
                return '1)Базовый набор функций ВИМУ 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'Э13':
                return '1)Базовый набор функций ВИМУ 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э14':
                return '1)Базовый набор функций ВИМУ 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э15':
                return '1)Базовый набор функций ВИМУ 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'Э16':
                return '1)Базовый набор функций ВИМУ 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э17':
                return '1)Базовый набор функций ВИМУ 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э18':
                return '1)Базовый набор функций ВИМУ 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э19':
                return '1)Базовый набор функций ВИМУ 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э110':
                return '1)Базовый набор функций ВИМУ 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'Э22':
                return 'Передача информации о положении выходного вала привода посредством токового сигнала (4-20 мА или 0-5 мА)';
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
            case 'М1':
                return 'Пропущен конфигуратор';
            case 'Э2':
                return 'Пропущен конфигуратор';
            case 'Э01':
                return 'Выносной интеллектуальный модуль управления с пускателем';
            case 'Э0':
                return 'Выносной интеллектуальный модуль управления с пускателем';
            default:
                console.log(base);
                return (g6 = m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8);
        }
    }

    // Проверка на запорно-регулирующую арматуру для пм модуля
    $('.timeMode').on('change', function (e) {
        if ($("input[name='working-mode']:checked").val() == 'Р') 
        {
            document.querySelector('.tuMpField').style.display = 'block';
        } 
        else {
            document.querySelector('.tuMpField').style.display = 'none';
        }});
// СТИЛИ ДЛЯ РЕЖИМА РАБОТЫ
        $('.timeMode').on('change', function (e) {
            if ($("input[name='working-mode']:checked")) 
        {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        } 
        else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');

        }});

// Открытие доп оснащения для блока управления при Э1
    $('#control-block-fieldset').on('change', function (e) {
            if ($('#controle-blocks-series').val()=='Э1') 
        {
            document.querySelector("#control-block-optionsset").style.display = 'block';
        } 
        else {
            $('#controle-blocks-options').val('noValue')
            document.querySelector("#control-block-optionsset").style.display = 'none';
            document.querySelector("#control-block-optionsset").classList.remove('ReqValueOk');
            document.querySelector("#control-block-optionsset").classList.add('noReqValue');
        }
    });

// стили оснащения для блока управления при Э1
    $('#control-block-optionsset').on('change', function (e) {
            if ($('#controle-blocks-options option:selected').val() !=='noValue') 
        {
            document.querySelector("#control-block-optionsset").classList.add('ReqValueOk');
            document.querySelector("#control-block-optionsset").classList.remove('noReqValue');
        } 
        else {
            document.querySelector("#control-block-optionsset").classList.remove('ReqValueOk');
            document.querySelector("#control-block-optionsset").classList.add('noReqValue');
        }
    });
    // Формула для требуемого времени закрытия
    $(document).on('change', function (e) {
       x = document.querySelector("#closingTime");
       closNumbers = document.querySelector("#closeNumbers").value;
       rotAtMin = document.querySelector("#rotation-frequency").value;
       if(closNumbers && rotAtMin ) {x.value = closNumbers/(rotAtMin/60)}
    });
});