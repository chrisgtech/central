import json

# Canned data examples for now
# Will be replaced with web service calls
GET_PATIENTS = r"""{
  "resourceType": "Bundle",
  "id": "0f703772-726a-4de0-a651-2bce8c3163a2",
  "published": "2015-01-08T11:09:55.089-05:00",
  "link": [
    {
      "rel": "self",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient?_format=json"
    },
    {
      "rel": "fhir-base",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir"
    }
  ],
  "totalResults": "5",
  "author": [
    {
      "name": "HAPI FHIR Server"
    }
  ],
  "entry": [
    {
      "title": "Patient 1",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/1",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/1"
        }
      ],
      "published": "2015-01-08T11:09:55-05:00",
      "content": {
        "resourceType": "Patient",
        "text": {
          "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Anita \n            <b>COAG <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>1<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"1\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"Coag\"\/>\n      <given value=\"Anita\"\/>\n   <\/name>\n<\/Patient>"
        },
        "identifier": [
          {
            "system": "urn:hapitest:mrns",
            "value": "1"
          }
        ],
        "name": [
          {
            "family": [
              "Coag"
            ],
            "given": [
              "Anita"
            ]
          }
        ]
      }
    },
    {
      "title": "Patient 2",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/2",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/2"
        }
      ],
      "published": "2015-01-08T11:09:55-05:00",
      "content": {
        "resourceType": "Patient",
        "text": {
          "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Alicia \n            <b>SILVERSTONE <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>2<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"2\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"Silverstone\"\/>\n      <given value=\"Alicia\"\/>\n   <\/name>\n<\/Patient>"
        },
        "identifier": [
          {
            "system": "urn:hapitest:mrns",
            "value": "2"
          }
        ],
        "name": [
          {
            "family": [
              "Silverstone"
            ],
            "given": [
              "Alicia"
            ]
          }
        ]
      }
    },
    {
      "title": "Patient 3",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/3",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/3"
        }
      ],
      "published": "2015-01-08T11:09:55-05:00",
      "content": {
        "resourceType": "Patient",
        "text": {
          "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Sam \n            <b>TURNER <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>3<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"3\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"Turner\"\/>\n      <given value=\"Sam\"\/>\n   <\/name>\n<\/Patient>"
        },
        "identifier": [
          {
            "system": "urn:hapitest:mrns",
            "value": "3"
          }
        ],
        "name": [
          {
            "family": [
              "Turner"
            ],
            "given": [
              "Sam"
            ]
          }
        ]
      }
    },
    {
      "title": "Patient 4",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/4",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/4"
        }
      ],
      "published": "2015-01-08T11:09:55-05:00",
      "content": {
        "resourceType": "Patient",
        "text": {
          "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Hannah \n            <b>C. <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>4<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"4\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"C.\"\/>\n      <given value=\"Hannah\"\/>\n   <\/name>\n<\/Patient>"
        },
        "identifier": [
          {
            "system": "urn:hapitest:mrns",
            "value": "4"
          }
        ],
        "name": [
          {
            "family": [
              "C."
            ],
            "given": [
              "Hannah"
            ]
          }
        ]
      }
    },
    {
      "title": "Patient 5",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/5",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Patient\/5"
        }
      ],
      "published": "2015-01-08T11:09:55-05:00",
      "content": {
        "resourceType": "Patient",
        "text": {
          "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Tom \n            <b>COAG <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>5<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"5\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"Coag\"\/>\n      <given value=\"Tom\"\/>\n   <\/name>\n<\/Patient>"
        },
        "identifier": [
          {
            "system": "urn:hapitest:mrns",
            "value": "5"
          }
        ],
        "name": [
          {
            "family": [
              "Coag"
            ],
            "given": [
              "Tom"
            ]
          }
        ]
      }
    }
  ]
}"""

