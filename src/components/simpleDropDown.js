import * as React from 'react';
import '../output.css';





export default function SimpleListMenu ({selectedIndex, setSelectedIndex, options}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    /**/
    /*const open = Boolean(anchorEl);*/
    const [open, setOpen] = React.useState('hidden')
    const [default_text, setDefault] = React.useState('default')
    const Visible = 
    {
        hidden: 'hidden',
        visible: 'absolute h-80 w-80 overflow-auto rounded-lg text-black bg-white shadow-xl',
    }
    
    const Button_text = {
        normal: "rounded-lg bg-white w-full h-full text-base text-left hover:ring-2 ring-blue-500 focus:ring-8 focus:ring-[#7facf5] outline-none",
        default: "rounded-lg text-[#9ca3af] text-base text-left bg-white w-full h-full hover:ring-2 ring-blue-500 focus:ring-8 focus:ring-[#7facf5] outline-none",
    }
    

    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen('visible')
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
      if (index === 0) {
        setDefault('default')
      } else {
        setDefault('normal')
      }
      const buttonElement = document.getElementById("buttonId");
      buttonElement.blur()
    
    };
  
    const handleClose = () => {
      setOpen('hidden')
    };

    var listItems = options.map((option, index) => 
        <li class=""onClick={(event) => handleMenuItemClick(event, index)}>{option}
            </li>
    );

    return (
        <div class="relative">
            <button class={`${Button_text[default_text]}`} type="button" id="buttonId" onFocus={handleClickListItem} onBlur={handleClose}>
                <div class="p-3 text-nowrap truncate w-full overflow-hidden">{options[selectedIndex]}</div>
                <div className={`${Visible[open]}`}>
                <ul class="space-y-4">{listItems}</ul>
            </div>
                </button>
            

        </div>

    );
}


