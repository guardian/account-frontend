import { Globals } from "../globals";
declare var WEBPACK_BUILD: string;
declare var WEBPACK_ENVIRONMENT: string;

/**
 * https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */

const raven = (dsn: string | null) => {
  return dsn
    ? ` 
    <script src=https://cdn.ravenjs.com/3.24.0/raven.min.js
    crossorigin=anonymous></script>
    <script>
  Raven.config('${dsn}', {
    release: '${WEBPACK_BUILD}',
    environment: '${WEBPACK_ENVIRONMENT}',
  }).install()
 </script>`
    : "";
};

const insertGlobals = (globals: Globals) => {
  return `<script>
  window.guardian = ${JSON.stringify(globals)}
  </script>`;
};

const html: (
  _: {
    readonly body: string;
    readonly title: string;
    readonly src: string;
    readonly dsn: string | null;
    readonly globals: Globals;
  }
) => string = ({ body, title, src, dsn, globals }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${insertGlobals(globals)}
      <link rel="shortcut icon" type="image/png" href="https://assets.guim.co.uk/images/favicons/48bc5564bb01b74cf7cd1a08ae0dd98e/32x32.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
      </body>
     ${raven(dsn)}
      <script src="${src}"></script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-51507017-5"></script>
  </html>
`;

export default html;
