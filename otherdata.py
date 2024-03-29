import sys

import csv, random

import utils

rand = random.Random()

def loadvitals(vitalsfile):
    vitals = {}
    with open(vitalsfile) as vitalscsv:
        lines = csv.reader(vitalscsv)
        headers = None
        for line in lines:
            if not headers:
                headers = line
                continue
            summary = {}
            for index, header in enumerate(headers):
                summary[header] = line[index]
            if summary['Height_Units'] == 'cm':
                summary['Height_Units'] = 'in'
                summary['Height'] = str(int(int(summary['Height']) * 0.393701))
            if summary['Weight_Units'] == 'kg':
                summary['Weight_Units'] = 'lbs'
                summary['Weight'] = str(int(float(summary['Weight']) * 2.20462))
            if summary['Temperature_Units'] == 'C':
                summary['Temperature_Units'] = 'F'
                summary['Temperature'] = str(int(float(summary['Temperature']) * 18 + 320)/10.0)
            summary['Encounter_Date'] = summary['Encounter_Date'][:summary['Encounter_Date'].find('T')]
            summary['Type'] = 'vitals'
            patientid = summary['Member_ID']
            if not patientid in vitals:
                vitals[patientid] = []
            vitals[patientid].append(summary)
            
    return vitals

def loadlabs(labsfile):
    labs = {}
    with open(labsfile) as labscsv:
        lines = csv.reader(labscsv)
        headers = None
        for line in lines:
            if not headers:
                headers = line
                continue
            summary = {}
            for index, header in enumerate(headers):
                summary[header] = line[index]
            summary['Date_Collected'] = summary['Date_Collected'][:summary['Date_Collected'].find('T')]
            summary['Date_Resulted'] = summary['Date_Resulted'][:summary['Date_Resulted'].find('T')]
            summary['Type'] = 'lab'
            patientid = summary['Member_ID']
            if not patientid in labs:
                labs[patientid] = []
            labs[patientid].append(summary)
            
    return labs
    
def addfakelabs(vitals, labs):
    highmods = [1.05, 1.05, 1.0, 1.1, 1.8]
    lowmods = [1.0, 0.95, 0.95, 1.0, 1.5]
    for id in vitals:
        patient = vitals[id]
        if not patient:
            continue
        trends = []
        dates = {}
        for vital in patient:
            weight = float(vital['Weight'])
            date = vital['Encounter_Date']
            trends.append(weight)
            dates[date] = weight
        avg = sum(trends) / float(len(trends))
        #range = max(trends) - min(trends)
        #print range
        datediffs = {}
        for date, weight in dates.items():
            weightmod = weight / avg
            datediffs[date] = weightmod
            
        patient = labs.get(id)
        reallabs = {}
        for lab in patient:
            type = lab['Result_Name']
            if not type == 'HDL' and not type == 'LDL' and not type == 'Triglyceride' and not type == 'Total cholesterol':
                continue
            if not type in reallabs:
                reallabs[type] = []
            reallabs[type].append(lab)
            
        fakes = []
        for type, reals in reallabs.items():
            #highmod = highmods[0]
            highmod = rand.choice(highmods)
            lowmod = lowmods[highmods.index(highmod)]
            for date, diff in datediffs.items():
                moddiff = diff
                if moddiff > 1:
                    moddiff *= highmod
                else:
                    moddiff *= lowmod
                real = rand.choice(reals)
                realresult = float(real['Numeric_Result'])
                fakeresult = realresult * moddiff
                fake = dict(real)
                fake['Date_Collected'] = date
                fake['Date_Resulted'] = date
                fake['Numeric_Result'] = str(int(fakeresult))
                fakes.append(fake)
                
        for fake in fakes:
            name = fake['Result_Name']
            if name != 'Total cholesterol':
                continue
            samedates = []
            for otherfake in fakes:
                if otherfake == fake:
                    continue
                if otherfake['Date_Collected'] == fake['Date_Collected']:
                    samedates.append(otherfake)
            total = 0
            #print ''
            for samedate in samedates:
                samename = samedate['Result_Name']
                if samename == 'LDL':
                    total += int(samedate['Numeric_Result'])
                    #print total
                elif samename == 'HDL':
                    total += int(samedate['Numeric_Result'])
                    #print total
                
            #print fake['Numeric_Result']
            fake['Numeric_Result'] = str(total)
            #print fake['Numeric_Result']
            
        #exit()
                
        for fake in fakes:
            patient.append(fake)
            
def loadall():
    vitals = loadvitals('data/vital_sign.csv')
    labs = loadlabs('data/lab_results.csv')
    
    addfakelabs(vitals, labs)
    
    allids = list(vitals.keys())
    for id in labs.keys():
        if not id in allids:
            allids.append(id)
    combined = {}
    for id in allids:
        combined[id] = []
        if id in vitals:
            combined[id].extend(vitals[id])
        if id in labs:
            combined[id].extend(labs[id])
    return combined

def convert_txt(path):
    for file in utils.findfiles('*.txt', path):
        csvfile = file[:-4] + '.csv'
        if utils.fileexists(csvfile):
            continue
        with open(file, 'rb') as input:
            with open(csvfile, 'wb') as output:
                tabbed = csv.reader(input, dialect=csv.excel_tab)
                csved = csv.writer(output, dialect=csv.excel)
                for row in tabbed:
                    csved.writerow(row)
    
def main(argv=None):
    #print 'Converting txt files'
    #convert_txt('data/')
    
    otherdata = loadall()

if __name__ == "__main__":
    sys.exit(main())