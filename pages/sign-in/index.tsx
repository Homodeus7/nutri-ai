import { getOpenLayout } from "@/_app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);
