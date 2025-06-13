/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
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
import { ref, reactive, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
var t = useI18n().t;
var zoom = ref(10);
var showAddModal = ref(false);
var map = ref(null);
var filters = reactive({
    medical: true,
    food: true,
    shelter: true,
    transport: true
});
var pointForm = ref({
    title: '',
    type: 'medical',
    description: '',
    address: '',
    phone: '',
    hours: '',
    latitude: 0,
    longitude: 0,
});
// Mock data for demonstration
var helpPoints = ref([
    {
        id: 1,
        title: 'Медичний пункт №1',
        type: 'medical',
        description: 'Надання першої медичної допомоги та консультацій.',
        address: 'Вул. Хрещатик, 24, Київ',
        phone: '+380 44 123 4567',
        hours: 'Пн-Пт 9:00-18:00',
        status: 'active',
        latitude: 50.4501,
        longitude: 30.5234,
    },
    {
        id: 2,
        title: 'Їдальня "Надія"',
        type: 'food',
        description: 'Гарячі обіди для всіх, хто потребує.',
        address: 'Пр. Перемоги, 10, Київ',
        phone: '+380 44 765 4321',
        hours: 'Щодня 12:00-15:00',
        status: 'urgent',
        latitude: 50.4601,
        longitude: 30.5334,
    },
    {
        id: 3,
        title: 'Притулок "Затишок"',
        type: 'shelter',
        description: 'Тимчасове житло для переселенців.',
        address: 'Вул. Мечникова, 5, Київ',
        phone: '+380 44 987 6543',
        hours: 'Цілодобово',
        status: 'active',
        latitude: 50.4401,
        longitude: 30.5134,
    },
    {
        id: 4,
        title: 'Транспортний хаб "Єдність"',
        type: 'transport',
        description: 'Допомога з транспортуванням до безпечних регіонів.',
        address: 'Залізничний вокзал, Київ',
        phone: '+380 44 234 5678',
        hours: 'Пн-Нд 8:00-20:00',
        status: 'inactive',
        latitude: 50.4701,
        longitude: 30.5434,
    },
]);
function addHelpPoint() {
    showAddModal.value = true;
    // Optionally, get current map center for new point default coordinates
    // if (map.value) {
    //   const center = map.value.leafletObject.getCenter();
    //   pointForm.value.latitude = center.lat;
    //   pointForm.value.longitude = center.lng;
    // }
}
function closeAddModal() {
    showAddModal.value = false;
    resetForm();
}
var submitHelpPoint = function () {
    var newPoint = {
        id: helpPoints.value.length + 1,
        title: pointForm.value.title,
        type: pointForm.value.type,
        description: pointForm.value.description,
        address: pointForm.value.address,
        phone: pointForm.value.phone,
        hours: pointForm.value.hours,
        status: 'active',
        latitude: pointForm.value.latitude,
        longitude: pointForm.value.longitude,
    };
    helpPoints.value.push(newPoint);
    closeAddModal();
};
var resetForm = function () {
    pointForm.value = {
        title: '',
        type: 'medical',
        description: '',
        address: '',
        phone: '',
        hours: '',
        latitude: 0,
        longitude: 0,
    };
};
function getPointIconUrl(type) {
    // You would typically have different icons for different types
    // For simplicity, using a generic marker icon here.
    // In a real app, you'd import specific icon images.
    switch (type) {
        case 'medical':
            return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
        case 'food':
            return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
        case 'shelter':
            return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
        case 'transport':
            return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png';
        default:
            return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png';
    }
}
function getPointIcon(type) {
    switch (type) {
        case 'medical':
            return 'fas fa-plus-circle';
        case 'food':
            return 'fas fa-utensils';
        case 'shelter':
            return 'fas fa-home';
        case 'transport':
            return 'fas fa-car';
        default:
            return 'fas fa-info-circle';
    }
}
function getPointColor(type) {
    switch (type) {
        case 'medical':
            return '#ef4444'; // red-500
        case 'food':
            return '#22c55e'; // green-500
        case 'shelter':
            return '#3b82f6'; // blue-500
        case 'transport':
            return '#eab308'; // yellow-500
        default:
            return '#6b7280'; // gray-500
    }
}
function getStatusLabel(status) {
    switch (status) {
        case 'active':
            return 'Активна';
        case 'urgent':
            return 'Термінова';
        case 'inactive':
            return 'Неактивна';
        default:
            return '';
    }
}
function showOnMap(point) {
    if (map.value) {
        map.value.leafletObject.setView([point.latitude, point.longitude], 14); // Center map and set zoom
    }
}
watch(filters, function () {
    // This would update map markers based on filters
    console.log('Filters updated:', filters);
}, { deep: true });
onMounted(function () {
    // Map initialization is handled by Vue Leaflet's LMap component
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "min-h-screen bg-gray-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white shadow-sm py-8" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "text-4xl font-bold text-ukraine-blue mb-4" }));
(__VLS_ctx.$t('map.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-xl text-gray-600" }));
(__VLS_ctx.$t('map.subtitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ukraine-accent-bar w-24 mx-auto mt-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "h-[600px] relative" }));
var __VLS_0 = {}.LMap;
/** @type {[typeof __VLS_components.LMap, typeof __VLS_components.LMap, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "map",
    zoom: (__VLS_ctx.zoom),
    center: ([50.4501, 30.5234]),
    useGlobalLeaflet: (false),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        ref: "map",
        zoom: (__VLS_ctx.zoom),
        center: ([50.4501, 30.5234]),
        useGlobalLeaflet: (false),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {typeof __VLS_ctx.map} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
var __VLS_6 = {}.LTileLayer;
/** @type {[typeof __VLS_components.LTileLayer, typeof __VLS_components.LTileLayer, ]} */ ;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "<a href=&quot;https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors",
}));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "<a href=&quot;https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors",
    }], __VLS_functionalComponentArgsRest(__VLS_7), false));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.filteredHelpPoints)); _i < _a.length; _i++) {
    var point = _a[_i][0];
    var __VLS_10 = {}.LMarker;
    /** @type {[typeof __VLS_components.LMarker, typeof __VLS_components.LMarker, ]} */ ;
    // @ts-ignore
    var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        key: (point.id),
        latLng: ([point.latitude, point.longitude]),
    }));
    var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
            key: (point.id),
            latLng: ([point.latitude, point.longitude]),
        }], __VLS_functionalComponentArgsRest(__VLS_11), false));
    __VLS_13.slots.default;
    var __VLS_14 = {}.LIcon;
    /** @type {[typeof __VLS_components.LIcon, ]} */ ;
    // @ts-ignore
    var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        iconUrl: (__VLS_ctx.getPointIconUrl(point.type)),
        iconSize: ([32, 32]),
    }));
    var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
            iconUrl: (__VLS_ctx.getPointIconUrl(point.type)),
            iconSize: ([32, 32]),
        }], __VLS_functionalComponentArgsRest(__VLS_15), false));
    var __VLS_18 = {}.LPopup;
    /** @type {[typeof __VLS_components.LPopup, typeof __VLS_components.LPopup, ]} */ ;
    // @ts-ignore
    var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_19), false));
    __VLS_21.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "font-bold" }));
    (point.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (point.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (point.address);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (point.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (point.hours);
    var __VLS_21;
    var __VLS_13;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-y-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.addHelpPoint) }, { class: "btn-ukraine w-full text-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-plus mr-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "border-t pt-3" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)(__assign({ class: "font-semibold text-sm mb-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-y-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "flex items-center text-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "checkbox" }, { class: "mr-2" }));
(__VLS_ctx.filters.medical);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "flex items-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-plus-circle text-red-500 mr-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "flex items-center text-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "checkbox" }, { class: "mr-2" }));
(__VLS_ctx.filters.food);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "flex items-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-utensils text-green-500 mr-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "flex items-center text-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "checkbox" }, { class: "mr-2" }));
(__VLS_ctx.filters.shelter);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "flex items-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-home text-blue-500 mr-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "flex items-center text-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "checkbox" }, { class: "mr-2" }));
(__VLS_ctx.filters.transport);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "flex items-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-car text-yellow-500 mr-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "text-2xl font-semibold mb-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" }));
var _loop_1 = function (point) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (point.id) }, { class: "bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-start justify-between mb-3" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "font-semibold text-lg" }));
    (point.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign(__assign({ class: (__VLS_ctx.getPointIcon(point.type)) }, { style: ({ color: __VLS_ctx.getPointColor(point.type) }) }), { class: "text-xl" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-600 mb-4" }));
    (point.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-y-2 text-sm text-gray-600 mb-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-map-marker-alt mr-2 text-ukraine-blue" }));
    (point.address);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-phone mr-2 text-ukraine-blue" }));
    (point.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-clock mr-2 text-ukraine-blue" }));
    (point.hours);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex justify-between items-center" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "px-3 py-1 text-xs rounded-full" }, { class: ({
            'bg-green-100 text-green-800': point.status === 'active',
            'bg-red-100 text-red-800': point.status === 'urgent',
            'bg-gray-100 text-gray-800': point.status === 'inactive'
        }) }));
    (__VLS_ctx.getStatusLabel(point.status));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.showOnMap(point);
        } }, { class: "text-ukraine-blue hover:text-ukraine-blue-light text-sm" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-map mr-1" }));
};
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.helpPoints)); _b < _c.length; _b++) {
    var point = _c[_b][0];
    _loop_1(point);
}
if (__VLS_ctx.showAddModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.closeAddModal) }, { class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: function () { } }, { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold mb-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(__assign({ onSubmit: (__VLS_ctx.submitHelpPoint) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-y-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ value: (__VLS_ctx.pointForm.title), type: "text", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign({ value: (__VLS_ctx.pointForm.type), required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "medical",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "food",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "shelter",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "transport",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(__assign({ value: (__VLS_ctx.pointForm.description), rows: "3", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ value: (__VLS_ctx.pointForm.address), type: "text", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ type: "tel", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    (__VLS_ctx.pointForm.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ value: (__VLS_ctx.pointForm.hours), type: "text", placeholder: "Пн-Пт 9:00-18:00", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex justify-end space-x-3 mt-6" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.closeAddModal) }, { type: "button" }), { class: "px-4 py-2 text-gray-600 hover:text-gray-800" }));
    (__VLS_ctx.$t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ type: "submit" }, { class: "btn-ukraine" }));
    (__VLS_ctx.$t('common.save'));
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-accent-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-plus']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-plus-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-utensils']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-home']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-car']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-border']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-map-marker-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-phone']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-clock']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-ukraine-blue-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-map']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            LMap: LMap,
            LTileLayer: LTileLayer,
            LMarker: LMarker,
            LPopup: LPopup,
            LIcon: LIcon,
            zoom: zoom,
            showAddModal: showAddModal,
            map: map,
            filters: filters,
            pointForm: pointForm,
            helpPoints: helpPoints,
            addHelpPoint: addHelpPoint,
            closeAddModal: closeAddModal,
            submitHelpPoint: submitHelpPoint,
            getPointIconUrl: getPointIconUrl,
            getPointIcon: getPointIcon,
            getPointColor: getPointColor,
            getStatusLabel: getStatusLabel,
            showOnMap: showOnMap,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
