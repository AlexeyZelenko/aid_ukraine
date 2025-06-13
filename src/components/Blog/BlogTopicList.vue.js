/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
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
import { ref, onMounted } from 'vue';
import { rtdb } from '@/config/firebase';
import { ref as dbRef, onValue } from 'firebase/database';
var topics = ref([]);
onMounted(function () {
    var topicsRef = dbRef(rtdb, 'topics');
    onValue(topicsRef, function (snapshot) {
        var data = snapshot.val();
        var loadedTopics = [];
        for (var id in data) {
            loadedTopics.push(__assign({ id: id }, data[id]));
        }
        topics.value = loadedTopics.sort(function (a, b) { return b.createdAt - a.createdAt; }); // Sort by creation time
    });
    // Clean up listener on component unmount
    // return () => {
    //   off(topicsRef)
    // }
});
var formatDate = function (timestamp) {
    if (!timestamp)
        return 'Невідомо';
    var date = new Date(timestamp);
    return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
var viewTopic = function (topicId) {
    // Implement navigation to a detailed topic view or open a modal
    console.log('View topic:', topicId);
    alert("\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u0434 \u0442\u0435\u043C\u0438 \u0437 ID: ".concat(topicId, " (\u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B \u0432 \u0440\u043E\u0437\u0440\u043E\u0431\u0446\u0456)"));
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white p-6 rounded-lg shadow-md" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "text-2xl font-semibold text-ukraine-blue mb-4" }));
if (__VLS_ctx.topics.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-gray-600 text-center py-8" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    var _loop_1 = function (topic) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (topic.id) }, { class: "border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-bold text-gray-800 mb-2" }));
        (topic.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-700 mb-2" }));
        (topic.content);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-500 flex justify-between items-center" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (topic.authorName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.formatDate(topic.createdAt));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!!(__VLS_ctx.topics.length === 0))
                    return;
                __VLS_ctx.viewTopic(topic.id);
            } }, { class: "mt-4 bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" }));
    };
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.topics)); _i < _a.length; _i++) {
        var topic = _a[_i][0];
        _loop_1(topic);
    }
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['last:border-b-0']} */ ;
/** @type {__VLS_StyleScopedClasses['last:pb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['last:mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-ukraine-yellow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:shadow-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            topics: topics,
            formatDate: formatDate,
            viewTopic: viewTopic,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
