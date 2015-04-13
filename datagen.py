import sys
import csv, random, json, operator, re, time, datetime

from faker import Factory
fake = Factory.create('en_US')
from fhir import *
import dateutil.parser

import desynpuf, otherdata, patientphotos, utils, fabextras

def fakeprofile(sex='female', birthyear=None, images=None):
    profile = {}
    profile['resourceType'] = 'Patient'
    
    profile['name'] = name = [{}]
    name = name[0]
    name['use'] = 'official'
    first = None
    middle = None
    if sex == 'female':
        first = fake.first_name_female()
        middle = fake.first_name_female()
    else:
        first = fake.first_name_male()
        middle = fake.first_name_female()
    
    middles = [middle, middle[0] + '.']
    middle = random.choice(middles)
    
    last = fake.last_name()
    name['family'] = [last]
    name['given'] = [first, middle]
        
    profile['telecom'] = telecom = []
    
    phones = random.sample(set(['work', 'mobile', 'home']), 2)
    for type in phones:
        phone = {}
        phone['system'] = 'phone'
        phone['use'] = type
        randdigits = [random.randint(0, 9) for _ in range(10)]
        randomphone = '%s%s%s-%s%s%s-%s%s%s%s' % tuple(randdigits)
        phone['value'] = randomphone
        telecom.append(phone)
    
    email = {}
    email['system'] = 'email'
    domains = [fake.free_email_domain(), fake.free_email_domain(), fake.free_email_domain(), fake.domain_name()]
    domain = random.choice(domains)
    randend = ''.join([str(random.randint(0, 9)) for _ in range(5)])
    users = [first.lower()+'.'+last.lower(), first[0].lower()+middle[0].lower()+last.lower(), first.lower()+randend[:random.randint(2,5)], last.lower()+randend[:random.randint(2,5)]]
    user = random.choice(users)
    email['value'] = user + '@' + domain
    telecom.append(email)
        
    profile['gender'] = {'coding':[{}]}
    gender = profile['gender']['coding'][0]
    gender['system'] = 'http://hl7.org/fhir/v3/AdministrativeGender'
    if sex == 'female':
        gender['code'] = 'F'
        gender['display'] = 'Female'
    else:
        gender['code'] = 'M'
        gender['display'] = 'Male'
    
    profile['birthDate'] = fake.date(pattern='%Y-%m-%d')
    if birthyear:
        profile['birthDate'] = birthyear + profile['birthDate'][4:]
    
    profile['address'] = [{}]
    address = profile['address'][0]
    address['use'] = 'home'
    address['line'] = [fake.street_address()]
    address['city'] = fake.city()
    address['state'] = fake.state_abbr()
    address['zip'] = fake.zipcode()
    address['country'] = 'USA'
    
    if images:
        randomimage = random.choice(images[sex])
        profile['photo'] = photo = [{}]
        photo = photo[0]
        photo['contentType'] = 'image/jpeg'
        photo['title'] = 'Photo of ' + '%s %s %s' % (name['given'][0], name['given'][1], name['family'][0])
        photo['data'] = randomimage
    #profile = {'content':profile}
    
    return profile
    
dateranges = {}
dateoffsets = {'observation':90, 'prescription':1549}
def dateupdate(type, date):
    if not type in dateranges:
        dateranges[type] = {'min':datetime.datetime.max, 'max':datetime.datetime.min}
    #if not type in dateoffsets:
    #    dateoffsets[type] = 999999
    parsed = dateutil.parser.parse(date)
    #current = datetime.datetime.today()
    #offset = (current - parsed).days
    #if offset < dateoffsets[type]:
    #    dateoffsets[type] = offset
    offset = dateoffsets[type]
    updated = parsed + datetime.timedelta(days=offset)
    if updated < dateranges[type]['min']:
        dateranges[type]['min'] = updated
    if updated > dateranges[type]['max']:
        dateranges[type]['max'] = updated
    newdate = updated.strftime('%Y-%m-%d')
    return newdate
    
