import * as React from 'react';
import JobSearch from '../job_search';
import '../output.css';
import Logo from './seek_logo.png';
import Profile from '../profile';
import Canvas from './parallax.js';

export default function Tabs() {
    const [pageIndex, setpageIndex] = React.useState(0)
    const [menuOpen, setmenuOpen] = React.useState('close')

    const handleTabClick = (index) => {
        setpageIndex(index)
        setmenuOpen('close')
      };
    
    const handleMenuClickOpen = () => {
        if (menuOpen === 'open') {
            setmenuOpen('close')
        } else {
            setmenuOpen('open')
        };
        
    };

    const handleMenuClickClose = () => {
        setmenuOpen('close')

    };


    const selectedTab = {
        selected: "underline underline-offset-8 translate-y-1 text-lg hover:cursor-pointer",
        notselected: "translate-y-1 text-lg hover:cursor-pointer",
        open: "right-0 w-full flex flex-col space-y-5 z-20 p-5 md:flex md:flex-row md:space-x-10",
        close: "hidden md:flex md:flex-row md:space-x-10",
    }

    return (
        <div class = "">
            <div class="relative ml-5 mr-5 grid grid-cols-2 rounded-lg justify-between md:flex md:justify-start md:space-x-10">
                <div class="">
                <img class="hover:cursor-pointer" onClick={() => handleTabClick(0)} width='100px' src={Logo} alt="seek logo"/>
                </div>
                    
                <div class="">
                    <button class="absolute right-0 mr-5 text-lg md:hidden" onClick={handleMenuClickOpen} >Menu</button>
                
                </div>
                <div class={`${selectedTab[menuOpen]}`}>
                    
                    <span class ={pageIndex===0 ? `${selectedTab['selected']}`:`${selectedTab['notselected']}`} onClick={() => handleTabClick(0)}>Profile</span>
                    <div class ={pageIndex===1 ? `${selectedTab['selected']}`:`${selectedTab['notselected']}`}onClick={() => handleTabClick(1)}>Job Search</div>
                    <div class ={pageIndex===2 ? `${selectedTab['selected']}`:`${selectedTab['notselected']}`} onClick={() => handleTabClick(2)}>About me</div>
                    <div class ={pageIndex===3 ? `${selectedTab['selected']}`:`${selectedTab['notselected']}`} onClick={() => handleTabClick(3)}>Blog</div>
                </div>
                
   
                
                
                
                
                
            </div>
            <div class = {pageIndex===0 ? 'block':'hidden'}>
                
            </div>
            <div class = {pageIndex===1 ? 'block':'hidden'} ><JobSearch/></div>
            <div class = {pageIndex===2 ? 'block':'hidden'}>Hello</div>
            
        
        </div>

    );
}