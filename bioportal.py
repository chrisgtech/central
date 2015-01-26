import sys

import urllib, urllib2
import json
import os
from pprint import pprint

REST_URL = "http://data.bioontology.org"
API_KEY = '162065f4-896f-4404-8907-7760d1f28020'
CACHE_FILE = 'biocache.json'
saved = {}
saved['dirty'] = False
saved['cache'] = {}

def get_json(url):
    print url
    #return {'collection':[]}
    opener = urllib2.build_opener()
    opener.addheaders = [('Authorization', 'apikey token=' + API_KEY)]
    return json.loads(opener.open(url).read())
    
def loadcache():
    with open(CACHE_FILE) as cachefile:
        for key, value in json.load(cachefile).items():
            saved['cache'][key] = value
    return saved['cache']
    
def savecache():
    if saved['dirty']:
        with open(CACHE_FILE, 'w') as cachefile:
            json.dump(saved['cache'], cachefile)
        saved['dirty'] = False
    
def search(query):
    terms = {}
    #terms['include'] = 'all'
    terms['q'] = query
    terms['ontologies'] = 'RXNORM'
    #terms['require_exact_match'] = 'true'
    terms['also_search_properties'] = 'true'
    urlterms = urllib.urlencode(terms)
    return get_json(REST_URL + '/search?' + urlterms)['collection']

def lookupdrug(id):
    if not saved['cache']:
        loadcache()
    name = u'UNKNOWN'
    if id in saved['cache']:
        name = saved['cache'][id]
        return name
    
    results = search(id)
    #pprint(results)
    if len(results) > 0:
        result = results[0]
        name = result['prefLabel']
        print name
    
    saved['dirty'] = True
    saved['cache'][id] = name
    
    return name

def main(argv=None):
    #savecache()
    loadcache()
    lookupdrug('66582031227')
    #lookupdrug('Vytorin')
    savecache()

if __name__ == "__main__":
    sys.exit(main())