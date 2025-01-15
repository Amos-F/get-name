import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    welcome: {
      title: '我是 DeepSeek 起名专家',
      subtitle: '作为一名专业的起名顾问，我可以帮您：',
      features: {
        personalized: '根据您的需求推荐个性化名字',
        cultural: '解释名字的含义和文化内涵',
        harmony: '分析名字的音律和寓意',
        variety: '提供多种风格的命名建议'
      },
      hint: '请告诉我您的起名需求，比如：',
      examples: {
        girl: '帮我给女儿取个温柔优雅的名字，姓王',
        boy: '想要一个带有"宇"字的男孩名字'
      }
    },
    input: {
      placeholder: '给 DeepSeek 发送消息',
      send: '发送',
      thinking: '深度思考',
      search: '联网搜索'
    },
    messages: {
      loading: '正在思考...',
      error: '请求失败，请稍后重试',
      unrelated: '抱歉，我是一个专业的起名助手，只能回答与起名相关的问题。请问您有什么关于起名的需求吗？',
      disclaimer: '内容由 AI 生成，请仔细甄别'
    }
  },
  en: {
    welcome: {
      title: 'I am DeepSeek Naming Expert',
      subtitle: 'As a professional naming consultant, I can help you:',
      features: {
        personalized: 'Recommend personalized names based on your needs',
        cultural: 'Explain the meaning and cultural connotations of names',
        harmony: 'Analyze the rhythm and implications of names',
        variety: 'Provide naming suggestions in various styles'
      },
      hint: 'Please tell me your naming requirements, for example:',
      examples: {
        girl: 'Help me choose an elegant name for my daughter with surname Wang',
        boy: 'Looking for a boy\'s name containing the character "Yu"'
      }
    },
    input: {
      placeholder: 'Send a message to DeepSeek',
      send: 'Send',
      thinking: 'Deep Think',
      search: 'Web Search'
    },
    messages: {
      loading: 'Thinking...',
      error: 'Request failed, please try again later',
      unrelated: 'Sorry, I am a professional naming assistant and can only answer naming-related questions. Do you have any naming requirements?',
      disclaimer: 'Content is AI-generated, please verify carefully'
    }
  }
}

export const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages
}) 