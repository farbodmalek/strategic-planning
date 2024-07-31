export default defineNuxtConfig({
    app: {
        head: {
            title: " سامانه طرح های راهبردی صندوق",
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {hid: "description", name: "description", content: "Nuxt Argon Dashboard 2 PRO by Creative Tim"},
            ],
            link: [
                {rel: "icon", type: "image/x-icon", href: "/favicon.png"},
            ],
            script: [],
        },
    },
    // components: {
    //     global: true,
    //     dirs: ["~/components/icons", "~/components"],
    // },

    ssr: false,
    imports: {
        autoImport: true,
    },

    css: [
        "@/assets/css/style.css",
        "@fortawesome/fontawesome-svg-core/styles.css",
        "@/assets/css/nucleo-svg.css",
        "@/assets/css/nucleo-icons.css",
        "@/assets/scss/foreign-main.scss",
        "primevue/resources/themes/lara-light-blue/theme.css"
    ],

    build: {
        extend(config, ctx) {
        },
        transpile: ['primevue', /^vue2-google-maps($|\/)/]
    },

    modules: ["@pinia/nuxt", "nuxt-primevue", 'nuxt3-leaflet'],

    runtimeConfig: {
        public: {
            KarafariniPlans: 'http://spsbapi.karafariniomid.ir/api/',
            common:        'http://jscommonapi.karafariniomid.ir/api/',
            userManagment: 'https://jscommonapi.karafariniomid.ir/api/',
            userApi: 'http://userdev.internalhost.ir/api/'
        },
    },
    plugins: [
        "~/plugins/fontawsome.js",
        "~/plugins/prime-tooltip.js",
        '~/plugins/primevue.js'
    ],

    primevue: {
        options: {
            ripple: true,
        },
        components: {
            include: ['Button', 'Textarea', 'Password', 'ColumnGroup', 'Row', 'InputNumber', 'ProgressSpinner',
                'DataTable', 'Toast', 'TabView', 'TabPanel', 'Column', 'ConfirmDialog', 'Checkbox', 'Steps', 'Menu',
                'Calendar', 'MultiSelect', 'Dialog', 'RadioButton', 'InputText', 'card', 'AutoComplete', 'Dropdown',
                'ProgressBar', 'InputMask' ]
        }
    }
})

