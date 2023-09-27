import docx
from docx.shared import Cm

import openpyxl
from openpyxl import load_workbook
from openpyxl import Workbook
from datetime  import date

class mk_DOCX():
    def __init__(self, list0 = [], list1 = [], list2 = [], list3 = [], list4 = [], list5 = []):
        self.list0 = list0
        self.list1 = list1
        self.list2 = list2
        self.list3 = list3
        self.list4 = list4
        #jsn6[5] -> list5[5] 660 B - доп опция для шахтного исполения
        self.list5 = list5

    
    def ep4(self):

        names1 = ["Тип арматуры", "Маркировка", "Завод-изготовитель",  "Требуемое время закрытия", "Максимальный крутящий момент", "Присоединение к приводу", "Установка"]
        ans1 = self.list1[:-2]
        for i in range(len(names1)):
            names1[i] = str(names1[i])
            ans1[i] = str(ans1[i])

        names2 = ['Исполнение по назначению', 'Режим работы', 'Степень защиты от проникновения пыли и влаги', 'Вращение выходного вала при закрывании', 'Температура окружающей среды (Климат)'] + ['Тип блока управления ', 'Сигнал дистанционного момента', 'Тип блока концевых выключателей (без встроенного пускателя)', 'Механический указатель сигнализации положения', 'Сигнализация положения', 'Сигнал «Момент» 4-20 мА', 'Дублирование шины RS485'] + ["Электрическое подключение", 'Защитный колпак', 'Цвет окраски', 'Напряжение питания электродвигателя', 'Количество эл./приводов', 'Дополнительные опции', 'Дополнительные требования']
        ans2 = self.list2 + [self.list3[0]] + self.list3[2:-4] + self.list4[:3] + [f"{self.list5[5]} В, 3 фазы", self.list0[-2]] + self.list4[-2:]

        for i in range(len(names2)):
            names2[i] = str(names2[i])
            ans2[i] = str(ans2[i])
            print(ans2[i], names2[i])

        ans3 = self.list0[:-2]

        return {"names1" : names1, "names2" : names2, "ans1" : ans1, "ans2" : ans2, "ans3" : ans3}
    
class mk_XL():
    def __init__(self, ID, jsn = [[], [], [], [], [], [], [], []]):
        self.jsn = jsn
        self.ID = ID
    
    

    def ep4(self):
        a = self.jsn
        ID =  self.ID
        wb = load_workbook('ep4TKP.xlsx')
        sheet = wb['Формат ТКП']

        #Лицевая часть
        current_date = date.today()
        keys = ["I7", "C9", "C10", "C12", "I12", "C48"]
        ans = [ID, f"Организация: {a[0][0]}   ФИО представителя: {a[0][1]}   Тел.: {a[0][2]}   email: {a[0][3]}", "", a[1][1], a[0][4], str(current_date)]

        #Техническая часть
        for i in range(16, 39):
            k = 'G' + str(i)
            keys.append(k)

        ans = ans + [
            f'{a[1][0]}', #4 "Поворотный/многооборотный",
            
            f'{a[2][1]}', #5 "Запорный/ регулирующий",
            f'{a[2][0]}', #6 "взрывозащита/Рудничное/АЭС и тд",
            f'{a[1][5]}', #7 "Тип присоединительного фланца ",
            f'{a[1][4]} Hм (кНм)', #8 "Верхний предел настройки крутящего момента",
            f'{a[1][7]} об./мин', #9 "Частота вращения выходного вала ",

            f'{a[3][0]}', #10.1 "Наименование блока управления"
            f'{a[3][1]}', #10.2 "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы",

            f'{a[2][4]}', #11 "Температурное исполнение: температурный режим, климат,  в укрытии или под навесом",
            f'{a[6][1]}', #12 "Тип присоединения выходного вала привода с валом арматуры",

            f'{a[2][3]}', #13 "Вращение выходного вала при закрывании",
            f'{a[2][2]}', #14 "Уровень пылевлагозащиты",
            f'{a[4][2]}', #15 "Цвет окраски",

            f'«{a[4][0]}» - {a[5][1]}', #16 "Электрическое подключение",
            f'{a[3][10]}', #17 "Концевые выключатели (реле)",
            f'{a[3][8]}', #18 "Промежуточные выключатели (опция)",
            f'{a[3][9]}', #19 "Моментные выключатели"
            f'{a[3][4]}', #20 "Механический указатель положения",
            f'{a[3][2]} / {a[3][5]}', #21 "Дистанционный указатель положения /датчики обратной связи)",
            f'{a[4][3]}', #22 "Ручной селектор/переключение местного дистанционного управления",
            f'{a[3][11]}', #23 "Монтаж блока управления ",

            f'{a[5][2]}', #24 "Требования по функциональной безопасности SIL",
            f'{a[5][3]}', #25 "Специальное исполнение",
        ]

        
        

        #Характеристики двигателя
        for i in range(42, 48):
            k = 'G' + str(i)
            keys.append(k)

        #Маркировка
        mark = a[1][1]
        #конструктивная схема
        sh = a[1][8]
        #крутящий момент
        Mom = a[1][4]
        #частота вращения
        V = a[1][7]
        #фланец
        flc = a[1][5]
        bd = DB("ЭП4")
        ans = ans + bd.get_engin(mark, sh, Mom, V, flc)
        ans[4] = f"{a[6][5]}"


        for i in range(len(keys)):
            if ans[i] != None:
                sheet[keys[i]].value = ans[i]

        sheet["G40"].value = f"Не более {ans[-1]} кг"

        return wb

