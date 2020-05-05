import { css, Global } from "@emotion/core";
import { Redirect, Router, ServerLocation } from "@reach/router";
import React from "react";
import {
  hasCancellationFlow,
  hasDeliveryFlow,
  hasDeliveryRecordsFlow,
  hasProductPageRedirect,
  ProductType,
  ProductTypes,
  ProductTypeWithCancellationFlow,
  ProductTypeWithDeliveryRecordsProperties,
  ProductTypeWithHolidayStopsFlow,
  ProductTypeWithProductPageProperties,
  shouldCreatePaymentUpdateFlow,
  shouldHaveHolidayStopsFlow
} from "../../shared/productTypes";
import {
  hasProductPageProperties,
  ProductTypeWithProductPageRedirect
} from "../../shared/productTypes";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CancellationFlow } from "./cancel/cancellationFlow";
import { CancellationReason } from "./cancel/cancellationReason";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import {
  ConsentsBanner,
  SuppressConsentBanner
} from "./consent/consentsBanner";
import { DeliveryAddressEditConfirmation } from "./delivery/address/deliveryAddressEditConfirmation";
import { DeliveryAddressForm } from "./delivery/address/deliveryAddressForm";
import { DeliveryRecords } from "./delivery/records/deliveryRecords";
import { DeliveryRecordsProblemConfirmation } from "./delivery/records/deliveryRecordsProblemConfirmation";
import { DeliveryRecordsProblemReview } from "./delivery/records/deliveryRecordsProblemReview";

import { AccountOverview } from "./accountoverview/accountOverview";
import { ManageContribution } from "./accountoverview/manageContribution";
import { ManageMembership } from "./accountoverview/manageMembership";
import { ManageSubscription } from "./accountoverview/manageSubscription";
import { DeliveryAddressReview } from "./delivery/address/deliveryAddressReview";
import { Help } from "./help";
import { HolidayConfirmed } from "./holiday/holidayConfirmed";
import { HolidayDateChooser } from "./holiday/holidayDateChooser";
import { HolidayReview } from "./holiday/holidayReview";
import { HolidaysOverview } from "./holiday/holidaysOverview";
import { EmailAndMarketing } from "./identity/EmailAndMarketing";
import { PublicProfile } from "./identity/PublicProfile";
import { Settings } from "./identity/Settings";
import { Main } from "./main";
import { NotFound } from "./notFound";
import { ConfirmPaymentUpdate } from "./payment/update/confirmPaymentUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { PaymentUpdateFlow } from "./payment/update/updatePaymentFlow";
import { ProductPage } from "./productPage";
import { RedirectOnMeResponse } from "./redirectOnMeResponse";

