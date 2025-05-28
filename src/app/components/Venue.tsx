import React from 'react'

interface VenueImage {
    image: string;
    alt_text: string;
}

interface VenueImages {
    [key: string]: VenueImage;
}

const Venue = () => {
    return (
        <div>Venue</div>
    )
}

export default Venue