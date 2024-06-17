
import React, { useState, useEffect } from 'react';
import './output.css';
import Icon from './options.js';
import Box from '@mui/material/Box';
import Logo from './components/seek_logo.png';
import SimpleListMenu from './components/simpleDropDown.js';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';


function SearchBanner({setJobs, setInsights, parameters}) {
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
            var insightList = Array();

            fetch('/flask/job_page',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keywords: e.target.keywords.value,
                    classification: options[selectedIndex],
                    location: e.target.location.value,
                })
            }).then(res => res.json()).then(data => {
                console.log(setJobs(data.data))

            });  
            setInsights("Loading")
            fetch('/flask/job_ids',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keywords: e.target.keywords.value,
                    classification: options[selectedIndex],
                    location: e.target.location.value,
                })
            }).then(res => res.json()).then(data => {
                job_ids = data;
            }).then(() =>

                      

            fetch('/flask/job_insights',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_ids: job_ids,
                    parameters: parameters
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
                    
                <div class="ml-10 md:ml-0 mr-10 md:mr-0 md:absolute md:top-0 md:left-1/2 md:transform md:-translate-x-1/2">
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
                            <input class="rounded-lg p-3 hover:ring-2 ring-blue-500 focus:ring-8 focus:ring-[#7facf5] outline-none" type= "text" name= "location" placeholder="Enter suburb, city, or region"></input>
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

function DetailedJobCard({detailedJob}) {
    const handleJobClick = (index) => {
            window.open("https://www.seek.com.au/job/"+detailedJob.data.id,'_blank')
      };
    
    if (detailedJob) {
        var Logo = null;
        if (detailedJob.data.branding) {
            Logo =  <img src={detailedJob.data.branding.assets.logo.strategies.jdpLogo} width="140px" class="p-4"/>
        } 

        const htmlFrom = (htmlString) => {
            const cleanHtmlString = DOMPurify.sanitize(htmlString,
              { USE_PROFILES: { html: true } });
            const html = parse(cleanHtmlString);
            return html;
    }

        return (
            <div class="w-full ml-5 mr-5">
                <div class="hidden md:block h-screen overflow-auto sticky top-0 right-0 flex flex-col p-4 w-full rounded-lg bg-white ring-2 ring-grey">
                <div class="ml-5 flex flex-col space-y-5">
                    <div class="relative">
                        <div class="hidden md:block underline  rounded-lg absolute right-0 hover:cursor-pointer" onClick={handleJobClick}>Visit Job Page&#128279;</div>
                    </div>
                    
                <div>
                    <div>{Logo}</div>
                    <div class="font-bold">{detailedJob.data.title}</div>
                    <div>{detailedJob.data.advertiser.description}</div>
                </div>
                
                <div>
                    <div>{detailedJob.data.location}</div>
                    <div>{detailedJob.data.salary}</div>
                    
                </div>
                
                <div>{detailedJob.data.teaser}</div>
            </div>
                <div>{htmlFrom(detailedJob.data.jobPage)}</div>
                
    
            </div>

            </div>
            
        );
    } else {
        return (
            <div class="flex flex-col h-1/2 p-4 w-full rounded-lg bg-white">
                    
    
            </div>
        );
    }

}



function JobCard({job, setDetailedJob}) {

    


    const handleJobClick = (index) => {
        var x = window.matchMedia("(max-width: 1024px)")
        if (x.matches) {
            /*link to seek website*/
            window.open("https://www.seek.com.au/job/"+job.id,'_blank')
        } else {
            fetch('/detailed_job',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_id: job.id
                })
            }).then(res => res.json()).then(data => {
                setDetailedJob(data)
            }); 
        }
      };
    var Logo = null
    if (job.branding) {
        Logo =  <img src={job.branding.assets.logo.strategies.jdpLogo} width="140px" class="p-4"/>
        
    };
    if (job.bulletPoints){
        var bulletItems = job.bulletPoints.map((bullet) =>
            <li>{bullet}</li>
        );
    } else {
        var bulletItems = [null]
    };
    return (
        <div class="flex flex-col h-1/2 p-4 rounded-lg bg-white ring-2 ring-grey hover:ring-2 hover:ring-seekblue focus:ring-8 focus:ring-[#7facf5] hover:cursor-pointer" onClick={handleJobClick}>
            <div class="ml-5 flex flex-col space-y-5">
                <div>
                    <div>{Logo}</div>
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




function JobCards({myjobs, setDetailedJob}) {
    var listItems = null
    if (myjobs) {
        listItems = myjobs.map((job) => 
            <JobCard job={job} setDetailedJob={setDetailedJob}/>
        );
    };

    if (listItems) return (
        <div class="relative w-full z-0 p-4 md:p-0 md:w-2/3">
        <ul class= " flex flex-col space-y-4">
            {listItems}

            </ul>
      </div>
       
    );
}

function ProgressBar({progress}) {
    progress = progress*100
    progress = progress + "%"
    return (
        <div class ="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
            <div style = {{backgroundColor: "#e60278", width: progress, height: "16px", borderRadius: "9999px"}} ></div>
        </div>
    );
}


function Comments({newCommentId, text, setText}) {
    
    const handleChange = (value) => {
            // 1. Make a shallow copy of the items
        let items = [...text];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[newCommentId.id]};
        // 3. Replace the property you're intested in
        item = value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, 
        //    but that's why we made a copy first
        items[newCommentId.id] = item;
        // 5. Set the state to our new copy
        setText(items);
    };
    
    return (
        <li><input class="text-xl w-full border-b-2 mb-2 border-pink" id={newCommentId} value={text[newCommentId.id]} onInput={(e) => handleChange(e.target.value)}></input></li>
    )
}


