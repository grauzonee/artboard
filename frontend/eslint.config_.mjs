import pluginVue from 'eslint-plugin-vue'
import {
    defineConfigWithVueTs,
    vueTsConfigs,
    configureVueProject
} from '@vue/eslint-config-typescript'

configureVueProject({
    // Whether to parse TypeScript syntax in Vue templates.
    // Defaults to `true`.
    // Setting it to `false` could improve performance.
    // But TypeScript syntax in Vue templates will then lead to syntax errors.
    // Also, type-aware rules won't be applied to expressions in templates in that case.
    tsSyntaxInTemplates: true,

    scriptLangs: ['ts']
})
export default defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    vueTsConfigs.stylistic
)
