import React from "react";
import {
  Subscription,
  WithSubscription
} from "../../../../shared/productResponse";
import { createProductDetailFetcher } from "../../../../shared/productTypes";
import AsyncLoader from "../../asyncLoader";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import {
  CancellationCaseIdContext,
  CancellationReasonContext
} from "../cancellationContexts";
import { CancellationSummary, isCancelled } from "../cancellationSummary";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../caseUpdate";

class PerformCancelAsyncLoader extends AsyncLoader<WithSubscription | {}> {}

const getCancelFunc = (
  cancelApiUrlSuffix: string,
  reason: string,
  withSubscriptionResponseFetcher: () => Promise<Response>
) => async () => {
  await fetch("/api/cancel/" + cancelApiUrlSuffix, {
    credentials: "include",
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({ reason }),
    headers: { "Content-Type": "application/json" }
  }); // response is either empty or 404 - neither is useful so fetch subscription to determine cancellation result...

  return await withSubscriptionResponseFetcher();
};

const getCaseUpdateWithCancelOutcomeFunc = (
  caseId: string,
  subscription: Subscription
) => async () =>
  await getUpdateCasePromise(
    caseId,
    isCancelled(subscription)
      ? {
          Journey__c: "SV - Cancellation - MB",
          Subject: "Online Cancellation Completed"
        }
      : {
          Subject: "Online Cancellation Error"
        }
  );

const getCaseUpdatingCancellationSummary = (
  caseId: string,
  cancelType: string
) => (withSubscription: WithSubscription | {}) => {
  const subscription =
    (withSubscription as WithSubscription).subscription || {};
  return (
    <CaseUpdateAsyncLoader
      fetch={getCaseUpdateWithCancelOutcomeFunc(caseId, subscription)}
      render={() => CancellationSummary(cancelType)(subscription)}
      loadingMessage="Finalising your cancellation..."
    />
  );
};

export const ExecuteCancellation = (props: RouteableStepProps) => (
  <WizardStep routeableStepProps={props}>
    <CancellationReasonContext.Consumer>
      {reason => (
        <CancellationCaseIdContext.Consumer>
          {caseId => (
            <PerformCancelAsyncLoader
              fetch={getCancelFunc(
                props.productType.urlPart,
                reason,
                createProductDetailFetcher(props.productType)
              )}
              render={getCaseUpdatingCancellationSummary(
                caseId,
                props.productType.friendlyName
              )}
              loadingMessage="Performing your cancellation..."
            />
          )}
        </CancellationCaseIdContext.Consumer>
      )}
    </CancellationReasonContext.Consumer>
  </WizardStep>
);
