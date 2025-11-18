const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cb",
    projectName: "ia-microfrontends",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    entry: {
      attributeViewWidgets_GateStatus: path.resolve(
        __dirname,
        "src/attributeViewWidgets/GateStatus/index.tsx"
      ),
      attributeViewWidgets_TrackStatus: path.resolve(
        __dirname,
        "src/attributeViewWidgets/TrackStatus/index.tsx"
      ),
      attributeViewWidgets_PieChart: path.resolve(
        __dirname,
        "src/attributeViewWidgets/PieChart/index.tsx"
      ),
      dashboards_MqttSubscriptionDashboard: path.resolve(
        __dirname,
        "src/dashboards/MqttSubscriptionDashboard/index.tsx"
      ),
    },
    externals: [
      "@clearblade/ia-mfe-core",
      "@clearblade/ia-mfe-react",
      "react-query",
      "@material-ui/core",
      "@material-ui/icons",
      "@material-ui/lab",
      "react-router-dom",
      "single-spa",
    ],
  });
};
