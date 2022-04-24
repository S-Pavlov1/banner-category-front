import http from "./http-common"

class BannerService {

    constructor() {
        this.URL = "/banners"
    }

    addBanner (banner) {
        return http.post(this.URL, banner)
    }

    search (substring) {
        return http.get(this.URL + "/search?substring=" + substring)
    }

    deleteBanner (id) {
        return http.delete(this.URL+ "/" +id)
    }

    getBanner (id) {
        return http.get(this.URL +"/" + id)
    }

    updateBanner (banner) {
        return http.put(this.URL, banner)
    }
}

export default new BannerService();