// import {DevSupport} from "@react-buddy/ide-toolbox";
// import {ComponentPreviews, useInitial} from "./dev";

import App from './components/app';
import {createRoot} from 'react-dom/client';
import React from 'react';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    // <DevSupport ComponentPreviews={ComponentPreviews}
    //                     useInitialHook={useInitial}>
    <App/>
// </DevSupport>
);
