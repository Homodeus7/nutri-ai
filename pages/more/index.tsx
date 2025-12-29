import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { MorePage } from "@/pages/more";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(MorePage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