def createrecord(data):
    type = data['resourceType']
    jsonified = json.dumps(data)
    if not utils.fileexists(type + '.json'):
        utils.writetext(type + '.json', jsonified)
    #utils.writetext('temp.txt', jsonified)
    #exit()
    rest = RestfulFHIR(fabextras.FHIR_URLS[0])
    #url = 'http://fhirtest.uhn.ca/baseDstu1/%s/17856/_history/1' % type
    #print url
    #return url
    retries = 10
    query = None
    while retries > 0:
        try:
            query = rest.create(type, jsonified)
            break
        except:
            print 'Retrying...'
            retries -= 1
            if retries < 1:
                raise
            sleeptime = 15
            if retries < 6:
                sleeptime = 120
            time.sleep(sleeptime)
            continue
    if not query or query.status_code != 201:
        print query
        print query.text
        return None
    url = query.headers['location']
    print url
    #exit()
    return url
    
def findrecords(type, params={}, limit=None):
    rest = RestfulFHIR(fabextras.FHIR_URLS[0], 'json')
    records = {}
    while True:
        retries = 10
        query = None
        #query = rest.search(type, params)
        while retries > 0:
            try:
                query = rest.search(type, params)
                break
            except:
                print 'Retrying...'
                retries -= 1
                if retries < 1:
                    raise
                sleeptime = 15
                if retries < 6:
                    sleeptime = 120
                time.sleep(sleeptime)
                continue
        if not query or query.status_code != 200:
            print query
            print query.text
            return {}
        jsontext = query.text
        results = json.loads(jsontext)
        totalresults = results['totalResults']
        #print totalresults
        if not 'entry' in results:
            return {}
        for entry in results['entry']:
            id = entry['id']
            id = id[id.rfind('/')+1:]
            records[id] = entry['content']
        #print len(records)
        if len(records) >= totalresults:
            break
        if limit and len(records) > limit:
            break
        params['_skip'] = len(records)
        #print results.keys()
    return records
    
def updaterecord(id, data):
    type = data['resourceType']
    jsonified = json.dumps(data)
    rest = RestfulFHIR(fabextras.FHIR_URLS[0])
    #url = 'http://fhirtest.uhn.ca/baseDstu1/%s/17856/_history/1' % type
    #print url
    #return url
    retries = 10
    query = None
    while retries > 0:
        try:
            query = rest.update(type, id, jsonified)
            break
        except:
            print 'Retrying...'
            retries -= 1
            if retries < 1:
                raise
            sleeptime = 15
            if retries < 6:
                sleeptime = 120
            time.sleep(sleeptime)
            continue
    if not query or query.status_code != 201:
        print query
        print query.text
        return None
    url = query.headers['location']
    print url
    #exit()
    return url
        
def findid(url):
    id = url[len(fabextras.FHIR_URLS[0]):]
    firstslash = id.find('/')
    id = id[firstslash+1:]
    nextslash = id.find('/')
    id = id[:nextslash]
    return id
    
