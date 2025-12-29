import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { LunchPage } from "@/pages/lunch";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(LunchPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
