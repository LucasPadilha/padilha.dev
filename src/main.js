import './assets/main.css'

import { createHead } from '@unhead/vue'
import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTwitter, faInstagram, faLinkedin, faGithub, faFilePdf)

const app = createApp(App)

app.use(createHead())

app.component('faIcon', FontAwesomeIcon)

app.mount('#app')
