
import React, { useState, useEffect } from 'react';
import './output.css';
import Icon from './options.js';
import Box from '@mui/material/Box';
import Logo from './components/seek_logo.png';
import SimpleListMenu from './components/simpleDropDown.js';

function SearchBanner({setJobs, setInsights}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const options = [
        "Any Classification",
        "Acounting", 
        "Administration & Office",
        "Advertising, Arts & Media", 
        "Banking & Financial Services", 
        "Call Centre & Customer Service",
        "CEO & General Management", 
        "Community Services & Development", 
        "Construction", 
        "Consulting & Strategy", 
        "Design & Architecture",
        "Education & Training", 
        "Engineering", 
        "Farming, Animals & Construction", 
        "Government & Defence", 
        "Healthcare & Medical",
        "Hospitality & Tourism", 
        "Human Resources & Recruitment", 
        "Information & Communication Technology", 
        "Insurance & Superannuation",
        "Legal", 
        "Manufacturing, Transport & Logistics", 
        "Marketing & Communications", 
        "Mining, Resources & Energy",
        "Real Estate & Property", 
        "Retail & Consumer Products", 
        "Sales", 
        "Science & Technology", 
        "Self Employment",
        "Sport & Recreation", 
        "Trades & Services",
    ];
    function handleSubmit(e) {
            var job_ids;
            e.preventDefault();

            fetch('/job_page',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keywords: e.target.keywords.value,
                    classification: options[selectedIndex]
                })
            }).then(res => res.json()).then(data => {
                setJobs(data.data)
            });  


            fetch('/job_ids',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keywords: e.target.keywords.value,
                    classification: options[selectedIndex]
                })
            }).then(res => res.json()).then(data => {
                job_ids = data;
            }).then(() =>

                      

            fetch('/job_insights',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_ids: job_ids
                })
            }).then(res => res.json()).then(data => {
                setInsights(data)
            })     
        ); 

    };

    return (
        <div class="relative bg-[#051a49] h-96 md:h-[11.03rem] z-10">
               <div class="hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" height="177" width='100%'><path fill="#072462" d="M789.091 158.677c0-32.811-26.077-59.41-58.245-59.41-.389 0-.778.005-1.164.012v59.399l59.409-.001ZM396.989 77.732c32.811 0 59.408-26.077 59.408-58.244 0-.39-.003-.778-.011-1.165h-59.397v59.409Z"/><path fill="#E60278" d="M670.27 176.5c0-64.802-52.531-117.333-117.333-117.333-64.802 0-117.333 52.531-117.333 117.333l.001.259v-.259h78.222c.001-21.599 17.511-39.11 39.111-39.11 21.599 0 39.111 17.511 39.111 39.11h78.221Z"/><path fill="#072462" d="M188.314 77.729c.001 44.703 36.241 80.944 80.945 80.944 44.706 0 80.945-36.241 80.945-80.946v-.186.188h-53.963c0 14.901-12.08 26.982-26.981 26.982-14.902 0-26.982-12.08-26.982-26.981l-53.964-.001Zm81.422-80.946a82.44 82.44 0 0 0-.953 0h.953Z"/><path fill="#E60278" d="M2297.44 99.272h53.96c0-14.902 12.08-26.983 26.99-26.983 14.9 0 26.98 12.08 26.98 26.982h53.96v.164-.163c0-44.705-36.24-80.945-80.94-80.945-44.71 0-80.95 36.24-80.95 80.945Zm80.95 80.945h-.47.94-.47Z"/><path fill="#072462" d="M1858.55 18.323c0 32.81 26.08 59.409 58.25 59.409.39 0 .78-.004 1.16-.011V18.322h-59.41Z"/><path fill="#072462" fill-rule="evenodd" d="M1947.67 158.677c16.4 0 29.7-13.299 29.7-29.705 0-16.405-13.3-29.704-29.7-29.704-16.41 0-29.71 13.299-29.71 29.704 0 16.406 13.3 29.705 29.71 29.705Zm0-19.805c5.46 0 9.91-4.433 9.91-9.901 0-5.469-4.45-9.902-9.91-9.902-5.47 0-9.9 4.433-9.9 9.902 0 5.468 4.43 9.901 9.9 9.901Z" clip-rule="evenodd"/><path fill="#072462" d="M1977.37.5c0 64.801 52.54 117.333 117.33 117.333 64.81 0 117.34-52.531 117.34-117.333h-234.67Z"/><circle cx="699.854" cy="48.477" r="29.703" fill="#E60278"/><path fill="#E60278" fill-rule="evenodd" d="M2250.73 98.598v59.407h-59.41c0-32.81 26.6-59.407 59.41-59.407Z" clip-rule="evenodd"/></svg>
               </div>
                    
                <div class="ml-4 md:absolute md:top-0 md:left-1/2 md:transform md:-translate-x-1/2">
                <form  onSubmit={handleSubmit}> 
                    <div class=" md:flex p-2">
                        <div class="flex flex-col space-y-2 md:grid md:grid-cols-2 md:space-x-2 md:w-[28rem]">
                            <p class="col-span-2 md:p-3 text-white">What</p>
                            <input class="rounded-lg p-3 bg-white hover:ring-2 ring-blue-500 focus:ring-8 focus:ring-[#7facf5] outline-none" type="text" name = "keywords" placeholder="Enter Keywords"></input>
                            <SimpleListMenu selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} options={options}/>
                        </div>
                        <div class="p-4 md:p-0"></div>
                        <div class="flex flex-col space-y-2 md:grid md:grid-cols-1 md:space-x-2">
                            <p class="col-span-2 md:p-3 text-white">Where</p>
                            <input class="rounded-lg p-3 hover:ring-2 ring-blue-500 focus:ring-8 focus:ring-[#7facf5] outline-none" type= "text" placeholder="Enter suburb, city, or region"></input>
                            </div>
                        <div class="p-4 md:p-0"></div>
                        <div class="md:ml-2 flex flex-col-reverse shrink">
                            <input class="md:w-20 p-3 bg-pink hover:bg-pinklight rounded-lg text-white hover:cursor-pointer" type="submit" value="SEEK"/>
                        </div>     
                    </div>
                    </form>
                    
                    <div class="flex justify-end">
                    <button class="flex text-white p-2 bg-inherit hover:bg-[#26365e] rounded-lg">More options
                        <div class="p-1">
                        <Icon/>
                        </div>
                        
                    </button>
                    </div>
                    </div>
                
            </div>
    );
}



