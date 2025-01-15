import { DEEPSEEK_API_KEY, DEEPSEEK_API_URL } from '@/config/api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class DeepseekService {
  private static readonly API_URL = 'https://api.deepseek.com/v1/chat/completions'
  private static readonly API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY

  private static readonly headers = {
    'Authorization': `Bearer ${DeepseekService.API_KEY}`,
    'Content-Type': 'application/json'
  }

  static async chat(message: string): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`)
      }

      const data: ChatResponse = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Deepseek API 调用错误:', error)
      throw error
    }
  }
} 