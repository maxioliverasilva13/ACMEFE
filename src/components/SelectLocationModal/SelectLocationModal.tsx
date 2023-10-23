import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcModal from "@/shared/NcModal/NcModal";
import { initMap, generateNewMarker } from "@/utils/mapbox";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import mapboxgl, { Marker } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import {toast} from "react-toastify";

let defaultMarker: any = null;

interface Props {
  setOpen: any;
  open: boolean;
  setLatLng: any;
  onSelectLocation: any
}

const SelectLocationModal = ({ setOpen, open, setLatLng  , onSelectLocation}: Props) => {
  const [map, setMap] = useState<any>(null);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [mapContainer, setMapContainer] = useState<any>(null);

  // set shouldUpdate => true on initial render, triggering re-render
  useEffect(() => {
    if (shouldUpdate) setShouldUpdate(false);
  }, [shouldUpdate]);

  useEffect(() => {
    if (map) return; // initialize map only once
    if (!mapContainer) return;
    setMap(initMap(mapContainer, [-100.31019063199852, 25.66901932031443]));

    return () => {
      if (defaultMarker) {
        const currentOffset = defaultMarker?.getLngLat();
        setLatLng({
          ...currentOffset,
        });
        // map.current = null;
        setMapContainer(null);
      }
    };
  }, [mapContainer, open, mapContainer]);

  useEffect(() => {
    if (map) {
      map.on("load", (event: any) => {
        map?.resize();
        if (defaultMarker) {
          const currentOffset = defaultMarker?.getLngLat();
          generateNewMarker({
            map: map,
            lat: currentOffset?.lat,
            lng: currentOffset?.lng,
          });
        }
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });
        if (map?.current) {
          map.addControl(geolocate);
        }
        geolocate.on("geolocate", () => {});
      });
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.on("dblclick", ({ lngLat }: any) => {
        if (!defaultMarker) {
          const newMarker = generateNewMarker({
            ...lngLat,
            map: map,
          });
          newMarker.on("dragend", (event: any) => {
            defaultMarker = event?.target as any;
          });
          defaultMarker = newMarker;
        }
      });
    }

    return () => {
      map?.off("click");
    };
  }, [map, defaultMarker]);

  const onSelect = ()=>{
      if(!defaultMarker){
            toast.error("Debes seleccionar una ubicacion primero");
            return;
      }
      const { _lngLat }  = defaultMarker;
      const { lng, lat} = _lngLat;
      onSelectLocation(lng,lat);
    
  }

  const renderContent = () => {
    return (
      <div className="w-full h-auto flex flex-col gap-4">
        <p className="text-[24px] font-semibold text-black">
          Selecciona una ubicacion
        </p>

        <p className="mt-4 text-[14px] font-semibold text-gray-400">
          Selecciona la ubicacion en el mapa haciendo click en el mismo
        </p>

        <div
          ref={(ref) => setMapContainer(ref)}
          className="rounded-lg overflow-hidden w-full h-[550px]"
          
        ></div>

        <ButtonPrimary onClick={onSelect}>
            Confirmar
        </ButtonPrimary>
      </div>
    );
  };
  renderContent();

  return (
    <NcModal
      isOpenProp={true}
      onCloseModal={() => setOpen(false)}
      contentExtraClass="max-w-screen-sm overflow-visible"
      renderContent={renderContent}
      renderTrigger={() => null}
      modalTitle=""
    />
  );
};

export default SelectLocationModal;