def createconditions(patient):
    codes = {'Alzheimer/Senile':'26929004', 'Heart Failure':'48447003', 'Kidney Disease':'236425005', 'Obstructive Pulmonary Disease':'13645005', 'Depression':'192080009', 'Diabetes':'73211009', 'Ischemic Heart Disease':'413838009', 'Osteoporosis':'64859006', 'Rheumatoid Arthritis/Osteoarthritis':'69896004', 'Stroke/Transient Ischemic Attack':'266257000', 'Skin Cancer':'372244006', 'Lung Cancer':'254637007', 'Colorectal Cancer':'93761005', 'Bladder Cancer':'93689003', "Non-Hodgkin's Lymphoma":'118601006', 'Thyroid Cancer':'94098005'}
    officials = {'26929004':"Alzheimer's disease", '48447003':'Chronic heart failure', '236425005':'Chronic renal impairment', '13645005':'Chronic obstructive lung disease', '192080009':'Chronic depression', '73211009':'Diabetes mellitus', '413838009':'Chronic ischemic heart disease', '64859006':'Osteoporosis', '69896004':'Rheumatoid arthritis', '266257000':'Transient ischemic attack', '372244006':'Malignant melanoma', '254637007':'Non-small cell lung cancer', '93761005':'Primary malignant neoplasm of colon', '93689003':'Primary malignant neoplasm of bladder', '118601006':"Non-Hodgkin's lymphoma", '94098005':'Primary malignant neoplasm of thyroid gland'}
    urls = []
    for condition in patient.get('conditions'):
        entry = {}
        entry['resourceType'] = 'Condition'
        entry['subject'] = {'reference': 'Patient/%s' % patient['fhirid']}
        code = codes[condition]
        official = officials[code]
        entry['code'] = {}
        entry['code']['coding'] = coding = [{}]
        coding = coding[0]
        coding['system'] = 'http://snomed.info/sct'
        coding['code'] = code
        coding['display'] = official
        entry['code']['text'] = condition
        entry['status'] = 'confirmed'
        entry['onsetDate'] = fake.date(pattern='%Y-%m-%d')
        url = createrecord(entry)
        if url:
            urls.append(url)
            id = findid(url)
            entry['id'] = id
        else:
            print 'Could not create condition: ' + official
    return urls
    
def createmedications(patient, rxlookup, rxinfo, medications):
    urls = []
    tempstore = None
    #tempstore = utils.restore('temp.yaml')
    if not tempstore:
        tempstore = {}
    if not 'pdes' in patient:
        return None
    for pde in patient['pdes']:
        ndc = pde['PROD_SRVC_ID']
        if not ndc in rxlookup and not ndc in tempstore:
            print 'Unrecognized NDC: ' + ndc
            continue
        supplydays = pde['DAYS_SUPLY_NUM']
        supplydays = int(supplydays)
        supplyquantity = pde['QTY_DSPNSD_NUM']
        supplyquantity = int(float(supplyquantity))
        supplydate = pde['SRVC_DT']
        supplydate = '%s-%s-%s' % (supplydate[:4], supplydate[4:6], supplydate[6:])
        supplydate = dateupdate('prescription', supplydate)
        rx = tempstore.get(ndc)
        if not rx:
            rx = rxlookup[ndc]
            tempstore[ndc] = rx
        if not rx in medications:
            medications[rx] = medication = {}
            medication['resourceType'] = 'Medication'
            rxdetails = tempstore.get(rx)
            if not rxdetails:
                rxdetails = rxinfo[rx]
                tempstore[rx] = rxdetails
            #print rxdetails['name']
            #print rxdetails
            if 'brand' in rxdetails:
                medication['name'] = rxdetails['brand']
            else:
                ingredientnames = [ingredient['name'] for ingredient in rxdetails['ingredients']]
                medication['name'] = ' / '.join(ingredientnames)
            #print medication['name']
            medication['kind'] = 'product'
            #medication['code'] = {'coding':[{}], 'text': rxdetails['name']}
            medication['code'] = {'coding':[{}]}
            coding = medication['code']['coding'][0]
            coding['system'] = 'http://www.nlm.nih.gov/research/umls/rxnorm'
            coding['code'] = rx
            medication['isBrand'] = ('brand' in rxdetails)
            medication['product'] = product = {}
            product['form'] = {'text':rxdetails['form']}
            product['ingredient'] = ingredients = []
            for ingredient in rxdetails['ingredients']:
                newingredient = {}
                ingredients.append(newingredient)
                newingredient['item'] = {'display':ingredient['name']}
                newingredient['amount'] = {'numerator':{}, 'denominator':{'value':1}}
                newingredient['amount']['numerator']['value'] = ingredient['quantity']
                newingredient['amount']['numerator']['units'] = ingredient['quantityunits']
            url = createrecord(medication)
            if url:
                urls.append(url)
                id = findid(url)
                medication['id'] = id
            else:
                print 'Could not create medication: ' + medication['name']
            #utils.writetext('temp.txt', json.dumps(medication))
            #print medication
            #print ''
            
        prescription = {}
        prescription['resourceType'] = 'MedicationPrescription'
        prescription['dateWritten'] = supplydate
        prescription['patient'] = medpatient = {}
        medpatient['reference'] = 'Patient/%s' % patient['fhirid']
        fullname = patient['profile']['name'][0]
        fullname = '%s %s %s' % (fullname['given'][0], fullname['given'][1], fullname['family'][0])
        medpatient['display'] = fullname
        prescription['medication'] = medication = {}
        id = medications[rx]['id']
        medication['reference'] = 'Medication/%s' % id
        medication['display'] = medications[rx]['name']
        prescription['dispense'] = dispense = {}
        dispense['quantity'] = quantity = {}
        quantity['value'] = supplyquantity
        quantity['system'] = 'http://unitsofmeasure.org'
        dispense['expectedSupplyDuration'] = duration = {}
        duration['value'] = supplydays
        duration['units'] = 'days'
        duration['system'] = 'http://unitsofmeasure.org'
        
        url = None
        # For now MedicationPrescription doesn't seem to be supported
        url = createrecord(prescription)
        if url:
            urls.append(url)
            newid = findid(url)
            prescription['id'] = newid
        else:
            print 'Could not create prescription: ' + prescription['dateWritten']
        
        #print (supplydays, supplyquantity, supplydate)
        #utils.writetext('temp.txt', json.dumps(prescription))
        
        #print ''
    #utils.dump('temp.yaml', tempstore)
    
