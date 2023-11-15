"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "@/app/checkout/ContactInfo";
import PaymentMethod from "@/app/checkout/PaymentMethod";
import ShippingAddress from "@/app/checkout/ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { CarritoList } from "@/types/productoList";
import { PRODUCT_NO_IMAGE } from "@/utils/usuarios";
import { appRoutes } from "@/utils/appRoutes";
import useEmpresa from "@/hooks/useEmpresa";
import useCarrito from "@/hooks/useCarrito";
import SelectShippingType from "@/app/checkout/SelectShippingType";
import SelectSucursal from "@/app/checkout/SelectSucursal";
import { getProductFinalPrice, getProductTax } from "@/utils/producto";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";
import OneLineError from "@/components/OneLineError/OneLineError";
import { useEfectuarCompraMutation } from "@/store/service/CarritoService";
import Page404 from "@/app/not-found";
import PaymentSuccessModal from "./components/PaymentSuccessModal";

const CheckoutPage = () => {
  const { handleSetLoading, userInfo } = useGlobal();
  const [tabActive, setTabActive] = useState<
    | "ContactInfo"
    | "ShippingAddress"
    | "SelectSucursal"
    | "PaymentMethod"
    | "ShippingType"
  >("ShippingAddress");
  const [handleBuy] = useEfectuarCompraMutation();

  const {
    productos,
    handleSetErrors,
    errors,
    selectedAddressId,
    selectedSucursalId,
    shippingMethod,
    handleSetPaymentInfo,
    paymentMethod,
    paymentInfo,
  } = useCarrito();

  const { currentEmpresa } = useEmpresa();

  const [isValidPayment, setIsValidPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [compraId, setCompraId] = useState(false);

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };
  useEffect(() => {
    handleSetPaymentInfo({});
  }, []);

  let total = 0;
  let subtotal = 0;
  let taxes = 0;

  productos?.forEach((prod) => {
    const finalPrice = getProductFinalPrice(
      prod?.producto?.precio,
      prod?.producto?.tipoIva?.porcentaje ?? 0
    );
    subtotal += prod?.cantidad * prod?.producto?.precio;
    const productTax = getProductTax(
      prod?.producto?.precio,
      prod?.producto?.tipoIva?.porcentaje ?? 0
    );
    taxes += productTax * prod?.cantidad;
    total += prod?.cantidad * finalPrice;
  });

  total += shippingMethod === "DOMICILIO" ? currentEmpresa?.costoEnvio ?? 0 : 0;

  const handleSendOrder = async () => {
    try {
      handleSetLoading(true);
      let erroresToSend = [];
      if (!shippingMethod) {
        erroresToSend.push("Seleccina un metodo de envio");
      } else {
        if (shippingMethod === "DOMICILIO" && !selectedAddressId) {
          erroresToSend.push("Seleccina una direccion para el envio");
        }
        if (shippingMethod === "RETIRO" && !selectedSucursalId) {
          erroresToSend.push("Seleccina una sucursal para retirar la compra");
        }
      }

      if (!paymentMethod) {
        erroresToSend.push("Seleccione un metodo de pago");
      } else {
        if (paymentMethod === "CARD" && !paymentInfo["card"]) {
          erroresToSend.push("Ingrese un numero de tarjeta");
        }
        if (paymentMethod === "CARD" && !paymentInfo["cvc"]) {
          erroresToSend.push("Ingrese un cvc valido");
        }
        if (paymentMethod === "CARD" && !paymentInfo["expiration"]) {
          erroresToSend.push("Ingrese una expiracion de tarjeta valida");
        }
        if (paymentMethod === "CARD" && !paymentInfo["titular"]) {
          erroresToSend.push("Ingrese un titular valido");
        }
      }
      if (erroresToSend?.length > 0) {
        handleSetErrors(erroresToSend);
        return;
      }

      const dataToSend = {
        MetodoEnvio: shippingMethod === "DOMICILIO" ? 1 : 2,
        MetodoPago: paymentMethod === "CARD" ? 1 : 2,
        EmpresaId: currentEmpresa?.id,
        DireccionSeleccionadaId:
          shippingMethod === "DOMICILIO"
            ? selectedAddressId
            : selectedSucursalId,
        PaymentInfo: {
          CardNumber: paymentInfo?.card,
          ExpiryDate: paymentInfo?.expiration,
          CVV: paymentInfo?.cvc,
          Amount: subtotal,
        },
        wallet: "1",
      };
      handleSetErrors([]);
      const resp = (await handleBuy(dataToSend)) as any;
      if (resp?.data?.ok) {
        toast.success("Orden creada correctamente");
        if (!resp?.data?.compraId) {
          throw new Error("Compra invalida");
        }
        setPaymentSuccess(true);
        setCompraId(resp?.data?.compraId);
        // show modal
      } else {
        toast.error(resp?.error?.data?.mensaje ?? "Error al comprar productos");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Error al comprar productos");
    } finally {
      handleSetLoading(false);
    }
  };

  const renderProduct = (item: CarritoList, index: number) => {
    const { producto, cantidad, id } = item;
    const fotos = producto?.fotos;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={fotos && fotos?.length > 0 ? fotos[0]?.url : PRODUCT_NO_IMAGE}
            fill
            alt={producto.titulo}
            className="h-full w-full object-contain object-center"
            sizes="150px"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link
                    href={
                      appRoutes.productoDetailsFullPath(
                        producto?.id,
                        currentEmpresa?.id
                      ) as any
                    }
                  >
                    {producto?.titulo}
                  </Link>
                </h3>
                <span>{producto?.descripcion}</span>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={producto?.precio} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              <span>Cantidad: {cantidad}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        {/* <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingType");
              handleScrollToEl("ShippingType");
            }}
          />
        </div> */}

        <div id="ShippingType" className="scroll-mt-24">
          <SelectShippingType
            isActive={tabActive === "ShippingType"}
            onOpenActive={() => {
              setTabActive("ShippingType");
              handleScrollToEl("ShippingType");
            }}
            onCloseActive={() => {
              if (shippingMethod === "DOMICILIO") {
                setTabActive("ShippingAddress");
                handleScrollToEl("ShippingAddress");
              } else {
                setTabActive("SelectSucursal");
                handleScrollToEl("SelectSucursal");
              }
            }}
          />
        </div>

        {shippingMethod === "DOMICILIO" && (
          <div id="ShippingAddress" className="scroll-mt-24">
            <ShippingAddress
              isActive={tabActive === "ShippingAddress"}
              onOpenActive={() => {
                setTabActive("ShippingAddress");
                handleScrollToEl("ShippingAddress");
              }}
              onCloseActive={() => {
                setTabActive("PaymentMethod");
                handleScrollToEl("PaymentMethod");
              }}
            />
          </div>
        )}

        {shippingMethod === "RETIRO" && (
          <div id="SelectSucursal" className="scroll-mt-24">
            <SelectSucursal
              isActive={tabActive === "SelectSucursal"}
              onOpenActive={() => {
                setTabActive("SelectSucursal");
                handleScrollToEl("SelectSucursal");
              }}
              onCloseActive={() => {
                setTabActive("PaymentMethod");
                handleScrollToEl("PaymentMethod");
              }}
            />
          </div>
        )}

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            setIsValid={setIsValidPayment}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {paymentSuccess && (
        <PaymentSuccessModal compraId={compraId} setOpen={() => setPaymentSuccess(false)} />
      )}
      {productos?.length === 0 && !paymentSuccess ? (
        <Page404 message="El carrito esta vacio, intenta agregar algun producto" />
      ) : (
        <main className="container py-16 lg:pb-28 lg:pt-20 ">
          <div className="mb-16">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
              Checkout
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              {errors?.length > 0 && (
                <div className="w-full h-auto mt-4 flex flex-col gap-2">
                  {errors?.map((item) => {
                    return <OneLineError message={item} key={item} />;
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">{renderLeft()}</div>

            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

            <div className="w-full lg:w-[36%] ">
              <h3 className="text-lg font-semibold">Resumen de la orden</h3>
              <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                {productos.map(renderProduct)}
              </div>

              <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                <div className="mt-4 flex justify-between py-2.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${subtotal}
                  </span>
                </div>
                {shippingMethod === "DOMICILIO" && (
                  <div className="flex justify-between py-2.5">
                    <span>Costo de envio</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      {currentEmpresa?.costoEnvio}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2.5">
                  <span>Impuestos/Iva</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ${taxes}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Total</span>
                  <span>{total ? total?.toFixed(2) : 0}</span>
                </div>
              </div>
              <ButtonPrimary
                onClick={() => handleSendOrder()}
                className="mt-8 w-full"
              >
                Confirmar orden
              </ButtonPrimary>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CheckoutPage;