GET_PATIENT = r"""{
  "resourceType": "Patient",
  "text": {
    "div": "<Patient xmlns=\"http:\/\/hl7.org\/fhir\">\n   <text>\n      <status value=\"generated\"\/>\n      <div xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">\n         <div class=\"hapiHeaderText\"> Anita \n            <b>COAG <\/b>\n         <\/div>\n         <table class=\"hapiPropertyTable\">\n            <tbody>\n               <tr>\n                  <td>Identifier<\/td>\n                  <td>1<\/td>\n               <\/tr>\n            <\/tbody>\n         <\/table>\n      <\/div>\n   <\/text>\n   <identifier>\n      <system value=\"urn:hapitest:mrns\"\/>\n      <value value=\"1\"\/>\n   <\/identifier>\n   <name>\n      <family value=\"Coag\"\/>\n      <given value=\"Anita\"\/>\n   <\/name>\n<\/Patient>"
  },
  "identifier": [
    {
      "system": "urn:hapitest:mrns",
      "value": "1"
    }
  ],
  "name": [
    {
      "family": [
        "Coag"
      ],
      "given": [
        "Anita"
      ]
    }
  ]
}"""

GET_OBSERVATIONS = r"""{
  "resourceType": "Bundle",
  "id": "ae3d884f-866c-472f-9889-bd00019363da",
  "published": "2015-01-08T11:19:46.669-05:00",
  "link": [
    {
      "rel": "self",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation?subject:Patient=1&_format=json"
    },
    {
      "rel": "fhir-base",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir"
    }
  ],
  "totalResults": "19",
  "author": [
    {
      "name": "HAPI FHIR Server"
    }
  ],
  "entry": [
    {
      "title": "Observation 1-0-42b4baaf-5a4c-4c6d-8ea5-5393e4b5af0e",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-42b4baaf-5a4c-4c6d-8ea5-5393e4b5af0e",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-42b4baaf-5a4c-4c6d-8ea5-5393e4b5af0e"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Body Weight<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-42b4baaf-5a4c-4c6d-8ea5-5393e4b5af0e<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>65.77089365145514145 kg<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "3141-9"
            }
          ]
        },
        "valueQuantity": {
          "value": 65.770893651455,
          "units": "kg"
        },
        "comments": "Body Weight",
        "issued": "2014-12-26T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-a712ca78-68b5-4df2-8f3e-0f94b6e7fb61",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-a712ca78-68b5-4df2-8f3e-0f94b6e7fb61",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-a712ca78-68b5-4df2-8f3e-0f94b6e7fb61"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Body Weight<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-a712ca78-68b5-4df2-8f3e-0f94b6e7fb61<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>90.718474002007085200 kg<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "3141-9"
            }
          ]
        },
        "valueQuantity": {
          "value": 90.718474002007,
          "units": "kg"
        },
        "comments": "Body Weight",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-676ae819-5673-4559-a1ad-7d48feaec5d4",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-676ae819-5673-4559-a1ad-7d48feaec5d4",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-676ae819-5673-4559-a1ad-7d48feaec5d4"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Height<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-676ae819-5673-4559-a1ad-7d48feaec5d4<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>1.6509999974904865 m<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 1.6509999974905,
          "units": "m"
        },
        "comments": "Height",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-e2ab6b02-2b88-4938-8e85-ceb9ca76d937",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-e2ab6b02-2b88-4938-8e85-ceb9ca76d937",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-e2ab6b02-2b88-4938-8e85-ceb9ca76d937"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Height<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-e2ab6b02-2b88-4938-8e85-ceb9ca76d937<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>1.67639999745187266 m<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 1.6763999974519,
          "units": "m"
        },
        "comments": "Height",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-37d310de-88a4-4bbc-8238-b0fe146b908d",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-37d310de-88a4-4bbc-8238-b0fe146b908d",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-37d310de-88a4-4bbc-8238-b0fe146b908d"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Systolic Blood Pressure<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-37d310de-88a4-4bbc-8238-b0fe146b908d<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>130 mm[Hg]<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 130,
          "units": "mm[Hg]"
        },
        "comments": "Systolic Blood Pressure, Overall:130\/100",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-1-37d310de-88a4-4bbc-8238-b0fe146b908d",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-37d310de-88a4-4bbc-8238-b0fe146b908d",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-37d310de-88a4-4bbc-8238-b0fe146b908d"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Diastolic Blood Pressure<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-1-37d310de-88a4-4bbc-8238-b0fe146b908d<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>100 mm[Hg]<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 100,
          "units": "mm[Hg]"
        },
        "comments": "Diastolic Blood Pressure, Overall:130\/100",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Systolic Blood Pressure<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>120 mm[Hg]<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 120,
          "units": "mm[Hg]"
        },
        "comments": "Systolic Blood Pressure, Overall:120\/90",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-1-af994e06-f0bf-496d-a1cf-b2847de30e3c",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-af994e06-f0bf-496d-a1cf-b2847de30e3c",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-af994e06-f0bf-496d-a1cf-b2847de30e3c"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Diastolic Blood Pressure<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-1-af994e06-f0bf-496d-a1cf-b2847de30e3c<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>90 mm[Hg]<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 90,
          "units": "mm[Hg]"
        },
        "comments": "Diastolic Blood Pressure, Overall:120\/90",
        "issued": "2014-12-27T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-5538f767-9517-4be4-9fb7-6b04373805e2",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-5538f767-9517-4be4-9fb7-6b04373805e2",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-5538f767-9517-4be4-9fb7-6b04373805e2"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Glucose in Plasma<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-5538f767-9517-4be4-9fb7-6b04373805e2<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>22.222222222222221 mg\/dL<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 22.222222222222,
          "units": "mg\/dL"
        },
        "comments": "Glucose in Plasma",
        "issued": "2014-12-24T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-3627cf60-00b8-46b0-966a-e34714834bdd",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-3627cf60-00b8-46b0-966a-e34714834bdd",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-3627cf60-00b8-46b0-966a-e34714834bdd"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Glucose in Whole blood<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-3627cf60-00b8-46b0-966a-e34714834bdd<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>2.7778 mmol\/L<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 2.7778,
          "units": "mmol\/L"
        },
        "comments": "Glucose in Whole blood",
        "issued": "2014-12-24T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-9023142c-e895-4293-a064-9b948f2a196e",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-9023142c-e895-4293-a064-9b948f2a196e",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-9023142c-e895-4293-a064-9b948f2a196e"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Cholesterol<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-9023142c-e895-4293-a064-9b948f2a196e<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>2.4049800153918719 mmol\/L<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 2.4049800153919,
          "units": "mmol\/L"
        },
        "comments": "Cholesterol",
        "issued": "2014-12-24T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-52d5a78a-ad16-4b5a-8909-b6f3d0db8539",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-52d5a78a-ad16-4b5a-8909-b6f3d0db8539",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-52d5a78a-ad16-4b5a-8909-b6f3d0db8539"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Cholesterol<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-52d5a78a-ad16-4b5a-8909-b6f3d0db8539<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>4.241040027142656 mmol\/L<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 4.2410400271427,
          "units": "mmol\/L"
        },
        "comments": "Cholesterol",
        "issued": "2014-12-24T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-8a4d1491-d3c7-4bb4-a2c6-d26688e7a010",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-8a4d1491-d3c7-4bb4-a2c6-d26688e7a010",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-8a4d1491-d3c7-4bb4-a2c6-d26688e7a010"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Cholesterol<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-8a4d1491-d3c7-4bb4-a2c6-d26688e7a010<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>2.6118600167159038 mmol\/L<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 2.6118600167159,
          "units": "mmol\/L"
        },
        "comments": "Cholesterol",
        "issued": "2014-12-24T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-0-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-0-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">PT (Prothrombin Time)<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>12 seconds<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 12,
          "units": "seconds"
        },
        "comments": "PT (Prothrombin Time) from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-1-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-1-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">INR (International Normalized Ratio)<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-1-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>1 N\/A<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 1,
          "units": "N\/A"
        },
        "comments": "INR (International Normalized Ratio) from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-2-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-2-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-2-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Creatinine Test<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-2-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>1.8 mg\/dl<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 1.8,
          "units": "mg\/dl"
        },
        "comments": "Creatinine Test from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-3-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-3-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-3-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Blood Urea Nitrogen<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-3-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>19 mg\/dl<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 19,
          "units": "mg\/dl"
        },
        "comments": "Blood Urea Nitrogen from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-4-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-4-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-4-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Hemoglobin A1C (HbA1C)<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-4-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>7.5 %<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 7.5,
          "units": "%"
        },
        "comments": "Hemoglobin A1C (HbA1C) from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    },
    {
      "title": "Observation 1-5-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-5-01a08d29-9f2b-4610-9287-504e6d89cc9a",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Observation\/1-5-01a08d29-9f2b-4610-9287-504e6d89cc9a"
        }
      ],
      "published": "2015-01-08T11:19:46-05:00",
      "content": {
        "resourceType": "Observation",
        "text": {
          "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Glomerular Filtration Rate (GFR)<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-5-01a08d29-9f2b-4610-9287-504e6d89cc9a<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>25 mL\/min<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
        },
        "name": {
          "coding": [
            {
              "system": "http:\/\/loinc.org",
              "code": "0000"
            }
          ]
        },
        "valueQuantity": {
          "value": 25,
          "units": "mL\/min"
        },
        "comments": "Glomerular Filtration Rate (GFR) from: Test Set 1",
        "issued": "2014-11-17T00:00:00.000-05:00",
        "status": "final",
        "reliability": "ok"
      }
    }
  ]
}"""

