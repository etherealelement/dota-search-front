import {getId} from "./util";

export const ItemType = {COMMAND: 'command', PLAYER: 'player', MESSAGE: 'message'};
export const QUINN_MMR = 12000;
export const POSITIONS = ['HardSupport', 'SoftSupport', 'Offlane', 'Midlane', 'Carry'];
export type FIXMELATER = any;
export const enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    Ambiguous = 300,
    MultipleChoices = 300,
    Moved = 301,
    MovedPermanently = 301,
    Found = 302,
    Redirect = 302,
    RedirectMethod = 303,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    RedirectKeepVerb = 307,
    TemporaryRedirect = 307,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    RequestEntityTooLarge = 413,
    RequestUriTooLong = 414,
    UnsupportedMediaType = 415,
    RequestedRangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    UpgradeRequired = 426,
    TooManyRequests,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505
}
export const TextInputKeys = {
    Data: getId('text_input_'),
    Link: getId('text_input_'),
    MMR: getId('text_input_'),
}
export const CheckBoxKeys = {
    HardSupport: getId('checkbox_input_'),
    SoftSupport: getId('checkbox_input_'),
    Offlane: getId('checkbox_input_'),
    Midlane: getId('checkbox_input_'),
    Carry: getId('checkbox_input_'),
}

export const CommandPH = {
    Data: 'Общая информация',
    Link: 'Ссылка на телеграм или любой другой вид связи',
    MMR: 'Приблизтельный ММР команды',
};

export const PlayerPH = {
    Data: 'Введите никнейм',
    Link: 'Ссылка на телеграм или любой другой вид связи',
    MMR: 'Введите свой ММР',
};