import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/app/pub/get-private-layout";
import { BoostPage } from "@/pages/boost";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(BoostPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
