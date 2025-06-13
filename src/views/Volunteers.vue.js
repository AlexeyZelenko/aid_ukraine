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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ref, computed, onMounted } from 'vue';
import { useVolunteersStore } from '../stores/volunteers';
import { useAuthStore } from '../stores/auth';
var volunteersStore = useVolunteersStore();
var authStore = useAuthStore();
// Reactive data
var showRegistrationModal = ref(false);
var registrationType = ref('volunteer');
var submitting = ref(false);
var searchQuery = ref('');
var selectedType = ref('');
var selectedLocation = ref('');
var selectedVerification = ref('');
var registrationForm = ref({
    name: '',
    email: '',
    phone: '',
    organization: '',
    description: '',
    location: '',
    website: '',
    experience: undefined,
    specializationsText: ''
});
// Extended mock data
var mockVolunteers = [
    {
        id: '1',
        name: 'Марія Коваленко',
        email: 'maria.kovalenko@email.com',
        phone: '+38 (050) 123-45-67',
        organization: 'Волонтер-медик',
        type: 'volunteer',
        description: 'Медична сестра з 10-річним досвідом. Надаю першу медичну допомогу, консультації з догляду за хворими.',
        location: 'Київ',
        verified: true,
        createdAt: new Date('2024-01-15'),
        specializations: ['медична допомога', 'перша допомога', 'догляд за хворими'],
        rating: 5,
        experience: 10
    },
    {
        id: '2',
        name: 'Фонд "Серце України"',
        email: 'info@heart-ukraine.org',
        phone: '+38 (044) 234-56-78',
        organization: 'Благодійний фонд "Серце України"',
        type: 'fund',
        description: 'Благодійний фонд, що займається допомогою переселенцям, забезпеченням медикаментами та продуктами харчування.',
        location: 'Київ',
        verified: true,
        createdAt: new Date('2024-01-10'),
        website: 'https://heart-ukraine.org',
        specializations: ['фінансова допомога', 'медикаменти', 'продукти харчування'],
        rating: 5
    },
    {
        id: '3',
        name: 'Олександр Петренко',
        email: 'alex.petrenko@email.com',
        phone: '+38 (067) 345-67-89',
        organization: 'Незалежний волонтер',
        type: 'volunteer',
        description: 'Водій-волонтер. Допомагаю з транспортуванням людей та вантажів. Маю власний мікроавтобус.',
        location: 'Львів',
        verified: true,
        createdAt: new Date('2024-01-12'),
        specializations: ['транспорт', 'логістика', 'доставка'],
        rating: 4,
        experience: 3
    },
    {
        id: '4',
        name: 'Центр реабілітації "Надія"',
        email: 'info@nadia-rehab.com',
        phone: '+38 (056) 456-78-90',
        organization: 'Центр реабілітації "Надія"',
        type: 'rehabilitation',
        description: 'Спеціалізований центр реабілітації для військових та цивільних. Фізична та психологічна реабілітація.',
        location: 'Дніпро',
        verified: true,
        createdAt: new Date('2024-01-08'),
        website: 'https://nadia-rehab.com',
        specializations: ['фізична реабілітація', 'психологічна допомога', 'медична реабілітація'],
        rating: 5
    },
    {
        id: '5',
        name: 'Ірина Сидоренко',
        email: 'irina.sydorenko@email.com',
        phone: '+38 (093) 567-89-01',
        organization: 'Психолог-волонтер',
        type: 'volunteer',
        description: 'Практикуючий психолог. Надаю безкоштовні консультації для людей, що пережили травму війни.',
        location: 'Одеса',
        verified: true,
        createdAt: new Date('2024-01-14'),
        specializations: ['психологічна підтримка', 'травма війни', 'консультації'],
        rating: 5,
        experience: 8
    },
    {
        id: '6',
        name: 'Фонд "Допомога дітям"',
        email: 'help@children-fund.org',
        phone: '+38 (032) 678-90-12',
        organization: 'Благодійний фонд "Допомога дітям"',
        type: 'fund',
        description: 'Спеціалізуємося на допомозі дітям-переселенцям. Забезпечуємо одягом, іграшками, навчальними матеріалами.',
        location: 'Львів',
        verified: false,
        createdAt: new Date('2024-01-11'),
        website: 'https://children-fund.org',
        specializations: ['допомога дітям', 'одяг', 'навчальні матеріали', 'іграшки']
    },
    {
        id: '7',
        name: 'Віктор Мельник',
        email: 'viktor.melnyk@email.com',
        phone: '+38 (095) 789-01-23',
        organization: 'IT-волонтер',
        type: 'volunteer',
        description: 'IT-спеціаліст. Допомагаю з налаштуванням комп\'ютерів, навчанням цифровій грамотності.',
        location: 'Харків',
        verified: true,
        createdAt: new Date('2024-01-13'),
        specializations: ['IT-підтримка', 'цифрова грамотність', 'налаштування техніки'],
        rating: 4,
        experience: 5
    },
    {
        id: '8',
        name: 'Анна Шевченко',
        email: 'anna.shevchenko@email.com',
        phone: '+38 (096) 890-12-34',
        organization: 'Юрист-волонтер',
        type: 'volunteer',
        description: 'Юрист з досвідом роботи в сфері соціального права. Надаю безкоштовні юридичні консультації.',
        location: 'Київ',
        verified: true,
        createdAt: new Date('2024-01-09'),
        specializations: ['юридичні консультації', 'соціальне право', 'документообіг'],
        rating: 5,
        experience: 12
    },
    {
        id: '9',
        name: 'Центр "Відновлення"',
        email: 'info@recovery-center.ua',
        phone: '+38 (048) 901-23-45',
        organization: 'Реабілітаційний центр "Відновлення"',
        type: 'rehabilitation',
        description: 'Комплексна реабілітація для постраждалих від війни. Медична, психологічна та соціальна підтримка.',
        location: 'Одеса',
        verified: false,
        createdAt: new Date('2024-01-07'),
        website: 'https://recovery-center.ua',
        specializations: ['комплексна реабілітація', 'медична допомога', 'соціальна адаптація']
    },
    {
        id: '10',
        name: 'Тетяна Гриценко',
        email: 'tetyana.hrytsenko@email.com',
        phone: '+38 (099) 012-34-56',
        organization: 'Вчитель-волонтер',
        type: 'volunteer',
        description: 'Вчитель початкових класів. Допомагаю дітям-переселенцям з навчанням, адаптацією в новій школі.',
        location: 'Вінниця',
        verified: true,
        createdAt: new Date('2024-01-06'),
        specializations: ['освіта', 'робота з дітьми', 'адаптація'],
        rating: 5,
        experience: 15
    },
    {
        id: '11',
        name: 'Сергій Бондаренко',
        email: 'sergiy.bondarenko@email.com',
        phone: '+38 (097) 123-45-67',
        organization: 'Кулінар-волонтер',
        type: 'volunteer',
        description: 'Професійний кухар. Організовую приготування їжі для нужденних, навчаю готувати з обмеженого набору продуктів.',
        location: 'Полтава',
        verified: true,
        createdAt: new Date('2024-01-05'),
        specializations: ['приготування їжі', 'організація харчування', 'кулінарні майстер-класи'],
        rating: 4,
        experience: 7
    },
    {
        id: '12',
        name: 'Фонд "Єдність"',
        email: 'unity@unity-fund.org',
        phone: '+38 (061) 234-56-78',
        organization: 'Благодійний фонд "Єдність"',
        type: 'fund',
        description: 'Міжнародний благодійний фонд. Координуємо допомогу від закордонних партнерів, забезпечуємо гуманітарними вантажами.',
        location: 'Запоріжжя',
        verified: true,
        createdAt: new Date('2024-01-04'),
        website: 'https://unity-fund.org',
        specializations: ['міжнародна допомога', 'гуманітарні вантажі', 'координація'],
        rating: 5
    }
];
// Computed properties
var filteredVolunteers = computed(function () {
    var filtered = __spreadArray([], mockVolunteers, true);
    if (searchQuery.value) {
        var query_1 = searchQuery.value.toLowerCase();
        filtered = filtered.filter(function (volunteer) {
            return volunteer.name.toLowerCase().includes(query_1) ||
                volunteer.organization.toLowerCase().includes(query_1) ||
                volunteer.description.toLowerCase().includes(query_1) ||
                volunteer.location.toLowerCase().includes(query_1) ||
                (volunteer.specializations && volunteer.specializations.some(function (spec) {
                    return spec.toLowerCase().includes(query_1);
                }));
        });
    }
    if (selectedType.value) {
        filtered = filtered.filter(function (volunteer) { return volunteer.type === selectedType.value; });
    }
    if (selectedLocation.value) {
        filtered = filtered.filter(function (volunteer) { return volunteer.location === selectedLocation.value; });
    }
    if (selectedVerification.value) {
        if (selectedVerification.value === 'verified') {
            filtered = filtered.filter(function (volunteer) { return volunteer.verified; });
        }
        else if (selectedVerification.value === 'pending') {
            filtered = filtered.filter(function (volunteer) { return !volunteer.verified; });
        }
    }
    return filtered;
});
var uniqueLocations = computed(function () {
    var locations = mockVolunteers.map(function (v) { return v.location; });
    return __spreadArray([], new Set(locations), true).sort();
});
var totalVolunteers = computed(function () { return mockVolunteers.length; });
var individualVolunteers = computed(function () { return mockVolunteers.filter(function (v) { return v.type === 'volunteer'; }).length; });
var fundsCount = computed(function () { return mockVolunteers.filter(function (v) { return v.type === 'fund'; }).length; });
var rehabilitationCenters = computed(function () { return mockVolunteers.filter(function (v) { return v.type === 'rehabilitation'; }).length; });
// Methods
var getTypeClass = function (type) {
    var classes = {
        volunteer: 'bg-blue-100 text-blue-800',
        fund: 'bg-yellow-100 text-yellow-800',
        rehabilitation: 'bg-green-100 text-green-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
};
var formatDate = function (date) {
    return new Intl.DateTimeFormat('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};
var getDescriptionPlaceholder = function () {
    var placeholders = {
        volunteer: 'Опишіть ваші навички, досвід та як ви можете допомогти...',
        fund: 'Опишіть діяльність фонду, основні напрямки роботи...',
        rehabilitation: 'Опишіть послуги центру, спеціалізацію, можливості...'
    };
    return placeholders[registrationType.value];
};
var openRegistrationModal = function (type) {
    registrationType.value = type;
    showRegistrationModal.value = true;
    // Reset form
    registrationForm.value = {
        name: '',
        email: '',
        phone: '',
        organization: '',
        description: '',
        location: '',
        website: '',
        experience: undefined,
        specializationsText: ''
    };
};
var closeRegistrationModal = function () {
    showRegistrationModal.value = false;
};
var submitRegistration = function () { return __awaiter(void 0, void 0, void 0, function () {
    var volunteerData, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                submitting.value = true;
                volunteerData = __assign(__assign({}, registrationForm.value), { type: registrationType.value, specializations: registrationForm.value.specializationsText
                        ? registrationForm.value.specializationsText.split(',').map(function (s) { return s.trim(); })
                        : [] });
                // Remove specializationsText from the data
                delete volunteerData.specializationsText;
                return [4 /*yield*/, volunteersStore.addVolunteer(volunteerData)];
            case 1:
                result = _a.sent();
                if (!result.success) return [3 /*break*/, 3];
                closeRegistrationModal();
                return [4 /*yield*/, volunteersStore.fetchVolunteers()];
            case 2:
                _a.sent();
                alert('Реєстрацію успішно подано! Очікуйте на верифікацію.');
                return [3 /*break*/, 4];
            case 3:
                alert('Помилка при реєстрації. Спробуйте пізніше.');
                _a.label = 4;
            case 4:
                submitting.value = false;
                return [2 /*return*/];
        }
    });
}); };
var contactVolunteer = function (volunteer) {
    var message = "\u041F\u0440\u0438\u0432\u0456\u0442! \u042F \u0437\u043D\u0430\u0439\u0448\u043E\u0432 \u0432\u0430\u0448 \u043F\u0440\u043E\u0444\u0456\u043B\u044C \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0456 \"\u0414\u043E\u043F\u043E\u043C\u043E\u0433\u0430 \u0423\u043A\u0440\u0430\u0457\u043D\u0456\" \u0456 \u0445\u043E\u0442\u0456\u0432 \u0431\u0438 \u043E\u0431\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0438 \u043C\u043E\u0436\u043B\u0438\u0432\u0456\u0441\u0442\u044C \u0441\u043F\u0456\u0432\u043F\u0440\u0430\u0446\u0456.";
    var emailUrl = "mailto:".concat(volunteer.email, "?subject=\u0421\u043F\u0456\u0432\u043F\u0440\u0430\u0446\u044F \u0447\u0435\u0440\u0435\u0437 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443 \"\u0414\u043E\u043F\u043E\u043C\u043E\u0433\u0430 \u0423\u043A\u0440\u0430\u0457\u043D\u0456\"&body=").concat(encodeURIComponent(message));
    if (confirm("\u0417\u0432'\u044F\u0437\u0430\u0442\u0438\u0441\u044F \u0437 ".concat(volunteer.name, "?\n\nEmail: ").concat(volunteer.email, "\n\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ").concat(volunteer.phone))) {
        window.open(emailUrl);
    }
};
var viewProfile = function (volunteer) {
    var profileInfo = "\u041F\u0440\u043E\u0444\u0456\u043B\u044C: ".concat(volunteer.name, "\n\n");
    profileInfo += "\u041E\u0440\u0433\u0430\u043D\u0456\u0437\u0430\u0446\u0456\u044F: ".concat(volunteer.organization, "\n");
    profileInfo += "\u0422\u0438\u043F: ".concat(volunteer.type, "\n");
    profileInfo += "\u041C\u0456\u0441\u0446\u0435\u0437\u043D\u0430\u0445\u043E\u0434\u0436\u0435\u043D\u043D\u044F: ".concat(volunteer.location, "\n");
    profileInfo += "\u041E\u043F\u0438\u0441: ".concat(volunteer.description, "\n");
    if (volunteer.specializations && volunteer.specializations.length > 0) {
        profileInfo += "\n\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u0457: ".concat(volunteer.specializations.join(', '), "\n");
    }
    if (volunteer.experience) {
        profileInfo += "\u0414\u043E\u0441\u0432\u0456\u0434: ".concat(volunteer.experience, " \u0440\u043E\u043A\u0456\u0432\n");
    }
    if (volunteer.rating) {
        profileInfo += "\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ".concat(volunteer.rating, "/5\n");
    }
    if (volunteer.website) {
        profileInfo += "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442: ".concat(volunteer.website, "\n");
    }
    profileInfo += "\n\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438:\nEmail: ".concat(volunteer.email, "\n\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ").concat(volunteer.phone);
    profileInfo += "\n\n\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u043E\u0432\u0430\u043D\u043E: ".concat(formatDate(volunteer.createdAt));
    profileInfo += "\n\u0421\u0442\u0430\u0442\u0443\u0441: ".concat(volunteer.verified ? 'Верифіковано ✓' : 'Очікує верифікації');
    alert(profileInfo);
};
onMounted(function () {
    // In a real app, this would fetch from Firebase
    // volunteersStore.fetchVolunteers()
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "min-h-screen bg-gray-50 py-12" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center mb-12" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: "text-4xl font-bold text-ukraine-blue mb-4" }));
(__VLS_ctx.$t('volunteers.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-xl text-gray-600" }));
(__VLS_ctx.$t('volunteers.subtitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ukraine-accent-bar w-24 mx-auto mt-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow p-4 text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-2xl font-bold text-ukraine-blue" }));
(__VLS_ctx.totalVolunteers);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-600" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow p-4 text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-2xl font-bold text-blue-600" }));
(__VLS_ctx.individualVolunteers);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-600" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow p-4 text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-2xl font-bold text-yellow-600" }));
(__VLS_ctx.fundsCount);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-600" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow p-4 text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-2xl font-bold text-green-600" }));
(__VLS_ctx.rehabilitationCenters);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-600" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid md:grid-cols-3 gap-8 mb-12" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-hand-heart text-2xl text-white" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold mb-3" }));
(__VLS_ctx.$t('volunteers.types.volunteer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-600 mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.openRegistrationModal('volunteer');
    } }, { class: "btn-ukraine w-full" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "w-16 h-16 bg-ukraine-yellow rounded-full flex items-center justify-center mx-auto mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-building text-2xl text-ukraine-blue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold mb-3" }));
