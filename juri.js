class Juri {

    /*********************************************
     *                  Getters                  *
     *********************************************/

    /**
     * Returns string of search starting with '?'
     * Example: ?key=value
     * @returns {*}
     */
    static getSearch()
    {
        return decodeURI(window.location.search);
    }

    /**
     * Returns string of hash starting with '#'
     * Example: #test
     * @returns {string}
     */
    static getHash()
    {
        return decodeURI(window.location.hash);
    }

    /**
     * Returns host and port.
     * Example: www.testsite.com:80
     * @returns {string}
     */
    static getHost()
    {
        return decodeURI(window.location.host);
    }

    /**
     * Returns host only.
     * Example: www.testsite.com
     * @returns {string}
     */
    static getHostName()
    {
        return decodeURI(window.location.hostname);
    }

    /**
     * Returns full path.
     * Example: http://www.testsite.com:80/path?key-value#test
     * @returns {string}
     */
    static getUrl()
    {
        return decodeURI(window.location.href);
    }

    /**
     * Returns path.
     * Example: /path
     * @returns {string}
     */
    static getPath()
    {
        return decodeURI(window.location.pathname);
    }

    /**
     * Returns port.
     * Example: 80
     * @returns {string}
     */
    static getPort()
    {
        return decodeURI(window.location.port);
    }

    /**
     * Returns protocol with ':' at the end.
     * Example: http:
     * @returns {string}
     */
    static getProtocol()
    {
        return decodeURI(window.location.protocol);
    }

    /*********************************************
     *            Processing search              *
     *********************************************/

    /**
     * Gets string of search starting with '?'.
     * Returns object containing key-value pairs.
     * @param searchString
     * @returns {{}}
     */
    static searchToObject(searchString)
    {
        let request = {};
        let searchPairs = searchString.substring(1).split('&');
        for (let searchPair of searchPairs) {
            let pair = searchPair.split('=');
            request[pair[0]] = pair[1];
        }
        return request;
    }

    /**
     * Gets object containing pairs key-value.
     * Returns string of search starting with '?'.
     * @param object
     * @returns {string}
     */
    static objectToSearch(object)
    {
        let result = [];
        for (let key in object) {
            if (object.hasOwnProperty(key)){
                result.push(key + '=' + object[key])
            }
        }
        return '?' + result.join('&');
    }

    /**
     * Gets object of key(name of part of url)-value.
     * If not provided, gets current url.
     * @param protocol
     * @param host
     * @param path
     * @param search
     * @param hash
     */
    static setUrl({
                     protocol = this.getProtocol(),
                     host = this.getHost(),
                     path = this.getPath(),
                     search = this.getSearch(),
                     hash = this.getHash()
                  })
    {
        protocol = encodeURI(protocol);
        host= encodeURI(host);
        path = encodeURI(path);
        search = encodeURI(search);
        hash = encodeURI(hash);
        let url = protocol + "//" + host + path + search + hash;
        window.history.pushState({path: url}, '', url);
    }

    /**
     * Creates object containing url components.
     * @returns {{protocol: string, host: string, path: string, search: *, hash: string, hostname: string, port: string}}
     */
    static createUrlObject()
    {
        return {
            protocol: this.getProtocol(),
            host: this.getHost(),
            path: this.getPath(),
            search: this.getSearch(),
            hash: this.getHash(),
            hostname: this.getHostName(),
            port: this.getPort()
        }
    }
}