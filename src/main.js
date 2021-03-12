import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueDictaphone from 'vue-dictaphone'
import AudioVisual from 'vue-audio-visual'
import Toasted from 'vue-toasted'
import VueI18n from 'vue-i18n'
import store from './store'
import router from './router'
const uuidv4 = require("uuid/v4")

Vue.use(VueI18n)
Vue.config.ignoredElements = [/^ion-/]
Vue.use(AudioVisual)
Vue.use(Toasted)


const messages = {
  en: {
    splash: {
      title: 'Ode to Y - A Public Art Work Needs Your Voice'  ,
      splashp1: 'All tenants of Y Foundation are warmly welcome to participate in the Ode to Y artwork. The work consists of 35 "musical" tables created by artists Tellervo Kalleinen and Oliver Kochta-Kalleinen - with the contribution of many tenants. The tables designed from colorful mosaic tiles are perfectly usable garden tables, but they can do more: enabled by a mobile app they can play music, share stories of tenants and tell memories about Y-Foundation.',
      splashp2: 'The non-profit and independent Y-Foundation is one of the key national developers of the Housing First principle in Finland. The Y-Foundation offers affordable rental housing, such as M2-kodit and Y-kodit.',
      subtitle1: '35 Tables - 35 Years',
      splashp3: 'In celebration of its 35-year journey, the Y-Foundation will give the 35 tables away as presents to its rental houses all around Finland. They will be installed in the courtyards or gardens of Y-Foundation\'s apartment houses. Each table will be dedicated to one year – starting from the founding of Y-Säätiö in 1985 until today, thus representing the many efforts, struggles and achievements in combating homelessness in Finland throughout the foundation\'s existence.',
      video_header: 'Tellervo Kalleinen and Oliver Kochta-Kalleinen realise the art work together with Y-Foundation\'s renters during 2021 and 2022.',
      subtitle2: '17,374 mosaic tiles - 17,374 rental apartments',
      splashp4: 'The surface of the 35 tables consists of colorful and beautiful mosaic tiles. Each tile represents one of Y-Foundations rental apartments - in total 17,374. In that way each flat will have their own tiny spot on one of the tables. The pieces of mosaic are made from recycled glass.',
      subtitle3: 'Sound tables',
      splashp5: 'While the tables can be used for many things like picnics, garden parties or playing cards, a mobile application unlocks another hidden layer: the tables can play the Ode for Y musical piece composed from tenants voices, tell short stories from other tenants of Y-Säätiö from all around Finland and also tell some interesting anecdotes about Y-Säätiö itself.',
      subtitle4: 'Your voice is needed',
      splashp6: 'If you are a tenant of the Y-Foundation, we invite you to contribute your voice, and perhaps even a story to this collective work of art! There are 3 things we hope you can contribute. 1. A short story: please share a story or a situation that happened at your home table. The memory can be mundane or dramatic - whatever moment you want to share. 2. For a musical piece we would like to have a recording of your voice saying or singing the letter “yy” in your own style, and 3. A recording of a word that begins with the letter Y. Participation in the project is anonymous, but if you wish we will mention your name on the project web site as one of the contributors.',
      button_header: 'You can make the recordings easily with your own device. We have created a widget that will take you through the process in 5 easy steps, just click the button below:',
      subtitle5: 'Lottery',
      splashp7: 'We will give out 35 surprises by lottery to participants that provided contact details. We will inform you by email if you are among the lucky winners.',
      subtitle6: 'Partners',
      splashp8: 'The project is being implemented in co-operation with ABL Oy.',
      subtitle7: 'Contact',
      splashp9: 'If you have any questions concerning the project or your contribution, please get in touch with us by email: hello@studiokalleinen.net'
    },
    message: {
      title: 'Ode to Y',
      your_name: 'Your name:',
      your_email: 'Your email address: ',
      contact_details: 'Other contact details: ',
      delete_warning: 'You have deleted your sound without recording a new one. Are you sure you want to continue?',
      prev: 'Back',
      next: 'Next',
      step1: 'Welcome!',
      step2: 'Sound',
      step3: 'Word',
      step4: 'Memory',
      step5: 'Submit',
      record: 'Record',
      stop: 'Stop',
      start_title: 'Take part',
      ysound_title: 'Record the letter Y',
      yword_title: 'Record your Y-word',
      homestory_title: 'Record a table story',
      submit_title: 'Submit',
      start_intro: 'Welcome to participate in the Ode to Y -sound art work! It only takes 5 easy steps to contribute.',
      start_instructions: 'If you want to be kept posted about the project, and to take part in the lottery, enter your name and email here. You can also move directly to step 2.',
      ysound_instructions: 'Please record the LETTER Y in different styles. You can for example record “Yyyy” long, short, in different pitches, in repetition, rhythmically, loud and silent. When you are finished press STOP.',
      yword_instructions: 'Think about a meaningful word for you that starts with the letter Y. Record it in different ways: slow, fast, rhythmically, repeated, singing, shouted, silent. Start recording by pressing the RECORD button. When you are finished press STOP. ',
      ysound_extra: 'Press RECORD to start recording. Press STOP when you are finished.',
      homestory_instructions: 'In step 4 we ask you to remember a situation or a story that happened around your home table. Hit the RECORD button and share your memory.',
      submit_instruction1: 'Big thanks for taking part! Please click SUBMIT when you are happy with the 3 recordings. You can go back to any of the earlier steps and record again if needed. By clicking SUBMIT you give permission to the artists to use your audio recordings for their Ode to Y artwork. Add any additional comments or greetings below. Tick the checkbox if you want to contribute anonymously. In this case your name will not be mentioned in the list of contributors.',
      submit_instruction2: '',
      submit_instruction3: '',
      your_recording: 'Press PLAY to listen to your recording. If you are happy with it, go to the next step by clicking NEXT.  Click DELETE if you would like to remove it and record a new version.',
      after_submit: 'Thank you!',
      help_title: 'Help',
      help1: 'Press RECORD button',
      help2: 'Record your voice by talking to your device',
      help3: 'Press STOP to finish recording',
      help4: 'Listen to your recording by pressing PLAY button',
      help5: 'If you want to try again, you can DELETE your sound and press RECORD again.',
      help6: ' If you are satisfied with it, press the NEXT button',
      additional_comments: 'Enter any additional comments: ',
      anonymous: 'I would like my recordings to be submitted anonymously.',
      start_over: 'Return to homepage'
    }
  },
  fi: {
    splash: {
      title: 'Oodi Y:lle - Anna äänesi mosaiikki-ääniteokseen!',
      splashp1: 'Y-Säätiön vuokralaiset ovat lämpimästi tervetulleita osallistumaan Oodi Y:lle -äänitaideteokseen, joka muodostuu 17374 kuunneltavasta mosaiikkilaatasta. Kukin laatoista edustaa yhtä Y-Säätiön vuokra-asuntoa! Värikäs mosaiikki tulee verhoilemaan 35 pöytää, jotka kuvataiteilija-duo Tellervo Kalleinen ja Oliver Kochta-Kalleinen ovat suunnitelleet. Mobiilisovelluksen ja lisätyn todellisuuden avulla kunkin pöydän mosaiikkipinta muuttuu ääniteokseksi, josta voi kuunnella vuokralaisten äänistä sävellettyä musiikkia sekä heidän tarinoitaan!',
      splashp2: 'Yleishyödyllinen ja poliittisesti sitoutumaton Y-Säätiö on asunnottomuustoimija ja Suomen 4. suurin vuokranantaja. Säätiö vuokraa muun muassa kohtuuhintaisia M2-koteja ja Y-koteja ja työllistää asukkaita Uuras -hankkeen kautta.',
      subtitle1: '35 Pöytää - 35 Vuotta',
      splashp3: 'Y-Säätiö lahjoittaa 35-vuotisen taipaleensa kunniaksi 35 pöytää ympäri Suomea sijaitsevien vuokratalojensa pihapiireihin. Jokainen pöytä edustaa yhtä Y-Säätiön vuosista alkaen vuodesta 1985. Pöydät kuvastavatkin säätiön monivuotista ponnistusta asunnottomuuden vähentämiseksi Suomessa.',
      video_header: 'Tellervo Kalleinen ja Oliver Kochta-Kalleinen toteuttavat pöydät yhdessä Y-Säätiön vuokralaisten kanssa vuosien 2021 ja 2022 aikana.',
      subtitle2: '17374 mosaiikkipalaa - 17374 vuokra-asuntoa',
      splashp4: 'Pöytien pinta muodostuu yhteensä 17374 kierrätetystä lasista valmistetusta mosaiikkipalasta. Niistä jokainen edustaa yhtä Y-Säätiön vuokra-asuntoa.',
      subtitle3: 'Kuunneltavat pöydät',
      splashp5: 'Mosaiikkipaloista voi kännykkäsovelluksen kautta kuunnella asukkaiden tarinoita heidän kotipöytiensä ääreltä ja kuulla heidän äänistään sävelletyn Oodi Y:lle -ääniteoksen. Joistain mosaiikkipaloista pääsee kuulemaan myös Y-Säätiön työntekijöiden muistoja vuosien varrelta.',
      subtitle4: 'Tarvitsemme äänesi',
      splashp6: 'Jos olet Y-Säätiön vuokralainen, kutsumme sinut antamaan äänesi yhdelle pöytien mosaiikkipaloista! Voit osallistua kolmella eri äänellä: 1. Kuvaile joku tilanne, joka on tapahtunut kotisi pöydän ääressä. Muisto voi olla arkinen tai dramaattinen – mikä vain mieleesi jäänyt hetki. 2. Äänitä valitsemaltasi äänen korkeudelta Y -äänne. Sävellämme näistä musiikkia! 3. Valitse yksi Y:llä alkava sana ja äänitä se meille. “Ota osaa” -napin takaa pystyt suorittamaan äänitykset helposti omalla laitteellasi. Saat siellä myös yksityiskohtaiset ohjeet.',
      button_header: 'Osallistuminen tapahtuu anonyymisti. Merkitsemme kuitenkin halukkaiden nimet web-sivun osallistujalistaan!',
      subtitle5: 'Arpajaiset',
      splashp7: 'Arvomme osallistujien välillä yllätyksiä – merkitse siis yhteystietosi jos haluat osallistua arvontaan! ',
      subtitle6: 'Yhteistyökumppanit',
      splashp8: 'Projekti toteutetaan yhteistyössä ABL Oy:n kanssa .',
      subtitle7: 'Yhteystiedot',
      splashp9: 'Jos sinulla on kysymyksiä projektiin liittyen, kirjoita taiteilijoille sähköpostia: hello@studiokalleinen.net'
      
    },
    message: {
      title: 'Oodi Y:lle',
      your_name: 'Nimi:',
      your_email: 'Sähköposti: ',
      contact_details: 'Muut yhteystiedot:',
      delete_warning: 'You have deleted your sound without recording a new one. Are you sure you want to continue?',
      prev: 'Edellinen',
      next: 'Seuraava',
      step1: 'Tervetuloa!',
      step2: 'Äänne',
      step3: 'Sana',
      step4: 'Muisto',
      step5: 'Valmis',
      record: 'Äänitä',
      stop: 'Lopeta',
      start_title: 'Ota Osaa',
      ysound_title: 'Äänitä Y-Äänne',
      yword_title: 'Äänitä Y-Sanasi',
      homestory_title: 'Äänitä tarina pöytäsi ääreltä',
      submit_title: 'Lähetä',
      start_intro: 'Tervetuloa osallistumaan Oodi Y:lle -taideteokseen! Se tapahtuu helposti näiden viiden vaiheen kautta.',
      start_instructions: 'Kirjoita tähän nimesi ja sähköpostiosoitteesi, jotta voimme kertoa sinulle projektin kulusta sekä ilmoittaa voittajille osallistujien välillä arvotuista arpajaispalkinnoista. Jos sinulla ei ole sähköpostiosoitetta, ilmoita joku muu yhteystietosi. Halutessasi voit siirtyä suoraan 2. vaiheeseen.',
      ysound_instructions: 'Äänitä y-äänne eri tyyleillä. Voit esimerkiksi äänittää pitkän y:n eri korkeuksilta tai lyhyempiä rytmikkäitä y-äänteitä. Voit laulaa Y:n lujaa tai kuiskata sen hiljaisesti. Äänteistä sävelletään Oodi Y:lle -ääniteos!',
      ysound_extra: 'Aloita äänitys klikkaamalla ÄÄNITÄ. Äänitys loppuu klikatessasi LOPETA.',
      yword_instructions: 'Valitse sinulle merkityksellinen sana, joka alkaa Y-kirjaimella. Äänitä se eri tavoin: hitaasti, huutaen, kuiskaten ...',
      homestory_instructions: 'Muistele tilanteita ja hetkiä, joita olet kokenut oman kotisi pöydän äärellä. Kerro niistä jokin! Muisto voi olla yhtä hyvin arkinen hetken kuvaus kuin jokin mieleen jäänyt dramaattisempi tilanne.',
      submit_instruction1: 'Suuri kiitos osallistumisestasi! Paina LÄHETÄ ja äänestäsi tulee osa Oodi Y:lle mosaiikkia! Halutessasi kuitenkin ottaa jonkun kolmesta äänityksestäsi uudestaan, voit palata kyseiseen vaiheeseen.',
      submit_instruction2: 'Painamalla “lähetä” annat luvan taiteilijoille käyttää äänityksiäsi osana heidän Oodi Y:lle -taideteosta.',
      submit_instruction3: 'Jos haluat jättää kommentteja tai terveisiä taiteilijoille, kirjoita ne kenttään. Klikkaa myös, mikäli haluat, että emme mainitse nimeäsi teoksen osallistujalistassa.',
      your_recording: 'Voit kuunnella äänityksesi painamalla PLAY. Siirry sitten seuraavaan vaiheeseen klikkaamalla SEURAAVA. Voit myös halutessasi uusia äänitykset painamalla DELETE vanhan äänityksen poistamiseksi – aloita sitten äänityksesi alusta.',
      after_submit: 'Kiitos!',
      help_title: 'Help',
      help1: 'Paina ÄÄNITÄ aloittaaksesi äänityksen. ',
      help2: 'Äänitä puhumalla laitteeseesi. ',
      help3: 'Paina LOPETA lopettaaksesi äänitys.',
      help4: 'Voit kuunnella äänityksesi klikkaamalla PLAY-nappulaa.',
      help5: 'Jos haluat ottaa uusiksi, paina DELETE ja aloita uusi äänitys.',
      help6: 'Kun olet valmis siirtymään eteenpäin, SEURAAVA',
      additional_comments: 'Kommentit ja terveiset',
      anonymous: 'Haluan, ettei nimeäni mainita teoksen yhteydessä. ',
      start_over: 'Palaa kotisivulle'
    }
  }
}


const i18n = new VueI18n({
  locale: 'fi',
  fallbackLocale: 'en',
  messages
})


Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
if (localStorage.locale) {
  i18n.locale = localStorage.getItem('locale')
} else {
  localStorage.setItem('locale', i18n.locale)
}
let cookie = ''
if (localStorage.identifier) {
  cookie = localStorage.getItem('identifier')
} else {
  cookie =  uuidv4()
  localStorage.setItem('identifier', cookie)
}
store.commit('setIdentifier',cookie)
// console.log('identifier should be ' + cookie)
store.commit('setCurrentStep', 0)
// console.log('currentStep should be ' + 0)
store.commit('setLocale', i18n.locale)
Vue.use(VueDictaphone)
Vue.use(router)

Vue.config.productionTip = false
new Vue({
  i18n,
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
