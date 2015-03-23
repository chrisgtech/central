import sys

import base64

import utils

def encodeimage(imagefile):
    with open(imagefile, 'rb') as img:
        return base64.b64encode(img.read())
    
def findimages():
    images = {}
    baselocation = 'central_site/static/img/'
    locations = {'female':baselocation + 'women/', 'male':baselocation + 'men/'}
    for gender, location in locations.items():
        if not gender in images:
            images[gender] = []
        imagefiles = utils.findfiles('*.*', location)
        for imagefile in imagefiles:
            imagefile = imagefile.replace('\\', '/')
            images[gender].append(encodeimage(imagefile))
            # base64 doesn't seem to work
            #imagefile = imagefile.replace('central_site/static/', '')
            #images[gender].append(imagefile)
    return images

def main(argv=None):
    findimages()

if __name__ == "__main__":
    sys.exit(main())