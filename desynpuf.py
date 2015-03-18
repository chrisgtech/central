import sys

import csv, random

import utils
import bioportal

def fakename(sexcode):
    codevalue = int(sexcode)
    if codevalue > 1:
        return'%s %s' % (fake.first_name_female(), fake.last_name())
    else:
        return '%s %s' % (fake.first_name_male(), fake.last_name())
        
def loadconditions(summary):
    conditions = []
    codemap = {'SP_ALZHDMTA':'Alzheimer/Senile', 'SP_CHF':'Heart Failure', 'SP_CHRNKIDN':'Kidney Disease', 'SP_CNCR':'Cancer', 'SP_COPD':'Obstructive Pulmonary Disease', 'SP_DEPRESSN':'Depression', 'SP_DIABETES':'Diabetes', 'SP_ISCHMCHT':'Ischemic Heart Disease', 'SP_OSTEOPRS':'Osteoporosis', 'SP_RA_OA':'Rheumatoid Arthritis/Osteoarthritis', 'SP_STRKETIA':'Stroke/Transient Ischemic Attack'}
    for code, name in codemap.items():
        if name == 'Cancer':
            cancers = ['Skin Cancer', 'Lung Cancer', 'Colorectal Cancer', 'Bladder Cancer', "Non-Hodgkin's Lymphoma", 'Thyroid Cancer']
            name = random.choice(cancers)
        value = int(summary[code])
        if value < 2:
            conditions.append(name)
    return conditions
    
def loadpatients(patientfile):
    patients = {}
    with open(patientfile) as patientcsv:
        lines = csv.reader(patientcsv)
        headers = None
        for line in lines:
            if not headers:
                headers = line
                continue
            summary = {}
            for index, header in enumerate(headers):
                summary[header] = line[index]
            id = summary['DESYNPUF_ID']
            sexcode = summary['BENE_SEX_IDENT_CD']
            birthdate = summary['BENE_BIRTH_DT']
            conditions = loadconditions(summary)
            
            patient = {}
            patient['id'] = id
            patient['conditions'] = conditions
            patient['birthdate'] = birthdate
            patient['summary'] = summary
            if int(sexcode) > 1:
                patient['sex'] = 'female'
            else:
                patient['sex'] = 'male'
            patients[id] = patient
            
    return patients

def loaddrugevents(patients, drugfile):
    with open(drugfile) as drugcsv:
        lines = csv.reader(drugcsv)
        headers = None
        for line in lines:
            if not headers:
                headers = line
                continue
            pde = {}
            for index, header in enumerate(headers):
                pde[header] = line[index]
            #prodid = pde['PROD_SRVC_ID']
            desynpufid = pde['DESYNPUF_ID']
            #pdeid = pde['PDE_ID']
            if not desynpufid in patients:
                patients[desynpufid] = {}
                patients[desynpufid]['id'] = desynpufid
                patients[desynpufid]['name'] = 'Unknown Patient'
            patient = patients[desynpufid]
            if not 'pdes' in patient:
                patient['pdes'] = []
            patient['pdes'].append(pde)
        #for id, patient in patients.items():
        #    print id
        #    print len(patient['pdes'])
        
def lookup_ndcs(patients):
    bioportal.loadcache()
    for patient in patients.values()[:5]:
        if not 'pdes' in patient:
            continue
        for pde in patient['pdes']:
            ndc = pde['PROD_SRVC_ID']
            name = bioportal.lookupdrug(ndc)
            if name == 'UNKNOWN' and 'ALTS' in pde and len(pde['ALTS']) == 1:
                alt = pde['ALTS'][0]
                #alt = alt.replace('-','')
                name = bioportal.lookupdrug(alt)
            pde['NAME'] = name
            
        bioportal.savecache()
        
def set_alt_ndcs(patients):
    cache = bioportal.loadcache()
    ndcalts = {}
    for ndc in cache.keys():
        if not ndc:
            continue
        if len(ndc) != 11:
            print 'Bad NDC: %s' % ndc
            continue
        zeros = [0, 5, 9]
        alts = []
        for zero in zeros:
            if ndc[zero] == '0':
                alt = ndc[:zero] + ndc[zero+1:]
                if zero == 0:
                    alt = alt[:4] + '-' + alt[4:8] + '-' + alt[8:]
                elif zero == 5:
                    alt = alt[:5] + '-' + alt[5:8] + '-' + alt[8:]
                else:
                    alt = alt[:5] + '-' + alt[5:9] + '-' + alt[9:]
                alts.append(alt)
        ndcalts[ndc] = alts
        
    for patient in patients.values():
        if not 'pdes' in patient:
            continue
        for pde in patient['pdes']:
            ndc = pde['PROD_SRVC_ID']
            if ndc in ndcalts:
                pde['ALTS'] = ndcalts[ndc]
        
def loadall():
    patients = loadpatients('data/DE1_0_2008_Beneficiary_Summary_File_Sample_1.csv')
    loaddrugevents(patients, 'data/DE1_0_2008_to_2010_Prescription_Drug_Events_Sample_1.csv')
    return patients
    
def main(argv=None):
    patients = loadall()
    
    pdecount = 0
    for patient in patients.values():
        if not 'pdes' in patient:
            continue
        #if pdecount < 1:
        #    print patient
        pdecount += len(patient['pdes'])
    print '%s patients loaded' % len(patients)
    print 'With %s unique drug events' % pdecount
    
    #set_alt_ndcs(patients)
    
    #lookup_ndcs(patients)

if __name__ == "__main__":
    sys.exit(main())