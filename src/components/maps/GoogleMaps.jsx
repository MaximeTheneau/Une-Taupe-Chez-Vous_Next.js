import React, { useState, useEffect } from 'react';

export default function GoogleMaps() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapF = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 48.856614, lng: 2.348889 },
      zoom: 12,
    });

    setMap(mapF);
  }, []);

  return (
    <div>
      <Map map={map} />
    </div>
  );
}
