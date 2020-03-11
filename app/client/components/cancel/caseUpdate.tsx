import { MDA_TEST_USER_HEADER } from "../../../shared/productResponse";
import AsyncLoader from "../asyncLoader";

export interface CaseUpdateResponse {
  message: string;
}

export class CaseUpdateAsyncLoader extends AsyncLoader<CaseUpdateResponse> {}

export const getUpdateCasePromise = (
  isTestUser: boolean,
  caseId: string,
  body: object
) =>
  fetch("/api/case/" + caseId, {
    credentials: "include",
    method: "PATCH",
    mode: "same-origin",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });
