import time
from flask import Flask
from flask import request
import json
import pymongo
from main import start_scrape_job_ids,start_scrape_urls
import requests



app = Flask(__name__)

@app.route('/jobs', methods = ['POST'])
def get_current_jobs():
    keywords = request.json["keywords"]
    #keywords =  request.form.get('keywords')
    job_ids = start_scrape_job_ids(keywords=keywords, classification="6281")
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
    

    return json.loads(requests.get("https://www.seek.com.au/api/chalice-search/v4/search?seekSelectAllPages=true&keywords="+ keywords + "&classification=6281&page=1").text)



app.run(debug=True)