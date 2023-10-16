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
        ans1 = self.list1[:-3]
        names1 += ["Количество оборотов (угол поворота) для закрытия арматуры"]
        ans1 += self.list1[-1]

        names2 = ['Исполнение по назначению', 'Режим работы', 'Степень защиты от проникновения пыли и влаги', 'Вращение выходного вала при закрывании', 'Температура окружающей среды (Климат)'] 
        names2 += ['Тип блока управления ', 'Сигнал дистанционного момента', 'Тип блока концевых выключателей (без встроенного пускателя)', 'Механический указатель сигнализации положения', 'Сигнализация положения', 'Сигнал «Момент» 4-20 мА', 'Дублирование шины RS485'] 
        names2 += ["Электрическое подключение", 'Защитный колпак', 'Цвет окраски', 'Напряжение питания электродвигателя', 'Количество эл./приводов', 'Дополнительные опции', 'Дополнительные требования']
        ans2 = self.list2 + [self.list3[0]] + self.list3[2:-4] + self.list4[:3] + [self.list5[5], self.list0[-2]] + self.list4[-2:]

        '''for i in range(len(names2)):
            names2[i] = str(names2[i])
            ans2[i] = str(ans2[i])
            print(ans2[i], names2[i])'''

        ans3 = self.list0[:-2]

        return {"names1" : names1, "names2" : names2, "ans1" : ans1, "ans2" : ans2, "ans3" : ans3}
    
    def epn(self):
        print(self.list1)
        names1 = ["Тип арматуры", "Маркировка", "Завод-изготовитель",  "Требуемое время закрытия", "Максимальный крутящий момент", "Присоединение к приводу", "Установка"]
        ans1 = self.list1[:-3]
        names1.append("Количество оборотов (угол поворота) для закрытия арматуры")
        ans1.append(self.list1[-1])
        ans1[3] = self.list1[7]

        for i in range(len(names1)):
            names1[i] = str(names1[i])
            ans1[i] = str(ans1[i])
        
        names2 = ['Исполнение по назначению', 'Режим работы', 'Степень защиты от проникновения пыли и влаги', 'Вращение выходного вала при закрывании', 'Температура окружающей среды (Климат)'] 
        names2 += ['Тип блока управления ', 'Сигнал дистанционного момента', 'Тип блока концевых выключателей (без встроенного пускателя)', 'Механический указатель сигнализации положения', 'Сигнализация положения', 'Сигнал «Момент» 4-20 мА', 'Дублирование шины RS485'] 
        names2 += ["Электрическое подключение", 'Защитный колпак', 'Цвет окраски', 'Напряжение питания электродвигателя', 'Количество эл./приводов', 'Дополнительные опции', 'Дополнительные требования']
        ans2 = self.list2 + [self.list3[0]] + self.list3[2:-4] + self.list4[:3] + [self.list5[5], self.list0[-2]] + self.list4[-2:]

        '''for i in range(len(names2)):
            names2[i] = str(names2[i])
            ans2[i] = str(ans2[i])
            print(ans2[i], names2[i])'''

        ans3 = self.list0[:-2]

        return {"names1" : names1, "names2" : names2, "ans1" : ans1, "ans2" : ans2, "ans3" : ans3}

    def vimu(self):
        names2 = ['Маркировка', 'Исполнение по взрывзащите', 'Контроль положения и крутящего момента (усилия) на выходном звене привода', 'Степень защиты от проникновения пыли и влаги', 'Способ включения двигателя привода ', 'Температура окружающей среды (Климат)'] 
        ans2 = [self.list1[1]] + self.list2
        names2 += ['Тип блока управления ', 'Сигнал дистанционного момента', 'Сигнализация положения', 'Сигнал «Момент» 4-20 мА', 'Дублирование шины RS485', 'Промежуточные выключатели', 'Моментные выключатели', 'Концевые выключатели'] 
        ans2 += [self.list3[0], self.list3[2]] + self.list3[5:-1]
        names2 += ["Электрическое подключение", 'Цвет окраски', 'Специальное исполнение', 'Количество', 'Дополнительные опции', 'Дополнительные требования']
        ans2 = [self.list5[0], self.list4[2], self.list5[1], self.list0[4], self.list4[4], self.list4[5]]

        ans3 = self.list0[:-2]

        for i in range(len(names2)):
            names2[i] = str(names2[i])
            ans2[i] = str(ans2[i])
            print(ans2[i], names2[i])

        return {"names1" : [], "names2" : names2, "ans1" : [], "ans2" : ans2, "ans3" : ans3}
        

    
