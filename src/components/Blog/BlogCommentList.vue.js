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
import { ref, onMounted, defineProps } from 'vue';
import { rtdb } from '@/config/firebase';
import { ref as dbRef, onValue } from 'firebase/database';
var props = defineProps({
    topicId: {
        type: String,
        required: true
    }
});
var comments = ref([]);
onMounted(function () {
    var commentsRef = dbRef(rtdb, "topics/".concat(props.topicId, "/comments"));
    onValue(commentsRef, function (snapshot) {
        var data = snapshot.val();
        var loadedComments = [];
        for (var id in data) {
            loadedComments.push(__assign({ id: id }, data[id]));
        }
        comments.value = loadedComments.sort(function (a, b) { return b.createdAt - a.createdAt; }); // Sort by creation time
    });
    // Clean up listener on component unmount
    // return () => {
    //   off(commentsRef)
    // }
});
var formatDate = function (timestamp) {
    if (!timestamp)
        return 'Невідомо';
    var date = new Date(timestamp);
    return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white p-6 rounded-lg shadow-md mt-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold text-ukraine-blue mb-4" }));
if (__VLS_ctx.comments.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-gray-600 text-center py-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.comments)); _i < _a.length; _i++) {
        var comment = _a[_i][0];
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (comment.id) }, { class: "border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-700 mb-2" }));
        (comment.content);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-500 flex justify-between items-center" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (comment.authorName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.formatDate(comment.createdAt));
    }
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['last:border-b-0']} */ ;
/** @type {__VLS_StyleScopedClasses['last:pb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['last:mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            comments: comments,
            formatDate: formatDate,
        };
    },
    props: {
        topicId: {
            type: String,
            required: true
        }
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
    props: {
        topicId: {
            type: String,
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
