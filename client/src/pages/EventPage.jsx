import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  //! Fetching the event data from server by ID ------------------------------------------
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/event/${id}`).then((response) => {
      setEvent(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, [id]);

  //! Copy Functionalities -----------------------------------------------
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(`${linkToShare}`);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  if (!event) return '';

  // Dynamic background color based on event type
  const eventTypeColors = {
    "Conference": "bg-blue-100",
    "Concert": "bg-red-100",
    "Workshop": "bg-green-100",
    "Seminar": "bg-yellow-100",
    "Webinar": "bg-purple-100",
    "default": "bg-gray-100",
  };

  const eventTypeTextColors = {
    "Conference": "text-blue-700",
    "Concert": "text-red-700",
    "Workshop": "text-green-700",
    "Seminar": "text-yellow-700",
    "Webinar": "text-purple-700",
    "default": "text-gray-700",
  };

  const eventType = event.type || "default"; // Default to 'default' if no event type is specified
  const backgroundColor = eventTypeColors[eventType] || eventTypeColors.default;
  const textColor = eventTypeTextColors[eventType] || eventTypeTextColors.default;

  return (
    <div className="flex flex-col mx-5 xl:mx-32 md:mx-10 mt-5 flex-grow">
      {/* Event Banner */}
      <div className="relative w-full h-96 overflow-hidden">
        {event.image && (
          <img
            src={event.image}
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Event Details */}
      <div className={`shadow-md rounded-lg p-6 my-8 ${backgroundColor}`}>
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-2`}>
          {event.title}
        </h1>
        <p className={`mt-4 ${textColor} leading-relaxed`}>
          {event.type}
        </p>
        <p className={`text-lg ${textColor} flex items-center space-x-2`}>
          {event.ticketPrice === 0 ? (
            <span className="text-green-500 font-semibold">Free</span>
          ) : (
            <>
              <span className="text-yellow-500 text-xl">💲</span>
              <span>{event.ticketPrice}</span>
            </>
          )}
        </p>
        <p className={`mt-4 ${textColor} leading-relaxed`}>{event.description}</p>
        <p className={`mt-4 font-semibold ${textColor}`}>
          Organized By: {event.organizedBy}
        </p>
        <Link to={`/event/${event._id}/ordersummary`} className="mt-4 block">
          <button className="primary mt-4 w-full py-2 bg-primary text-white rounded">
            Book Ticket
          </button>
        </Link>
      </div>

      {/* Date and Location */}
      <div className={`shadow-md rounded-lg p-6 my-8 ${backgroundColor}`}>
        <h2 className="text-xl font-semibold text-gray-800">When and Where</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="flex items-center">
            <AiFillCalendar className="text-primarydark text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Date and Time</h3>
              <p className="text-sm text-gray-600">
                Date: {event.eventDate.split('T')[0]} <br />
                Time: {event.eventTime}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <MdLocationPin className="text-primarydark text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Location</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sharing Section */}
      <div className={`shadow-md rounded-lg p-6 my-8 ${backgroundColor}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Share with Friends</h2>
        <div className="flex gap-6">
          <button
            onClick={handleCopyLink}
            className="hover:bg-gray-100 p-3 rounded-full shadow-md"
            title="Copy Link"
          >
            <FaCopy className="text-2xl text-gray-600 hover:text-gray-800" />
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="hover:bg-green-100 p-3 rounded-full shadow-md"
            title="Share on WhatsApp"
          >
            <FaWhatsappSquare className="text-2xl text-green-600 hover:text-green-800" />
          </button>
          <button
            onClick={handleFacebookShare}
            className="hover:bg-blue-100 p-3 rounded-full shadow-md"
            title="Share on Facebook"
          >
            <FaFacebook className="text-2xl text-blue-600 hover:text-blue-800" />
          </button>
        </div>
        <br/>
      </div>
    </div>
  );
}
