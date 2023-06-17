import {FIXMELATER, HttpStatusCode} from "../../shared/Constants";

const defaultHeaders = {
    'Accept': '*/*',
};

export default class DotaSearchService {
    _apiBase = 'http://95.31.249.76:322';

    async getResource(url: string) {
        const options = {
            method: 'GET',
            headers: defaultHeaders,
        };
        const request = new Request(this._apiBase + url, options);

        const response = await fetch(request);
        // }
        if (response.status === HttpStatusCode.NoContent) return {};
        return response.json();
    }

    async postResource(url: string, value: FIXMELATER) {
        const response = await fetch(this._apiBase + url, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(value),
        });
        if (response.status === HttpStatusCode.TooManyRequests)
            return {error: 'Too many requests.', status: 'error'};
        if (response.status === HttpStatusCode.BadRequest)
            return {error: await response.text(), status: 'error'};
        return response.json();
    }

    async getAllUsers() {
        const users = await this.getResource('/user');
        return Object.values(users).map(this._transformUser);
    }

    async getAllCommands() {
        const commands = await this.getResource('/command');
        return Object.values(commands).map(this._transformCommand);
    }

    async getAllMessages(all: boolean) {
        let link = '/message';
        if (all) link += '?all=true';
        const messages = await this.getResource(link);
        return Object.values(messages).map(this._transformMessage).sort(({Timestamp}, b) => {
            if (Timestamp !== b.Timestamp) {
                if (Timestamp < b.Timestamp)
                    return 1;
                return -1;
            }
            return 0;
        });
    }

    async getMessage(id: string) {
        const user = await this.getResource('/message/' + id);
        return this._transformMessage(user);
    }

    async getUser(id: string) {
        const user = await this.getResource('/user/' + id);
        return this._transformUser(user);
    }

    async getCommand(id: string) {
        const command = await this.getResource('/command/' + id);
        return this._transformCommand(command);
    }

    _transformUser(user: FIXMELATER) {
        return {
            Login: user.login,
            MMR: user.mmr,
            Link: user.link,
            PossiblePos: user.possible_pos,
        };
    }

    _transformCommand(command: FIXMELATER) {
        return {
            ID: command.ID,
            MMR: command.MMR,
            Disperce: command.Disperse,
            FreePos: command.FreePos,
            Link: command.Link,
        };
    }

    _transformMessage(message: FIXMELATER) {
        return {
            ID: message.id,
            Data: message.data,
            Link: message.link,
            Timestamp: message.timestamp,
        };
    }

    _toPostPossiblePos(possiblePos: FIXMELATER) {
        return {
            hard_support: possiblePos.HardSupport,
            soft_support: possiblePos.SoftSupport,
            offlane: possiblePos.Offlane,
            midlane: possiblePos.Midlane,
            carry: possiblePos.Carry,
        };
    }

    _toPostUser(user: FIXMELATER) {
        return {
            login: user.Login,
            link: user.Link,
            mmr: Number(user.MMR),
            possible_pos: this._toPostPossiblePos(user.PossiblePos),
        };
    }

    async postUser(user: FIXMELATER) {
        return this.postResource('/user', this._toPostUser(user));
    }
}
