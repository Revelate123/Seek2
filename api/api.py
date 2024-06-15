import time
from flask import Flask
from flask import request
import json
import pymongo
import requests
import re
import aiohttp
import asyncio
from bs4 import BeautifulSoup
import time
import sqlite3
import json
import pymongo
import requests
from flask import Flask
import re
import logging

def create_app():
    MONGO = "localhost"


    app = Flask(__name__)

    @app.route('/job_ids', methods = ['POST'])
    def get_job_ids():
        keywords = request.json["keywords"]
        if keywords:
            keywords = "&keywords=" + keywords
        else:
            keywords = ""
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
        job_ids = start_scrape_job_ids("https://www.seek.com.au/api/chalice-search/v4/search?seekSelectAllPages=true" + keywords + location + classification+"&page=")
        return job_ids






    @app.route('/job_page', methods = ['POST'])
    def get_job_page():
        keywords = request.json["keywords"]
        if keywords:
            keywords = "&keywords=" + keywords
        else:
            keywords = ""
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
        #answers = {}
        #answers["data"] = [{"title":"google","advertiser":{"description":"howdy"},"location":"home","salary":"100","teaser":"nothing"}]
        #return "test if this worked"
        #return {"title":"google","advertiser":{"description":"howdy"},"location":"home","salary":"100","teaser":"nothing"}
        return json.loads(requests.get("https://www.seek.com.au/api/chalice-search/v4/search?seekSelectAllPages=true" + keywords + location + classification+"&page=1").text)

    @app.route('/select_insight_jobs', methods = ["POST"])
    def select_insight_jobs():
        request.json['job_ids']
        client = pymongo.MongoClient("mongodb://"+ MONGO +":27017/")
        db = client["mydatabase"]
        collection = db["jobsummary"]





    @app.route('/job_insights', methods = ['POST'])
    def get_current_jobs():
        job_ids = request.json['job_ids']
        parameters = request.json['parameters']
        client = pymongo.MongoClient("mongodb://"+ MONGO +":27017/")
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
        #for i in ["python","java",r"\bNet\b","junior", "grad", "entry", r"C\+\+", "C#","javascript",r"\bC\b", "AWS"]:
        for i in parameters:
            pattern = re.compile(i,re.IGNORECASE)
            query = {"$and":[{"jobAdDetails":{"$regex":pattern}},{"_id": {"$in": job_ids}}]}
            temp = collection.find(query)
            temp_job_ids = []
            for x in temp:
                temp_job_ids += [x]
        
            answers[i] = [collection.count_documents(query),temp_job_ids]
        answers["total"] = len(job_ids)
        return answers


    @app.route('/detailed_job', methods = ['POST'])
    def get_detailed_job():
        job_id = request.json['job_id']
        client = pymongo.MongoClient("mongodb://"+ MONGO +":27017/")
        db = client["mydatabase"]
        collection = db["jobsummary"]
        
        query = collection.find_one({"_id":job_id})
        if not query:
            start_scrape_urls([job_id])
        query = collection.find_one({"_id":job_id})


        return {"data":query}



    async def fetch(session, url):
        async with session.get(url) as response:
            app.logger.info("Response Status:" + str(response.status))
            return await response.text()


    def parse_urls(html,job_ids):
        soup = BeautifulSoup(html, 'html.parser')
        jobAdDetails = soup.select_one('[data-automation="jobAdDetails"]')
        jobPage = ''
        temp = ''
        for element in jobAdDetails.descendants:            
            if not hasattr(element, "children"):
             
                if "<li>" in element.parent.prettify():
                    temp += element.parent.prettify()
                else:
                    if temp:
                        jobPage += "<ul>" + temp + "</ul>"
                    temp = ''
                    jobPage += element.parent.prettify()

        jobAdDetails = jobAdDetails.text

        client = pymongo.MongoClient("mongodb://"+ MONGO +":27017/")
        db = client["mydatabase"]
        collection = db["jobsummary"]
        query = {"_id": job_ids}
        newValues = {"$set":{"jobAdDetails":jobAdDetails}}
        try:
            collection.update_one(query, newValues)
        except:
            app.logger.warning("Failed to find jobAdDetails for:" + str(job_ids))
        newValues = {"$set":{"jobPage":jobPage}}
        try:
            collection.update_one(query, newValues)
        except:
            app.logger.warning("Failed to find jobPage for:" + str(job_ids))


    


    async def fetch_and_parse_urls(session, url,job_ids):
        html = await fetch(session,url)
        paras = parse_urls(html,job_ids)
        return paras


    async def scrape_urls(urls,job_ids):
        async with aiohttp.ClientSession() as session:
            return await asyncio.gather(*(fetch_and_parse_urls(session, urls[i], job_ids[i]) for i in range(len(urls))))
        



    def parse_ids(html):
        #save the json directly into database, can be parsed later.
        myDict = json.loads(html)
        for i in range(len(myDict["data"])):
            myDict['data'][i]['_id'] = myDict['data'][i]["id"]
        client = pymongo.MongoClient("mongodb://"+ MONGO +":27017/")
        db = client["mydatabase"]
        collection = db["jobsummary"]
        try:
            x = collection.insert_many(myDict["data"], ordered=False)
        except:
            pass
        return [myDict['data'][i]['id'] for i in range(len(myDict['data']))]


    def start_scrape_urls(job_ids):
        for i in range(0, len(job_ids),5):
            asyncio.run(scrape_urls(urls= ["https://www.seek.com.au/job/" + str(i) for i in job_ids[i:i+5]], job_ids=job_ids[i:i+5]))
            time.sleep(5)




    async def fetch_and_parse_ids(session, url):
        html = await fetch(session,url)
        paras = parse_ids(html)
        return paras


    async def scrape_job_ids(urls):
        async with aiohttp.ClientSession() as session:
            temp = await asyncio.gather(*(fetch_and_parse_ids(session, url) for url in urls))
            output = []
            for i in temp:
                for j in i:
                    output.append(j)
            return output
            

    def start_scrape_job_ids(url):
        job_ids = []
        for j in range(0,10,10):
            #TODO: if scrape_job_ids is returning empty then stop searching
            job_ids.append(asyncio.run(scrape_job_ids(urls = [url+str(i+j) for i in range(1)])))
            time.sleep(5)
        return job_ids[0]


    app.run(debug=True)
    return app

your_app = create_app()