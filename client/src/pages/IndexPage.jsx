/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import ImageSlider from "./ImageSlider";

  export default function IndexPage(params) {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of rows to display per page

  // Calculate the events for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.filter((event) =>
    event.title.toLowerCase().includes(params.searchQuery.toLowerCase()) || 
    event.location.toLowerCase().includes(params.searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(params.searchQuery.toLowerCase()) ||
    event.organizedBy.toLowerCase().includes(params.searchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(params.searchQuery.toLowerCase())
  ).slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Pagination navigation
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

   //! Fetch events from the server ---------------------------------------------------------------
    useEffect(() => {
      
      axios
        .get("/createEvent")
        .then((response) => {
          setEvents(response.data);
          console.log(events);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }, []);
    
  //! Like Functionality --------------------------------------------------------------
    const handleLike = (eventId) => {
      axios
        .post(`/event/${eventId}`)
        .then((response) => {
            setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === eventId
                ? { ...event, likes: event.likes + 1 }
                : event
            )
          );
          console.log("done", response)
        })
        .catch((error) => {
          console.error("Error liking ", error);
        });
    };
  

    return (
      <>
      <div className="mt-1 flex flex-col">
        <div className="hidden sm:block" >
        <ImageSlider/>
        </div>

        <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5 ">
        
        {/*-------------------------- Checking whether there is a event or not-------------------  */}
        {events && currentEvents.map((event) => {
          const eventDate = new Date(event.eventDate);
          const currentDate = new Date();
          
          //! Check the event date is passed or not --------------------------------------------------------------------------------------- 
          if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()){
            return (
              <div className="bg-white rounded-xl relative" key={event._id}>
              <div className="rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] overflow-hidden">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[200px] object-cover rounded-tl-[0.75rem] rounded-tr-[0.75rem]"
                    />
                  )}
                <div className="absolute flex gap-4 bottom-[240px] right-8 md:bottom-[20px] md:right-3 lg:bottom-[250px] lg:right-4 sm:bottom-[260px] sm:right-3">
                  <button onClick={() => handleLike(event._id)}>
                    <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                  </button>
                </div>
              </div>

              <div className="m-2 grid gap-2">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg mt-2">
                    {event.title.toUpperCase()}
                  </h1>
                  <div className="flex gap-2 items-center mr-4 text-red-600">
                    {" "}
                    <BiLike /> {event.likes}
                  </div>
                </div>

                <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold mr-4">
                  <div>
                    {event.eventDate.split("T")[0]}, {event.eventTime}
                  </div>
                  <div>
                    {event.ticketPrice === 0 ? "Free" : "Rs. " + event.ticketPrice}
                  </div>
                </div>

                {/* <div className="text-xs flex flex-col flex-wrap truncate-text">
                  {event.description}
                </div> */}
                <div className="flex justify-between items-center my-2 mr-4">
                  <div className="text-sm text-primarydark ">
                    Organized By: <br />
                    <span className="font-bold">{event.organizedBy}</span>
                  </div>
                  <div className="text-sm text-primarydark ">
                    Created By: <br />{" "}
                    <span className="font-semibold">
                      {event.owner.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Link to={"/event/" + event._id} className="flex justify-center">
                  <button className="primary flex items-center gap-2">
                    View
                    <BsArrowRightShort className="w-6 h-6" />
                  </button>
                </Link>
                
              </div>
            </div>
            )
          }
          return null;
        }   
        )}
        </div>
        {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="primary px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="primary px-4 py-2 rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      </div>
      
      </>
        
      )
  }
  