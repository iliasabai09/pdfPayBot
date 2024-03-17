import NodeCache from "node-cache";

export class NodeCacheService {
    static myCache = new NodeCache();

    static setCache(key, val, cacheTime = 300) {
        this.myCache.set(key, JSON.stringify(val), cacheTime);
    }

    static getCache(key) {
        const user = this.myCache.get(key);
        return user ? JSON.parse(user) : null;
    }

    static deleteCache(key){
        this.myCache.del(key);
    }

    static getAllCache() {
        return this.myCache.getStats();
    }
}
