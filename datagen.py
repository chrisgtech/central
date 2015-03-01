import sys
import csv, random, json

from faker import Factory
fake = Factory.create('en_US')
from fhir import *

import desynpuf, utils, fabextras

def fakeprofile(sex='female', birthyear=None):
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
    
    #profile = {'content':profile}
    
    jsonified = json.dumps(profile)
    return jsonified
    
def createrecord(profile):
    rest = RestfulFHIR(fabextras.FHIR_URLS[0])
    query = rest.create('Patient', profile)
    if query.status_code != 201:
        print query
        return None
    return query.headers['location']
    
def createall():
    created = utils.restore('created.yaml')
    if not created:
        created = {}
    patients = desynpuf.loadall()
    for patient in patients.values()[:10]:
        if patient['id'] in created:
            continue
        birthyear = patient['birthdate'][:4]
        sex = patient['sex']
        profile = fakeprofile(sex, birthyear)
        url = createrecord(profile)
        if not url:
            print 'Could not create patient %s' % patient['id']
            continue
        print url
        id = url[len(fabextras.FHIR_URLS[0]):]
        firstslash = id.find('/')
        id = id[firstslash+1:]
        nextslash = id.find('/')
        id = id[:nextslash]
        created[patient['id']] = id
    utils.dump('created.yaml', created)

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
    convert_txt('data/')
    #jsonified = fakeprofile()
    #utils.writetext('temp.txt', jsonified)
    #print createrecord(jsonified)
    createall()

if __name__ == "__main__":
    sys.exit(main())