class DB():
    def __init__(self, mark):
        self.mark = mark
    
    def get_engin(self, mark, sh, Mom, V, flc):
        if float(sh) not in [40.0, 41.0, 410.0, 43.0, 430.0, 44.0]:
            print("Ниче не будет", sh)
        if float(V) not in [4.0, 5.6, 8.0, 11.0, 16.0, 22.0, 32.0, 45.0, 63.0, 90.0, 125.0, 180.0, 2.0, 40.0, 2.8]:
            print("Ниче не будет", V)
        if float(Mom) not in [15.0, 30.0, 60.0, 120.0, 90.0, 250.0, 400.0, 500.0, 630.0, 1000.0, 1500.0, 2000.0, 3000.0, 4000.0, 6000.0, 8000.0, 12000.0, 16000.0, 20000.0, 24000.0]:
            print("Ниче не будет", Mom)
        if flc not in ['МК', 'F07', 'АК', 'АЧ', 'F10', 'Б', 'F14', 'В', 'F16', 'Г', 'F25', 'Д', 'F30', 'F40', 'F35']:
            print("Ниче не будет", flc)
        '''ans = []
        for i in range(7):
            ans.append("")'''

        WB = load_workbook('BD.xlsx')
        Sheet = WB['Связь']
            
        ansi = []
        for i in range(2, 568):
            if ((mark[:3] == str(Sheet[f"A{i}"].value)) and str(int(Sheet[f"B{i}"].value)) == str(int(sh))) and (str(float(Sheet[f"D{i}"].value)) == str(float(Mom))) and (str(float(Sheet[f"E{i}"].value)) == str(float(V))) and (str(Sheet[f"C{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
                    
            if ansi != []:
                for i in ansi:
                    ans = [str(Sheet[f"H{i}"].value) + " кВт", str(Sheet[f"I{i}"].value) + " кВт", str(Sheet[f"J{i}"].value) + " А", str(Sheet[f"K{i}"].value) + " А", str(Sheet[f"L{i}"].value) + " В", str(Sheet[f"M{i}"].value), str(Sheet[f"F{i}"].value)]
            else:
                ans = "Не удалось подобрать"
        return ans

    def get_params(self, mark, flc_type = "", Hm = "", V = "", sh = ""):
        ans = []
        WB = load_workbook('BD.xlsx')
        Sheet = WB['Электропривода']
        if flc_type == "" or flc_type == None:
            ans = "Укажите тип фланца"

        elif Hm == "" or Hm ==None:
            ans = []
            print("Крутящий момент не задан")
            for i in range(2, 568):
                if (str(Sheet[f"A{i}"].value) == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)):
                    if Sheet[f"D{i}"].value not in ans:
                        ans.append(Sheet[f"D{i}"].value)

        elif V == "" or V ==None:
            ans = []
            print("Частота не задана")
            for i in range(2, 568):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)):
                    if  Sheet[f"E{i}"].value not in ans:
                        ans.append(Sheet[f"E{i}"].value)

        elif sh == "" or sh == None:
            ans = []
            print("Конструктивная схема не задана")
            for i in range(2, 568):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)) and (str(Sheet[f"E{i}"].value) == str(V)):
                    if Sheet[f"B{i}"].value not in ans:
                        ans.append(Sheet[f"B{i}"].value)
            
        elif (flc_type != "" and Hm != "" and V != "" and sh != ""):
            ans = []
            print("Все парметры указаны верно")
            for i in range(2, 568):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)) and (str(Sheet[f"E{i}"].value) == str(V)) and (str(Sheet[f"B{i}"].value) == str(sh)):
                    if Sheet[f"C{i}"].value not in ans:
                        ans.append(Sheet[f"C{i}"].value)
        else:
            ans = "Что-то не так"
        return ans
        