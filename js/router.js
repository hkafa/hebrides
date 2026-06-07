/**
 * Minimal hash-based router for SPA navigation.
 */

export class Router {
    constructor(routes) {
        this.routes = routes; // { pattern: handler } e.g. { '/': fn, '/day/:n': fn }
        this._listen();
    }

    _listen() {
        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }

    resolve() {
        const hash = (location.hash || '#/').slice(1); // remove '#'

        for (const [pattern, handler] of Object.entries(this.routes)) {
            const params = this._match(pattern, hash);
            if (params !== null) {
                handler(params);
                return;
            }
        }

        // Fallback to home
        if (this.routes['/']) {
            this.routes['/']({});
        }
    }

    _match(pattern, path) {
        const patternParts = pattern.split('/').filter(Boolean);
        const pathParts = path.split('/').filter(Boolean);

        if (patternParts.length !== pathParts.length) return null;

        const params = {};
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                params[patternParts[i].slice(1)] = pathParts[i];
            } else if (patternParts[i] !== pathParts[i]) {
                return null;
            }
        }
        return params;
    }

    static navigate(hash) {
        location.hash = hash;
    }
}
