import time
from flask import Flask
from flask import request
import json
import pymongo
from main import start_scrape_job_ids,start_scrape_urls
import requests
import re



app = Flask(__name__)


@app.route('/job_ids', methods = ['POST'])
def get_job_ids():
    keywords = request.json["keywords"]
    #keywords =  request.form.get('keywords')
    job_ids = start_scrape_job_ids(keywords=keywords, classification="6281")
    return job_ids





@app.route('/job_page', methods = ['POST'])
def get_job_page():
    keywords = request.json["keywords"]
    categories = {"Acounting":1200, "Administration & Office":6251, "Advertising, Arts & Media": 6304, "Banking & Financial Services": 1203, "Call Centre & Customer Service": 1204, \
                  "CEO & General Management": 7019, "Community Services & Development": 6163, "Construction":1206, "Consulting & Strategy":6076, "Design & Architecture":6263,\
                    "Education & Training":6123, "Engineering":1209, "Farming, Animals & Construction":6205, "Government & Defence": 1210, "Healthcare & Medical": 1211,\
                        "Hospitality & Tourism":1212, "Human Resources & Recruitment":6317, "Information & Communication Technology": 6281, "Insurance & Superannuation":1214,\
                            "Legal":1216, "Manufacturing, Transport & Logistics": 6092, "Marketing & Communications": 6008, "Mining, Resources & Energy": 6058, \
                                "Real Estate & Property": 1220, "Retail & Consumer Products":6043, "Sales":6362, "Science & Technology":1223, "Self Employment": 6261,\
                                    "Sport & Recreation":6246, "Trades & Services":1225}
    classification = request.json["classification"]
    if classification != "Any Classification":
        classification = "&classification=" + str(categories[classification])
    else:
        classification = ""
    location = request.json["location"]
    if location:
        location = "&where=" + str(request.json["location"]).replace(" ","+")
    else:
        location =""
    return json.loads(requests.get("https://www.seek.com.au/api/chalice-search/v4/search?seekSelectAllPages=true&keywords=" + keywords + location + classification+"&page=1").text)




@app.route('/job_insights', methods = ['POST'])
def get_current_jobs():
    job_ids = request.json['job_ids']
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["mydatabase"]
    collection = db["jobsummary"]

    
    info_required = []
    for i in job_ids:
        query = collection.find_one({"$and":[{"_id":i},{"jobAdDetails":{"$ne": None}}]})
        if not query:
            info_required += [i]

    if info_required:
        start_scrape_urls(info_required)

    #TODO: query db and return as json the fields required.
    answers = {}
    for i in ["python","java",r"\bNet\b","junior", "grad", "entry", r"C\+\+", "C#","javascript",r"\bC\b", "AWS"]:
        pattern = re.compile(i,re.IGNORECASE)
        query = {"$and":[{"jobAdDetails":{"$regex":pattern}},{"_id": {"$in": job_ids}}]}
        answers[i] = collection.count_documents(query)
    answers["total"] = len(job_ids)
    return answers


@app.route('/detailed_job', methods = ['POST'])
def get_detailed_job():
    job_id = request.json['job_id']
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["mydatabase"]
    collection = db["jobsummary"]

    #query db for that job

    return job



app.run(debug=True)