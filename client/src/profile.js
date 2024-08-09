import React, { useState, useEffect } from 'react';
import './output.css';
import TreeBase from './TreeBase.jpg';
import TreeTrunk from './TreeTrunk.png';
import TreeLeft from './TreeLeft.png';
import TreeBranch from './TreeBranch-Small.png';
import TreeLeaf from './TreeLeaf.png';

function Timeline_entry({date, text}) {

    return (
        <div class ="mt-32 flex  h-full" >
            <div class ="rounded-full border-slate-400 dark:bg-slate-800 border-4 h-9 w-9 ml-16"></div>
            <div class="ml-20">
                <div>{date}</div>
                <div>{text}</div>
            </div>
        </div>
        
    )
}

function Timeline_year({year}) {
    return (
        <div class ="mt-32 flex sticky top-0">
            <div class ="rounded-full border-slate-400 dark:bg-slate-800 border-4 h-9 w-9 ml-16"></div>
            <div class="ml-20 sticky">
            </div>
        </div>
    )
}


function TreeBranchComponent() {

    return (
        <div class="absolute bottom-0  translate-x-2/4 translate-y-3">
                <div class="group translate-x-1/3">
                <img class = "opacity-0 w-1/4 hover:opacity-100 ml-2 -translate-y-1/2 translate-x-3/4"src={TreeLeaf}></img>
                </div>
                
            </div>
    )
}



export default function Profile() {

    return (

        <div class="relative bg-pink h-full dark:text-slate-400">
            <div class= "text-9xl  text-center">Thomas Duffett</div>
            <div class="dark:text-slate-400 text-center">Software Engineer</div>
            <div class="text-center">My Story</div>
         
            <div class="flex flex-col">
            <div class="relative sticky top-0 text-5xl ml-20 underline bg-slate-800 z-10 grid grid-cols-1 place-content-center">2012</div>
                <div class = "relative">
                <div class="absolute top-0 ml-20 w-1 h-full bg-slate-400"></div>
                <Timeline_entry date="2012" text="Started High School"/>
                <Timeline_entry date="2012" text="Started High School Rowing"/>
                </div>
            <div class="relative sticky top-0 text-5xl ml-20 underline bg-slate-800 z-10">2013</div>
            <div class = "relative">
            <div class="absolute top-0 ml-20 w-1 h-full bg-slate-400"></div>
            <Timeline_entry date="2015" text="Awarded an NZQA Calculus Scholarship & told I was 1 mark off top in the country for maths :("/>
            <Timeline_entry date="2016" text="Selected for Auckland Representative Rowing Team"/>
            </div>

            
            
            
            
            <Timeline_entry date="2016" text="Graduated high school and Awarded Chemistry and Physics scholarships"/>
            <Timeline_entry date="2017" text="Attended University of Auckland and joined AUBC"/>
            <Timeline_entry date="2018" text="Specialised in Civil Engineering"/>
            <Timeline_entry date="2019" text="Began Working for Domino's Pizza (thanks to my Brother Matt)"/>
            <Timeline_entry date="2020" text="Stopped working for Domino's (To focus on studying)"/>
            <Timeline_entry date="2020" text="Assumed Captaincy of AUBC Men's Squad"/>
            <Timeline_entry date="2020" text="Joined Auckland university Toastmasters (As a guest only)"/>
            <Timeline_entry date="2020" text="Awarded Summer Research Scholarship"/>
            <Timeline_entry date="2021" text="Worked as Research Assistant as a continuation of Summer Research Scholarship"/>
            <Timeline_entry date="2021" text="November - Began working as a graduate structural engineer at Dreamcast"/>
            <Timeline_entry date="2022" text="Moved overseas to Coffs Harbour, Australia to work as a Structural Engineer at Northrop Consulting Engineers"/>
            <Timeline_entry date="2022" text=" Joined Surf Life Saving Australia and joined the Coffs Boaties"/>
            
            </div>
            <div class="relative">
                
                    <img class = "absolute right-[2%] w-[10%]  shrink object-contain"src={TreeTrunk} alt="Tree Base"></img>
            
                <img class="absolute right-[20%] bottom-0 object-contain" src={TreeBranch} alt="Tree Base"></img>
                <img class=" shrink  object-contain -translate-y-[21%]"src={TreeLeaf}></img>
           
            
            
            
          
            
            </div>
          
            <img src={TreeBase} alt="Tree Base"></img>
            
            

        </div>
    )

}

