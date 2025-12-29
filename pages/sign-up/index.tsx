import { getOpenLayout } from "@/_app/pub/get-open-layout";
import { SignUpPage } from "@/pages/sign-up";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignUpPage, getOpenLayout);
