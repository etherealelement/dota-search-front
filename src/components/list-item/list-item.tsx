import './list-item.css';
import PlayerCard, {PlayerProps} from './player/PlayerCard';
import Message, {MessageProps} from './message/Message';
import CommandCard from "./command/CommandCard";
// import Command


const ListItem = (props: MessageProps | PlayerProps) => {
    switch (props.itemType) {
        case 'player':
            // @ts-ignore
            return <PlayerCard {...props}/>;
        case 'message':
            // @ts-ignore
            return <Message {...props}/>;
        case 'command':
            console.log("rendering command:", props);
            // @ts-ignore
            return <CommandCard {...props}/>;
        default:
            return (
                <div className="container-fluid list-item">
                    <div className="row">
                        {JSON.stringify(props)}
                    </div>
                </div>
            );
    }
};

export default ListItem;
