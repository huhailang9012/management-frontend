import Vue from 'vue'
import Router from 'vue-router'
import search from "@/views/search";
Vue.use(Router)

export default new Router({

    routes:[
        {
            path:'/index',
            component:search
        }
    ]
})



