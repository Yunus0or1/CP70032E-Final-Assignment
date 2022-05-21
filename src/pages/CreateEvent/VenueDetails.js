import React, { useState } from "react";



export const VenueDetails = () => {
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState();

  return <p>Venue Details</p>;
};

const fromAPI = {
  theater1: {
      id: '0',
      title: 'Theater 1',
      identifierTitle: 'theater1',
      location: 'Ealing Broadway 1',
      seat: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]
  },
  theater2: {
      id: '1',
      title: 'Theater 2',
      identifierTitle: 'theater2',
      location: 'Ealing Broadway 2',
      seat: [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]
  }
}