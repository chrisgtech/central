import sys

import urllib, urllib2, json, os, random
from pprint import pprint

import utils

REST_URL = "http://rxnav.nlm.nih.gov/REST"
API_KEY = '162065f4-896f-4404-8907-7760d1f28020'
BIO_CACHE = 'biocache.json'
saved = {}
saved['dirty'] = False
saved['cache'] = {}
saved['rxlookup'] = {}

def get_json(url):
    print url
    opener = urllib2.build_opener()
    return json.loads(opener.open(url).read())
    
def loadcache():
    with open(BIO_CACHE) as cachefile:
        for key, value in json.load(cachefile).items():
            saved['cache'][key] = value
    saved['rxlookup'] = utils.restore('rxlookup.yaml')
    if not saved['rxlookup']:
        saved['rxlookup'] = {}
    return saved['cache']
    
def searchid(id):
    terms = {}
    terms['idtype'] = 'NDC'
    terms['id'] = id
    urlterms = urllib.urlencode(terms)
    return get_json(REST_URL + '/rxcui.json?' + urlterms)['idGroup']

def lookupdrug(id):
    result = searchid(id)
    rx = result.get('rxnormId')
    if rx:
        rx = rx[0].encode('ascii', 'ignore')
    return rx

def lookuprxname(rxid):
    response = get_json(REST_URL + '/rxcui/%s/properties.json' % rxid)
    name = response['properties']['name']
    if name:
        name = name.encode('ascii', 'ignore')
    return name
    
def rxfind(rxlookup, ndc):
    ndcs = list(rxlookup.keys())
    entry = rxlookup.get(ndc)
    if not entry:
        if ndc == 'OTHER':
            entry = rxlookup[random.choice(ndcs)]
        else:
            def checker(closendc):
                if closendc == 'OTHER':
                    return 99999999999999
                ndcvalue = int(ndc)
                closevalue = int(closendc)
                return abs(ndcvalue - closevalue)
            newndc = min(ndcs, key=checker)
            entry = rxlookup[newndc]
    return (entry['name'], entry['rx'])
    
def findcloserx():
    rxlookup = saved['rxlookup']
    cache = saved['cache']
    
    loops = 0
    count = 0
    for id in cache.keys():
        id = id.encode('ascii', 'ignore')
        count += 1
        if id in rxlookup:
            continue
        loops = (loops + 1) % 2500
        name, rx = rxfind(rxlookup, id)
        rxlookup[id] = {'name':name, 'rx':rx}
        print name
        if loops < 1:
            utils.dump('rxlookup.yaml', rxlookup)
            print '{:.0%}'.format(count / float(len(cache.keys())))
    utils.dump('rxlookup.yaml', rxlookup)
    
def findrxnorms():
    rxlookup = saved['rxlookup']
    cache = saved['cache']
    
    loops = 0
    startnow = True
    count = 0
    for id in cache.keys():
        count += 1
        id = id.encode('ascii', 'ignore')
        if id == '54697007003':
            startnow = True
        if not startnow:
            continue
        if id in rxlookup:
            continue
        loops = (loops + 1) % 500
        rx = lookupdrug(id)
        if rx:
            saved['dirty'] = True
            name = lookuprxname(rx)
            rxlookup[id] = {'rx':rx, 'name':name}
        if loops < 1 and saved['dirty']:
            utils.dump('rxlookup.yaml', rxlookup)
            saved['dirty'] = False
            print '{:.0%}'.format(count / float(len(cache.keys())))
    if saved['dirty']:
        utils.dump('rxlookup.yaml', rxlookup)
        
def main(argv=None):
    loadcache()
    #lookupdrug('54868051101')
    #findrxnorms()
    findcloserx()

if __name__ == "__main__":
    sys.exit(main())