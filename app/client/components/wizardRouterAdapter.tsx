import { Router } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { Button, LinkButton } from "./buttons";
import { ProgressCounter } from "./progressCounter";

export interface RouteableProps {
  path: string;
  currentStep: number;
  children?: any; // TODO ReactElement<RouteableProps> | ReactElement<MultiRouteableProps>[];
}

export interface MultiRouteableProps extends RouteableProps {
  // TODO is this is still needed??
  linkLabel: string;
}

interface RootComponentProps {
  routeableProps: RouteableProps;
  thisStageChildren: any;
  path: string;
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

export const ReturnToYourAccountButton = () => (
  <div css={{ marginLeft: "-100px", marginTop: "50px" }}>
    <a href={"https://profile." + window.guardian.domain + "/membership/edit"}>
      <Button
        text="Return to your account"
        textColor={palette.white}
        left
        color={palette.neutral["2"]}
      />
    </a>
  </div>
);

const RootComponent = (props: RootComponentProps) => (
  <div>
    <div css={{ padding: "0 50px 40px 50px" }}>
      <ProgressCounter
        current={props.routeableProps.currentStep}
        total={estimateTotal(
          props.routeableProps.currentStep,
          props.routeableProps.children
        )}
      />
    </div>
    {props.thisStageChildren}
    <div
      css={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <ReturnToYourAccountButton />
      <div>{getForwardNavigationIfApplicable(props.routeableProps)}</div>
    </div>
  </div>
);

const ThisStageContent = (props: WizardStepProps) => (
  <Router>
    <RootComponent
      path="/"
      thisStageChildren={props.children}
      routeableProps={props.routeableProps}
    />
  </Router>
);

const getForwardNavigationIfApplicable = (routeableProps: RouteableProps) => {
  if (
    routeableProps.children &&
    routeableProps.children.props.children &&
    !Array.isArray(routeableProps.children.props.children)
  ) {
    const childProps: MultiRouteableProps =
      routeableProps.children.props.children.props;
    return (
      <LinkButton
        to={childProps.path}
        text={
          childProps.linkLabel ? childProps.linkLabel : "Continue Cancellation"
        }
        textColor={palette.white}
        color={palette.neutral["2"]}
      />
    );
  }
};

export interface WizardStepProps {
  routeableProps: RouteableProps;
  children: any;
}

export const WizardStep = (props: WizardStepProps) => (
  <React.Fragment>
    <ThisStageContent
      children={props.children}
      routeableProps={props.routeableProps}
    />
    {props.routeableProps.children}
  </React.Fragment>
);
