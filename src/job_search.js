import * as React from 'react';
import Button from '@mui/material/Button';
import './output.css';


function SearchBanner() {
    return (
        <div class="relative bg-[#051a49] h-[11.0625rem] p-0">
                <div class="absolute left-0 bottom-0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="177" fill="none" viewBox="0 0 2646 177"><path fill="#072462" d="M789.091 158.677c0-32.811-26.077-59.41-58.245-59.41-.389 0-.778.005-1.164.012v59.399l59.409-.001ZM396.989 77.732c32.811 0 59.408-26.077 59.408-58.244 0-.39-.003-.778-.011-1.165h-59.397v59.409Z"/><path fill="#E60278" d="M670.27 176.5c0-64.802-52.531-117.333-117.333-117.333-64.802 0-117.333 52.531-117.333 117.333l.001.259v-.259h78.222c.001-21.599 17.511-39.11 39.111-39.11 21.599 0 39.111 17.511 39.111 39.11h78.221Z"/><path fill="#072462" d="M188.314 77.729c.001 44.703 36.241 80.944 80.945 80.944 44.706 0 80.945-36.241 80.945-80.946v-.186.188h-53.963c0 14.901-12.08 26.982-26.981 26.982-14.902 0-26.982-12.08-26.982-26.981l-53.964-.001Zm81.422-80.946a82.44 82.44 0 0 0-.953 0h.953Z"/><path fill="#E60278" d="M2297.44 99.272h53.96c0-14.902 12.08-26.983 26.99-26.983 14.9 0 26.98 12.08 26.98 26.982h53.96v.164-.163c0-44.705-36.24-80.945-80.94-80.945-44.71 0-80.95 36.24-80.95 80.945Zm80.95 80.945h-.47.94-.47Z"/><path fill="#072462" d="M1858.55 18.323c0 32.81 26.08 59.409 58.25 59.409.39 0 .78-.004 1.16-.011V18.322h-59.41Z"/><path fill="#072462" fill-rule="evenodd" d="M1947.67 158.677c16.4 0 29.7-13.299 29.7-29.705 0-16.405-13.3-29.704-29.7-29.704-16.41 0-29.71 13.299-29.71 29.704 0 16.406 13.3 29.705 29.71 29.705Zm0-19.805c5.46 0 9.91-4.433 9.91-9.901 0-5.469-4.45-9.902-9.91-9.902-5.47 0-9.9 4.433-9.9 9.902 0 5.468 4.43 9.901 9.9 9.901Z" clip-rule="evenodd"/><path fill="#072462" d="M1977.37.5c0 64.801 52.54 117.333 117.33 117.333 64.81 0 117.34-52.531 117.34-117.333h-234.67Z"/><circle cx="699.854" cy="48.477" r="29.703" fill="#E60278"/><path fill="#E60278" fill-rule="evenodd" d="M2250.73 98.598v59.407h-59.41c0-32.81 26.6-59.407 59.41-59.407Z" clip-rule="evenodd"/></svg>
                </div>
                <form class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
                <div class="flex">
                    <div class="grid grid-cols-3">
                        <input type="text" placeholder="Enter Keywords"></input>
                        <input type="text" placeholder="Any Classification"></input>
                        <input type= "text" placeholder="Enter suburb, city, or region"></input>
                    </div>
                    <input class="shrink" type="submit" value="SEEK"></input>
                </div>
                    <div class="flex justify-end">
                    <p>More options</p>
                    </div>
                    
                </form>
         
            </div>
    );
}

export default function JobSearch() {
    return (
        <div class="">
        <div class="">
            <SearchBanner/>
            <div class="flex justify-center">
            
            </div>
            
            
        </div>
        

        <div class="flex justify-center">
            
            <div>
            <button class="p-1 bg-sky-500 hover:bg-sky-700 rounded-3xl">Previous search</button>
            <button class="p-1 bg-sky-500 hover:bg-sky-700 rounded-3xl">Previous search</button>

            </div>
            
       </div>


       </div>
    );
}