from fastapi import FastAPI, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse, Response
from fastapi.staticfiles import StaticFiles


import random
from random import randint

import docx
from docx.shared import Cm
from docx2pdf import convert

import openpyxl
from openpyxl import load_workbook
from openpyxl import Workbook
from datetime  import date

import os

import conf
from conf import mk_DOCX
from conf import mk_XL


def make_clean():
    pul = os.listdir(path='.')
    if len(pul) >= 10:
        for file in pul:
            if "Tula" in file:
                os.remove(file)



def get_para_data(output_doc_name, paragraph):
    output_para = output_doc_name.add_paragraph()
    for run in paragraph.runs:
        output_run = output_para.add_run(run.text)
        # Run's bold data
        output_run.bold = run.bold
        # Run's italic data
        output_run.italic = run.italic
        # Run's underline data
        output_run.underline = run.underline
        # Run's color data
        output_run.font.color.rgb = run.font.color.rgb
        # Run's font data
        output_run.style.name = run.style.name
    # Paragraph's alignment data
    output_para.paragraph_format.alignment = paragraph.paragraph_format.alignment

def get_engin(mark, sh, Mom, V, flc):
    ans = []
    for i in range(6):
        ans.append("")
    if mark[:3] == "ЭП4":
        wb1 = load_workbook('ep4.xlsx')
        sheet1 = wb1['Электродвигатели']
        anss = []
        ansi = []
        for i in range(9, 575):
            if str(sheet1[f"F{i}"].value) == str(flc):
                anss.append(i)
                print(i, str(sheet1[f"F{i}"].value))

        for i in anss:
            if (str(sheet1[f"C{i}"].value) == str(sh)) and (str(sheet1[f"E{i}"].value) == str(Mom)) and (str(sheet1[f"D{i}"].value) == str(V)) and (str(sheet1[f"F{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
        
        if ansi != []:
            for i in anss:
                ans[0] = sheet1[f"J{i}"].value
                #ans[1] = sheet1[f"K{i}"].value
                ans[2] = sheet1[f"L{i}"].value
                ans[3] = sheet1[f"M{i}"].value
                ans[4] = "380"
                ans[5] = "3"
    return ans
        
    

app = FastAPI()

app.mount("/static", StaticFiles(directory="public", html=True))
app.mount("/static", StaticFiles(directory="/", html=True))



origins = [
    "http://217.144.103.121",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8080/eps.html",
    "http://localhost:8080/eps.js"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],#, "OPTIONS", "DELETE", "PATH", "PUT"],
    allow_headers=["Content-Type", "Accept", "Location", "Allow", "Content-Disposition", "Sec-Fetch-Dest"],
)



@app.get("/")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/select.html")

@app.get("/ep4")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/ep4.html")

@app.get("/epn")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/epn.html")

@app.get("/ep4Reductor")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/ep4Reductor.html")


@app.get("/Tula/{ID}", response_class = FileResponse)
def download_file(ID):
    #headers = {'Content-Disposition': f'attachment; filename="Tula{ID}.pdf"'}
    return FileResponse(f'Tula{ID}.docx', filename='демо ОЛ ТЭП.docx', media_type='application/docx')#, headers=headers)

@app.get("/TulaEXEL/{ID}", response_class = FileResponse)
def download_file(ID):
    return FileResponse(f'Tula{ID}.xlsx', filename='демо Формат ТКП.xlsx', media_type='application/xlsx')#, headers=headers)



@app.post("/download")
def download_file(jsn = Body()):
    '''jsn = { 
    u"jsn1" : [u"Тип арматуры", u"Маркировка", u"Завод-изготовитель", u"Номинальное давление: ", u"Диаметр:", u"Требуемое время закрытия: не более ", u"Требуемое время закрытия: не менее", u"Максимальный крутящий момент / (Усилие): На открывание", u"Максимальный крутящий момент / (Усилие): На закрывание", u"Присоединение к приводу:", u"Кол-во оборотов (угол поворота) для закрытия арматуры", u"Рабочая среда:", u"Установка"],
    u"jsn2" : ["Исполнение по назначению", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    u"jsn3" : ["29", "август", "ООО ЧК огрн", "Жмышенко Валерий Альбертович", "+7 948 367 99-99", "jmsh.val.99@gmail.com", "Конструктивная схема", "Крутящий момент", "Частота"],
    u"jsn4" : ["Поворотный/многооборотный", "Угол поворота, граусов", "Ход штока, мм", "Наименование блока управления", "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы", "Тип присоединения выходного вала привода с валом арматуры", "Электрическое подключение", "Защита от коррозии", "Концевые выключатели (реле)", "Промежуточные выключатели (опция)", "Моментные выключатели", "Сигнализация включения ручного маховика", "Дистанционный указатель положения /датчики обратной связи)", "Электрическое подключение Подробная расшифровка параметра дается в зависимости от производителя", "Ручной селектор/переключение местного дистанционного управления", "Наличие обогрева", "Монтаж блока управления ", "Налияие и тип функции", "Функция при питании", "Условие для запуска аварийной функции", "Требования по функциональной безопасности SIL", "Специальное исполнение", "Масса привода, кг"]
    }'''


    '''Чтение и форматирование JSON'''
    jsn0 = jsn["jsn0"]
    jsn1 = jsn["jsn1"]
    jsn2 = jsn["jsn2"]
    jsn3 = jsn["jsn3"]
    jsn4 = jsn["jsn4"]
    jsn5 = jsn["jsn5"]
    jsn6 = jsn["jsn6"]
    jsn7 = jsn["jsn7"]

    dc = mk_DOCX(jsn0, jsn1, jsn2, jsn3, jsn4, jsn6)
    mark = jsn1[1]
    if mark[:3] == "ЭП4": 
        tbls = dc.ep4()



    '''Работа с .docx'''
    doc = docx.Document('Опросный_лист_ТЭП.docx')
    doc_new = docx.Document()
    
    doc_new.add_picture('img.png', width=Cm(1.76), height=Cm(1.67))

    for para in doc.paragraphs:
        if para.text == 'ОРГАНИЗАЦИЯ - заказчик: ______________________________________________________':
            para.text = f'ОРГАНИЗАЦИЯ - заказчик: \t {tbls["ans3"][0]}'
        if para.text == 'Ф.И.О. ____________________ Тел: ____________________ E-mail:_____________________':
            para.text = f'Ф.И.О. \t  {tbls["ans3"][1]} \n Тел.: \t  {tbls["ans3"][2]} \n E-mail:  {tbls["ans3"][3]} \n \t\t\t \t\t\t \t\t Дата: «   » ____________________ 202__ г'
        
        get_para_data(doc_new, para)

        if para.text == 'Характеристика и параметры арматуры:':
            tbl1 = doc_new.add_table(rows=0, cols=2)
            tbl1.style = 'Table Grid'
            ks=list(tbls["names1"])
            vs=list(tbls["ans1"])
            for i in range(len(ks)):
                row_cells = tbl1.add_row().cells
                row_cells[0].text = ks[i]
                cell = tbl1.cell(i, 1)
                cell.text = vs[i]
            doc_new.add_paragraph()
            
        if para.text == 'Характеристика и параметры электропривода:':

            tbl1 = doc_new.add_table(rows=0, cols=2)
            tbl1.style = 'Table Grid'
            ks=list(tbls["names2"])
            vs=list(tbls["ans2"])
            for i in range(len(ks)):
                row_cells = tbl1.add_row().cells
                row_cells[0].text = ks[i]
                cell = tbl1.cell(i, 1)
                cell.text = vs[i]


    wb = mk_XL([jsn0, jsn1, jsn2, jsn3, jsn4, jsn5, jsn6, jsn7])
    '''Работа с .xlsx
    # Load in the workbook
    wb = load_workbook('Формат_ТКП.xlsx')

    sheet = wb['Формат ТКП']

    #Лицевая часть
    current_date = date.today()
    keys = ["I7", "C9", "C10", "C12", "C61"]
    ans = ["Внутренний номер ТКП (совпадает с номером ОЛ)", jsn3[2], None, jsn1[0], str(current_date)]

    for i in range(len(keys)):
        if ans[i] != None:
            sheet[keys[i]].value = ans[i]

    #Техническая часть
    keys = []
    for i in range(16, 52):
        k = 'G' + str(i)
        keys.append(k)
        
    ans = [ f'{jsn4[0]}', #0 "Поворотный/многооборотный",
            
            f'{jsn2[1]}', #1 "Запорный/ регулирующий",
            None, #2 "Режим работы привода",
            f'{jsn2[0]}', #3 "взрывозащита/Рудничное/АЭС и тд",
            f'{jsn1[9]}', #4 "Тип присоединительного фланца ",
            f'{jsn3[7]}', #5 "Верхний предел настройки крутящего момента",
            f'{jsn3[8]}', #6 "Частота вращения выходного вала ",
            f' не более {jsn1[5]} сек., не менее {jsn1[6]} сек.', #7 "Время рабочего хода/Время срабатывания",

            f'{jsn4[1]}', #8 "Угол поворота, граусов",
            f'{jsn4[2]}', #9 "Ход штока, мм",
            f'{jsn4[3]}', #10 "Наименование блока управления"
            f'{jsn4[4]}', #11 "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы",

            f'{jsn2[4]}', #12 "Температурное исполнение: температурный режим, климат,  в укрытии или под навесом",

            f'{jsn4[5]}', #13 "Тип присоединения выходного вала привода с валом арматуры",

            f'{jsn2[3]}', #14 "Вращение выходного вала при закрывании",
            f'{jsn2[2]}', #15 "Уровень пылевлагозащиты",
            a[9][int(jsn2[17])], #15 "Цвет окраски",

            f'{jsn4[6]}', #16 "Электрическое подключение",
            f'{jsn4[7]}', #17 "Защита от коррозии",
            f'{jsn4[8]}', #18 "Концевые выключатели (реле)",
            f'{jsn4[9]}', #19 "Промежуточные выключатели (опция)",
            f'{jsn4[10]}', #20 "Моментные выключатели",
            f'{jsn4[11]}', #21 "Сигнализация включения ручного маховика",

            a[5][int(jsn2[7])], #21 "Механический указатель положения",

            f'{jsn4[12]}', #22 "Дистанционный указатель положения /датчики обратной связи)",
            f'{jsn4[13]}', #24 "Электрическое подключение ",
            
            f'{jsn4[14]}', #25 "Ручной селектор/переключение местного дистанционного управления",
            f'{jsn4[15]}', #26 "Наличие обогрева",
            f'{jsn4[16]}', #27 "Монтаж блока управления ",
            f'{jsn4[17]}', #28 "Налияие и тип функции",
            f'{jsn4[18]}', #29 "Функция при питании",
            f'{jsn4[19]}', #30 "Условие для запуска аварийной функции",
            f'{jsn4[20]}', #31 "Требования по функциональной безопасности SIL",
            f'{jsn4[21]}', #32 "Специальное исполнение",
            None,
            f'{jsn4[22]}'  #33 "Масса привода, кг"
        ]



    for i in range(len(keys)):
        if (ans[i] != None) or (ans[i] != ''):
            sheet[keys[i]].value = ans[i]
        else:
            sheet[keys[i]].value = "Заполняется автоматически"



    #Характеристики двигателя
    keys = []
    for i in range(53, 59):
        k = 'G' + str(i)
        keys.append(k)



    ans = [
        None, #0 "Мощность, которую способен развивать двигатель привода, Вт",
        None, #1 "Потребляемая из сети электрическая можность, Вт",
        None, #2 "Пусковой ток",
        None, #3 "Номинальный ток",
        None, #4 "Напряжение питания",
        None, #5 "Количество фаз"
    ]
    

    
    mark = jsn1[1]
    if mark[:3] == "ЭП4":
        wb1 = load_workbook('ep4.xlsx')
        sheet1 = wb1['Электродвигатели']
        #конструктивная схема
        sh = jsn3[6]
        #крутящий момент
        Mom = jsn3[7]
        #частота вращения
        V = jsn3[8]
        #фланец
        flc = jsn1[9]
        anss = []
        ansi = []
        for i in range(9, 575):
            if str(sheet1[f"F{i}"].value) == str(flc):
                anss.append(i)
                print(i, str(sheet1[f"F{i}"].value))

        for i in anss:
            if (str(sheet1[f"C{i}"].value) == str(sh)) and (str(sheet1[f"E{i}"].value) == str(Mom)) and (str(sheet1[f"D{i}"].value) == str(V)) and (str(sheet1[f"F{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
        
        if ansi != []:
            for i in anss:
                ans[0] = sheet1[f"J{i}"].value
                #ans[1] = sheet1[f"K{i}"].value
                ans[2] = sheet1[f"L{i}"].value
                ans[3] = sheet1[f"M{i}"].value
                ans[4] = "380"
                ans[5] = "3"



    for i in range(len(keys)):
        if ans[i] != None:
            sheet[keys[i]].value = ans[i]



    #Схема подключения, номер (если известна)
    sheet["G59"].value = "пока нет понимания как это формируется, помощь ТЭП и зала. Если известен номер заполняется автоматически, если нет - ОЛ направляется  на доработку "

    #Сборочный чертеж, номер
    sheet["G460"].value = "пока нет понимания как это формируется, помощь ТЭП и зала. Если известен номер заполняется автоматически, если нет - ОЛ направляется  на доработку "
    '''


    "Работа с файлами"
    #сборщик мусора
    make_clean()

    #сохранение файлов с уникальным id
    ID = randint(0, 1000)
    doc_new.save(f'Tula{ID}.docx')
    wb.save(f"Tula{ID}.xlsx")
    #convert(f"Tula{ID}.docx")



    return {"id" : ID}