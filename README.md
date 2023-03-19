# 《人人都能读标准》—— JavaScript篇

**本书系统地介绍了[JavaScript标准](https://tc39.es/ecma262/multipage/)的阅读规则以及使用方式，并深入剖析了标准对JavaScript核心原理的描述。** 通过本书，读者能够完全掌握自行阅读标准的能力，深化对语言的理解，并最终得以使用标准 —— 这个世界上最好的JavaScript资料来解决日常工作问题、进阶个人编码能力。


<br/>


### 目录：

<br />

**前言：** [**为什么需要阅读标准？** ](./README.md#为什么需要阅读标准)

**Part1 介绍篇：** 

1. [**标准的阅读指南**](./1.reading_gudie.md)
2. [**标准的迭代模式**](./2.evolution.md)
3. [**宿主环境**](./3.host-environment.md)

**Part2 原理篇：** 

4. [**文法符号系统（1）** ](./4.context-free-grammar.md)
5. [**文法符号系统（2）** ](./5.grammar-summary.md)
6. [**算法符号系统**](./6.algorithm.md)
7. [**规范类型**](./7.spec_type.md)
8. [**运行环境可视化：agents、执行上下文、Realm**](./8.execution-environment.md)
9. [**运行环境可视化：作用域与声明实例化**](./9.scope.md)
10. [**运行环境可视化：作用域链与闭包**](./10.scope-chain.md)
11. [**原理篇总结：一个程序的完整执行过程**](./11.code-execution.md)

**Part3 应用篇：** 

12. [**内部模型：原始类型**](./12.primitive-type.md)
13. [**内部模型：对象类型**](./13.object-type.md)
14. [**底层算法：函数的创建与执行**](./14.function.md)
15. [**底层算法：类的创建与实例化**](./15.class.md)
16. [**底层算法：生成器的创建与异步迭代**](./16.iterator&generator.md)
17. [**底层算法：JavaScript的错误处理机制**](./17.error.md)
18. [**应用标准：手写一个通过test262标准符合性测试的Promise**](./18.promise.md)
19. [**应用标准：4个步骤永久根治this值问题**](./19.this.md)
20. [**结语：使用engine262把标准“跑”起来**](./20.engine262.md)


<br/>


### 目录:

  * [目录：](#目录)

- [概念术语对照表](#概念术语对照表)
<br/>


## 概念术语对照表

下表是本书对标准术语使用的中文翻译，这里很大一部分的翻译沿用掘金社区提供的[参考](https://github.com/xitu/gold-miner/wiki/ECMAScript%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97%EF%BC%882021.5%EF%BC%89)。在表中，点击左侧的链接会跳转到标准中定义该术语的位置，点转右侧的链接会跳转到本书与该术语相关的章节。

| 英文                                                         | 中文                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Notational Conventions](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-notational-conventions) | [表示法约定](./1.reading_gudie.md#第5章表示法约定)         |
| [host environment](https://tc39.es/ecma262/multipage/overview.html#host-environment) | [宿主环境](./3.host-environment.md)                          |
| [host-defined](https://tc39.es/ecma262/multipage/overview.html#host-defined) | [宿主定义](./3.host-environment.md)                          |
| [implementation-defined](https://tc39.es/ecma262/multipage/overview.html#implementation-defined) | [实现定义](./3.host-environment.md)                          |
| [host hooks](https://tc39.es/ecma262/multipage/overview.html#host-hook) | [宿主钩子](./3.host-environment.md#加载模块)                 |
| [grammar](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [文法](./4.context-free-grammar.md)                          |
| [production](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [产生式](./4.context-free-grammar.md#文法的基本理解规则)     |
| [alternative](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-notational-conventions) | [代换式](./4.context-free-grammar.md#文法的基本理解规则)     |
| [goal symbol](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [目标符](./4.context-free-grammar.md#文法的基本理解规则)     |
| [terminator](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [终结符](./4.context-free-grammar.md#文法的基本理解规则)     |
| [nonterminator](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [非终结符](./4.context-free-grammar.md#文法的基本理解规则)   |
| [context-free grammars](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [上下文无关文法](./4.context-free-grammar.md#文法的基本理解规则) |
| [Lookahead Restrictions](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-lookahead-restrictions) | [前瞻限制](./4.context-free-grammar.md#文法的表示约定)       |
| [grammatical parameters](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-grammatical-parameters) | [文法参数](./4.context-free-grammar.md#文法参数)             |
| [lexical grammer](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-lexical-and-regexp-grammars) | [词法文法](./5.grammar-summary.md#词法分析)                  |
| [Input element](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-lexical-and-regexp-grammars) | [输入元素](./5.grammar-summary.md#词法分析)                  |
| [syntactic grammer](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-syntactic-grammar) | [句法文法](./5.grammar-summary.md#句法分析)                  |
| [parse tree](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-syntactic-grammar) | [解析树](./5.grammar-summary.md#句法分析)                    |
| [abstract operations](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-algorithm-conventions-abstract-operations) | [抽象操作](./6.algorithm.md#抽象操作)                        |
| [syntax-directed operation](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-algorithm-conventions-syntax-directed-operations) | [语法导向操作](./6.algorithm.md#语法导向操作)                |
| [semantics](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-algorithm-conventions-syntax-directed-operations) | [语义](./6.algorithm.md#语法导向操作)                        |
| [runtime semantics](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-runtime-semantics) | [运行时语义](./6.algorithm.md#运行时语义)                    |
| [Runtime Semantics: Evaluation](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-evaluation) | [求值语义](./6.algorithm.md#运行时语义)                      |
| [static semantics](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-static-semantic-rules) | [静态语义](./6.algorithm.md#静态语义)                        |
| [early error](https://tc39.es/ecma262/multipage/error-handling-and-language-extensions.html#early-error) | [先验错误](./6.algorithm.md#静态语义)                        |
| [chain production](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-context-free-grammars) | [链式产生式](./6.algorithm.md#链式产生式的语法导向操作)      |
| [specification Types](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-specification-types) | [规范类型](./7.spec_type.md)                                 |
| [Record](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-list-and-record-specification-type) | [记录器](./7.spec_type.md#记录器record)                  |
| [Script Record](https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html#script-record) | [脚本记录器](./7.spec_type.md#记录器record)              |
| [Property Descriptor](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-descriptor-specification-type) | [属性描述符记录器](./7.spec_type.md#属性描述符记录器property-descriptor-record) |
| [Completion Record](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type) | [完成记录器](./7.spec_type.md#完成记录器completion-record) |
| [normal completion](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type) | [正常完成](./7.spec_type.md#完成记录器completion-record) |
| [abrupt completion](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type) | [硬性完成](./7.spec_type.md#完成记录器completion-record) |
| [Abstract Closure](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-abstract-closure) | [抽象闭包](./7.spec_type.md#抽象闭包abstract-closure)    |
| [agent clusters](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-agent-clusters) | [agent集群](./8.execution-environment.md)                    |
| [execution context stack](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#execution-context-stack) | [调用栈](./8.execution-environment.md#调用栈与执行上下文)    |
| [execution context](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts) | [执行上下文](./8.execution-environment.md#调用栈与执行上下文) |
| [ECMAScript code execution contexts](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#ecmascript-code-execution-context) | [ECMAScript代码执行上下文](./8.execution-environment.md#执行上下文中的词法环境是作用域链的起点) |
| [LexicalEnvironment](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#table-additional-state-components-for-ecmascript-code-execution-contexts) | [词法环境](./8.execution-environment.md#执行上下文中的词法环境是作用域链的起点) |
| [Realm Record](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#realm-record) | [Realm记录器](./8.execution-environment.md#realm)            |
| [Environment Record](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-environment-records) | [环境记录器](./9.scope.md#环境记录器--标识符的容器)        |
| [identifier](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-identifiers) | [标识符](./9.scope.md#环境记录器--标识符的容器)            |
| [DeclarationInstantiation](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-blockdeclarationinstantiation) | [声明实例化](./9.scope.md#声明实例化的一般过程)              |
| [lexicalDeclared](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-static-semantics-lexicallydeclarednames) | [词法声明](./9.scope.md#1-作用域分析)                       |
| [VarDeclaraed](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-static-semantics-vardeclarednames) | [变量声明](./9.scope.md#1-作用域分析)                       |
| [instantiate](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) | [实例化](./9.scope.md#2-绑定标识符)                         |
| [initialize](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) | [初始化](./9.scope.md#2-绑定标识符)                         |
| [Reference Record](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-reference-record-specification-type) | [引用记录器](./10.scope-chain.md#标识符的解析)              |
| [code point](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-string-type) | [码点](./12.primitive-type.md#string类型的编码形式)          |
| [code unit](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-string-type) | [码元](./12.primitive-type.md#string类型的编码形式)          |
| [high-surrogate code unit](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#high-surrogate-code-unit) | [高代理码元](./12.primitive-type.md#string类型的编码形式)    |
| [low-surrogate code unit](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#low-surrogate-code-unit) | [低代理码元](./12.primitive-type.md#string类型的编码形式)    |
| [surrogate pair](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#surrogate-pair) | [代理对](./12.primitive-type.md#string类型的编码形式)        |
| [internal method](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-internal-methods-and-internal-slots) | [内部方法](./13.object-type.md#对象的内部模型)               |
| [internal slots](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-internal-methods-and-internal-slots) | [内部插槽](./13.object-type.md#对象的内部模型)               |
| [ordinary object](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#ordinary-object) | [普通对象](./13.object-type.md#普通对象-vs-异质对象)         |
| [exotic object](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#exotic-object) | [异质对象](./13.object-type.md#普通对象-vs-异质对象)         |
| [built-in object](https://tc39.es/ecma262/multipage/ecmascript-standard-built-in-objects.html#sec-ecmascript-standard-built-in-objects) | [内置对象](./13.object-type.md#内置对象-vs-非内置对象)       |
| [classElement](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#prod-ClassElement) | [class元素](./15.class.md#3-给两个对象添加属性方法)         |
| [PrivateEnvironment](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#privateenvironment-record) | [私有环境](./15.class.md#关于私有元素)                       |
| [iterator](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iterator-interface) | [迭代器](./16.iterator&generator.md#迭代器与可迭代对象)      |
| [iterable](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iterable-interface) | [可迭代对象](./16.iterator&generator.md#迭代器与可迭代对象)  |
| [parsing errors](https://tc39.es/ecma262/multipage/error-handling-and-language-extensions.html#sec-error-handling-and-language-extensions) | [解析错误](./17.error.md)                                    |
| [runtime errors](https://tc39.es/ecma262/multipage/error-handling-and-language-extensions.html#sec-error-handling-and-language-extensions) | [运行时错误](./17.error.md)                                  |

<br />

-----

本书的版权协议为 [CC-BY-NC-ND license](https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)。

![CC-BY-NC-ND](assets/readme/CC-BY-NC-ND.png)
