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
    encodedImages = { 'man': [], 'woman': []}
    genders = {"men": "man","women":"woman"}

    for g,f in genders.iteritems():
        for fnum in xrange(12):
            fname = 'central_site/static/img/' + g + '/' + f + str(fnum + 1) + '.jpg'
            with open(fname,'rb') as img:
                encodedImages[f].append("data:image/jpg;base64," + base64.b64encode(img.read()))
                    
    return encodedImages

def getGender(ingender):
    g = ingender.lower()
    if g == 'f' or g == 'female':
        return "woman"
    return "man"
    
    
def get_json(url):
    print url
    opener = urllib2.build_opener()
    return json.loads(opener.open(url).read())
    
def put_json_tocache(data):
    with open(CACHE_FILE, 'w') as cachefile:
        json.dump(data, cachefile)
    

def getPicture(images, gender):
    g = getGender(gender)
    p = random.randint(0,11)
    return images[g][p]

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
            if (entries[i]['content'].has_key('gender')):
                gender = entries[i]['content']['gender']['coding'][0]['code']
            else:
                gender = ""
            photo = getPicture(images,gender)
            if photo:
                entries[i]['content']['photo'] = {}
                entries[i]['content']['photo']['data'] = photo

    put_json_tocache(data)

if __name__ == "__main__":
    sys.exit(main())