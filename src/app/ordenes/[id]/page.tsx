"use client";

import Image from "next/image";
import Prices from "@/components/Prices";
import { useGetByIdQuery } from "@/store/service/CompraService";
import { ProductoList } from "@/types/productoList";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useGlobal from "@/hooks/useGlobal";
import { separarMayusculas } from "@/utils/stirng";
import { useParams, usePathname } from "next/navigation";
import ModalCalificar from "@/app/product-detail/ModalCalificar";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Text from "@/components/Table/components/Text";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Button from "@/shared/Button/Button";
import RealizarReclamoModal from "./RealizarReclamoModal";
import { EstadReclamo, Reclamo } from "@/types/reclamo";
import { DEFAULT_USER_IMAGE, PRODUCT_NO_IMAGE } from "@/utils/usuarios";
import clsx from "clsx";
import moment from "moment";
import axios from "axios";
import useEmpresa from "@/hooks/useEmpresa";

const formatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD/MM/YYYY hh:mm a");
};

const timeLine = (historialEstados: any) => {
  return (
    <div className="p-4 bg-slate-50 flex-1">
      <div className="container">
        <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
          {historialEstados.map((Estado: any) => {
            const { estado, fecha, completado, estadoId } = Estado;
            return (
              <div className="flex md:contents" key={estadoId}>
                <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                  <div className="h-full w-6 flex items-center justify-center">
                    <div
                      className={`h-full w-1 banner ${
                        completado ? "bg-green-500" : "bg-gray-300"
                      } pointer-events-none`}
                    ></div>
                  </div>
                  <div
                    className={`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${
                      completado ? "bg-green-500" : "bg-gray-300"
                    } shadow text-center`}
                  >
                    <i className="fas fa-check-circle text-white"></i>
                  </div>
                </div>
                <div
                  className={`${
                    completado ? "bg-green-500" : "bg-gray-300"
                  } col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full`}
                >
                  <h3 className="font-semibold text-lg mb-1">{estado}</h3>
                  <p className="leading-tight text-justify w-full">
                    {fecha ? formatDate(fecha) : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const renderProductItem = (
  linea: any,
  index: number,
  setModalOpen: Function,
  setProdId: Function,
  currentState: string
) => {
  const { cantidad, precioUnitario, subTotal } = linea;
  const producto = linea.productoLista;
  const { nombre, imagenes, descripcion } = producto;
  const imagen = imagenes ? imagenes[0].url : "";

  return (
    <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0 ">
      <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          fill
          sizes="100px"
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="text-base font-medium line-clamp-1">{nombre}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {descripcion}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Precio unitario{" "}
                <span className="text-green-500">{precioUnitario}$</span>
              </p>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500 dark:text-slate-400 flex items-center">
                  <span className="hidden sm:inline-block">Cantidad</span>
                  <span className="inline-block sm:hidden">{cantidad}</span>
                  <span className="ml-2">{cantidad}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <Prices
                className="flex justify-end mt-0.5 ml-2"
                price={subTotal}
              />
              {currentState === "PedidoEntregado" ? (
                <ButtonSecondary
                  onClick={() => {
                    setModalOpen(true);
                    setProdId(producto.id);
                  }}
                  className="border border-slate-300 dark:border-slate-700 "
                >
                  Calificar Producto
                </ButtonSecondary>
              ) : (
                <Text message="Podrás calificar cuando recibas el pedido." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBtnImprimirFactura = (handleDownloadFactura: Function) => {
  return (
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span onClick={() => handleDownloadFactura()}>Descargar Factura</span>
    </button>
  );
};

interface PropsOrder {
  orderInfo: any;
  setModalOpen: any;
  setProdId: any;
  refetch: any;
}

const RenderOrderInfo = ({
  orderInfo,
  setModalOpen,
  setProdId,
  refetch,
}: PropsOrder) => {
  const [openReclamoModal, setOpenReclamoModal] = useState(false);
  const {
    id,
    fecha,
    comprador,
    costoTotal,
    cantidadDeProductos,
    metodoPago,
    metodoEnvio,
    empresa,
    lineas,
    estado,
    codigoSeguimiento,
  } = orderInfo;
  const { handleSetLoading } = useGlobal();

  const handleDownloadFactura = async () => {
    try {
      handleSetLoading(true);
      const data = await axios.post(
        "http://localhost:5003/api/Facturacion",
        {
          nroFactura: id,
          logo: empresa?.imagen,
          nombreEmpresa: empresa?.nombre,
          direccionEmpresa: empresa?.direccion ?? "No tiene",
          telefonoEmpresa: empresa?.telefono ?? "No tiene",
          correoEmpresa: empresa?.correo,
          fecha: fecha ? moment(fecha).format("DD/MM/YYYY") : "No tiene",
          nombreCliente: comprador?.nombre,
          direccionCliente: "Direccion",
          celularCliente: comprador?.celular ?? "No tiene",
          total: costoTotal,
          lineas: lineas?.map((item: any) => {
            return {
              fotoProducto: item?.productoLista?.imagenes
                ? item?.productoLista?.imagenes[0]?.url
                : PRODUCT_NO_IMAGE,
              nombreProducto: item?.productoLista?.nombre,
              precioUnitario: item?.productoLista?.precio,
              cantidad: item?.cantidad,
              subTotal: item?.cantidad * item?.productoLista?.precio ?? 0,
            };
          }),
        },
        { responseType: "blob" }
      );

      const file = data?.data;
      if (file) {
        const url = window.URL.createObjectURL(new Blob([file]));
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.setAttribute('download', `factura-${id}.pdf`);
        document.body.appendChild(enlace);
        enlace.click();
        // Limpia la URL creada y restablece el estado
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleSetLoading(false);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 p-5">
      <div className="flex justify-between flex-col sm:flex-row gap-4 sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold"> {formatDate(fecha)}</p>
            <span className="text-primary-500 ml-2">
              {separarMayusculas(estado)}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Metodo de Entrega: {separarMayusculas(metodoEnvio)}
          </p>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Metodo de Pago: {separarMayusculas(metodoPago)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Cantidad de Productos: {cantidadDeProductos}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Costo Total:{" "}
            <span className="text-green-500 ml-2">{costoTotal}$</span>
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
            Codigo de seguimiento:{" "}
            <span className="text-green-500 ml-2">{codigoSeguimiento}</span>
          </p>
        </div>

        <div className="w-auto h-auto flex flex-col gap-2">
          {renderBtnImprimirFactura(handleDownloadFactura)}
          <ButtonPrimary onClick={() => setOpenReclamoModal(true)}>
            Realizar reclamo
          </ButtonPrimary>
        </div>
      </div>

      <div className="w-full flex justify-between bg-white">
        <div className="flex flex-col bg-slate-50 p-5 shadow-lg">
          <h2 className="text-xl sm:text-xl font-semibold">Productos</h2>

          {lineas.map((linea: any, index: number) => {
            return renderProductItem(
              linea,
              index,
              setModalOpen,
              setProdId,
              estado,
            );
          })}
        </div>
      </div>
      {timeLine(orderInfo.historialEstados)}
      {openReclamoModal && (
        <RealizarReclamoModal
          compraId={id}
          show={openReclamoModal}
          onFinish={() => refetch()}
          onClose={() => setOpenReclamoModal(false)}
        />
      )}
    </div>
  );
};

const ClienteOrdenDetalle = () => {
  const [isOpenCalificarModal, setIsOpenCalificarModal] = useState(false);
  const [productId, setProductId] = useState<number>(0);
  const params = useParams();
  const ordenId = params?.id;
  const { data, error, isLoading, refetch } = useGetByIdQuery(Number(ordenId) ?? 0);
  const orderInfo: any = data;
  const { handleSetLoading } = useGlobal();
  const { push } = useRouter();

  useEffect(() => {
    handleSetLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleSetLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error && error?.originalStatus == 404) {
      push("/not-found" as never);
    }
  }, [error]);

  const reclamos = data?.reclamosUsuario as Reclamo[];

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Informacion de la venta
      </h2>
      {orderInfo ? (
        <RenderOrderInfo
          orderInfo={orderInfo}
          setModalOpen={setIsOpenCalificarModal}
          setProdId={setProductId}
          refetch={refetch}
        />
      ) : null}
      {/* MODAL CALIFICAR */}
      <ModalCalificar
        show={isOpenCalificarModal}
        onCloseModalCalificar={() => setIsOpenCalificarModal(false)}
        productId={productId}
      />
      <h2 className="text-2xl sm:text-3xl font-semibold">Reclamos</h2>

      <div className="flex flex-col items-center justify-start gap-3 flex-wrap">
        {reclamos?.map((item) => {
          return (
            <div
              key={item?.id}
              className="w-full relative h-auto flex flex-col md:flex-row md:items-center items-start justify-start gap-2 px-6 py-4 shadow-sm"
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="w-[90px] min-w-[90px] h-[90px] relative rounded-full overflow-hidden">
                  <Image
                    alt="User image"
                    src={item.usuario.imagen ?? DEFAULT_USER_IMAGE}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col w-full items-start justify-start gap-2">
                  <span className="text-medium text-lg">
                    {item.usuario?.nombre}
                  </span>
                  <span>
                    <b>Descripcion del reclamo: </b>
                    {item?.description}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center justify-center md:absolute top-5 right-5">
                {/* Badge */}
                <span
                  className={clsx(
                    "px-2 py-1 text-sm text-white font-medium shadow-sm rounded-lg",
                    item.estado === EstadReclamo.activo
                      ? "bg-yellow-300"
                      : "bg-green-300"
                  )}
                >
                  {item.estado}
                </span>
                <span>{moment(item.fecha).format("MM/DD/YYYY")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClienteOrdenDetalle;
