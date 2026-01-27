import { getPrivateLayout } from "@/_app/pub/get-private-layout";
import { ProductDetailPage } from "@/pages/product-detail";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(ProductDetailPage, getPrivateLayout);
