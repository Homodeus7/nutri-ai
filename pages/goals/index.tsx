import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { GoalsPage } from "@/pages/goals";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(GoalsPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
