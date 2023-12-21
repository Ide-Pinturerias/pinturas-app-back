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

const BLOG_NOT_FOUND_ERROR = class extends RESOURCE_NOT_FOUND_ERROR {
    constructor(message, status = 404) {
        super(message, 'BLOG', status);
    }
};

const MISSING_AUTHORIZATION_TOKEN_ERROR = class extends Error {
    constructor(message, status = 401) {
        super(message);
        this.name = 'MISSING_AUTHORIZATION_TOKEN_ERROR';
        this.status = status;
    }
};

const INVALID_AUTHORIZATION_TOKEN_ERROR = class extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = 'INVALID_AUTHORIZATION_TOKEN_ERROR';
        this.status = status;
    }
};

const PRODUCT_NOT_FOUND_ERROR = class extends RESOURCE_NOT_FOUND_ERROR {
    constructor(message, status = 404) {
        super(message, 'PRODUCT', status);
    }
};

const ALREADY_FAVORITE_ERROR = class extends Error {
    constructor(message, status = 409) {
        super(message);
        this.name = 'ALREADY_FAVORITE_ERROR';
        this.status = status;
    }
};

const PROVIDER_NOT_FOUND_ERROR = class extends RESOURCE_NOT_FOUND_ERROR {
    constructor(message, status = 404) {
        super(message, 'PROVIDER', status);
    }
};

const PROVIDER_NOT_ACTIVE_ERROR = class extends Error {
    constructor(message, status = 409) {
        super(message);
        this.name = 'PROVIDER_NOT_ACTIVE_ERROR';
        this.status = status;
    }
};

const INVALID_PASSWORD_ERROR = class extends Error {
    constructor(message, status = 401) {
        super(message);
        this.name = 'INVALID_PASSWORD_ERROR';
        this.status = status;
    }
};

const USER_NOT_EDITABLE_ERROR = class extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = 'USER_NOT_EDITABLE_ERROR';
        this.status = status;
    }
};

const BLOCKED_USER_ERROR = class extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = 'BLOCKED_USER_ERROR';
        this.status = status;
    }
};

const DELETED_USER_ERROR = class extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = 'DELETED_USER_ERROR';
        this.status = status;
    }
};

module.exports = {
    CART_NOT_FOUND_ERROR,
    USER_NOT_FOUND_ERROR,
    MISSING_PARAMS_ERROR,
    DB_CONNECTION_ERROR,
    BAD_FORMAT_JSON_ERROR,
    BLOG_NOT_FOUND_ERROR,
    MISSING_AUTHORIZATION_TOKEN_ERROR,
    INVALID_AUTHORIZATION_TOKEN_ERROR,
    PRODUCT_NOT_FOUND_ERROR,
    ALREADY_FAVORITE_ERROR,
    PROVIDER_NOT_FOUND_ERROR,
    PROVIDER_NOT_ACTIVE_ERROR,
    INVALID_PASSWORD_ERROR,
    USER_NOT_EDITABLE_ERROR,
    BLOCKED_USER_ERROR,
    DELETED_USER_ERROR
};
