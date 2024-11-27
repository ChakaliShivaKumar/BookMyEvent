import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import {Link} from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill } from 'react-icons/bs';


export default function Header(params) {
  const {user,setUser} = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  //! Fetch events from the server -------------------------------------------------
  useEffect(() => {
    
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);


  //! Search bar functionality----------------------------------------------------
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is the search input or its descendant
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        params.setSearchQuery("");
      }
    };

    // Listen for click events on the entire document
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); 
  
  //! Logout Function --------------------------------------------------------
  async function logout(){
    await axios.post('/logout');
    setUser(null);
  }
//! Search input ----------------------------------------------------------------
  const handleSearchInputChange = (event) => {
    params.setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className='flex py-2 px-6 sm:px-6 justify-between place-items-center'>
          
          <Link to={'/'} className="flex item-center ">
            <img src="../src/assets/logo-initial-2.png" alt="" className='w-30 h-12'/>
            <h3 className="text-lg font-semibold w-30 h-12">BookMyEvent</h3>
          </Link>
    
          <div  className='flex bg-white rounded py-2.5 px-4 w-1/3 gap-4 items-center shadow-md shadow-gray-200'>
            
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <div ref={searchInputRef}>
              <input type="text" placeholder="Search" value={params.searchQuery} onChange={handleSearchInputChange} className='text-sm text-black outline-none w-full '/>
            </div>
            {/* <div className='text-sm text-gray-300 font-semibold'>Search</div> */}      
          </div> 

          {/*------------------------- Search Functionality -------------------  */}
          
    
          
    {!!user &&(<Link to={'/createEvent'}> 
            <div className='hidden md:flex flex-col place-items-center py-1 px-2 rounded text-primary cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 stroke-3 py-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <div className='font-bold color-primary text-sm'>Create Event</div>
            </div>  
          </Link>
    )}

        <div className='hidden lg:flex gap-5 text-sm'>
         
        

            <Link to={'/calendar'}> {/*TODO:Route calendar page after creating it */}
            <div className='flex flex-col place-items-center py-1 px-3 rounded cursor-pointer hover:text-primarydark hover:bg-white hover:shadow-sm shadow-gray-200 hover:transition-shadow duration-1500'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 py-1">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
              <div>Calendar</div>
            </div>
            </Link>
          </div>
          
        {!!user &&(
          
          <div className="flex flex-row items-center gap-2 sm:gap-8 ">
            <div className="flex items-center gap-2">
              <Link to={'/useraccount'}>  {/*TODO: Route user profile page after creating it -> 1.50*/} 
                {user.name.toUpperCase()}
              </Link>
              
              <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(!isMenuOpen)}/>
            </div>
            <div className="hidden md:flex">
              <button onClick={logout} className="secondary">
                <div>Log out</div>
                <RxExit/>
              </button>
            </div>
          </div>  
        )}

        {/* -------------------IF user is not Logged in DO this MAIN AND MOBILE-------------------- */}
        {!user &&(
          <div>
            
            <Link to={'/login'} className=" ">
              <button className="primary">
                <div>Sign in </div>
              </button>
            </Link>
          </div>
        )}
          
          {/* -------------------IF user is Logged DO this Mobile -------------------- */}
          {!!user &&(
            //w-auto flex flex-col absolute bg-white pl-2 pr-6 py-5 gap-4 rounded-xl
            <div className="absolute z-10 mt-64 flex flex-col w-48 bg-white right-2 md:right-[160px] rounded-lg shadow-lg"> 
            {/* TODO: */}
              <nav className={`block ${isMenuOpen ? 'block' : 'hidden'} `}>
                <div className="flex flex-col font-semibold text-[16px]">
                <Link className="flex hover:bg-background hover:shadow py-2 pt-3 pl-6 pr-8 rounded-lg" to={'/createEvent'} >
                  Create Event
                </Link>
                
                <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/wallet'}>
                  <div>Orders</div>
                </Link>

                <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pr-8 rounded-lg" to={'/calendar'}>
                  <div>Calendar</div>
                </Link>

                <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pb-3 pr-8 rounded-lg" onClick={logout}>
                  Log out
                </Link>
                </div>
              </nav>
            </div>
        )}

      </header>
          
    </div>
  )
}
