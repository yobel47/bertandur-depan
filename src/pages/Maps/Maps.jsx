import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { ZoomControl } from "mapbox-gl-controls";
import "./Maps.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "pk.eyJ1IjoieW9iZWwiLCJhIjoiY2xiOWk0ZHpxMHYyODNvcXAweW82a2llNyJ9.VhHzgDxzRzdqFdmHX9dbCQ";

export default function Maps() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const geocoder = useRef(null);
  const [lng, setLng] = useState(108.338223);
  const [lat, setLat] = useState(-7.053939);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [position.coords.longitude, position.coords.latitude],
          zoom: zoom,
        });
        marker.current = new mapboxgl.Marker({ draggable: true, color: "red" })
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(map.current);
        map.current.addControl(
          (geocoder.current = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: {
              color: "red",
              draggable: true,
            },
            mapboxgl: mapboxgl,
          }))
        );

        geocoder.current.on("result", (event) => {
          console.log(geocoder.current.options.proximity);
          geocoder.current.clear();
          marker.current.remove();
          marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(event.result.center).addTo(map.current);
        });
        marker.current.on("dragend", (event) => {
          console.log(event);
          console.log(marker.current._lngLat);

          const lngLat = marker.current._lngLat;
          console.log(lngLat.toString().substring(6));
          const { lng, lat } = marker.current._lngLat;
          setLat(lat);
          setLng(lng);
          console.log("New Marker Position:", lng, lat);
        });
      });
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat([lng, lat]).addTo(map.current);
    map.current.addControl(
      (geocoder.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: "red",
          draggable: true,
        },
        mapboxgl: mapboxgl,
      }))
    );

    geocoder.current.on("result", (event) => {
      console.log(geocoder.current.options.proximity);
      geocoder.current.clear();
      marker.current.remove();
      marker.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(event.result.center).addTo(map.current);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("click", (event) => {
      var coordinates = event.lngLat;
      console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
      marker.current.setLngLat(coordinates).addTo(map.current);
    });
  });

  useEffect(() => {
    console.log(map.current.getCenter());
  });

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container w-full h-[100vh]" />
        <div id="geocoder" className="geocoder"></div>
        <div>
          lat: {lat}
          <br />
          long: {lng}
          <br />
          {zoom}
        </div>
      </div>
    </>
  );
}
