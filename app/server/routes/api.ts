import * as Sentry from "@sentry/node";
import { Router } from "express";
import {
  isProduct,
  MDA_TEST_USER_HEADER,
  MembersDataApiItem
} from "../../shared/productResponse";
import {
  cancellationSfCasesAPI,
  deliveryRecordsAPI,
  holidayStopAPI,
  invoicingAPI
} from "../apiGatewayDiscovery";
import {
  customMembersDataApiHandler,
  membersDataApiHandler,
  proxyApiHandler,
  straightThroughBodyHandler
} from "../apiProxy";
import { conf } from "../config";
import { augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday } from "../fulfilmentDateCalculatorReader";
import { log } from "../log";
import { withIdentity } from "../middleware/identityMiddleware";
import { stripeSetupIntentHandler } from "../stripeSetupIntentsHandler";

const router = Router();

router.use(withIdentity(401));

router.get(
  "/existing-payment-options",
  membersDataApiHandler(
    "user-attributes/me/existing-payment-options",
    "MDA_EXISTING_PAYMENT_OPTIONS"
  )
);

router.get(
  "/me/mma/:subscriptionName?",
  customMembersDataApiHandler((response, body) => {
    const isTestUser = response.getHeader(MDA_TEST_USER_HEADER) === "true";
    const augmentedWithTestUser = (JSON.parse(
      body
    ) as MembersDataApiItem[]).map(mdaItem => ({
      ...mdaItem,
      isTestUser
    }));
    Promise.all(
      augmentedWithTestUser
        .filter(isProduct)
        // TODO move this to members-data-api, so we can eliminate this customMembersDataApiHandler
        .map(augmentProductDetailWithDeliveryAddressChangeEffectiveDateForToday)
    )
      .then(_ => {
        response.json(_);
      })
      .catch(error => {
        const errorMessage =
          "Unexpected error when augmenting members-data-api response with 'deliveryAddressChangeEffectiveDate'";
        log.error(errorMessage, error);
        Sentry.captureMessage(errorMessage);
        response.json(augmentedWithTestUser); // fallback to sending sending the response augmented with just isTestUser
      });
  })(
    "user-attributes/me/mma/:subscriptionName",
    "MDA_DETAIL",
    true,
    "subscriptionName"
  )
);

router.post(
  "/cancel/:subscriptionName?",
  membersDataApiHandler(
    "/user-attributes/me/cancel/:subscriptionName",
    "MDA_CANCEL",
    false,
    "subscriptionName"
  )
);

router.post("/payment/card", stripeSetupIntentHandler);
router.post(
  "/payment/card/:subscriptionName",
  membersDataApiHandler(
    "/user-attributes/me/update-card/:subscriptionName",
    "MDA_UPDATE_PAYMENT_CARD",
    false,
    "subscriptionName"
  )
);
router.post(
  "/payment/dd/:subscriptionName",
  membersDataApiHandler(
    "/user-attributes/me/update-direct-debit/:subscriptionName",
    "MDA_UPDATE_PAYMENT_DIRECT_DEBIT",
    false,
    "subscriptionName"
  )
);

router.post(
  "/validate/payment/dd",
  proxyApiHandler("payment." + conf.API_DOMAIN)(straightThroughBodyHandler)(
    "direct-debit/check-account",
    "PAPI_VALIDATE_DIRECT_DEBIT",
    true
  )
);

router.post(
  "/case/:caseId?",
  cancellationSfCasesAPI("case", "CREATE_CANCELLATION_CASE")
);
router.patch(
  "/case/:caseId?",
  cancellationSfCasesAPI("case/:caseId", "UPDATE_CANCELLATION_CASE", "caseId")
);

router.get(
  "/holidays/:subscriptionName/potential",
  holidayStopAPI(
    "potential/:subscriptionName",
    "HOLIDAY_STOP_POTENTIALS",
    "subscriptionName"
  )
);
router.get(
  "/holidays/:subscriptionName/cancel",
  holidayStopAPI(
    "hsr/:subscriptionName/cancel",
    "HOLIDAY_STOP_CANCELLATION_PREVIEW",
    "subscriptionName"
  )
);
router.get(
  "/holidays/:subscriptionName",
  holidayStopAPI(
    "hsr/:subscriptionName",
    "HOLIDAY_STOP_EXISTING",
    "subscriptionName"
  )
);
router.post("/holidays", holidayStopAPI("/hsr", "HOLIDAY_STOP_CREATE"));
router.patch(
  "/holidays/:subscriptionName/:sfId",
  holidayStopAPI(
    "hsr/:subscriptionName/:sfId",
    "HOLIDAY_STOP_AMEND",
    "subscriptionName",
    "sfId"
  )
);
router.delete(
  "/holidays/:subscriptionName/:sfId",
  holidayStopAPI(
    "hsr/:subscriptionName/:sfId",
    "HOLIDAY_STOP_WITHDRAW",
    "subscriptionName",
    "sfId"
  )
);

router.get(
  "/delivery-records/:subscriptionName",
  deliveryRecordsAPI(
    "delivery-records/:subscriptionName",
    "DELIVERY_RECORDS_GET",
    "subscriptionName"
  )
);
router.get(
  "/delivery-records/:subscriptionName/cancel",
  deliveryRecordsAPI(
    "delivery-records/:subscriptionName/cancel",
    "DELIVERY_RECORDS_CANCELLATION_PREVIEW",
    "subscriptionName"
  )
);
router.post(
  "/delivery-records/:subscriptionName",
  deliveryRecordsAPI(
    "delivery-records/:subscriptionName",
    "DELIVERY_PROBLEM_CREATE",
    "subscriptionName"
  )
);

router.put(
  "/delivery/address/update/:contactId",
  membersDataApiHandler(
    "/user-attributes/me/delivery-address/:contactId",
    "MDA_DELIVERY_ADDRESS_UPDATE",
    false,
    "contactId"
  )
);

router.get("/invoices", invoicingAPI("invoices", "LIST_INVOICES"));

export default router;
