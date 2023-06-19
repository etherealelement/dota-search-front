import './list-item.css';
import UserCard from './user/UserCard';
import Message from './message/Message';
import {FIXMELATER} from "../../shared/Constants";
// import Command


const ListItem = (props: FIXMELATER) => {
    switch (props.itemType) {
        case 'player':
            const playerPositions = JSON.stringify(Object.entries(props.PossiblePos)
                .filter(([a, b]) => b)
                .map(([a, b])=>a))
                .replace('[', '')
                .replace(']', '')
                .replaceAll('"', '')
                .replaceAll(',', ', ');
            // @ts-ignore
            return <UserCard {...props} playerPositions={playerPositions}/>;
        case 'message':
            return <Message {...props}/>;
        // case 'command':
        //     console.log("item has:", props);
        //   return new Command({...this.props});
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
