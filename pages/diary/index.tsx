import { getPrivateLayout } from "@/_app/pub/get-private-layout";
import { DiaryPage } from "@/pages/diary";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(DiaryPage, getPrivateLayout);