const User = () => (
  <Main>
    <Global styles={css(`${global}`)} />
    <Global styles={css(`${fonts}`)} />

    <Router>
      <RedirectOnMeResponse path="/" />

      <AccountOverview path="/account-overview" />

      {Object.values(ProductTypes).map((productType: ProductType) => {
        if (
          productType.productPage === "subscriptions" ||
          (typeof productType.productPage === "object" &&
            productType.productPage?.title === "Subscriptions")
        ) {
          return (
            <ManageSubscription
              key={productType.urlPart}
              path={"/manage/subscription"}
              productType={productType}
            />
          );
        }
        if (
          productType.productPage === "contributions" ||
          (typeof productType.productPage === "object" &&
            productType.productPage?.title === "Contributions")
        ) {
          return (
            <ManageContribution
              key={productType.urlPart}
              path={"/manage/contribution"}
              productType={productType}
            />
          );
        }
        if (
          productType.productPage === "membership" ||
          (typeof productType.productPage === "object" &&
            productType.productPage?.title === "Membership")
        ) {
          return (
            <ManageMembership
              key={productType.urlPart}
              path={"/manage/membership"}
              productType={productType}
            />
          );
        }
      })}

      {Object.values(ProductTypes)
        .filter(hasProductPageProperties)
        .map((productType: ProductTypeWithProductPageProperties) => (
          <ProductPage
            key={productType.urlPart}
            path={"/" + productType.urlPart}
            productType={productType}
          />
        ))}
      {Object.values(ProductTypes)
        .filter(hasProductPageRedirect)
        .map((productType: ProductTypeWithProductPageRedirect) => (
          <Redirect
            key={productType.urlPart}
            from={"/" + productType.urlPart}
            to={"/" + productType.productPage}
            noThrow
          />
        ))}
      {Object.values(ProductTypes)
        .filter(hasCancellationFlow)
        .map((productType: ProductTypeWithCancellationFlow) => (
          <CancellationFlow
            key={productType.urlPart}
            path={"/cancel/" + productType.urlPart}
            productType={productType}
          >
            {productType.cancellation.reasons.map(
              (reason: CancellationReason) => (
                <GenericSaveAttempt
                  path={reason.reasonId}
                  productType={productType}
                  reason={reason}
                  key={reason.reasonId}
                  linkLabel={reason.linkLabel}
                >
                  <ExecuteCancellation
                    path="confirmed"
                    productType={productType}
                  />
                </GenericSaveAttempt>
              )
            )}
          </CancellationFlow>
        ))}

      {Object.values(ProductTypes)
        .filter(shouldCreatePaymentUpdateFlow)
        .map((productType: ProductType) => (
          <PaymentUpdateFlow
            key={productType.urlPart}
            path={"/payment/" + productType.urlPart}
            productType={productType}
          >
            <ConfirmPaymentUpdate path="confirm" productType={productType}>
              <PaymentUpdated path="updated" productType={productType} />
            </ConfirmPaymentUpdate>
          </PaymentUpdateFlow>
        ))}

      {Object.values(ProductTypes)
        .filter(shouldHaveHolidayStopsFlow)
        .map((productType: ProductTypeWithHolidayStopsFlow) => (
          <HolidaysOverview
            key={productType.urlPart}
            path={"/suspend/" + productType.urlPart}
            productType={productType}
            currentStep={0}
          >
            <HolidayDateChooser
              path="create"
              productType={productType}
              currentStep={1}
            >
              <HolidayReview
                path="review"
                productType={productType}
                currentStep={2}
              >
                <HolidayConfirmed
                  path="confirmed"
                  productType={productType}
                  currentStep={3}
                />
              </HolidayReview>
            </HolidayDateChooser>
            <HolidayDateChooser
              path="amend"
              productType={productType}
              currentStep={1}
              requiresExistingHolidayStopToAmendInContext
            >
              <HolidayReview
                path="review"
                productType={productType}
                currentStep={2}
              >
                <HolidayConfirmed
                  path="confirmed"
                  productType={productType}
                  currentStep={3}
                />
              </HolidayReview>
            </HolidayDateChooser>
          </HolidaysOverview>
        ))}

      {Object.values(ProductTypes)
        .filter(hasDeliveryFlow)
        .map((productType: ProductType) => (
          <DeliveryAddressForm
            key={productType.urlPart}
            path={`/delivery/${productType.urlPart}/address`}
            productType={productType}
          >
            <DeliveryAddressReview path="review" productType={productType}>
              <DeliveryAddressEditConfirmation
                path="confirmed"
                productType={productType}
              />
            </DeliveryAddressReview>
          </DeliveryAddressForm>
        ))}

      {Object.values(ProductTypes)
        .filter(hasDeliveryRecordsFlow)
        .map((productType: ProductTypeWithDeliveryRecordsProperties) => (
          <DeliveryRecords
            key={productType.urlPart}
            path={`/delivery/${productType.urlPart}/records`}
            productType={productType}
          >
            <DeliveryRecordsProblemReview
              path="review"
              productType={productType}
            >
              <DeliveryRecordsProblemConfirmation
                path="confirmed"
                productType={productType}
              />
            </DeliveryRecordsProblemReview>
          </DeliveryRecords>
        ))}

      <EmailAndMarketing path="/email-prefs" />

      <PublicProfile path="/public-settings" />

      <Settings path="/account-settings" />

      <Help path="/help" />

      <NotFound default={true} />
    </Router>
    <Router>
      <SuppressConsentBanner path="/payment/*" />
      <ConsentsBanner default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <>
    <ServerLocation url={url}>
      <User />
    </ServerLocation>
  </>
);

export const BrowserUser = (
  <>
    <AnalyticsTracker />
    <User />
  </>
);
