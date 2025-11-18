import React from 'react';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import singleSpaReact from "single-spa-react";
import { getBasePath } from "@clearblade/ia-mfe-core";
import { AppProviders } from "@clearblade/ia-mfe-react";
import { MqttSubscriptionDashboard } from "./MqttSubscriptionDashboard";

function Root(props: any) {
  return (
    <AppProviders>
      <BrowserRouter basename={getBasePath()}>
        <MqttSubscriptionDashboard {...props} />
      </BrowserRouter>
    </AppProviders>
  );
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return (
      <div>
        <h1>Error</h1>
        <p>{err.message}</p>
        <p>{info.componentStack}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

export default MqttSubscriptionDashboard; 