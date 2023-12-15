$(document).ready(function () {
    listToHtml();
    checkUser();

    function checkUser() {
        fetch('https://emk.websto.pro/user', {
        })
            .then((res) => res.json())
            .then((res) => {
                $('#containerForPI').append(
                    $('<h5 class="textInlk">').text('res.user.department')).append(
                        $('<div class="textInlk">').text('res.user.fio[0] +  res.user.fio[1] + res.user.fio[2]'));
                console.log(res.valid);
                console.log(res);
            });
    }

    function listToHtml() {
        const jsonListToHtml = {
            // Названия
            'date': {
                '01-01-21': [
                    {
                        "id": "1",
                        "text": "КО Неизвестное ЭП4РН.pdf",
                    },
                    {
                        "id": "2",
                        "text": "КО Известное ВИМУН.docx",
                    },
                    {
                        "id": "3",
                        "text": "КО то самое ЭПН.xlsx",
                    }
                ],

                '02-02-22': [
                    {
                        "id": "1",
                        "text": "КО Неизвестное ЭП4РН.xlsx",
                    },
                    {
                        "id": "2",
                        "text": "КО Известное ВИМУН.docx",
                    },
                    {
                        "id": "3",
                        "text": "КО то самое ЭПН.pdf",
                    }
                ]
            }
        }

        // Iterate over the dates in the JSON
        $.each(jsonListToHtml.date, function (date, items) {
            // Create a new <ul> element for each date
            let divForDate = $('<div>').text(date).addClass('dataToggle');
            divForDate.on('click', function () {
                // Toggle the visibility of the ul element
                $(this).next().toggleClass('hidden');
            });
            let ul = $('<ul>').addClass('selectFlexForLk');
            $('#container').append(divForDate);

            // Iterate over the items for the current date
            $.each(items, function (index, item) {
                // Create a new <li> element for each item
                let li = $('<li>').addClass('flexContForLk');
                li.on('click', function () {
                    // Toggle the visibility of the ul element
                    // location.href = item.path;
                });

                // Set the text content of the <li> element to the item value
                let a = $('<p>').text(item.text).css('overflow-wrap', 'break-word');
                let docxlImg = $('<img>').attr('src', './img/word.png').addClass('typeIcon');
                let pdfImg = $('<img>').attr('src', './img/pdf.png').addClass('typeIcon');
                let xlsxImg = $('<img>').attr('src', './img/excel.png').addClass('typeIcon');

                if (a.text().includes('xlsx')) {
                    li.prepend(xlsxImg);
                } else if (a.text().includes('docx')) {
                    li.prepend(docxlImg);
                } else if (a.text().includes('pdf')) {
                    li.prepend(pdfImg);
                }

                // Append the <li> element to the <ul> element
                ul.append(li.append(a));
            });

            // Append the <ul> element to the container
            $('#container').append(ul);
        });
    }
}
);
