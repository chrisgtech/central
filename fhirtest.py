import sys

import fhirsample

def testall():
    html = ''
    
    html += printtitle('Get Patients')
    html += printdivs(fhirsample.getpatients())
    
    patientid = '1'
    html += printtitle('Get Patient %s' % patientid)
    html += printdiv(fhirsample.getpatient(patientid))
    
    html += printtitle('Get Observations For Patient %s' % patientid)
    html += printdivs(fhirsample.getobservations(patientid))
    
    observationid = '1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c'
    html += printtitle('Get Observation %s' % observationid)
    html += printdiv(fhirsample.getobservation(observationid))
    
    html += printtitle('Get Conditions For Patient %s' % patientid)
    html += printdivs(fhirsample.getconditions(patientid))
    
    conditionid = '1-0-64f9481e-2eb8-4781-805c-b28b793b1412'
    html += printtitle('Get Condition %s' % conditionid)
    html += printdiv(fhirsample.getcondition(conditionid))
    
    html += printtitle('Get Prescriptions For Patient %s' % patientid)
    html += printdivs(fhirsample.getprescriptions(patientid))
    
    prescriptionid = '1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e'
    html += printtitle('Get Prescription %s' % prescriptionid)
    html += printdiv(fhirsample.getprescription(prescriptionid))
        
    with open('fhirtest.html', 'w') as htmlfile:
        htmlfile.write(html)
        
def printtitle(text):
    return '<h2>' + text + '</h2><br>'
        
def printdivs(datalist):
    printed = ''
    for entry in datalist['entry']:
        content = entry['content']
        printed += printdiv(content)
    return printed
        
def printdiv(content):
    return stripdiv(content['text']['div']) + '<br>' + '\n'
    
def stripdiv(text):
    divstart = text.find('<div')
    divend = text.rfind('</div>') + len('</div>')
    return text[divstart:divend]
    
def main(argv=None):
    testall()

if __name__ == "__main__":
    sys.exit(main())