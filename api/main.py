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

async def fetch(session, url):
    async with session.get(url) as response:
        print("Response Status:",response.status)
        return await response.text()


def parse_urls(html,job_ids):
    soup = BeautifulSoup(html, 'html.parser')
    jobAdDetails = soup.select_one('[data-automation="jobAdDetails"]').text

    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["mydatabase"]
    collection = db["jobsummary"]
    query = {"_id": job_ids}
    newValues = {"$set":{"jobAdDetails":jobAdDetails}}
    try:
        collection.update_one(query, newValues)
    except:
        print(job_ids)

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
    client = pymongo.MongoClient("mongodb://localhost:27017/")
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
        

def start_scrape_job_ids(keywords, classification):
    job_ids = []
    for j in range(0,10,10):
        #TODO: if scrape_job_ids is returning empty then stop searching
        job_ids.append(asyncio.run(scrape_job_ids(urls = ["https://www.seek.com.au/api/chalice-search/v4/search?seekSelectAllPages=true&keywords="+ keywords + "&classification=6281&page="+str(i+j) for i in range(0,10)])))
        time.sleep(5)
    return job_ids[0]

