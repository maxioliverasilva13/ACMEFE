import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcModal from "@/shared/NcModal/NcModal";
import { Pickup } from "@/types/pickup";
import { initMap, generateNewMarker } from "@/utils/mapbox";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import mapboxgl, { Marker } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Label from "../Label/Label";
import Image from "next/image";
import { PRODUCT_NO_IMAGE } from "@/utils/usuarios";
let defaultMarker: any = null;

interface Props {
  setOpen: any;
  open: boolean;
  pickup: Pickup;
}

const ViewSucursalDetails = ({ setOpen, open, pickup }: Props) => {
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
        // map.current = null;
        setMapContainer(null);
      }
    };
  }, [mapContainer, open, mapContainer]);

  useEffect(() => {
    if (map) {
      map.on("load", (event: any) => {
        map?.resize();
        if (pickup) {
          generateNewMarker({
            lat: pickup?.lng,
            lng: pickup?.lat,
            map: map,
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

  const renderContent = () => {
    return (
      <div className="w-full h-auto flex flex-col gap-4">
        <p className="text-[24px] font-semibold text-black">
          Pickup - {pickup?.nombre}
        </p>

        <div className="w-[100px] relative h-[100px] shadow-sm overflow-hidden rounded-full">
            <Image 
                src={pickup?.foto ?? PRODUCT_NO_IMAGE}
                alt={pickup?.nombre}
                layout="fill"
                objectFit="cover"
            />
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <Label>Departamento:</Label>
          <span className="text-sm font-semibold text-gray-600">
            {pickup?.departamentoNombre} - {pickup?.ciudadNombre}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <Label>Direccion:</Label>
          <span className="text-sm font-semibold text-gray-600">
            {pickup?.calle} {pickup?.nroPuerta} - entre {pickup?.calleEntre1} y {pickup?.calleEntre1}
          </span>
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <Label>Datos varios:</Label>
          <span className="text-sm font-semibold text-gray-600">
            Telefono - {pickup?.telefono}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            Plazo de dias de preparacion - {pickup?.plazoDiasPreparacion}
          </span>
        </div>
        <div
          ref={(ref) => setMapContainer(ref)}
          className="rounded-lg overflow-hidden w-full h-[550px]"
        ></div>
        <ButtonPrimary onClick={() => setOpen(false)}>Cerrar</ButtonPrimary>
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

export default ViewSucursalDetails;
