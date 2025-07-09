import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import { faCircleCheck, faCircleInfo, faUser, faFeed, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleExclamation)
library.add(faCircleCheck)
library.add(faCircleInfo)
library.add(faUser)
library.add(faFeed)
library.add(faPencil)
library.add(faXmark)

const app = createApp(App)

app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
