// src/assets/plugins/validate.js
import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'

export default {
  install(app) {
    // 只註冊函式型別的規則
    Object.keys(rules).forEach((rule) => {
      if (typeof rules[rule] === 'function') {
        defineRule(rule, rules[rule])
      }
    })

    // 載入繁體中文語系
    loadLocaleFromURL('/zh_TW.json')

    // 全域設定
    configure({
      generateMessage: localize('zh_TW'),
      validateOnInput: true,
    })

    // 註冊全域元件
    app.component('VForm', Form)
    app.component('VField', Field)
    app.component('ErrorMessage', ErrorMessage)
  },
}
