'use client';

import Page404 from "@/app/not-found";
import ProductDetailPage from "@/app/product-detail/page";
import useGlobal from "@/hooks/useGlobal";
import { useObtenerProductoByIdQuery } from "@/store/service/ProductoService";
import { useEffect } from "react";

const ProductDetail = ({ params }: { params: any }) => {
  const productId = Number(params?.productoId ?? 0);

  const { handleSetLoading } = useGlobal();
  const { data, isFetching: isLoadingProdInfo, error } =
    useObtenerProductoByIdQuery(productId);

  useEffect(() => {
    handleSetLoading(isLoadingProdInfo);
  }, [isLoadingProdInfo]);

  if (isLoadingProdInfo) {
    return;
  }
  if (!productId || productId === 0 || error || !data) {
    return <Page404 />;
  }

  if (!data) {
    return;
  }

  return <ProductDetailPage isEmpresa product={data} />;
};

export default ProductDetail;
