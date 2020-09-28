import React, { useEffect, useState } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail
} from "../../shared/productResponse";
import { createProductDetailFetcher } from "../../shared/productTypes";
import {
  RouteableStepProps,
  visuallyNavigateToParent
} from "./wizardRouterAdapter";

export interface ProductDetailProviderProps extends RouteableStepProps {
  children: (productDetail: ProductDetail) => JSX.Element;
  allowCancelledSubscription?: true;
  loadingMessagePrefix: string;
  forceRedirectToAccountOverviewIfNoBrowserHistoryState?: true;
  subscriptionId?: string;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps) => {
  // NOTE: this react state is required so that any productDetail in the
  // 'browser history state' at the beginning of the flow is available
  // throughout the flow when re-renders occur based on route changes.
  // Without this, flows would have to pass the productDetail in the
  // browser history state in every page navigation, otherwise users
  // end up stuck on the first step they were on
  const [selectedProductDetail, setSelectedProductDetail] = useState<
    ProductDetail | null | undefined
  >();

  // Browser history state is inspected inside this hook to avoid race condition with server side rendering
  useEffect(() => {
    const productDetailFromBrowserHistoryState =
      isProduct(props.location?.state?.productDetail) &&
      props.location?.state?.productDetail;
    setSelectedProductDetail(productDetailFromBrowserHistoryState || null);
  }, []); // Equivalent to componentDidMount (ie only happens on the client)

  if (selectedProductDetail) {
    return props.children(selectedProductDetail);
  }
  // ie definitely no browser history state
  else if (selectedProductDetail === null) {
    return props.forceRedirectToAccountOverviewIfNoBrowserHistoryState ? (
      visuallyNavigateToParent(props, true)
    ) : (
      <MembersDatApiAsyncLoader
        fetch={createProductDetailFetcher(
          props.productType,
          props.subscriptionId
        )}
        render={renderSingleProductOrReturnToAccountOverview(
          props,
          setSelectedProductDetail
        )}
        loadingMessage={
          props.loadingMessagePrefix +
          " " +
          props.productType.friendlyName +
          "..."
        }
      />
    );
  }
  return null;
};

const renderSingleProductOrReturnToAccountOverview = (
  props: ProductDetailProviderProps,
  setSelectedProductDetail: (productDetail: ProductDetail) => void
) => (data: MembersDataApiItem[]) => {
  const filteredProductDetails = data
    .filter(isProduct)
    .filter(
      productDetail =>
        props.allowCancelledSubscription ||
        !productDetail.subscription.cancelledAt
    );

  if (filteredProductDetails.length === 1) {
    setSelectedProductDetail(filteredProductDetails[0]); // FIXME: Could this filtering be more precise on subscriptionId?
    return null;
  }
  return visuallyNavigateToParent(props, true); // FIXME: This seems to happen silently currently. Should some error feedback be provided, as we have users reporting they are stuck in a loop.
};
