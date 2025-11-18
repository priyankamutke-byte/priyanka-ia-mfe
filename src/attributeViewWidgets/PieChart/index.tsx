import { getBasePath } from "@clearblade/ia-mfe-core";
import { AppProviders } from "@clearblade/ia-mfe-react";
import { Subscribe } from "@react-rxjs/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import singleSpaReact from "single-spa-react";
import PieChartWidget from "./PieChartWidget";

function PieChartRoot(props) {
  return (
    <AppProviders>
      <BrowserRouter basename={getBasePath()}>
        <Subscribe>
          <PieChartWidget {...props} />
        </Subscribe>
      </BrowserRouter>
    </AppProviders>
  );
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: PieChartRoot,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