def rxdetails(rxlookup):
    rxinfo = {}
    rxnames = []
    for rxinfo in rxlookup.values():
        name = rxinfo['name']
        if not name in rxnames:
            rxnames.append(name)
    types = ['16 Hour Transdermal Patch', '24 Hour Transdermal Patch', '72 Hour Transdermal Patch', 'Augmented Topical Cream', 'Augmented Topical Gel', 'Augmented Topical Lotion', 'Augmented Topical Ointment', 'Biweekly Transdermal Patch', 'Medicated Pad', 'Medicated Tape', 'Patch', 'Powder Spray', 'Topical Cake', 'Topical Cream', 'Topical Foam', 'Topical Gel', 'Topical Lotion', 'Topical Oil', 'Topical Ointment', 'Topical Powder', 'Topical Solution', 'Topical Spray', 'Transdermal Patch', 'Weekly Transdermal Patch', 'Dry Powder Inhaler', 'Gas', 'Gas for Inhalation', 'Inhalant', 'Inhalant Powder', 'Inhalant Solution', 'Metered Dose Inhaler', 'Nasal Inhalant', 'Nasal Inhaler', 'Nasal Spray', 'Douche', 'Vaginal Cream', 'Vaginal Foam', 'Vaginal Gel', 'Vaginal Ointment', 'Vaginal Powder', 'Vaginal Ring', 'Vaginal Spray', 'Vaginal Suppository', 'Vaginal Tablet', 'Injectable Solution', 'Injectable Suspension', 'Intramuscular Solution', 'Intramuscular Suspension', 'Intrathecal Suspension', 'Intravenous Solution', 'Intravenous Suspension', 'Prefilled Syringe', 'Enema', 'Rectal Cream', 'Rectal Foam', 'Rectal Gel', 'Rectal Ointment', 'Rectal Powder', 'Rectal Solution', 'Rectal Spray', 'Rectal Suppository', 'Rectal Suspension', 'Mucosal Spray', 'Mucous Membrane Topical Solution', 'Nasal Cream', 'Nasal Gel', 'Nasal Ointment', 'Nasal Solution', 'Nasal Suspension', 'Bar', 'Buccal Film', 'Buccal Tablet', 'Chewable Bar', 'Chewable Tablet', 'Chewing Gum', 'Crystals', 'Disintegrating Tablet', 'Elixir', 'Enteric Coated Capsule', 'Enteric Coated Tablet', 'Extended Release Capsule', 'Extended Release Enteric Coated Capsule', 'Extended Release Enteric Coated Tablet', 'Extended Release Suspension', 'Extended Release Tablet', 'Extended Release Oral Tablet', 'Extended Release Oral Capsule', 'Delayed Release Oral Tablet', 'Delayed Release Oral Capsule', 'Disintegrating Oral Tablet', 'Effervescent Oral Tablet', 'Flakes', 'Granules', 'Oral Granules', 'Lozenge', 'Oral Lozenge', 'Oral Capsule', 'Oral Cream', 'Oral Foam', 'Oral Gel', 'Oral Ointment', 'Oral Paste', 'Oral Powder', 'Oral Solution', 'Oral Spray', 'Oral Strip', 'Oral Suspension', 'Oral Tablet', 'Pellet', 'Pudding', 'Sublingual Tablet', 'Sustained Release Buccal Tablet', 'Wafer', 'Oral Wafer', 'Mouthwash', 'Toothpaste', 'Otic Cream', 'Otic Ointment', 'Otic Solution', 'Otic Suspension', 'Ophthalmic Cream', 'Ophthalmic Gel', 'Ophthalmic Irrigation Solution', 'Ophthalmic Ointment', 'Ophthalmic Solution', 'Ophthalmic Suspension', 'Drug Implant', 'Intraperitoneal Solution', 'Irrigation Solution', 'Paste', 'Prefilled Applicator', 'Urethral Suppository', 'Urethral Gel', 'Medicated Shampoo', 'Bar Soap', 'Medicated Bar Soap', 'Medicated Liquid Soap']
    units = ['MG', 'ML', 'UNT', 'ACTUAT', 'MEQ', 'HR', 'SQCM', 'CELLS', 'BAU', 'AU', 'PNU', 'PCT']
    types.sort(key=len, reverse=True)
    for rxname in rxnames:
        fullname = rxname
        rxinfo[fullname] = info = {}
        rxname = rxname.replace(' % ', ' PCT ')
        rxbrand = None
        rxunits = None
        if '[' in rxname:
            if not rxname.endswith(']'):
                print 'Unknown brand: ' + fullname
                continue
            brandstart = rxname.find('[')
            rxbrand = rxname[brandstart+1:-1]
            rxname = rxname[:brandstart-1]
        rxtype = None
        for type in types:
            if type in rxname:
                rxtype = type
                break
        if not rxtype:
            print 'Unknown type: ' + fullname
            continue
        rxname = rxname.replace(' ' + rxtype, '')
        subnames = rxname.split(' / ')
        ingredients = []
        for subname in subnames:
            ingredient = {}
            if 'Pack' in rxname and '(' in subname:
                packstart = subname.find('(') + 1
                subname = subname[packstart:]
            if 'Pack' in rxname and ')' in subname:
                packend = subname.find(')')
                subname = subname[:packend]
            match = None
            pattern = r'^((?P<strength>\d+(\.\d+)?) (?P<strengthunits>\w+))?(?P<drug>.+) (?P<quantity>(\d+)(\.\d+)?) (?P<units>\w+(/\w+)?)$'
            match = re.search(pattern, subname)
            if not match:
                print 'Unknown format: ' + fullname
                continue
            rxstrength = match.group('strength')
            rxstrengthunits = match.group('strengthunits')
            rxdrugname = match.group('drug')
            rxquantity = match.group('quantity')
            rxquantityunits = match.group('units')
            rxquantity = float(rxquantity)
            if rxstrength:
                rxstrength = float(rxstrength)
            if rxstrength:
                ingredient['strength'] = rxstrength
                ingredient['strengthunits'] = rxstrengthunits
            ingredient['name'] = rxdrugname
            ingredient['quantity'] = rxquantity
            ingredient['quantityunits'] = rxquantityunits
            ingredients.append(ingredient)
        if rxbrand:
            info['brand'] = rxbrand
        info['form'] = rxtype
        info['ingredients'] = ingredients
        #print fullname
        #print rxbrand
        #print rxtype
        #print "'" + rxname + "'"
        #print ''
    return rxinfo
    

    