function JobCard({job}) {
    if (job.branding) {
        Logo = job.branding.assets.logo.strategies.jdpLogo
    } else {
        Logo = ""
    };
    if (job.bulletPoints){
        var bulletItems = job.bulletPoints.map((bullet) =>
            <li>{bullet}</li>
        );
    } else {
        var bulletItems = [null]
    };
    return (
        <div class="flex flex-col h-1/2 p-4 rounded-lg bg-white ring-2 ring-grey hover:ring-2 hover:ring-seekblue focus:ring-8 focus:ring-[#7facf5] hover:cursor-pointer">
            <div class="ml-5 flex flex-col space-y-5">
                <div>
                    <img src={Logo} width="140px" class="p-4"/>
                    <div class="font-bold">{job.title}</div>
                    <div>{job.advertiser.description}</div>
                </div>
                
                <div>
                    <div>{job.location}</div>
                    <div>{job.salary}</div>
                    
                </div>
                
                <ul class='list-disc'>{bulletItems}</ul>
                <div>{job.teaser}</div>
            </div>
            </div>
    );
}






function JobCards({myjobs}) {
    var listItems = null
    if (myjobs) {
        listItems = myjobs.map((job) => 
            <JobCard job={job}/>
        );
    };

    if (listItems) return (
        <div class="relative w-full z-0">
        <ul class= "absolute right-0 flex flex-col space-y-4 w-1/2">
            {listItems}

            </ul>
      </div>
       
    );
}


function InsightCard({insights}) {
    var listItems = null

    if (insights){
        Object.keys(insights).forEach(function(key, index) {
            if (listItems){
                listItems.push(<li>{key}:{insights[key]}</li>)
            } else {
                listItems = [<li>{key}:{insights[key]}</li>]
            }
            
        });
        
    }
    if (insights) {return (
        <div class = "relative w-full -z-10">
            <ul class="p-5">{listItems}</ul>
        </div>
        
      
    )} else {
        return (
            <div class = "relative w-full"></div>
        )
    };
}
   

export default function JobSearch() {
    const [myjobs, setJobs] = useState(null);
    const [insights, setInsights] = useState(null);

    return (
        <div class="z-0">
        
            <Box height={20}></Box>
        
            <SearchBanner setJobs={setJobs} setInsights={setInsights}/>
          
            
            <Box height={20}></Box>
            <div class = "flex">
            <JobCards myjobs={myjobs}/>
            <InsightCard insights={insights}/>
            </div>
            
        
       </div>
    );
}