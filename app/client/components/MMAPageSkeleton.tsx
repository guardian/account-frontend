import { Location } from "@reach/router";
import React from "react";
import {
  GROUPED_PRODUCT_TYPES,
  PRODUCT_TYPES
} from "../../shared/productTypes";
import { shouldHaveHolidayStopsFlow } from "../productUtils";
import { MenuSpecificNavItem, NAV_LINKS } from "./nav/navConfig";
import { PageContainer } from "./page";
import { Spinner } from "./spinner";
import { WithStandardTopMargin } from "./WithStandardTopMargin";

interface LocationObject {
  title: string;
  path: string;
  selectedNavItem: MenuSpecificNavItem;
}

const manageProductLocationObjects: LocationObject[] = Object.values(
  GROUPED_PRODUCT_TYPES
).map(groupedProductType => ({
  title: `Manage ${groupedProductType.shortFriendlyName ||
    groupedProductType.friendlyName}`,
  path: `/${groupedProductType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const cancellationFlowLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
).map(productType => ({
  title: `Cancel ${productType.shortFriendlyName || productType.friendlyName}`,
  path: `/cancel/${productType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const paymentUpdateFlowLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
).map(productType => ({
  title: "Manage payment method",
  path: `/payment/${productType.urlPart}`,
  selectedNavItem: NAV_LINKS.accountOverview
}));

const holidaysOverviewLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Manage suspensions",
    path: `/suspend/${productType.urlPart}`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const deliveryAddressFormLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Update delivery details",
    path: `/delivery/${productType.urlPart}/address`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const deliveryRecordsLocationObjects: LocationObject[] = Object.values(
  PRODUCT_TYPES
)
  .filter(shouldHaveHolidayStopsFlow)
  .map(productType => ({
    title: "Delivery history",
    path: `/delivery/${productType.urlPart}/records`,
    selectedNavItem: NAV_LINKS.accountOverview
  }));

const MMALocationObjectArr: LocationObject[] = [
  {
    title: "Account overview",
    path: "/",
    selectedNavItem: NAV_LINKS.accountOverview
  },
  {
    title: "Billing",
    path: "/billing",
    selectedNavItem: NAV_LINKS.billing
  },
  ...manageProductLocationObjects,
  ...cancellationFlowLocationObjects,
  ...paymentUpdateFlowLocationObjects,
  ...holidaysOverviewLocationObjects,
  ...deliveryAddressFormLocationObjects,
  ...deliveryRecordsLocationObjects,
  {
    title: "Emails & marketing",
    path: "/email-prefs",
    selectedNavItem: NAV_LINKS.emailPrefs
  },
  {
    title: "Edit your profile",
    path: "/public-settings",
    selectedNavItem: NAV_LINKS.profile
  },
  {
    title: "Settings",
    path: "/account-settings",
    selectedNavItem: NAV_LINKS.settings
  },
  {
    title: "Help",
    path: "/help",
    selectedNavItem: NAV_LINKS.help
  }
];

const MMAPageSkeleton = () => (
  <Location>
    {({ location }) => {
      const selectedMMALocationObject = MMALocationObjectArr.filter(
        currentObject =>
          location.pathname === currentObject.path ||
          location.pathname === currentObject.path + "/"
      )[0];

      if (selectedMMALocationObject) {
        return (
          <PageContainer
            selectedNavItem={selectedMMALocationObject.selectedNavItem}
            pageTitle={selectedMMALocationObject.title}
          >
            <WithStandardTopMargin>
              <Spinner />
            </WithStandardTopMargin>
          </PageContainer>
        );
      }
    }}
  </Location>
);

export default MMAPageSkeleton;
