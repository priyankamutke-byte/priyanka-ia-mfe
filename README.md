# ia-microfrontends

This repository is a [single-spa](https://single-spa.js.org/) application that hosts all pre-made microfrontends ("mfes") available for usage within the Intelligent Assets application.

### What is a microfrontend (mfe)?

Single-spa allows us to connect independently-running applications into our root IA app and display them as pieces of our app. They can be developed and deployed separately from our root app while still being integrated and displayed as needed. Once a mfe insertion point has been set up within IA, you can develop your mfe and enter your mfe’s URL using IA’s UI at the desired insertion point.

### Categories

Each directory in the root/src of this repository represents a category of mfes, and corresponds to an insertion point that has been set up within IA for rendering mfes. This repository provides multiple entry points, allowing us to expose multiple mfes from within multiple categories, all under the umbrella of a single application.

- attributeEditWidgets - custom widgets used to edit asset or area attribute values
- attributeViewWidgets - custom widgets used to view the value of your asset or area's attribute
- dashboards - custom dashboards used to replace an entire dashboard with your own display

### How to use one of these microfrontends

- If you'd like to use an existing mfe, you only need to provide a url within the IA app that points to the released mfe.
- Urls are in the format of: `https://cdn.jsdelivr.net/gh/ClearBlade/ia-microfrontends@RELEASE_VERSION/CATEGORY/dist/MFE_ENTRY_NAME.js` (e.g. `https://cdn.jsdelivr.net/gh/ClearBlade/ia-microfrontends@0.0.1/dist/attributeViewWidgets_GateStatus.js`).

### Adding a new category

1. First make sure your category corresponds to a new mfe insertion point within Intelligent Assets.
2. Create a new category directory that relates to the name of the insertion point type of your mfe.

### Adding a new mfe to a category

1. Create a new directory within the category directory (e.g. src/attributeViewWidgets/GateStatus/)
2. Add a new entry point to the webpack.config.js, pointing to your entry file. Please follow the naming convention for your webpack entry point of `<CategoryName>_<YourMfeName>`. See entry files for GateStatus or TrackStatus regarding usage of `singleSpaReact` and lifecycles to understand how to set up your index file.
3. Local development:
   - Make sure to `npm install` from the root of the repository before beginning.
   - `npm run start` from the root the repository. This will run all entry points in the webpack.config.js.
   - You should be able to point to your individual mfe entry point url from the Intelligent Assets insertion point with this format: `http://localhost:8081/attributeViewWidgets_GateStatus.js`. The port `8081` will vary depending on which port your local server is running on.
   - Develop the UI you would like to render.
4. Publishing for production:
   - `npm run build:webpack` from the root of the repository. This will create a dist folder of built code.
   - Commit and push the changes to the dist.
   - Create a new release on Github, using semver to indicate major, minor, and patch updates.
   - Using [jsDelivr](https://www.jsdelivr.com/?docs=gh) create a link to your mfe using the tag of the latest release you just created (e.g. `https://cdn.jsdelivr.net/gh/ClearBlade/ia-microfrontends@0.0.1/dist/attributeViewWidgets_GateStatus.js`).

### Additional documentation

- For additional documentation and tips on developing your mfe see [here] ([https://docs.clearblade.com/ia/microfrontend-types-and-props](https://docs.clearblade.com/ia/developing-microfrontends))
