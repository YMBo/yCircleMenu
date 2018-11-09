import yCircleMenu from './components/yCircleMenu.vue'

const components = {
        yCircleMenu
    }
    // vue.use
const install = function(Vue, opts = {}) {
        if (install.installed) return
        Object.keys(components).forEach(key => {
            Vue.component(key, iview[key]);
        });
    }
    // 全局情况下注册插件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default yCircleMenu;