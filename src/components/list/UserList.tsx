import UserCard from "../list-item/user";
import {FIXMELATER} from "../../shared/Constants";
import {UserProps} from "../list-item/user/UserCard";
import Loader from "../common/loader";

export const UserList=(props: FIXMELATER)=>
{
    const {items, loaded} = props;
    // @ts-ignore
    if (!loaded ) return <Loader/>;
    const elements = items.map((item: UserProps) => {
        return (
            // @ts-ignore
            <li key={item.key} className="list-group-item">
                <UserCard
                    {...item}
                />
            </li>
        );
    });
    return (
        // @ts-ignore
        <ul className="list-group list">
            {elements}
        </ul>
    );
}