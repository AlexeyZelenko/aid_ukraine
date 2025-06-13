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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ref } from 'vue';
import { rtdb } from '@/config/firebase';
import { push, ref as dbRef, serverTimestamp } from 'firebase/database';
var topic = ref({
    title: '',
    content: '',
    createdAt: null,
    authorId: 'anonymous',
    authorName: 'Анонім'
});
var submitTopic = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newTopicRef, error_1, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Спроба опублікувати тему:', topic.value);
                // 1. Перевірка наявності даних
                if (!topic.value.title || topic.value.title.trim() === '') {
                    alert('Будь ласка, введіть заголовок теми.');
                    console.warn('Публікація скасована: відсутній заголовок.');
                    return [2 /*return*/]; // Зупиняємо виконання функції
                }
                if (!topic.value.content || topic.value.content.trim() === '') {
                    alert('Будь ласка, введіть зміст теми.');
                    console.warn('Публікація скасована: відсутній зміст.');
                    return [2 /*return*/]; // Зупиняємо виконання функції
                }
                // Обрізаємо пробіли з початку та кінця, щоб уникнути порожніх рядків
                topic.value.title = topic.value.title.trim();
                topic.value.content = topic.value.content.trim();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // 2. Додавання відмітки часу створення
                topic.value.createdAt = serverTimestamp();
                console.log('Дані для відправки:', topic.value);
                return [4 /*yield*/, push(dbRef(rtdb, 'topics'), topic.value)];
            case 2:
                newTopicRef = _a.sent();
                console.log('Тему успішно опубліковано в Firebase!');
                console.log('Ідентифікатор нової теми:', newTopicRef.key); // ID нової теми
                // 4. Очищення форми після успішної публікації
                topic.value.title = '';
                topic.value.content = '';
                // 5. Повідомлення користувача про успіх
                alert('Тему успішно опубліковано!');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                // 6. Обробка помилок Firebase та інших можливих помилок
                console.error('Помилка при публікації теми:', error_1);
                errorMessage = 'Не вдалося опублікувати тему. Спробуйте ще раз.';
                // Приклад розширеної обробки помилок Firebase
                if (error_1.code) {
                    switch (error_1.code) {
                        case 'PERMISSION_DENIED':
                            errorMessage = 'Відмовлено у доступі. Можливо, у вас недостатньо прав для публікації.';
                            break;
                        case 'NETWORK_REQUEST_FAILED':
                            errorMessage = 'Проблема з мережею. Перевірте ваше підключення до Інтернету.';
                            break;
                        // Додайте інші коди помилок Firebase, які ви хочете обробляти
                        default:
                            errorMessage = "\u041F\u043E\u043C\u0438\u043B\u043A\u0430: ".concat(error_1.message || error_1.code);
                            break;
                    }
                }
                else if (error_1.message) {
                    errorMessage = "\u041F\u043E\u043C\u0438\u043B\u043A\u0430: ".concat(error_1.message);
                }
                alert(errorMessage);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white p-6 rounded-lg shadow-md mb-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "text-2xl font-semibold text-ukraine-blue mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(__assign({ onSubmit: (__VLS_ctx.submitTopic) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ for: "topicTitle" }, { class: "block text-gray-700 text-sm font-bold mb-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(__assign(__assign({ type: "text", id: "topicTitle", value: (__VLS_ctx.topic.title) }, { class: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" }), { placeholder: "Введіть заголовок теми", required: true }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ for: "topicContent" }, { class: "block text-gray-700 text-sm font-bold mb-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(__assign(__assign({ id: "topicContent", value: (__VLS_ctx.topic.content) }, { class: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" }), { placeholder: "Введіть зміст теми", required: true }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ type: "submit" }, { class: "bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" }));
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['appearance-none']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:shadow-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['appearance-none']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:shadow-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
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
            topic: topic,
            submitTopic: submitTopic,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
