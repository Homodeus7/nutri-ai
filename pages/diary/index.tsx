import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/_app/pub/get-private-layout";
import { DiaryPage } from "@/pages/diary";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(DiaryPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
