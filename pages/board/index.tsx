import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/app/pub/get-private-layout";
import { BoardPage } from "@/pages/board";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(BoardPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
