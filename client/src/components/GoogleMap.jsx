import { useEffect, useRef } from 'react'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function GoogleMap({ location, legalClinics = [] }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    let isCancelled = false

    const initializeMap = () => {
      if (!window.google || !mapRef.current) {
        return
      }

      // Parse location string (could be "lat, lng" or address)
      let center = { lat: 43.6532, lng: -79.3832 } // Default to Toronto
      
      if (location) {
        const coords = location.split(',').map(s => s.trim())
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          center = { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) }
        }
      }

      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
      })

      mapInstanceRef.current = map

      // Add marker for user's location
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: 'Your Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
      })

      // Search for legal aid clinics nearby
      const service = new window.google.maps.places.PlacesService(map)
      const request = {
        location: center,
        radius: 5000, // 5km radius
        keyword: 'legal aid clinic',
      }

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          results.slice(0, 5).forEach((place, index) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
              label: {
                text: (index + 1).toString(),
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
              },
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#EA4335',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
              },
            })

            // Add info window
            const infowindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px;">
                  <h3 style="margin: 0 0 4px 0; font-size: 14px;">${place.name}</h3>
                  <p style="margin: 0; font-size: 12px; color: #666;">${place.vicinity || ''}</p>
                  ${place.rating ? `<p style="margin: 4px 0 0 0; font-size: 12px;">⭐ ${place.rating}</p>` : ''}
                </div>
              `,
            })

            marker.addListener('click', () => {
              infowindow.open(map, marker)
            })
          })
        }
      })
    }

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        return Promise.resolve()
      }

      if (!GOOGLE_MAPS_API_KEY) {
        console.error('Missing VITE_GOOGLE_MAPS_API_KEY in client/.env')
        return Promise.reject(new Error('Missing Google Maps API key'))
      }

      if (!window._googleMapsLoadPromise) {
        window._googleMapsLoadPromise = new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
          script.async = true
          script.defer = true
          script.onload = () => resolve()
          script.onerror = (err) => reject(err)
          document.head.appendChild(script)
        })
      }

      return window._googleMapsLoadPromise
    }

    loadGoogleMapsScript()
      .then(() => {
        if (!isCancelled) {
          initializeMap()
        }
      })
      .catch((err) => {
        console.error('Failed to load Google Maps', err)
      })

    return () => {
      isCancelled = true
    }

  }, [location, legalClinics])

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }} 
    />
  )
}

export default GoogleMap
