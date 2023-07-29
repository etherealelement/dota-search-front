import './Message.css';

export class MessageProps {
    Data: string = '';
    Link: string = '';
    Timestamp: number | string = '';
    itemType: string = '';
}

const Message = (props: MessageProps) => {
    return (
        // @ts-ignore
        <div className="row-cols-sm-1 container-fluid list-item list-group-item">
            <div className="col">
          <span className="list-item-label float-lg-start">
            {props.Data}
          </span>
            </div>
            <div className="col float-right">
                <div className="row float-lg-end">
                    <a href={props.Link} className="float-lg-end link-success">
                        {props.Link}
                    </a>
                    <time className="time">{new Date(props.Timestamp).toLocaleString()}</time>
                </div>
            </div>
        </div>
    );
};


export default Message;