(__VLS_ctx.$t('volunteers.types.fund'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-600 mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.openRegistrationModal('fund');
    } }, { class: "btn-ukraine w-full" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-hospital text-2xl text-white" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold mb-3" }));
(__VLS_ctx.$t('volunteers.types.rehabilitation'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-600 mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.openRegistrationModal('rehabilitation');
    } }, { class: "btn-ukraine w-full" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow-lg p-6 mb-8" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex flex-col sm:flex-row gap-4 flex-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "relative flex-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign({ value: (__VLS_ctx.searchQuery), type: "text", placeholder: "Пошук волонтерів..." }, { class: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign({ value: (__VLS_ctx.selectedType) }, { class: "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "volunteer",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "fund",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "rehabilitation",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign({ value: (__VLS_ctx.selectedLocation) }, { class: "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.uniqueLocations)); _i < _a.length; _i++) {
    var location = _a[_i][0];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (location),
        value: (location),
    });
    (location);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign({ value: (__VLS_ctx.selectedVerification) }, { class: "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "verified",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "pending",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "bg-white rounded-lg shadow-lg p-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex justify-between items-center mb-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ class: "text-2xl font-semibold" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-sm text-gray-600" }));
(__VLS_ctx.filteredVolunteers.length);
(__VLS_ctx.mockVolunteers.length);
if (__VLS_ctx.volunteersStore.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center py-8" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-spinner fa-spin text-2xl text-ukraine-blue" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "mt-2 text-gray-600" }));
    (__VLS_ctx.$t('common.loading'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" }));
    var _loop_1 = function (volunteer) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ key: (volunteer.id) }, { class: "border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 card-hover" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-start justify-between mb-4" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex-1" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center mb-2" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "font-semibold text-lg text-gray-900" }));
        (volunteer.name);
        if (volunteer.verified) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "ml-2" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-check-circle text-green-500" }, { title: "Верифіковано" }));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-sm text-gray-600 mb-1" }));
        (volunteer.organization);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center text-xs text-gray-500" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-map-marker-alt mr-1" }));
        (volunteer.location);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "px-3 py-1 text-xs rounded-full font-medium" }, { class: (__VLS_ctx.getTypeClass(volunteer.type)) }));
        (__VLS_ctx.$t("volunteers.types.".concat(volunteer.type)));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-sm text-gray-700 mb-4 line-clamp-3" }));
        (volunteer.description);
        if (volunteer.specializations && volunteer.specializations.length > 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "mb-4" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex flex-wrap gap-1" }));
            for (var _d = 0, _e = __VLS_getVForSourceType((volunteer.specializations.slice(0, 3))); _d < _e.length; _d++) {
                var spec = _e[_d][0];
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ key: (spec) }, { class: "px-2 py-1 bg-ukraine-blue bg-opacity-10 text-ukraine-blue text-xs rounded-full" }));
                (spec);
            }
            if (volunteer.specializations.length > 3) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full" }));
                (volunteer.specializations.length - 3);
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "space-y-2 text-sm text-gray-600 mb-4" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-envelope mr-2 text-ukraine-blue" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "truncate" }));
        (volunteer.email);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-phone mr-2 text-ukraine-blue" }));
        (volunteer.phone);
        if (volunteer.website) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-globe mr-2 text-ukraine-blue" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)(__assign({ href: (volunteer.website), target: "_blank" }, { class: "text-ukraine-blue hover:underline truncate" }));
            (volunteer.website);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center justify-between text-sm mb-4" }));
        if (volunteer.rating) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex items-center" }));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex text-yellow-400 mr-1" }));
            for (var _f = 0, _g = __VLS_getVForSourceType((5)); _f < _g.length; _f++) {
                var star = _g[_f][0];
                __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ key: (star) }, { class: (star <= volunteer.rating ? 'fas fa-star' : 'far fa-star') }));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ class: "text-gray-600" }));
            (volunteer.rating);
        }
        if (volunteer.experience) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-gray-600" }));
            (volunteer.experience);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex space-x-2" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!!(__VLS_ctx.volunteersStore.loading))
                    return;
                __VLS_ctx.contactVolunteer(volunteer);
            } }, { class: "flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-ukraine-blue-light transition-colors text-sm" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-envelope mr-1" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!!(__VLS_ctx.volunteersStore.loading))
                    return;
                __VLS_ctx.viewProfile(volunteer);
            } }, { class: "flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-sm" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-user mr-1" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-xs text-gray-500 mt-3 text-center" }));
        (__VLS_ctx.formatDate(volunteer.createdAt));
    };
    for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.filteredVolunteers)); _b < _c.length; _b++) {
        var volunteer = _c[_b][0];
        _loop_1(volunteer);
    }
}
if (!__VLS_ctx.volunteersStore.loading && __VLS_ctx.filteredVolunteers.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "text-center py-12" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-search text-6xl text-gray-300 mb-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-xl font-semibold text-gray-600 mb-2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ class: "text-gray-500" }));
}
if (__VLS_ctx.showRegistrationModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: (__VLS_ctx.closeRegistrationModal) }, { class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ onClick: function () { } }, { class: "bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "p-6" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(__assign({ class: "text-2xl font-semibold mb-6" }));
    (__VLS_ctx.$t("volunteers.types.".concat(__VLS_ctx.registrationType)));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(__assign({ onSubmit: (__VLS_ctx.submitRegistration) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "grid md:grid-cols-2 gap-4" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "md:col-span-2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    (__VLS_ctx.registrationType === 'volunteer' ? 'Ім\'я та прізвище' : 'Назва організації');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ value: (__VLS_ctx.registrationForm.name), type: "text", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: (__VLS_ctx.registrationType === 'volunteer' ? 'Іван Петренко' : 'Назва фонду/організації') }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ type: "email", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "email@example.com" }));
    (__VLS_ctx.registrationForm.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ type: "tel", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "+38 (0XX) XXX-XX-XX" }));
    (__VLS_ctx.registrationForm.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    (__VLS_ctx.registrationType === 'volunteer' ? 'Організація (опціонально)' : 'Повна назва організації');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ value: (__VLS_ctx.registrationForm.organization), type: "text", required: (__VLS_ctx.registrationType !== 'volunteer') }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: (__VLS_ctx.registrationType === 'volunteer' ? 'Назва організації (якщо є)' : 'Повна офіційна назва') }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ value: (__VLS_ctx.registrationForm.location), type: "text", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "Місто, область" }));
    if (__VLS_ctx.registrationType !== 'volunteer') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ type: "url" }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "https://example.com" }));
        (__VLS_ctx.registrationForm.website);
    }
    if (__VLS_ctx.registrationType === 'volunteer') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ type: "number", min: "0", max: "50" }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "0" }));
        (__VLS_ctx.registrationForm.experience);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "md:col-span-2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(__assign(__assign({ value: (__VLS_ctx.registrationForm.description), rows: "4", required: true }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: (__VLS_ctx.getDescriptionPlaceholder()) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "md:col-span-2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ class: "block text-sm font-medium text-gray-700 mb-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)(__assign(__assign({ value: (__VLS_ctx.registrationForm.specializationsText), type: "text" }, { class: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue" }), { placeholder: "медична допомога, психологічна підтримка, логістика" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "flex justify-end space-x-3 mt-6" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ onClick: (__VLS_ctx.closeRegistrationModal) }, { type: "button" }), { class: "px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors" }));
    (__VLS_ctx.$t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign(__assign({ type: "submit" }, { class: "btn-ukraine" }), { disabled: (__VLS_ctx.submitting) }));
    if (__VLS_ctx.submitting) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-spinner fa-spin mr-2" }));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(__assign({ class: "fas fa-user-plus mr-2" }));
    }
    (__VLS_ctx.submitting ? 'Реєструю...' : __VLS_ctx.$t('common.save'));
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
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
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-border']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-hand-heart']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-border']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-yellow']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-building']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['ukraine-border']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-hospital']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-search']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-check-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-map-marker-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-envelope']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-phone']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-globe']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-ukraine-blue-light']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-envelope']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['text-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-ukraine-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-user']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-search']} */ ;
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[90vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
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
/** @type {__VLS_StyleScopedClasses['md:col-span-2']} */ ;
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
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ukraine']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['fas']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-user-plus']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () {
        return {
            volunteersStore: volunteersStore,
            showRegistrationModal: showRegistrationModal,
            registrationType: registrationType,
            submitting: submitting,
            searchQuery: searchQuery,
            selectedType: selectedType,
            selectedLocation: selectedLocation,
            selectedVerification: selectedVerification,
            registrationForm: registrationForm,
            mockVolunteers: mockVolunteers,
            filteredVolunteers: filteredVolunteers,
            uniqueLocations: uniqueLocations,
            totalVolunteers: totalVolunteers,
            individualVolunteers: individualVolunteers,
            fundsCount: fundsCount,
            rehabilitationCenters: rehabilitationCenters,
            getTypeClass: getTypeClass,
            formatDate: formatDate,
            getDescriptionPlaceholder: getDescriptionPlaceholder,
            openRegistrationModal: openRegistrationModal,
            closeRegistrationModal: closeRegistrationModal,
            submitRegistration: submitRegistration,
            contactVolunteer: contactVolunteer,
            viewProfile: viewProfile,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