function InsightCard({insights, setJobs,parameters, setParameters, text, setText}) {
    var listItems = Array();
    
    

    const handleAddParam = () => {
        const newCommentId = parameters.length === 0 ? 0 : parameters.at(-1).id + 1;
        setParameters((prev) => [...prev, {id:newCommentId}])
    };

    const handleRemoveParam = () => {
        setParameters(parameters.slice(0,-1));
    };
    useEffect(() => {
        console.log(parameters)
    }, [parameters]);

    if (insights === "Loading") { return(
        <div class = "grid place-content-center w-full md:w-1/2 md:sticky top-0  md:h-48">
        <div class=" h-32 w-32 animate-spin rounded-full border-4 border-solid border-pink border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        
        </div>
        <div class="mt-5">Gathering Insights</div>
        <div class="mt-2">This might take several minutes</div>
    </div>

    )
        
    } else { 
        var insight_header = "Add insights to search for!"  
        if (insights) {
            insight_header = "We found the following insights!"
        }
        var test_list = Array();
        test_list = parameters?.map((parameter) => {
            if (insights && insights[text[parameter.id]]) { return(
                <div>
                    <div class = "flex">
                        <div class = "w-3/5">
                            <Comments newCommentId={parameter} text={text} setText={setText}/>
                        </div>
                    
                    <div class= "hover:cursor-pointer"onClick={() => console.log(setJobs(insights[text[parameter.id]][1]))}>View Jobs!</div>
                    </div>
                
                
                    <ProgressBar progress={insights[text[parameter.id]][0]/insights['total']} />
                    <p class="italic text-center"> {insights[text[parameter.id]][0]}/{insights['total']}</p>
            </div>
            )
                
            } else { return (
                <Comments newCommentId={parameter} text={text} setText={setText}/>
            )}
        });
        return (
            <div class = "relative w-full md:h-screen md:w-1/2 md:sticky top-0">
                <ul class="p-5 ml-5 mr-5  md:overflow-auto ">
                    <li class="text-2xl mb-5">{insight_header}</li>
                    {test_list}
                    </ul>
                    <div class="p-5 ml-5 ">
                    <div class ="rounded-full h-14 w-14 border-solid border-2 grid place-content-center hover:cursor-pointer" onClick={handleAddParam}>
                        <div>+</div>
                    </div>
                    </div>
                    <div class="p-5 ml-5 ">
                    <div class ="rounded-full h-14 w-14 border-solid border-2 grid place-content-center hover:cursor-pointer" onClick={handleRemoveParam}>
                        <div>-</div>
                    </div>
                    </div>
                    
            </div>
            
          
        )

        
    };
}
   

export default function JobSearch() {
    const [myjobs, setJobs] = useState(null);
    const [insights, setInsights] = useState(null);
    const [detailedJob, setDetailedJob] = useState(null);
    const [parameters, setParameters] = useState(Array());
    const [text, setText] = useState(Array());
    return (
        <div class="z-0">
        
            <Box height={20}></Box>
        
            <SearchBanner setJobs={setJobs} setInsights={setInsights} parameters={text}/>
          
            
            <Box height={20}></Box>
            <div class = "flex flex-col md:flex md:flex-row">
            <InsightCard insights={insights} setJobs={setJobs} parameters={parameters} setParameters={setParameters} text={text} setText={setText}/>
            <JobCards myjobs={myjobs} setDetailedJob={setDetailedJob}/>
            <DetailedJobCard detailedJob={detailedJob}/>
            </div>
            
        
       </div>
    );
}