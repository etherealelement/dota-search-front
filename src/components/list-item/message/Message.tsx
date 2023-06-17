import './Message.css';

class MessageProps {
    Data: string = '';
    Link: string = '';
    Timestamp: number | string = '';
}

const Message = (props: MessageProps) => {
    return (
        <div className="row-cols-sm-1">
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
                    <time className="time"
                          dateTime={new Date(props.Timestamp).toISOString()}>{new Date(props.Timestamp).toLocaleString()}</time>
                </div>
            </div>
        </div>
    );
};


export default Message;
