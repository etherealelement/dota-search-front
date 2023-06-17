export default class DotaSearchService {
    _apiBase = "http://95.31.249.76:322";
    async getResource(url) {
        const res = await fetch(this._apiBase+url, {headers: {"Accept": "*/*"}});
        if (res.status === 204) return {};
        const body = await res.json();
        if (res.statusCode === 204) body.ok = false;
        return body;
    }
    async getAllUsers(){
        const users = await this.getResource("/user");
        let a = []
        for (const p in users){
            a.push(users[p])
        }
        return a.map(this._transformUser);
    }
    async getAllCommands(){
        const commands = await this.getResource("/command");
        let a = []
        for (const p in commands){
            console.log("prop: ", p, ", val: ", commands[p]);
            a.push(commands[p])
        }
        return a.map(this._transformCommand);
    }
    async getAllMessages(all){
        let link = "/message"
        if (all) link += "?all=true"
        const messages = await this.getResource(link);
        let a = []
        for (const p in messages){
            a.push(messages[p])
        }
        return a.map(this._transformMessage).sort(({Timestamp},b) => {
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