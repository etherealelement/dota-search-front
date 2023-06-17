import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import GlobalCache from "./services/Cache";
// import DotaSearchService from "./services/DotaSearchService";
const cache = new GlobalCache()
// const api = new DotaSearchService();
// const users = await api.getAllUsers();
// const commands = await api.getAllCommands();
// const messages = await api.getAllMessages();
// const tostring = (val) =>{
//     return val.Name + " steam: " + val.SteamID + " mmr: " + val.MMR + " pos: " + val.PossiblePos;
// };
// console.log("Got list from api: ", users.map(tostring))
// ReactDOM.render(<App users={users} commands={commands} messages={messages}/>,
ReactDOM.render(<App cache={cache}/>,
// ReactDOM.render(<App />,
        document.getElementById('root'));
