import sys
import random
import base64
import datetime
import urllib, urllib2
import json
import os
from pprint import pprint

REST_URL = "http://52.11.104.178:8080/Patient?_format=json"
CACHE_FILE = 'patients.json'


def encodeImages():
    encodedImages = { 'man': {}, 'woman': {}}
    genders = {"men": "man","women":"woman"}
    ageranges = ["age20-39","age40-59","age60+"]

    with open('central_site/static/img/no_photo.jpg','rb') as img:
        encoded_str = base64.b64encode(img.read())
        encodedImages['man']['any'] = []
        encodedImages['man']['any'].append("data:image/jpg;base64," + encoded_str)

    with open('central_site/static/img/woman_nophoto_big.jpg','rb') as img:
        encoded_str = base64.b64encode(img.read())
        encodedImages['woman']['any'] = []
        encodedImages['woman']['any'].append("data:image/jpg;base64," + encoded_str)


    for g,f in genders.iteritems():
        for i in xrange(len(ageranges)):
            encodedImages[f][ageranges[i]] = []
            for fnum in xrange(4):
                fname = 'central_site/static/img/' + g + '/' + ageranges[i] + '/' + f + str(fnum + 1) + '.jpg'
                img = open(fname,'rb')
                if img:
                    idata = img.read()
                    encodedImages[f][ageranges[i]].append("data:image/jpg;base64," + base64.b64encode(idata))
                    img.close()
                    del idata
                    
    return encodedImages

def getGender(ingender):
    g = ingender.lower()
    if g == 'f' or g == 'female':
        return "woman"
    return "man"
    
def getAgeRange(dob):
    agerange = "any"
    if len(dob) > 0:
        dateparts = dob.split('-')
        perdob = datetime.date(int(dateparts[0]),int(dateparts[1]),int(dateparts[2]))
        thisday = datetime.date.today()
        ageinyears = thisday.year - perdob.year
        if thisday.month < perdob.month:
            ageinyears += 1
        elif thisday.day <= perdob.day:
            ageinyears += 1
        if ageinyears >= 20 and ageinyears <= 39:
            agerange = "age20-39"
        elif ageinyears >= 40 and ageinyears <= 59:
            agerange = "age40-59"
        elif ageinyears >= 60:
            agerange = "age60+"
    return agerange
    
    
def get_json(url):
    print url
    opener = urllib2.build_opener()
    return json.loads(opener.open(url).read())
    
def put_json_tocache(data):
    with open(CACHE_FILE, 'w') as cachefile:
        json.dump(data, cachefile)
    

def getPicture(images, gender,dob):
    g = getGender(gender)
    a = getAgeRange(dob)
    p = 0
    if a != 'any':
        p = random.randint(0,3)
    
    return images[g][a][p]

def main(argv=None):
    images = encodeImages()
    data = get_json(REST_URL)

    numentries = data['totalResults']
    entries = data['entry']
    if len(entries) < numentries:
        print "Did not get all expected entries! Expected: " + str(numentries) 
        numentries = len(entries)
        print " Only got: " + str(numentries) + "\n"
        
    for i in xrange(numentries):
        if entries[i].has_key('content'):
            if (entries[i]['content'].has_key('birthDate')):
                bdate = entries[i]['content']['birthDate']
            else:
                bdate = ""
            if (entries[i]['content'].has_key('gender')):
                gender = entries[i]['content']['gender']['coding'][0]['code']
            else:
                gender = ""
            photo = getPicture(images,gender,bdate)
            if photo:
                entries[i]['content']['photo'] = {}
                entries[i]['content']['photo']['data'] = photo

    put_json_tocache(data)

if __name__ == "__main__":
    sys.exit(main())