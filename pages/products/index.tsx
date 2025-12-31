import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { ProductsPage } from "@/pages/products";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(ProductsPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
