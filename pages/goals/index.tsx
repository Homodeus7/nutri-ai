import { getPrivateLayout } from "@/_app/pub/get-private-layout";
import { GoalsPage } from "@/pages/goals";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(GoalsPage, getPrivateLayout);
