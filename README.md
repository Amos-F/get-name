# DeepSeek 智能起名助手

一个基于 Vue 3 + TypeScript + Vite 开发的智能起名应用，集成了 DeepSeek AI 接口，为用户提供专业的起名服务。

## 功能特点

- 💡 智能起名：根据用户需求提供个性化名字推荐
- 📚 文化解析：详细解释名字的含义和文化内涵
- 🎵 音律分析：确保名字音律和谐
- 💬 实时对话：即时响应用户的起名需求
- 📱 响应式设计：完美支持移动端和桌面端

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- TypeScript - JavaScript 的超集
- Vite - 下一代前端构建工具
- DeepSeek API - AI 对话接口

## 快速开始

### 环境要求

- Node.js 16+
- pnpm 8+

### 安装步骤

1. 克隆项目

```
git clone [项目地址]
cd deepseek-naming
```

2. 安装依赖
```
pnpm install
```

3. 配置环境变量
```
# 创建 .env 文件
cp .env.example .env

# 编辑 .env 文件，添加你的 DeepSeek API Key
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

4. 启动开发服务器
```
pnpm dev
```

5. 构建生产版本
```
pnpm build
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # Vue 组件
├── services/        # API 服务
│   └── deepseek.ts  # DeepSeek API 封装
├── views/           # 页面视图
│   └── HomeView.vue # 主页面
└── App.vue          # 根组件
```

## 使用指南

1. 访问应用首页
2. 在输入框中描述您的起名需求
   - 例如："帮我给女儿取个温柔优雅的名字，姓王"
   - 或者："想要一个带有'宇'字的男孩名字"
3. 系统会根据您的需求提供专业的起名建议
4. 您可以继续与 AI 交流，获取更多名字解释和建议

## 开发指南

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 Vue 3 组合式 API 风格
- 保持组件单一职责原则

### 环境变量

必需的环境变量：
- `VITE_DEEPSEEK_API_KEY`: DeepSeek API 密钥

### 自定义配置

查看 [Vite 配置参考](https://vitejs.dev/config/) 获取更多配置选项。

## 部署

1. 构建生产版本
```
pnpm build
```

2. 部署 `dist` 目录到您的服务器

## 注意事项

- 请确保 API Key 的安全性，不要将其提交到代码仓库
- 建议在生产环境使用环境变量管理 API Key
- 注意 API 的使用限制和计费规则

## License

[MIT](LICENSE)