#def findcommonpdes(patients, rxlookup, rxinfo):
#    totals = {}
#    for patient in patients.values()[:100]:
#        if not 'pdes' in patient:
#            continue
#        for pde in patient['pdes']:
#            ndc = pde['PROD_SRVC_ID']
#            if not ndc in rxlookup:
#              continue
#            name, rx = rxlookup[ndc]['name'], rxlookup[ndc]['rx']
#            if not name in totals:
#                totals[name] = 0
#            totals[name] += 1
#    commons = list(sorted(totals.items(), key=operator.itemgetter(1), reverse=True))
#    for common in commons[:25]:
#        print common
#        print rxinfo[common[0]]

def createobservations(patient):
    urls = []
    for vitalsorlab in patient['observations']:
        subrecords = [vitalsorlab]
        if vitalsorlab['Type'] == 'vitals':
            subrecords = []
            subtypes = []
            subtypes.append(('Height', vitalsorlab['Height'], vitalsorlab['Height_Units']))
            subtypes.append(('Weight', vitalsorlab['Weight'], vitalsorlab['Weight_Units']))
            subtypes.append(('Body Temperature', vitalsorlab['Temperature'], vitalsorlab['Temperature_Units']))
            subtypes.append(('Systolic Blood Pressure', vitalsorlab['SystolicBP'], 'mm[Hg]'))
            subtypes.append(('Diastolic Blood Pressure', vitalsorlab['DiastolicBP'], 'mm[Hg]'))
            subtypes.append(('Pulse Rate', vitalsorlab['Pulse'], 'bpm'))
            subtypes.append(('Respiration Rate', vitalsorlab['Respiration'], 'brpm'))
            for subtype in subtypes:
                subrecord = {}
                subrecord['Date_Collected'] = subrecord['Date_Resulted'] = vitalsorlab['Encounter_Date']
                subrecord['Panel'] = 'FALSE'
                subrecord['Test_Name'] = subtype[0]
                subrecord['Result_Name'] = subtype[0]
                subrecord['Result_Status'] = 'Final'
                subrecord['Result_Description'] = '%s=%s %s' % subtype
                subrecord['Numeric_Result'] = subtype[1]
                subrecord['Units'] = subtype[2]
                subrecords.append(subrecord)
            
        for subrecord in subrecords:
            observation = {}
            observation['resourceType'] = 'Observation'
            observation['status'] = 'final'
            observation['reliability'] = 'ok'
            observation['issued'] = subrecord['Date_Collected']
            observation['issued'] = dateupdate('observation', observation['issued'])
            observation['name'] = {'coding':[{}]}
            coding = observation['name']['coding'][0]
            coding['display'] = subrecord['Result_Name']
            if 'Result_LOINC' in subrecord:
                coding['system'] = 'http://loinc.org'
                coding['code'] = subrecord['Result_LOINC']
            if subrecord.get('Numeric_Result') and subrecord.get('Units'):
                observation['valueQuantity'] = quantity = {}
                quantity['value'] = float(subrecord['Numeric_Result'].replace(',',''))
                quantity['units'] = subrecord['Units']
                observation['referenceRange'] = range = [{}]
                range = range[0]
                range['low'] = low = {}
                range['high'] = high = {}
                low['units'] = subrecord['Units']
                high['units'] = subrecord['Units']
                #print '%s: %s' % (coding['display'], quantity['value'])
                if coding['display'] == "Body Temperature":
                    low['value'] = 97.0
                    high['value'] = 99.0
                elif coding['display'] == "Pulse Rate":
                    low['value'] = 60.0
                    high['value'] = 100.0
                elif coding['display'] == "Respiration Rate":
                    low['value'] = 12.0
                    high['value'] = 16.0
                elif coding['display'] == "Systolic Blood Pressure":
                    low['value'] = 90.0
                    high['value'] = 120.0
                elif coding['display'] == "Diastolic Blood Pressure":
                    low['value'] = 60.0
                    high['value'] = 80.0
                elif coding['display'] == "Weight":
                    height = float(vitalsorlab['Height'])
                    idealbase = 110
                    idealmod = 6
                    if patient['profile']['gender']['coding'][0]['code'] == 'F':
                        idealbase = 100
                        idealmod = 5
                    heightmod = height - 5 * 12
                    ideal = idealbase + heightmod * idealmod
                    low['value'] = int(ideal - 15)
                    high['value'] = int(ideal + 15)
                elif coding['display'] == "HDL":
                    low['value'] = 40.0
                    high['value'] = 100.0
                elif coding['display'] == "LDL":
                    low['value'] = 80.0
                    high['value'] = 160.0
                elif coding['display'] == "Total cholesterol":
                    low['value'] = 100.0
                    high['value'] = 240.0
                elif coding['display'] == "Triglyceride":
                    low['value'] = 50.0
                    high['value'] = 200.0
                else:
                    observation.pop('referenceRange', None)
            else:
                observation['interpretation'] = {'coding':[{}]}
                interpretation = observation['interpretation']['coding'][0]
                interpretation['display'] = subrecord['Result_Description']
            observation['subject'] = subject = {}
            subject['reference'] = 'Patient/%s' % patient['fhirid']
            fullname = patient['profile']['name'][0]
            fullname = '%s %s %s' % (fullname['given'][0], fullname['given'][1], fullname['family'][0])
            subject['display'] = fullname
            #utils.writetext('temp.txt', json.dumps(observation))
            #utils.writetext('temp.txt', json.dumps(patient['profile']['gender']))
            url = None
            #exit()
            url = createrecord(observation)
            if url:
                urls.append(url)
                newid = findid(url)
                observation['id'] = newid
            else:
                print 'Could not create observation: ' + subrecord['Result_Description']
            
    return urls
    
