import sys
import random
import base64
import datetime
import urllib, urllib2
import json
import os
from pprint import pprint
import webbrowser

REST_URL = "http://52.11.104.178:8080/Patient?_format=json?_count=500"
CACHE_FILE = 'patients.json'


   
    
def get_json():
    with open(CACHE_FILE,'rb') as cachefile:
        data =json.load(cachefile) 
    return data
    
def main(argv=None):
    data = get_json()

    numentries = data['totalResults']
    entries = data['entry']
    if len(entries) < numentries:
        numentries = len(entries)
        
    with open('test.html','w') as html:
    
        html.write( """<html>
        <head>
         <title>Image Test</title>
        </head>
        <body>
        """)
        for i in xrange(numentries):
            if entries[i].has_key('content'):
                if (entries[i]['content'].has_key('photo')):
                    photo = entries[i]['content']['photo']['data']
                        
                    html.write( "<img src=\"" + photo +"\" alt=\"No Photo\" </img>")
                    
        html.write( """
        </body></html>""")
        webbrowser.open_new_tab('test.html')


if __name__ == "__main__":
    sys.exit(main())