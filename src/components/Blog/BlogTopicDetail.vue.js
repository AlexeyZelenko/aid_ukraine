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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { rtdb } from '@/config/firebase';
import { ref as dbRef, onValue } from 'firebase/database';
import BlogCommentList from './BlogCommentList.vue';
import BlogCommentForm from './BlogCommentForm.vue';
var route = useRoute();
var topicId = ref(route.params.id);
var topic = ref(null);
var fetchTopic = function (id) {
    var topicRef = dbRef(rtdb, "topics/".concat(id));
    onValue(topicRef, function (snapshot) {
        var data = snapshot.val();
        if (data) {
            topic.value = __assign({ id: id }, data);
        }
        else {
            topic.value = null;
        }
    });
};
onMounted(function () {
    if (typeof topicId.value === 'string') {
        fetchTopic(topicId.value);
    }
});
watch(function () { return route.params.id; }, function (newId) {
    if (typeof newId === 'string') {
        topicId.value = newId;
        fetchTopic(newId);
    }
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white p-6 rounded-lg shadow-md mb-6" }));
if (__VLS_ctx.topic) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "text-3xl font-bold text-ukraine-blue mb-4" }));
    (__VLS_ctx.topic.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-700 mb-4" }));
    (__VLS_ctx.topic.content);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-500 flex justify-between items-center mb-6" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.topic.authorName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.formatDate(__VLS_ctx.topic.createdAt));
    /** @type {[typeof BlogCommentList, ]} */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(BlogCommentList, new BlogCommentList({
        topicId: (__VLS_ctx.topicId),
    }));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
            topicId: (__VLS_ctx.topicId),
        }], __VLS_functionalComponentArgsRest(__VLS_0), false));
    /** @type {[typeof BlogCommentForm, ]} */ ;
    // @ts-ignore
    var __VLS_3 = __VLS_asFunctionalComponent(BlogCommentForm, new BlogCommentForm({
        topicId: (__VLS_ctx.topicId),
    }));
    var __VLS_4 = __VLS_3.apply(void 0, __spreadArray([{
            topicId: (__VLS_ctx.topicId),
        }], __VLS_functionalComponentArgsRest(__VLS_3), false));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center py-8" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-600" }));
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            BlogCommentList: BlogCommentList,
            BlogCommentForm: BlogCommentForm,
            topicId: topicId,
            topic: topic,
            formatDate: formatDate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
