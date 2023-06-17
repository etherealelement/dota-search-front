import './list-item.css';
import User from './user/User';
import Message from './message/Message';
import {FIXMELATER} from "../../shared/Constants";
// import Command

const ListItem = (props: FIXMELATER) => {
    switch (props.itemType) {
        case 'player':
            return <User {...props}/>;
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
