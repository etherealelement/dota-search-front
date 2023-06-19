import './list-item.css';
import UserCard, {UserProps} from './user/UserCard';
import Message, {MessageProps} from './message/Message';
import {FIXMELATER} from "../../shared/Constants";
// import Command


const ListItem = (props: MessageProps | UserProps) => {
    switch (props.itemType) {
        case 'player':
            // @ts-ignore
            return <UserCard {...props}/>;
        case 'message':
            // @ts-ignore
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
