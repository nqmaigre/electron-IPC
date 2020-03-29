* 安装好 Node.js 和 npm
* 先进入 `electron` 文件夹
* 执行 `npm install` 来安装被使用的库
* 再执行 `npm start` 就可以运行程序了
* 其他说明
  * 多进程通信和运算过程是由 `parent.js, child1.js, child2.js, child3.js `这几个文件来处理的（现在已经完成了，不用管这一块）
  * GUI 是在 `index.html` 还有 `renderer.js` 中定义的，`index.html`中定义了页面的初始布局，`renderer.js` 中定义了拿到进程输出后要如何把数据显示到页面上

