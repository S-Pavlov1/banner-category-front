import http from "./http-common"

class CategoryService {

    constructor() {
        this.URL = "/category"
    }

    addCategory (category) {
        return http.post(this.URL, category)
    }

    search (substring) {
        return http.get(this.URL + "/search?substring=" + substring)
    }

    deleteCategory (id) {
        return http.delete(this.URL+ "/" +id)
    }

    getCategory (id) {
        return http.get(this.URL +"/" + id)
    }

    updateCategory (category) {
        return http.put(this.URL, category)
    }
}

export default new CategoryService();