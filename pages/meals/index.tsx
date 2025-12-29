import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { MealsPage } from "@/pages/meals";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(MealsPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