GET_OBSERVATION = r"""{
  "resourceType": "Observation",
  "text": {
    "div": "<Observation xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Systolic Blood Pressure<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-af994e06-f0bf-496d-a1cf-b2847de30e3c<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Value<\/td>\n\t\t\t<td>120 mm[Hg]<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Observation>"
  },
  "name": {
    "coding": [
      {
        "system": "http:\/\/loinc.org",
        "code": "0000"
      }
    ]
  },
  "valueQuantity": {
    "value": 120,
    "units": "mm[Hg]"
  },
  "comments": "Systolic Blood Pressure, Overall:120\/90",
  "issued": "2014-12-27T00:00:00.000-05:00",
  "status": "final",
  "reliability": "ok"
}"""

GET_CONDITIONS = r"""{
  "resourceType": "Bundle",
  "id": "be25277c-e2ad-487e-a924-262246e3a194",
  "published": "2015-01-08T11:26:26.953-05:00",
  "link": [
    {
      "rel": "self",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Condition?subject=1&_format=json"
    },
    {
      "rel": "fhir-base",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir"
    }
  ],
  "totalResults": "1",
  "author": [
    {
      "name": "HAPI FHIR Server"
    }
  ],
  "entry": [
    {
      "title": "Condition 1-0-64f9481e-2eb8-4781-805c-b28b793b1412",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/Condition\/1-0-64f9481e-2eb8-4781-805c-b28b793b1412",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/Condition\/1-0-64f9481e-2eb8-4781-805c-b28b793b1412"
        }
      ],
      "published": "2015-01-08T11:26:26-05:00",
      "content": {
        "resourceType": "Condition",
        "text": {
          "div": "<Condition xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Proximal DVT<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-64f9481e-2eb8-4781-805c-b28b793b1412<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Status<\/td>\n\t\t\t<td>confirmed<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Condition>"
        },
        "subject": {
          "reference": "Patient\/1"
        },
        "dateAsserted": "2014-11-26T00:00:00",
        "code": {
          "text": "Proximal DVT"
        },
        "status": "confirmed"
      }
    }
  ]
}"""

