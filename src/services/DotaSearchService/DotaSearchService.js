export default class DotaSearchService {
    _apiBase = "http://95.31.249.76:322";
    cached = caches.open('resources');
    fetchCached = async (request) => {
        const response = await (await this.cached).match(request);
        if (response !== undefined){
            console.log(response);
            return response;
        }
        await (await this.cached).add(request);
        const added = await (await this.cached).match(request);
        console.log(added);
        return added;
    }
    async getResource(url) {
        const options = {
            method: "GET",
            headers: {
                "Accept": "*/*"
            },
        };
        const request = new Request(this._apiBase+url, options);
        let response = {};
        // if ('caches' in window) {
        //     response = await this.fetchCached(request);
        // } else{
            response = await fetch(request);
        // }
        if (response.status === 204) return {};
        const body = await response.json();
        if (response.statusCode === 204) body.ok = false;
        return body;
    }
    async getAllUsers(){
        const users = await this.getResource("/user");
        return Object.values(users).map(this._transformUser);
    }
    async getAllCommands(){
        const commands = await this.getResource("/command");
        return Object.values(commands).map(this._transformCommand);
    }
    async getAllMessages(all){
        let link = "/message"; if (all) link += "?all=true";
        const messages = await this.getResource(link);
        return Object.values(messages).map(this._transformMessage).sort(({Timestamp},b) => {
            if (Timestamp === b.Timestamp) return 0;
            if (Timestamp<b.Timestamp) return 1; return -1;
        });
    }
    async getMessage(id){
        const user = await this.getResource("/message/" + id);
        return this._transformMessage(user);
    }
    async getUser(id){
        const user = await this.getResource("/user/" + id);
        return this._transformUser(user);
    }
    async getCommand(id){
        const command = await this.getResource("/command/" + id);
        return this._transformCommand(command);
    }

    _transformUser(user){
        return {
            ID: user.id,
            Name: user.name,
            SteamID: user.steam_id,
            MMR: user.mmr,
            PossiblePos: user.possible_pos,
            Link: user.link,
        };
    }
    _transformCommand(command){
        return {
            ID: command.ID,
            MMR: command.MMR,
            Disperce: command.Disperse,
            FreePos: command.FreePos,
            Link: command.Link,
        };
    }
    _transformMessage(message) {
        return {
            ID: message.id,
            Data: message.data,
            Link: message.link,
            Timestamp: message.timestamp,
        };
    }
}