def createall(rxlookup, rxinfo):
    created = utils.restore('created.yaml')
    if not created:
        created = {}
    patients = desynpuf.loadall()
    images = patientphotos.findimages()
    medpatients = {}
    for patientkey in patients.keys():
        patient = patients[patientkey]
        if not patient.get('pdes') or not patient.get('conditions'):
            continue
        medpatients[patientkey] = patient
    extrapatients = otherdata.loadall()
    for patient in medpatients.values()[:100]:
        #print len(patient['pdes'])
        patientindex = medpatients.values().index(patient)
        extraindex = patientindex % len(extrapatients)
        extrapatient = extrapatients.keys()[extraindex]
        patient['observations'] = extrapatients[extrapatient]
        if patient['id'] in created:
            continue
        birthyear = patient['birthdate'][:4]
        sex = patient['sex']
        profile = fakeprofile(sex, birthyear, images)
        url = createrecord(profile)
        if not url:
            print 'Could not create patient %s' % patient['id']
            continue
        patient['profile'] = profile
        #print url
        id = findid(url)
        created[patient['id']] = id
        patient['fhirid'] = id
        urls = createconditions(patient)
        medications = {}
        urls = createmedications(patient, rxlookup, rxinfo, medications)
        urls = createobservations(patient)
        
    #utils.dump('created.yaml', created)

