import * as Sentry from "@sentry/browser";
import { getMainPlan, ProductDetail } from "../shared/productResponse";
import { GROUPED_PRODUCT_TYPES } from "../shared/productTypes";
import { s3FilePromise } from "./awsIntegration";
import { conf } from "./config";
import { log } from "./log";

interface RawFulfilmentDateCalculatorDates {
  [dayOfWeek: string]: {
    deliveryAddressChangeEffectiveDate?: string;
    // there are a number of other fields, but we don't need them
  };
}

const getDeliveryAddressChangeEffectiveDateForToday = async (
  filenameProductPart: string,
  daysOfWeek: string[]
) => {
  const datesByDayOfWeek = await s3FilePromise<
    RawFulfilmentDateCalculatorDates
  >(
    `fulfilment-date-calculator-${conf.STAGE.toLowerCase()}`,
    `${filenameProductPart}/${new Date()
      .toISOString()
      .substr(0, 10)}_${filenameProductPart}.json`,
    ...daysOfWeek
  );
  return (
    datesByDayOfWeek &&
    daysOfWeek.reduce((earliestAcc, dayOfWeek) => {
      const deliveryAddressChangeEffectiveDateStr =
        datesByDayOfWeek[dayOfWeek].deliveryAddressChangeEffectiveDate;
      if (
        !earliestAcc ||
        !deliveryAddressChangeEffectiveDateStr ||
        new Date(earliestAcc) > new Date(deliveryAddressChangeEffectiveDateStr)
      ) {
        return deliveryAddressChangeEffectiveDateStr || "";
      }
      return earliestAcc;
    }, "")
  );
};

export const augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday = async (
  productDetail: ProductDetail
) => {
  const productType = GROUPED_PRODUCT_TYPES.subscriptions.mapGroupedToSpecific(
    productDetail
  );
  const maybeFulfilmentDateCalculatorProductFilenamePart =
    productType.fulfilmentDateCalculator?.productFilenamePart;
  const maybeExplicitSingleDayOfWeek =
    productType.fulfilmentDateCalculator?.explicitSingleDayOfWeek;
  const maybeDaysOfWeek = maybeExplicitSingleDayOfWeek
    ? [maybeExplicitSingleDayOfWeek]
    : getMainPlan(productDetail.subscription).daysOfWeek;
  const maybeDeliveryAddressChangeEffectiveDate =
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    maybeDaysOfWeek &&
    (await getDeliveryAddressChangeEffectiveDateForToday(
      maybeFulfilmentDateCalculatorProductFilenamePart,
      maybeDaysOfWeek
    ));
  if (
    maybeFulfilmentDateCalculatorProductFilenamePart &&
    !(maybeDeliveryAddressChangeEffectiveDate && maybeDaysOfWeek)
  ) {
    const errorMessage = `Expected 'deliveryAddressChangeEffectiveDate' to be available for ${productType.friendlyName}, but wasn't.`;
    log.error(errorMessage);
    Sentry.captureMessage(errorMessage);
  }
  return maybeDeliveryAddressChangeEffectiveDate
    ? {
        ...productDetail,
        subscription: {
          ...productDetail.subscription,
          deliveryAddressChangeEffectiveDate: maybeDeliveryAddressChangeEffectiveDate
        }
      }
    : productDetail;
};
