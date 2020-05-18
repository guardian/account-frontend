import { palette } from "@guardian/src-foundations";
import { RouteComponentProps, Router } from "@reach/router";
import React from "react";
import { ProductType, WithProductType } from "../../shared/productTypes";
import { isInAccountOverviewTest } from "../accountOverviewRelease";
import { LinkButton } from "./buttons";
import { GenericErrorScreen } from "./genericErrorScreen";
import { PageContainer, PageContainerSection } from "./page";
import { ProgressBreadcrumb } from "./progressBreadcrumb";
import { ProgressCounter } from "./progressCounter";

export interface RouteableProps extends RouteComponentProps {
  path: string;
}

export type RouteableProductProps = RouteableProps &
  WithProductType<ProductType>;

export interface RouteableStepProps extends RouteableProductProps {
  currentStep?: number;
  stepLabels?: string[];
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export interface MultiRouteableProps extends RouteableStepProps {
  // TODO refactor this out by adding type params to children
  linkLabel: string;
}

export interface ButtonStyleModifierProps {
  hideBackButton?: true;
}

export interface CommonProps extends ButtonStyleModifierProps {
  extraFooterComponents?: JSX.Element | JSX.Element[];
}

interface RootComponentProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  thisStageChildren: any;
  path: string;
  children: null;
  fullWidth?: true;
}

const estimateTotal = (currentStep: number, child: any) => {
  // if(child && Array.isArray(child)) {
  //   child = child[0];
  // }
  // if (child){
  //   child.hasOwnProperty()
  // }
  // return currentStep;
  return 3; // TODO dynamically estimate total steps by recursively exploring children
};

export const visuallyNavigateToParent = (props: RouteableStepProps) => {
  if (props.navigate) {
    props.navigate("..", { replace: true }); // step back up a level
    return null;
  }
  return (
    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
  );
};

export const ReturnToYourProductButton = (
  props: WithProductType<ProductType>
) => (
  <LinkButton
    to={isInAccountOverviewTest() ? "/" : `/${props.productType.urlPart}`}
    text={"Return to your account"}
    {...(isInAccountOverviewTest() ? { colour: palette.neutral[100] } : {})}
    {...(isInAccountOverviewTest() ? { textColour: palette.neutral[0] } : {})}
    hollow
    left
  />
);

const RootComponent = (props: RootComponentProps) => (
  <>
    <PageContainer fullWidth={props.fullWidth}>
      {!!props.routeableStepProps.currentStep &&
        (props.routeableStepProps.stepLabels ? (
          <ProgressBreadcrumb
            current={props.routeableStepProps.currentStep}
            labels={props.routeableStepProps.stepLabels}
          />
        ) : (
          <PageContainerSection>
            <ProgressCounter
              current={props.routeableStepProps.currentStep}
              total={estimateTotal(
                props.routeableStepProps.currentStep,
                props.routeableStepProps.children
              )}
            />
          </PageContainerSection>
        ))}

      {props.thisStageChildren}

      <LinkButton hide={props.hideBackButton} text="Back" to=".." hollow left />
    </PageContainer>
    {props.extraFooterComponents}
  </>
);

const ThisStageContent = (props: WizardStepProps) => (
  <Router>
    <RootComponent
      {...props}
      children={null} // override passed prop from spread
      path="/"
      thisStageChildren={props.children}
    />
  </Router>
);

export interface WizardStepProps extends CommonProps {
  routeableStepProps: RouteableStepProps;
  children: any;
  fullWidth?: true;
}

export const WizardStep = (props: WizardStepProps) => (
  <>
    <ThisStageContent {...props} />
    {props.routeableStepProps.children}
  </>
);
