export function GeocodeLatLngToAddress( latitude: number, longitude: number,
        geocoder: google.maps.Geocoder,
        ) {
        const latlng = {
            lat: latitude,
            lng: latitude
        };
        geocoder.geocode(
          { location: latlng },
          (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) => {
            if (status === "OK") {
              if (results[0]) {
                return this.result[0].formatted_address;
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          }
        );
    }