import {
  DeliveryRecordApiItem,
  Subscription
} from "../../../../shared/productResponse";
import AsyncLoader from "../../asyncLoader";

interface DeliveryProblem {
  problemType: string;
  id: string;
  ref: string;
}
export interface DeliveryProblemMap {
  [problemCaseId: string]: DeliveryProblem;
}

export interface ContactPhoneNumbers {
  id: string;
  Phone?: string;
  HomePhone?: string;
  MobilePhone?: string;
  OtherPhone?: string;
}

export type ContactPhoneNumbersType =
  | "Phone"
  | "HomePhone"
  | "MobilePhone"
  | "OtherPhone";

export interface DeliveryCredit {
  amount: number;
  invoiceDate: string | null;
  isActioned: boolean;
}

export interface DeliveryRecordDetail {
  deliveryDate: string;
  deliveryAddress: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  addressTown: string;
  addressCountry: string;
  addressPostcode: string;
  hasHolidayStop: boolean;
  id: string;
  deliveryInstruction?: string;
  isChangedDeliveryInstruction?: boolean;
  isChangedAddress?: boolean;
  problemCaseId?: string;
  credit?: DeliveryCredit;
}

export interface DeliveryRecordsResponse {
  results: DeliveryRecordApiItem[];
  deliveryProblemMap: DeliveryProblemMap;
  contactPhoneNumbers: ContactPhoneNumbers;
  subscription: Subscription;
  problemTypes: string[];
}

export interface DeliveryRecordsPostObj {
  id: string;
  creditAmount: number | undefined;
  invoiceDate: string | null | undefined;
}

export interface DeliveryRecordsPostPayload {
  productName?: string;
  description?: string;
  problemType?: string;
  repeatDeliveryProblem?: boolean;
  deliveryRecords?: DeliveryRecordsPostObj[] | null;
  newContactPhoneNumbers?: ContactPhoneNumbers;
}

export class DeliveryRecordsApiAsyncLoader extends AsyncLoader<
  DeliveryRecordsResponse
> {}

export const createDeliveryRecordsFetcher = (subscriptionId: string) => () =>
  fetch(`/api/delivery-records/${subscriptionId}`);

export const createDeliveryRecordsProblemPost = (
  subscriptionId: string,
  payload: DeliveryRecordsPostPayload
) => () =>
  fetch(`/api/delivery-records/${subscriptionId}`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
