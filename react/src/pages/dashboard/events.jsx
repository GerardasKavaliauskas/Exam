import React, { useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";

export function Events() {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
  }); // State to store form input
  const [events, setEvents] = useState([]); // State to store created events

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value }); // Update form input state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.description || !eventData.date) {
      alert("Please fill out all fields.");
      return;
    }
    const newEvent = { ...eventData, id: Date.now() }; // Add a unique ID
    setEvents([...events, newEvent]); // Add the new event to the events list
    setEventData({ name: "", description: "", date: "" }); // Reset the form
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Create an Event
      </Typography>
      <Card className="mb-6">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                placeholder="Event Name"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" color="blue">
              Create Event
            </Button>
          </form>
        </CardBody>
      </Card>

      <Typography variant="h5" className="mb-4">
        Events List
      </Typography>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4">
              <Card>
                <CardBody>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography>{event.description}</Typography>
                  <Typography>Date: {event.date}</Typography>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No events created yet.</Typography>
      )}
    </div>
  );
}

export default Events;