GET_CONDITION = r"""{
  "resourceType": "Condition",
  "text": {
    "div": "<Condition xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Proximal DVT<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-64f9481e-2eb8-4781-805c-b28b793b1412<\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<td>Status<\/td>\n\t\t\t<td>confirmed<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/Condition>"
  },
  "subject": {
    "reference": "Patient\/1"
  },
  "dateAsserted": "2014-11-26T00:00:00",
  "code": {
    "text": "Proximal DVT"
  },
  "status": "confirmed"
}"""

GET_PRESCRIPTIONS = r"""{
  "resourceType": "Bundle",
  "id": "3972c050-55f0-48df-9d0c-11c1e49604d3",
  "published": "2015-01-08T11:31:47.831-05:00",
  "link": [
    {
      "rel": "self",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/MedicationPrescription?subject:Patient=1&_format=json"
    },
    {
      "rel": "fhir-base",
      "href": "http:\/\/localhost:8080\/HealthPort\/fhir"
    }
  ],
  "totalResults": "2",
  "author": [
    {
      "name": "HAPI FHIR Server"
    }
  ],
  "entry": [
    {
      "title": "MedicationPrescription 1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/MedicationPrescription\/1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/MedicationPrescription\/1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e"
        }
      ],
      "published": "2015-01-08T11:31:47-05:00",
      "content": {
        "resourceType": "MedicationPrescription",
        "text": {
          "div": "<MedicationPrescription xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Medication 2<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/MedicationPrescription>"
        },
        "dateWritten": "2014-12-29T00:00:00-05:00",
        "patient": {
          "reference": "Patient\/1"
        },
        "medication": {
          "display": "Medication 2"
        }
      }
    },
    {
      "title": "MedicationPrescription 1-0-da9fb233-11aa-4151-bfab-e1c5f47e129b",
      "id": "http:\/\/localhost:8080\/HealthPort\/fhir\/MedicationPrescription\/1-0-da9fb233-11aa-4151-bfab-e1c5f47e129b",
      "link": [
        {
          "rel": "self",
          "href": "http:\/\/localhost:8080\/HealthPort\/fhir\/MedicationPrescription\/1-0-da9fb233-11aa-4151-bfab-e1c5f47e129b"
        }
      ],
      "published": "2015-01-08T11:31:47-05:00",
      "content": {
        "resourceType": "MedicationPrescription",
        "text": {
          "div": "<MedicationPrescription xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Medication 1<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-da9fb233-11aa-4151-bfab-e1c5f47e129b<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/MedicationPrescription>"
        },
        "dateWritten": "2014-12-29T00:00:00-05:00",
        "patient": {
          "reference": "Patient\/1"
        },
        "medication": {
          "display": "Medication 1"
        }
      }
    }
  ]
}
"""

