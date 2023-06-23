import {FIXMELATER, HttpStatusCode} from "../../shared/Constants";
import {Player, Positions} from "../../shared";

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

        return await fetch(request);
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
        return response;
    }

    async getAllPlayers() {
        const response = await this.getResource('/player');
        if ([HttpStatusCode.NoContent, HttpStatusCode.TooManyRequests].includes(response.status)) return [];
        const users = await response.json();
        return Object.values(users).map(this._transformUser);
    }

    async getAllCommands() {
        const response = await this.getResource('/command');
        if ([HttpStatusCode.NoContent, HttpStatusCode.TooManyRequests].includes(response.status)) return [];
        const commands = await response.json();
        return Object.values(commands).map(this._transformCommand);
    }

    async getAllMessages(all: boolean) {
        let link = '/message';
        if (all) link += '?all=true';
        const response = await this.getResource(link);
        if (response.status === HttpStatusCode.NoContent) return [];
        const messages = await response.json();
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
        const user = await this.getResource('/player/' + id);
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
            PossiblePos: Positions.FromArray(user.possible_pos),
        };
    }

    _transformCommand(command: FIXMELATER) {
        return {
            Login: command.data,
            MMR: command.mmr,
            Link: command.link,
            PossiblePos: Positions.FromArray(command.possible_pos),
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

    _toPostPossiblePos(possiblePos: Positions) {
        return Positions.ToArray(possiblePos);
    }

    _toPostUser(user: Player) {
        return {
            login: user.Login,
            link: user.Link,
            mmr: Number(user.MMR),
            possible_pos: this._toPostPossiblePos(user.PossiblePos),
        };
    }

    async postPlayer(user: Player) {
        console.log("posting user: ", user);
        return this.postResource('/player', this._toPostUser(user));
    }

    _toPostCommand(command: Player) {
        return {
            data: command.Login,
            link: command.Link,
            mmr: Number(command.MMR),
            possible_pos: this._toPostPossiblePos(command.PossiblePos),
        };
    }

    async postCommand(command: Player) {
        console.log("posting command: ", command);
        return this.postResource('/command', this._toPostCommand(command));
    }
}
