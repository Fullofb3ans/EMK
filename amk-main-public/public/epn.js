// https://www.tulaprivod.ru/dokument/shema/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%AD%D0%9F%D0%9D.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    // КОНСТАНТЫ ДЛЯ ПДФ
    const torques = {
        epn: {
            Н: {
                1: [20, 40, 75, 80, 100, 150, 300, 600, 1200],
                3: [20, 40, 75, 80, 150, 300, 420, 600, 1200],
                6: [20, 40, 75, 80, 150, 300, 420, 600, 840, 1200],
            },
            В: {
                1: [20, 40, 75, 80, 150, 200, 300, 600, 1200],
                3: [20, 40, 75, 80, 150, 200, 300, 420, 600, 1200],
                6: [20, 40, 75, 80, 150, 200, 300, 600, 1200],
            },
        },
    };

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
            Н: {
                0: 'epnn-scheme-0.png',
                1: 'epnn-scheme-1.png',
                11: 'epnn-scheme-1.png',
                12: 'epnn-scheme-12.png',
                3: 'epnn-scheme-3.png',
                31: 'epnn-scheme-3.png',
                32: 'epnn-scheme-32.png',
            },
            В: {
                0: 'epnv-scheme-0.png',
                1: 'epnv-scheme-1.png',
                11: 'epnv-scheme-1.png',
                12: 'epnv-scheme-12.png',
                2: 'epnv-scheme-2.png',
                3: 'epnv-scheme-3.png',
                31: 'epnv-scheme-3.png',
                32: 'epnv-scheme-32.png',
            },
        },
    };

    const executions = {
        epn: {
            Н: 'Общепромышленное исполнение',
            В: 'Взрывозащитное исполнение',
        },
    };

    const execution_wrap = $('#execution-wrap');

    const time_limits = {
        epn: {
            Н: {
                // Общепромышленное исполнение
                1: {
                    // Однофазная 220
                    0: {
                        20: [5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [16, 22, 32, 45, 63],
                        80: [32, 45, 63],
                    },
                    11: {
                        75: [4, 5.6, 8, 11, 16, 22, 32],
                    },
                    1: {
                        100: [4],
                        150: [5.6, 8, 11, 16, 22, 32],
                    },
                    31: {
                        300: [8, 11, 16, 22, 32, 45],
                    },
                    12: {
                        300: [63, 90],
                    },
                    3: {
                        600: [8, 11, 16, 22, 32, 45, 63],
                    },
                    32: {
                        1200: [22, 32, 45, 63, 90, 125, 180],
                    },
                },
                3: {
                    0: {
                        20: [5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [16, 22, 32, 45, 63],
                        80: [32, 45, 63],
                    },
                    11: {
                        75: [16, 22, 32],
                    },
                    1: {
                        150: [22, 32],
                    },
                    31: {
                        300: [8, 11, 16, 22, 32, 45],
                    },
                    12: {
                        300: [63, 90],
                    },
                    3: {
                        420: [8],
                        600: [11, 16, 22, 32, 45, 63],
                    },
                    32: {
                        1200: [22, 32, 45, 63, 90, 125, 180],
                    },
                },
                6: {
                    0: {
                        20: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                        80: [8, 11, 16, 22, 32, 45, 63],
                    },
                    11: {
                        75: [4, 5.6, 8, 11, 16],
                    },
                    1: {
                        150: [4, 5.6, 8, 11, 16],
                    },
                    31: {
                        300: [8, 11, 16, 22],
                    },
                    3: {
                        420: [8],
                        600: [11, 16, 22],
                    },
                    32: {
                        840: [22],
                        1200: [32, 45, 63],
                    },
                },
            },
            В: {
                // взрывозащищённое исполнение
                1: {
                    // однофазная сеть 220
                    0: {
                        20: [5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [16, 22, 32, 45, 63],
                        80: [32, 45, 63],
                    },
                    11: {
                        75: [16, 22, 32],
                    },
                    1: {
                        100: [4],
                        150: [5.6, 8, 11, 16, 22, 32],
                    },
                    2: {
                        200: [4],
                        300: [5.6, 8, 11, 16, 22, 32, 45, 63],
                    },
                    31: {
                        300: [3, 4, 5.6, 8, 11],
                    },
                    12: {
                        300: [16, 22, 32, 45, 63, 90],
                    },
                    3: {
                        600: [5.6, 8, 11, 16, 22, 32, 45, 63],
                    },
                    32: {
                        1200: [16, 22, 32, 45, 63, 90, 125, 180],
                    },
                },
                3: {
                    0: {
                        20: [5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [16, 22, 32, 45, 63],
                        80: [32, 45, 63],
                    },
                    11: {
                        75: [4, 5.6, 8, 11, 16, 22, 32],
                    },
                    1: {
                        150: [22, 32],
                    },
                    2: {
                        150: [4],
                        200: [5.6],
                        300: [8, 11, 16, 22, 32, 45, 63],
                    },
                    31: {
                        300: [8, 11, 16, 22, 32, 45],
                    },
                    12: {
                        300: [63, 90],
                    },
                    3: {
                        420: [8],
                        600: [11, 16, 22, 32, 45, 63],
                    },
                    32: {
                        1200: [22, 32, 45, 63, 90, 125, 180],
                    },
                },
                6: {
                    0: {
                        20: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                        40: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
                        80: [8, 11, 16, 22, 32, 45, 63],
                    },
                    11: {
                        75: [4, 5.6, 8, 11, 16],
                    },
                    1: {
                        150: [4, 5.6, 8, 11, 16],
                    },
                    2: {
                        200: [4],
                        300: [5.6, 8, 11],
                    },
                    31: {
                        300: [8, 11, 16, 22],
                    },
                    3: {
                        600: [8, 11, 16, 22],
                    },
                    32: {
                        1200: [22, 32, 45, 63],
                    },
                },
            },
        },
    };

    const flanges = {
        epn: {
            0: ['F03', 'F04', 'F05'],
            11: ['F04', 'F05'],
            1: ['F04', 'F05', 'F07'],
            2: ['F07', 'F10'],
            31: ['F07', 'F10'],
            12: ['F07', 'F10'],
            3: ['F10', 'F12'],
            32: ['F12', 'F14'],
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

    $(document).on('change', "input[name='constructive-scheme']", function (e) {
        $('#step-5').show();
        let execution = $("input[name='execution']:checked").val();

        let cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();
        let cur_flange_value = $('#flange').val();

        let upper_limit = $('#upper-limit').val();
        let rotation_frequency = $('#rotation-frequency').val();
        let connection_type = $("input[name='connection-type']:checked").val();

        let flanges_select = $('#flange').empty().append(new Option('Выберите значение', ''));
        let control_block = $('#controle-blocks');
        let cur_control_block = $('#controle-blocks').val();

        let control_select = $('#controle-blocks-series').empty().append(new Option('Выберите значение', ''));

        let flanges_arr = [];

        if (!!cur_constructive_scheme) {
            flanges_arr = flanges['epn'][cur_constructive_scheme];

        $.each(flanges_arr, function (key, item) {
            flanges_select.append(new Option(item, item, false, cur_flange_value == item));
        });
    }

        let series = {
            epn: {
                М2: 'Серия М2',
                ВЭ: 'Серия ВЭ',
                ВЭ1: 'Серия ВЭ1',
            },
        };

        if (!!cur_constructive_scheme) {
            // $("#controle-blocks").empty().append(new Option('Выберите значение', ''));
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
            $('#constructive-scheme-img')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + cheme_img['epn'][execution][cur_constructive_scheme],
                        class: 'img-fluid',
                    })
                );
        }
    });

    $('.ch-upper-limit').on('change', function (e) {
        let power_type = $("input[name='power-type']:checked").val();
        let execution = $("input[name='execution']:checked").val();
        let connection_type = $("input[name='connection-type']:checked").val();
        let cur_upper_limit = $('#upper-limit').val();
        let upper_limit = $('#upper-limit').empty().append(new Option('Выберите значение', ''));
        $('#step-3').show();
        torques_arr = torques['epn'][execution][power_type];

        console.log(time_limits['epn'][execution][power_type]);

        if(typeof execution !== 'undefined' && typeof power_type !== 'undefined') {
            console.log(execution);
            console.log(power_type);
            let keys = [];
            $.each(time_limits['epn'][execution][power_type], function (key, item){
                // console.log(Object.keys(item));
                keys.push(...Object.keys(item));
            });

            console.log(keys);

            $.each(
                [
                    ...new Set(
                        keys.sort(function (a, b) {
                            return a - b;
                        })
                    ),
                ],
                function (index, item) {
                    upper_limit.append(new Option(item, item, false, item == cur_upper_limit));
                }
            );
        }
    });

    $('.ch-time-limit ').on('change', function (e) {
        $('#step-4').show();
        var execution = $("input[name='execution']:checked").val();
        var power_type = $("input[name='power-type']:checked").val();
        var upper_limit = $('#upper-limit').val();
        var cur_time_limit = $('#time-limit').val();
        var times_options = [];

        select_options = $('#time-limit');
        time_limits_arr = time_limits['epn'][execution][power_type];
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
        option_id = '#time-limit';

        execution = $("input[name='execution']:checked").val();
        x4 = $('#upper-limit').val();
        x5 = $(option_id).val();
        power_type = $("input[name='power-type']:checked").val();

        constructive_scheme = [];
        time_limits_arr = time_limits['epn'][execution][power_type];

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
                console.log(item);
                $('#constructive-scheme-wrap').append(
                    $('<div>')
                        .prop({ class: 'form-check' })
                        .append(
                            $('<input>').prop({
                                type: 'radio',
                                id: 'scheme-' + item,
                                name: 'constructive-scheme',
                                value: item,
                                class: 'form-check-input ch-mark',
                                defaultChecked: constructive_scheme.length == 1,
                            })
                        )
                        .append(
                            $('<label>')
                                .prop({
                                    for: 'scheme-' + item,
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

        if (document.getElementsByName('constructive-scheme').length < 2) {
            $('#schemeFieldSet').hide();
        } else {
            $('#schemeFieldSet').show();
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

        let flange = document.querySelector('#flange');
        let a = document.querySelector('#rotation-frequency');
        let b = document.querySelector('#time-limit');
        if (a.value === '' && b.value === '') {
            flange.value = '';
            $(flange).attr('disabled', true);
        } else {
            $(flange).attr('disabled', false);
        }
    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');

        let x0 = 'ЭПНВ';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : 'X';
        switch (x1) {
            case 'X':
                ($("input[name='working-mode']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='working-mode']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='working-mode']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='working-mode']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x2 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : 'X';
        switch (x2) {
            case 'X':
                ($("input[name='execution']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='execution']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='execution']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='execution']")).closest('fieldset').addClass('ReqValueOk');
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

        let x7 = $("input[name='power-type']:checked").val() ? $("input[name='power-type']:checked").val() : 'X';
        switch (x7) {
            case 'X':
                ($("input[name='power-type']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='power-type']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='power-type']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='power-type']")).closest('fieldset').addClass('ReqValueOk');
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

        $('#certs-pdf').empty();
        if (!is_true && certs_pdf['epn'][x2] !== undefined) {
            $('#certs-pdf').append(
                $('<a>')
                    .attr({ href: 'pdf/' + certs_pdf['epn'][x2]['cert'], target: '_blank' })
                    .text('Сертификат')
                    .css('padding', '1.5%'),
                $('<a>')
                    .attr({ href: 'pdf/' + certs_pdf['epn'][x2]['decl'], target: '_blank' })
                    .text('Декларация')
                    .css('padding', '1.5%')
            );
        }

        modal_button.toggle(!is_true);
        mark_gen.toggleClass('is-invalid', is_true).toggleClass('is-valid', !is_true);
    });

    $('#modal-th').on('shown.bs.modal', function () {
        console.log('hea');
        let CapText = document.querySelector('#cap > input[type=checkbox]').checked ? '1' : '0';
        let PointerText = document.querySelector('#pointer > input[type=checkbox]').checked ? '1' : '0';
        let addOptSel = document.querySelector("#mechSelectorId > input[type=checkbox]").checked ? 1 : 0;
        let addOptBoard = document.querySelector("#boardRegId > input[type=checkbox]").checked ? 2 : 0;
        let allOpt = addOptSel + addOptBoard;

        let color = $("input[name='color']:checked").val();
        if (color == '1') {
            color = '0';
        } else if (color == '2') {
            color = '1';
        }

        //создание jsona
        j1 = 'ЭПН';
        j2 = document.querySelector('#mark-gen').innerText;
        j3 = 'АО Тулаэлектропривод';
        j4 = document.querySelector('#pressure').value;
        j5 = document.querySelector('#diameter').value;
        j6 = document.querySelector('#closingTimeTo').value;
        j7 = document.querySelector('#closingTimeFrom').value;
        j8 = document.querySelector('#maxRMoment').value;
        j9 = document.querySelector('#maxRMoment2').value;
        j10 = document.querySelector("#flange").value;
        j11 = document.querySelector('#closeNumbers').value;
        j12 = document.querySelector('#working-env').value;
        j13 = $("input[name='placeForEnv']:checked").val() ? $("input[name='placeForEnv']:checked").val() : 2;

        // Вторая часть jsona
        h1 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text();
        h2 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text();
        h3 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text();
        h4 = 'закрывание по часовой стрелке';
        h5 = $('#climatic-modification option:selected').text();
        h6 = $("input[name='typeEndSwich']:checked").val() ? $("input[nameypeEndSwic='th']:checked").val() : 2;
        h7 = $("input[name='commandBlockType']:checked").val() ? $("input[name='commandBlockType']:checked").val() : 2;
        h8 = PointerText;
        h9 = document.querySelector('#signal').value ? document.querySelector('#signal').value : '0';
        h10 = document.querySelector('#commandSignal').value ? document.querySelector('#commandSignal').value : 0;
        h11 = $("input[name='signalMoment']:checked").val() ? $("input[name='signalMoment']:checked").val() : '0';
        h12 = $("input[name='tire']:checked").val() ? $("input[name='tire']:checked").val() : '0';
        h13 = document.querySelector('#cabels-1').checked ? '1' : '0';
        h14 = document.querySelector('#cabels-1').checked ? document.querySelector('#cabels-1').value : '0';
        h15 = document.querySelector('#stepse-1').checked ? '1' : '0';
        h16 = document.querySelector('#stepse-1').checked ? document.querySelector('#inputStepse').value : '-';
        h17 = document.querySelector('#stepse-1').checked ? document.querySelector('#inputTypeStepse').value : '___';
        h18 = color;
        h19 = document.querySelector('#ralColor').value ? document.querySelector('#ralColor').value : '0';
        h20 = CapText;
        h21 = document.querySelector('#numbersOfEp').value;
        h22 = allOpt;
        h23 = document.querySelector('#addReqarea').value ? document.querySelector('#addReqarea').value : '';

        // ДОБАВИТЬ ARMTEXT
        // третья часть
        p1 = day = '';
        p2 = month = '';
        p3 = document.querySelector('#organization').value;
        p4 = document.querySelector('#fio').value;
        p5 = document.querySelector('#phone').value;
        p6 = document.querySelector('#email').value;

        sendToServer();

        function sendToServer() {
            timer = 0;
           let post =  fetch('http://217.144.103.121/download', {
               method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
               body: JSON.stringify({
                   jsn1: [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13],
                   jsn2: [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23],
                   jsn3: [p1, p2, p3, p4, p5, p6],
                }),
            })
            .then ((response) => response.json())
            .then ((response) => window.open(`http://217.144.103.121/Tula/${response.id}`));
        }
    });

     //  кабельных вводов подмена значений 
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
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1'|| cbs === 'М2') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });
    // Открытия поля с чертежом
    $('#drawing').on('change', function (e) {
        if (document.querySelector('#drawing').value != 3) {
            document.querySelector('#upload').classList.toggle('none');
        }
    });
    // СТИЛЬ ДЛЯ ПОЛЯ С ДАННЫМИ
    $('.persInfo').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '' ) {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {document.querySelector('.persInfo ').classList.remove('ReqValueOk');
        document.querySelector('.persInfo ').classList.add('noReqValue');}
    });
    // СТИЛЬ ДЛЯ ПОЛЯ Со схемами
    $('№schemeFieldSet').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '' ) {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {document.querySelector('.persInfo ').classList.remove('ReqValueOk');
        document.querySelector('.persInfo ').classList.add('noReqValue');}
    });
    // Стиль для модуля Модуль прямоходный
    $('.tuMpField').on('change', function (e) {
        if(document.querySelector("#tuMpCheck > input[type=checkbox]").checked)
        {document.querySelector('.tuMpField ').classList.add('ReqValueOk');
         document.querySelector('.tuMpField ').classList.remove('noReqValue');
        }
        else {document.querySelector('.tuMpField ').classList.add('noReqValue');
         document.querySelector('.tuMpField ').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Наибольший ход, мм
    $('#maxStepMp').on('change', function (e) {
        if(document.querySelector("#maxStepMp").value != '') 
        {document.querySelector('#maxStepMp ').classList.add('ReqValueOk');
         document.querySelector('#maxStepMp ').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('#maxStepMp').classList.add('noReqValue');
         document.querySelector('#maxStepMp').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Номинальный крутящий момент
    $('#roundMomentMp').on('change', function (e) {
        if(document.querySelector("#roundMomentMp").value != undefined) 
        {document.querySelector('.roundMomentMp').classList.add('ReqValueOk');
         document.querySelector('.roundMomentMp').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentMp').classList.add('noReqValue');
         document.querySelector('.roundMomentMp').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Крутящий момент привода
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#roundMomentEngine").value != '') 
        {document.querySelector('.roundMomentEngine').classList.add('ReqValueOk');
         document.querySelector('.roundMomentEngine').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentEngine').classList.add('noReqValue');
         document.querySelector('.roundMomentEngine').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Диапазон усилий на штоке модуля при настройке привода на крутящий момент
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#roundMomentInterval").value != '') 
        {document.querySelector('.roundMomentInterval').classList.add('ReqValueOk');
         document.querySelector('.roundMomentInterval').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentInterval').classList.add('noReqValue');
         document.querySelector('.roundMomentInterval').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Ход штока модуля за один оборот
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#stepForOne").value != '') 
        {document.querySelector('.stepForOne').classList.add('ReqValueOk');
         document.querySelector('.stepForOne').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.stepForOne').classList.add('noReqValue');
         document.querySelector('.stepForOne').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля номинальное давление
    $('#pressure').on('change', function (e) {
        if(document.querySelector("#pressure").value != '') 
        {document.querySelector('.pressure').classList.add('ReqValueOk');
         document.querySelector('.pressure').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.pressure').classList.add('noReqValue');
         document.querySelector('.pressure').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля диаметр
    $('#diameter').on('change', function (e) {
        if(document.querySelector("#diameter").value != '') 
        {document.querySelector('.diameter').classList.add('ReqValueOk');
         document.querySelector('.diameter').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.diameter').classList.add('noReqValue');
         document.querySelector('.diameter').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Время закрытия
    $('.closingTime').on('change', function (e) {
        if(document.querySelector("#closingTimeFrom").value!= '' && document.querySelector("#closingTimeTo").value!= ''  ) 
        {document.querySelector('.closingTime').classList.add('ReqValueOk');
         document.querySelector('.closingTime').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.closingTime').classList.add('noReqValue');
         document.querySelector('.closingTime').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля макс крут момент
    $('.maxRMoment').on('change', function (e) {
        if(document.querySelector("#maxRMoment").value!= '') 
        {document.querySelector('.maxRMoment').classList.add('ReqValueOk');
         document.querySelector('.maxRMoment').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.maxRMoment').classList.add('noReqValue');
         document.querySelector('.maxRMoment').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля макс крут момент на закрывание
    $('.maxRMoment2').on('change', function (e) {
        if(document.querySelector("#maxRMoment2").value!= '') 
        {document.querySelector('.maxRMoment2').classList.add('ReqValueOk');
         document.querySelector('.maxRMoment2').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.maxRMoment2').classList.add('noReqValue');
         document.querySelector('.maxRMoment2').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока типа вала
    $('.valType').on('change', function (e) {
        if(document.querySelector("#valType").value!= '' && document.querySelector("#outStock").value!= '' && document.querySelector("#dStock").value!= '') 
        {document.querySelector('.valType').classList.add('ReqValueOk');
         document.querySelector('.valType').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.valType').classList.add('noReqValue');
         document.querySelector('.valType').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока обороты для закрытия
    $('.closeNumbers').on('change', function (e) {
        if(document.querySelector("#closeNumbers").value!= '') 
        {document.querySelector('.closeNumbers').classList.add('ReqValueOk');
         document.querySelector('.closeNumbers').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.closeNumbers').classList.add('noReqValue');
         document.querySelector('.closeNumbers').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока рабочей среды
    $('.working-env').on('change', function (e) {
        if(document.querySelector("#working-env").value!= '') 
        {document.querySelector('.working-env').classList.add('ReqValueOk');
         document.querySelector('.working-env').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.working-env').classList.add('noReqValue');
         document.querySelector('.working-env').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока установки
    $('.placeForEnv').on('change', function (e) {
        if(document.querySelector("#placeForEnv-1").checked || document.querySelector("#placeForEnv-2").checked) 
        {document.querySelector('.placeForEnv').classList.add('ReqValueOk');
         document.querySelector('.placeForEnv').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.placeForEnv').classList.add('noReqValue');
         document.querySelector('.placeForEnv').classList.remove('ReqValueOk');
        }
    });
    // Тип блока концевых выключателей
    $('.typeEndSwich').on('change', function (e) {
        if(document.querySelector("#typeEndSwich-1").checked || document.querySelector("#typeEndSwich-2").checked) 
        {document.querySelector('.typeEndSwich').classList.add('ReqValueOk');
         document.querySelector('.typeEndSwich').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.typeEndSwich').classList.add('noReqValue');
         document.querySelector('.typeEndSwich').classList.remove('ReqValueOk');
        }
    });
    // Тип блока управления привода
    $('.commandBlockType').on('change', function (e) {
        if(document.querySelector("#commandBlockType-1").checked || document.querySelector("#commandBlockType-2").checked) 
        {document.querySelector('.commandBlockType').classList.add('ReqValueOk');
         document.querySelector('.commandBlockType').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.commandBlockType').classList.add('noReqValue');
         document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
        }
    });
    // Сигнализация положения
    $('.signal').on('change', function (e) {
        if(document.querySelector("#signal").value != '') 
        {document.querySelector('.signal').classList.add('ReqValueOk');
         document.querySelector('.signal').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.signal').classList.add('noReqValue');
         document.querySelector('.signal').classList.remove('ReqValueOk');
        }
    });
    // Сигналы дист управления 
    $('.commandSignal').on('change', function (e) {
        if(document.querySelector("#commandSignal").value != '') 
        {document.querySelector('.commandSignal').classList.add('ReqValueOk');
         document.querySelector('.commandSignal').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.commandSignal').classList.add('noReqValue');
         document.querySelector('.commandSignal').classList.remove('ReqValueOk');
        }
    });
    // Сигнал момент 4-20 
    // $('.signalMoment').on('change', function (e) {
    //     if(document.querySelector("#signalMoment-1").checked) 
    //     {document.querySelector('.signalMoment').classList.add('ReqValueOk');
    //      document.querySelector('.signalMoment').classList.remove('noReqValue');
    //     }
    //     else 
    //     {document.querySelector('.signalMoment').classList.add('noReqValue');
    //      document.querySelector('.signalMoment').classList.remove('ReqValueOk');
    //     }
    // });
    // Дублирование шины
    // $('.tire').on('change', function (e) {
    //     if(document.querySelector("#tire-1").checked) 
    //     {document.querySelector('.tire').classList.add('ReqValueOk');
    //      document.querySelector('.tire').classList.remove('noReqValue');
    //     }
    //     else 
    //     {document.querySelector('.tire').classList.add('noReqValue');
    //      document.querySelector('.tire').classList.remove('ReqValueOk');
    //     }
    // });
    // Кабельные вводы
    $('.cableField').on('change', function (e) {
        if(document.querySelector("#cabels-2").checked || document.querySelector("#cabelsInput-1").value != '') 
        {document.querySelector('.cableField').classList.add('ReqValueOk');
         document.querySelector('.cableField').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.cableField').classList.add('noReqValue');
         document.querySelector('.cableField').classList.remove('ReqValueOk');
        }
    });
    // Штепсельные разъемы
    $('.stepseField').on('change', function (e) {
        if(!document.querySelector("#stepse-1").checked || (document.querySelector("#inputStepse").value != '' && document.querySelector("#inputTypeStepse").value != '') ) 
        {document.querySelector('.stepseField').classList.add('ReqValueOk');
         document.querySelector('.stepseField').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.stepseField').classList.add('noReqValue');
         document.querySelector('.stepseField').classList.remove('ReqValueOk');
        }
    });
});