GET_PRESCRIPTION = r"""{
  "resourceType": "MedicationPrescription",
  "text": {
    "div": "<MedicationPrescription xmlns=\"http:\/\/hl7.org\/fhir>\">\n<text>\n<status value=\"generated\"\/>\n<div>\n<div class=\"hapiHeaderText\">Medication 2<\/div>\n<table class=\"hapiPropertyTable\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>Id<\/td>\n\t\t\t<td>1-0-ce3df28f-ed3f-4028-b099-f4b5c1fbeb1e<\/td>\n\t\t<\/tr>\n\t<\/tbody>\n<\/table>\n<\/div>\n<\/text>\n<\/MedicationPrescription>"
  },
  "dateWritten": "2014-12-29T00:00:00-05:00",
  "patient": {
    "reference": "Patient\/1"
  },
  "medication": {
    "display": "Medication 2"
  }
}"""

def getpatients():
    return json.loads(GET_PATIENTS)
    
def getpatient(patientid):
    return json.loads(GET_PATIENT)
    
def getobservations(patientid):
    return json.loads(GET_OBSERVATIONS)

def getobservation(observationid):
    return json.loads(GET_OBSERVATION)
    
def getconditions(patientid):
    return json.loads(GET_CONDITIONS)

def getcondition(conditionid):
    return json.loads(GET_CONDITION)
    
def getprescriptions(patientid):
    return json.loads(GET_PRESCRIPTIONS)

def getprescription(prescriptionid):
    return json.loads(GET_PRESCRIPTION)