const RESOURCE_NOT_FOUND_ERROR = class extends Error {
    constructor(message, resource = 'RESOURCE', status = 404) {
        super(message);
        this.name = `${resource.toUpperCase()}_NOT_FOUND_ERROR`;
        this.status = status;
    }
};

const CART_NOT_FOUND_ERROR = class extends RESOURCE_NOT_FOUND_ERROR {
    constructor(message, status = 404) {
        super(message, 'CART', status);
    }
};

const MISSING_PARAMS_ERROR = class extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = 'MISSING_PARAMS_ERROR';
        this.status = status;
    }
};

const DB_CONNECTION_ERROR = class extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'DB_CONNECTION_ERROR';
        this.status = status;
    }
};

const USER_NOT_FOUND_ERROR = class extends RESOURCE_NOT_FOUND_ERROR {
    constructor(message, status = 404) {
        super(message, 'USER', status);
    }
};

const BAD_FORMAT_JSON_ERROR = class extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = 'BAD_FORMAT_JSON_ERROR';
        this.status = status;
    }
};



module.exports = {
    CART_NOT_FOUND_ERROR,
    USER_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR,
    DB_CONNECTION_ERROR,
    BAD_FORMAT_JSON_ERROR
};
