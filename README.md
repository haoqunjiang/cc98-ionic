## 开发环境

理论上本项目可以同时为 iOS 和 Android 平台构建，不过目前仅为 iOS 平台测试过，以下描述也只针对 iOS，如需构建到 Android 平台，请自行参考 ionic framework 的官方文档。

1. 安装 [io.js](https://iojs.org/)；
2. 运行以下命令（可能需要 `root` 权限）：

        npm install gulp -g     # 安装 gulp 用于各种构建任务
        npm install jspm -g     # 安装 jspm 用于下载第三方依赖
        npm install cordova ionic -g  # 安装 cordova 和 ionic 命令行工具

3. 在本项目根目录下运行以下命令：

        jspm install            # 下载前端的第三方依赖
        npm install             # 安装开发/打包用的命令行工具所需的依赖

4. 在 `www` 目录下新建 `secrets.json` 文件，在其中填入以下内容：

        {
          "client_id": YOUR_CLIENT_ID,
          "client_secret": YOUR_CLIENT_SECRET,
          "redirect_uri": YOUR_REDIRECT_URI
        }

  其中 `YOUR_CLIENT_ID`、`YOUR_CLIENT_SECRET` 均可在申请 CC98 API 时获得，`YOUR_REDIRECT_URI` 则是申请后自行设置的回调页面地址；

5. 运行 `ionic run ios`，即可在 iOS 模拟器中查看效果了（iOS 开发环境请自行配置）。



## 测试

暂不包含 E2E 测试，因为没有一个干净且稳定的后端（数据库）环境。等以后有心情了再写个后端 mock 环境做测试。

### 单元测试

### 代码覆盖率

### 代码重复率检测

- jsinspect: `gulp jsinspect`;
- jscpd: [todo]



## 打包发布



## ES Harmony

受[这篇文章](http://div.io/topic/950)和 [angular-systemjs-seed](https://github.com/Swimlane/angular-systemjs-seed) 项目启发，本项目遵循 ES Harmony 标准来书写代码。
为了在尚未支持 ES Harmony 标准的浏览器中运行，本项目使用的工具包括 [jspm](http://jspm.io/)、[SystemJS](https://github.com/systemjs/systemjs) 和 [Babel](https://babeljs.io/)。



## 编辑器配置

- 本项目使用了 [EditorConfig](http://editorconfig.org/) 以自动配置编辑器；
- 各大主流 IDE/编辑器均有 EditorConfig 插件，可以在 [EditorConfig 官网](http://editorconfig.org/) 找到对应的下载链接；
- 如果不想安装插件的话，可以查看 [.editorconfig](./src/main/webapp/.editorconfig) 文件以了解本项目的编辑器配置。



## 代码风格与代码质量检查

- 强烈建议使用 [ESLint](http://eslint.org/) 保证 JavaScript 代码质量；
- 各大主流 IDE/编辑器的 ESLint 插件可在 [ESLint 官网](http://eslint.org/docs/integrations/)下载到；
- 本项目的默认 ESLint 配置在 [.eslintrc](./src/main/webapp/.eslintrc) 文件里，可以查看该文件了解本项目的代码规范；
- 此外，可在 ESLint 官网查看它的默认规范；
- 对于以上没有涉及到的部分以及 HTML/CSS 代码规范，请参考 [Google HTML/CSS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml) 以及 [Google JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)，至于他们的 AngularJS Style Guide 参考价值不大，AngularJS 官方的 [Best Practices](https://github.com/angular/angular.js/wiki/Best-Practices) 可以一看，[John Papa 的 Angular Style Guide](https://github.com/johnpapa/angular-styleguide) 也有很重要的参考价值。使用 ES Harmony 的 AngularJS 写法可以参考[这篇文章](http://martinmicunda.com/2015/02/09/how-to-start-writing-apps-with-es6-angular-1x-and-jspm/)。

> #### 关于 Sublime Text 使用 ESLint 的一些注意点
> - 需要预装 `eslint` 命令行版本以及 Sublime Text 的 SublimeLinter 插件；
> - `.eslintignore` 文件[暂时不起作用，可通过修改 SublimeLinter 的用户设置来实现](https://github.com/roadhump/SublimeLinter-eslint/issues/13)。



## 注释与文档

- 建议使用 [JSDoc 3](http://usejsdoc.org/) 定义的格式来注释代码；
- 对于 `module`、`controller`、`factory` 等的注释可以参考[这个链接](http://stackoverflow.com/a/24208836/2302258)（仅供参考，暂未使用这种方式注释，因为目前项目 `module` 的命名风格带了点号 `.` 不适用于此）；
- 本项目中对返回类型为 `Promise` 的函数，使用了 `@resolve` 和 `@reject` 标签注释，这两个标签在 JSDoc 中并没有定义，此处仅是为了方便阅读代码，生成文档时并没有办法输出（关于如何注释 `Promise` 类型，[这个 GitHub Issue](https://github.com/jsdoc3/jsdoc/issues/509) 中有更详细的讨论）。



## 其他

因为 JSPM 的限制，在开发环境下自定义 ionic 的样式有点复杂（因为 jspm registry 里的 ionic 包是引入的 ionic.css，而实际自定义时是要修改 sass 文件的），因此本项目参考了[这里](https://github.com/jspm/jspm-cli/issues/393#issuecomment-77781122)的做法，对 ionic 额外做了个 bundle。

后续如需升级 ionic 版本，则请运行如下命令：

    jspm install ionic  # jspm 遵循 semver，所以单纯的 update 很有可能不起作用，很多时候都得重新 install
    cd www
    jspm bundle ionic bundles/ionic.js --inject


## 后续计划

- 等 [flow](http://flowtype.org/) 或 [TypeScript](http://typescriptlang.org/) 对 ES6 的支持成熟后考虑加入类型系统。目前来说 flow 的坑太多、功能太不完善；TypeScript 1.5 尚处在 beta 版很多 ES6 相关的新功能还不能用，都不适合用到本项目中。


## 截图
![热门话题](http://ww3.sinaimg.cn/large/921c1cdagw1esyw0n62ftj20ku112afd.jpg)