class mk_XL():
    def __init__(self, ID, jsn = [[], [], [], [], [], [], [], []]):
        self.jsn = jsn
        self.ID = ID
    
    def ep(self):
        a = self.jsn
        ID =  self.ID

        mark = a[1][1]
        if mark[:3] == "ЭП4": 
            wb = load_workbook('ep4TKP.xlsx')
        elif mark[:3] == "ЭПН":
            wb = load_workbook('epnTKP.xlsx')
        sheet = wb['Формат ТКП']

        #Лицевая часть
        current_date = date.today()
        keys = ["I7", "C9", "C10", "C12", "I12", "C48"]
        ans = [ID, f"Организация: {a[0][0]}   ФИО представителя: {a[0][1]}   Тел.: {a[0][2]}   email: {a[0][3]}", "", mark, str(a[0][-2]), str(current_date)]

        #Техническая часть
        for i in range(16, 39):
            k = 'G' + str(i)
            keys.append(k)

        ans = ans + [
            f'{a[1][0]}', #4 "Поворотный/многооборотный",
            
            f'{a[2][1]}', #5 "Запорный/ регулирующий",
            f'{a[2][0]}', #6 "взрывозащита/Рудничное/АЭС и тд",
            f'{a[1][5]}', #7 "Тип присоединительного фланца ",
            f'{a[1][4]}', #8 "Верхний предел настройки крутящего момента",
            f'{a[1][7]}', #9 "Частота вращения выходного вала ",

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
        aaa = bd.get_engin(mark, sh, Mom, V, flc)
        aaa[4] = f"{a[6][5]}"
        ans = ans + aaa

        for i in range(len(keys)):
            if ans[i] != None:
                sheet[keys[i]].value = ans[i]

        sheet["G40"].value = f"Не более {ans[-1]} кг"

        return wb
    
    def vimu(self):
        a = self.jsn

        wb = load_workbook('vimuTKP.xlsx')

        #Лицевая часть
        current_date = date.today()
        keys = ["I7", "C9", "C10", "C12", "I12", "C31"]
        mark = a[1][1]
        ans = [self.ID, f"Организация: {a[0][0]}   ФИО представителя: {a[0][1]}   Тел.: {a[0][2]}   email: {a[0][3]}", "", mark, str(a[0][-2]), str(current_date)]

        #Техническая часть
        for i in range(16, 32):
            k = 'G' + str(i)
            keys.append(k)

        ans = ans + [
            f'{a[1][0]}', #4 "Исполнение",
            f'«{a[2][0]}» - {a[2][1]}', #5 "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы",
            f'{a[1][4]}', #6 "Температурное исполнение: температурный режим, климат,  в укрытии или под навесом",

            f'{a[1][1]}', #7 "Контроль положения и крутящего момента (усилия) на выходном звене привода"
            f'{a[1][3]}', #8 "Способ включения двигателя привода"

            f'{a[1][2]}', #9 "Уровень пылевлагозащиты",
            f'{a[3][1]}', #10 "Цвет окраски",

            f'«{a[3][0]}» - {a[3][4]}', #11 "Электрическое подключение",
            f'{a[2][10]}', #12 "Концевые выключатели (реле)",
            f'{a[2][9]}', #13 "Моментные выключатели"
            f'{a[2][8]}', #14 "Промежуточные выключатели (опция)",
            
            f'{a[2][2]} / {a[2][5]}', #15 "Дистанционный указатель положения / датчики обратной связи)",

            f'{a[3][5]}', #16 "Специальное исполнение",
        ]

        return wb



class DB():
    def __init__(self, mark):
        self.mark = mark
    
    def get_engin(self, mark, sh, Mom, V, flc):
        WB = load_workbook('BD.xlsx')
        Sheet = WB['Связь']
            
        ansi = []
        for i in range(2, 998):
            if ((mark[:3] == str(Sheet[f"A{i}"].value)) and str(int(Sheet[f"B{i}"].value)) == str(int(sh))) and (str(float(Sheet[f"D{i}"].value)) == str(float(Mom))) and (str(float(Sheet[f"E{i}"].value)) == str(float(V))) and (str(Sheet[f"C{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
                    
            if ansi != []:
                for i in ansi:
                    ans = [str(Sheet[f"H{i}"].value) + " кВт", str(Sheet[f"I{i}"].value) + " кВт", str(Sheet[f"J{i}"].value) + " А", str(Sheet[f"K{i}"].value) + " А", str(Sheet[f"L{i}"].value) + " В", str(Sheet[f"M{i}"].value), str(Sheet[f"F{i}"].value)]
            else:
                ans = "Не удалось подобрать"
        return ans

    def get_params(self, mark, flc_type = "", Hm = "", V = "", sh = "", flc = "", fz = ""):
        ans = []
        WB = load_workbook('BD.xlsx')
        Sheet = WB['Электропривода']
        if flc_type == "" or flc_type == None:
            ans = "Укажите тип фланца"

        elif Hm == "" or Hm ==None:
            ans = []
            print("Крутящий момент не задан")
            for i in range(2, 998):
                if (str(Sheet[f"A{i}"].value) == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)):
                    if Sheet[f"D{i}"].value not in ans:
                        ans.append(Sheet[f"D{i}"].value)

        elif V == "" or V ==None:
            ans = []
            print("Частота не задана")
            for i in range(2, 998):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)):
                    if  Sheet[f"E{i}"].value not in ans:
                        ans.append(Sheet[f"E{i}"].value)

        elif sh == "" or sh == None:
            ans = []
            print("Конструктивная схема не задана")
            for i in range(2, 998):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)) and (str(Sheet[f"E{i}"].value) == str(V)):
                    if Sheet[f"B{i}"].value not in ans:
                        ans.append(Sheet[f"B{i}"].value)
            
        elif flc == "" or flc == None:
            ans = []
            print("Все парметры указаны верно")
            for i in range(2, 998):
                if (Sheet[f"A{i}"].value == mark) and (str(Sheet[f"G{i}"].value) == str(flc_type)) and (str(Sheet[f"D{i}"].value) == str(Hm)) and (str(Sheet[f"E{i}"].value) == str(V)) and (str(Sheet[f"B{i}"].value) == str(sh)):
                    if Sheet[f"C{i}"].value not in ans:
                        ans.append(Sheet[f"C{i}"].value)

        elif (flc_type != "" and Hm != "" and V != "" and sh != "" and flc != ""):
            sheet = WB["Связь"]
            for i in range(2, 998):
                if (sheet[f"A{i}"].value == mark) and (str(sheet[f"A{i}"].value) == mark) and (str(sh) == str(sheet[f'B{i}'].value)) and (str(flc) == str(sheet[f'c{i}'].value)) and (str(Hm) == str(sheet[f'D{i}'].value)) and (str(V) == str(sheet[f'E{i}'].value)):
                    if sheet[f'M{i}'].value not in ans:
                         ans.append(str(sheet[f"L{i}"].value) + "B " + str(sheet[f"M{i}"].value) + " фаз(ы) ")

        else:
            ans = "Ошибка выбора параметров"
        
        return ans
    
    def get_RN(self, rn = "", flc = "", Hm = "", V = "", t="", sh = ""):
        ans = []
        WB = load_workbook('BD.xlsx')
        Sheet = WB['Электропривода']
        if rn == "":
            for i in range(2, 568):
                rn = Sheet[f"I{i}"].value
                if (rn != "") and (rn not in ans):
                    ans.append(rn)
        elif flc == "":
            for i in range(2, 568):
                RN = Sheet[f"I{i}"].value
                flc = Sheet[f"C{i}"].value
                if (flc != "") and (flc not in ans)  and (rn == RN):
                    ans.append(flc)
        elif Hm == "":
            for i in range(2, 568):
                RN = Sheet[f"I{i}"].value
                Flc = Sheet[f"C{i}"].value
                Hm = Sheet[f"D{i}"].value
                if (Hm != "") and (Hm not in ans) and (flc == Flc) and (rn == RN):
                    ans.append(Hm)
        elif V == "":
            for i in range(2, 568):
                RN = Sheet[f"I{i}"].value
                Flc = Sheet[f"C{i}"].value
                HM = Sheet[f"D{i}"].value
                V = Sheet[f"E{i}"].value
                if (V != "") and (V not in ans) and (str(Hm) == str(HM)) and (flc == Flc) and (rn == RN):
                    ans.append(V)
        elif t == "":
            for i in range(2, 568):
                Flc = Sheet[f"C{i}"].value
                HM = Sheet[f"D{i}"].value
                v = Sheet[f"E{i}"].value
                RN = Sheet[f"I{i}"].value
                t = Sheet[f"J{i}"].value
                if (t != "") and (t not in ans) and (str(V) == str(v)) and (str(Hm) == str(HM)) and (flc == Flc) and (rn == RN):
                    ans.append(t)
        elif sh == "":
            for i in range(2, 568):
                RN = Sheet[f"I{i}"].value
                Flc = Sheet[f"C{i}"].value
                HM = Sheet[f"D{i}"].value
                v = Sheet[f"E{i}"].value
                RN = Sheet[f"I{i}"].value
                T = Sheet[f"J{i}"].value
                sh = Sheet[f"B{i}"].value
                if (sh != "") and (sh not in ans) and (str(V) == str(v)) and (str(Hm) == str(HM)) and (flc == Flc) and (t == T) and (rn == RN):
                    ans.append(sh)
        return ans