/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import AppNavigation from './components/AppNavigation.vue';
import AppFooter from './components/AppFooter.vue';
var authStore = useAuthStore();
onMounted(function () {
    authStore.init();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ id: "app" }, { class: "min-h-screen bg-gray-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ukraine-accent-bar" }));
/** @type {[typeof AppNavigation, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(AppNavigation, new AppNavigation({}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_0), false));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
var __VLS_3 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
var __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
var __VLS_5 = __VLS_4.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_4), false));
/** @type {[typeof AppFooter, ]} */ ;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(AppFooter, new AppFooter({}));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_7), false));
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-accent-bar']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            AppNavigation: AppNavigation,
            AppFooter: AppFooter,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
