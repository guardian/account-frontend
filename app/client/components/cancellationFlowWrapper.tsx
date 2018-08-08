import React from "react";
import { MeResponse } from "../../shared/meResponse";
import AsyncLoader from "./asyncLoader";
import { GenericErrorScreen } from "./genericErrorScreen";

const renderChildrenIfValidated = (props: CheckFlowIsValidProps) => (
  me: MeResponse
) => (props.validator(me) ? <>{props.children}</> : <GenericErrorScreen />);

const fetchMe: () => Promise<Response> = async () =>
  await fetch("/api/me", { credentials: "include" });

class MeAsyncLoader extends AsyncLoader<MeResponse> {}

export interface CheckFlowIsValidProps {
  children: any;
  validator: (me: MeResponse) => boolean;
  checkingFor: string;
}

export const CheckFlowIsValid = (props: CheckFlowIsValidProps) => (
  <MeAsyncLoader
    fetch={fetchMe}
    render={renderChildrenIfValidated(props)}
    loadingMessage={"Confirming you have a " + props.checkingFor + "..."}
  />
);