def convert_rxlookup():
    print 'Converting rxlookup'
    print 'Loading old rxlookup'
    rxlookup = utils.restore('rxlookup.yaml')
    print 'Creating rxdetails'
    rxinfoold = rxdetails(rxlookup)
    print 'Coverting...'
    rxlookupsmall = {}
    rxinfo = {}
    for ndc, namerx in rxlookup.items():
        name, rx = namerx['name'], namerx['rx']
        rxlookupsmall[ndc] = rx
        rxinfo[rx] = rxinfoold[name]
        rxinfo[rx]['name'] = name
    print 'Saving rxlookup and rxinfo'
    utils.dump('rxlookup-small.yaml', rxlookupsmall)
    utils.dump('rxinfo.yaml', rxinfo)
    return rxlookup, rxinfo
    
def updateall():
    print 'Finding existing patients'
    patients = findrecords('Patient')
    print 'Found %s Patient records' % len(patients)
    #medications = findrecords('Medication')
    medications = {}
    print 'Found %s Medication records' % len(medications)
    for id, patient in patients.items():
        print ''
        name = ' '.join(patient['name'][0]['given'])
        name += ' ' + patient['name'][0]['family'][0]
        print 'Processing patient %s (%s)' % (name, id)
        subject = {'subject':id}
        patientid = {'patient._id':id}
        conditions = findrecords('Condition', subject)
        print 'Found %s conditions' % len(conditions)
        observations = findrecords('Observation', subject)
        print 'Found %s observations' % len(observations)
        prescriptions = findrecords('MedicationPrescription', patientid)
        print 'Found %s prescriptions' % len(prescriptions)
        meds = {}
        for prescription in prescriptions.values():
            medid = prescription['medication']['reference']
            medid = medid[medid.rfind('/')+1:]
            if not medid in medications:
                found = findrecords('Medication', {'_id': medid})
                medications[medid] = found[medid]
            meds[medid] = medications[medid]
        print 'Found %s medications' % len(meds)
        
        notes = ''
        observationnotes = ['Observation Notes: ']
        for observation in observations.values():
            if not 'referenceRange' in observation or not 'valueQuantity' in observation:
                continue
            year = int(observation['issued'][:4])
            if year < 2011:
                continue
            high = float(observation['referenceRange'][0]['high']['value'])
            low = float(observation['referenceRange'][0]['low']['value'])
            value = float(observation['valueQuantity']['value'])
            if low <= value <= high:
                continue
            name = observation['name']['coding'][0]['display']
            highnote = 'High %s.' % name
            lownote = 'Low %s.' % name
            newnote = highnote
            if value < low:
                newnote = lownote
            if lownote in observationnotes and newnote != lownote:
                observationnotes.remove(lownote)
            if not newnote in observationnotes:
                observationnotes.append(newnote)
                
            #print '%s (%s-%s)' % (value, low, high)
            
        if len(observationnotes) > 1:
            notes += '\n'.join(observationnotes)
        
        mednotes = ['Medication Notes: ']
        recentmeds = []
        for prescription in prescriptions.values():
            year = int(prescription['dateWritten'][:4])
            if year < 2015:
                continue
            name = prescription['medication']['display']
            if not name in recentmeds:
                recentmeds.append(name)
        medcount = len(recentmeds)
        if medcount > 4:
            mednote = 'Large number of active medications (%s).' % medcount
            mednotes.append(mednote)
            
        for medication in medications.values():
            if 'History of Antidepressant use.' in mednotes:
                break
            antidepressants = ['prozac', 'luvox', 'zoloft', 'paxil', 'lexapro', 'celexa', 'wellbutrin', 'cymbalta', 'effexor', 'remeron', 'desyrel', 'elavil', 'anafranil', 'norpramin', 'sinequan', 'tofranil', 'pamelor', 'aventyl', 'vivactil', 'surmontil']
            medname = medication['name'].lower()
            for med in antidepressants:
                if med.lower() in medname.lower():
                    mednotes.append('History of Antidepressant use.')
                    break
            #print medication['name']
            #print medication.keys()
            #exit()
            
        if len(mednotes) > 1:
            if len(notes) > 0:
                notes += '\n\n'
            notes += '\n'.join(mednotes)
            
        print notes
        communication = patient['communication'] = [{'coding':[{}]}]
        communication[0]['coding'][0]['display'] = notes
        updaterecord(id, patient)
        #exit()
        
def create():
    rxlookup = {}
    rxinfo = {}
    print 'Loading rxlookup'
    rxlookup = utils.restore('rxlookup-small.yaml')
    print 'Loading rxinfo'
    rxinfo = utils.restore('rxinfo.yaml')
    if not rxlookup or not rxinfo:
        rxlookup, rxinfo = convert_rxlookup()
        
    #jsonified = fakeprofile()
    #utils.writetext('temp.txt', jsonified)
    #print createrecord(jsonified)
    
    print 'Creating records'
    createall(rxlookup, rxinfo)

def main(argv=None):
    #create()
    updateall()

if __name__ == "__main__":
    sys.exit(main())