import './app-header.css';

// @ts-ignore
const AppHeader = ({players, commands, messages}) => {
    // @ts-ignore
    return (
        // @ts-ignore
        <div className="app-header d-flex">
            <h1>Dota search</h1>
            <h2>{messages} messages, {commands} commands, {players} players</h2>
        </div>
    );
};

export default AppHeader;
