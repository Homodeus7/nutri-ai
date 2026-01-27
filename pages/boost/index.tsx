import { getPrivateLayout } from "@/_app/pub/get-private-layout";
import { BoostPage } from "@/pages/boost";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(BoostPage, getPrivateLayout);
