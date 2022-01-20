const { writeFileSync, statSync, existsSync, readdirSync } = require('fs')
const { resolve, join, extname } = require('path')

const packageDir = resolve(__dirname, '../packages')
const componentDir = resolve(__dirname, '../packages/Components')

/**
 * 用 components/[A-Z]xxx(.js|.vue|/index.js) 生成 components/index.js
 */
function genComponentIndex() {
   let files = readdirSync(componentDir, { encoding: 'utf8' })
   let res = files
      .filter((file) => {
         let match = /^[A-Z]/.test(file)
         // 没有 index.js 的目录不要
         if (match) {
            let abs = join(componentDir, file)
            if (statSync(abs).isDirectory()) {
               return existsSync(join(abs, 'index.js'))
            }
         }
         return !!match && /\.(?:js|vue)$/.test(file)
      })
      .sort()
      .reduce(
         (res, file) => {
            file = file.slice(0, file.length - extname(file).length)
            if (res.components.indexOf(file) === -1) {
               // ECharts 不自动生成导出，使用时手动导入
               if (file === 'ECharts') {
                  return res
               }

               res.components.push(file)
               //   res.exports.push(`export { default as BE${file} } from './${file}'`)
               res.exports.push(`export * from './${file}'`)
               res.imports.push(`import { BE${file} } from './Components/${file}'`)
            }
            return res
         },
         { components: [], exports: [], imports: [] }
      )

   let content = '// This file is generated automatically by `npm run components`.\n' + res.exports.join('\n') + '\n'
   writeFileSync(resolve(componentDir, 'index.js'), content, 'utf8')

   const str =  '// This file is generated automatically by `npm run components`.\n' + res.imports.join('\n') + '\n\n'+'export default [\n'+ res.components.map(file => '   BE'+file).join(',\n') +'\n]\n'
   writeFileSync(resolve(packageDir, 'component.js'), str)
}

genComponentIndex()
