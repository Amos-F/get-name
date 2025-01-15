<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { DeepseekService } from '@/services/deepseek'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const { t } = useI18n()

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<ChatMessage[]>([])
const inputMessage = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function handleSubmit() {
  if (!inputMessage.value.trim() || loading.value) return
  
  const userMessage = inputMessage.value.trim()
  messages.value.push({
    role: 'user',
    content: userMessage
  })
  
  inputMessage.value = ''
  loading.value = true
  error.value = null

  try {
    const response = await DeepseekService.chat(userMessage)
    messages.value.push({
      role: 'assistant',
      content: response
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '请求失败，请稍后重试'
    console.error('Chat error:', e)
  } finally {
    loading.value = false
  }
}

// 自动滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const messagesContainer = document.querySelector('.messages')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => messages.value.length, scrollToBottom)
</script>

<template>
  <div class="chat-container">
    <LanguageSwitch />
    
    <!-- 欢迎界面 -->
    <div v-if="messages.length === 0" class="welcome-screen">
      <div class="welcome-content">
        <div class="ai-avatar">
          <span class="avatar-text">AI</span>
        </div>
        <div class="welcome-text">
          <h2>{{ t('welcome.title') }}</h2>
          <p>{{ t('welcome.subtitle') }}</p>
          <ul class="feature-list">
            <li>{{ t('welcome.features.personalized') }}</li>
            <li>{{ t('welcome.features.cultural') }}</li>
            <li>{{ t('welcome.features.harmony') }}</li>
            <li>{{ t('welcome.features.variety') }}</li>
          </ul>
          <p class="start-hint">{{ t('welcome.hint') }}</p>
          <div class="example-prompts">
            <p>{{ t('welcome.examples.girl') }}</p>
            <p>{{ t('welcome.examples.boy') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天记录 -->
    <div v-else class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <div class="message-avatar">
          <span class="avatar-text">
            {{ message.role === 'assistant' ? 'AI' : 'ME' }}
          </span>
        </div>
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="message assistant">
        <div class="message-avatar">
          <span class="avatar-text">AI</span>
        </div>
        <div class="message-content loading">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-section">
      <div class="input-container">
        <div class="input-wrapper">
          <textarea
            v-model="inputMessage"
            :placeholder="t('input.placeholder')"
            @keydown.enter.prevent="handleSubmit"
            :disabled="loading"
            rows="1"
          />
          <button 
            class="send-btn"
            @click="handleSubmit"
            :disabled="loading || !inputMessage.trim()"
          >
            <span class="send-icon">{{ loading ? '...' : '发送' }}</span>
          </button>
        </div>
        <div class="disclaimer">{{ t('messages.disclaimer') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.welcome-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
}

.welcome-content {
  text-align: center;
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

.ai-avatar {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background-color: #2f2f2f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-avatar img {
  width: 32px;
  height: 32px;
}

.welcome-text h2 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #fff;
}

.welcome-text p {
  font-size: 0.875rem;
  color: #999;
  line-height: 1.5;
}

.messages {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
}

.message {
  margin-bottom: 1rem;
}

.message-content {
  padding: 0.75rem;
  border-radius: 0.5rem;
  max-width: 90%;
  word-break: break-word;
}

.message.user .message-content {
  margin-left: auto;
  background-color: #2f2f2f;
}

.message.assistant .message-content {
  margin-right: auto;
  background-color: #2f2f2f;
}

.input-section {
  padding: 1rem;
  background-color: #1a1a1a;
  border-top: 1px solid #2f2f2f;
}

.input-container {
  max-width: 800px;
  margin: 0 auto;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

textarea {
  width: 100%;
  background-color: #2f2f2f;
  border: 1px solid #3f3f3f;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  padding-right: 4rem; /* 为发送按钮留出空间 */
  color: #fff;
  font-size: 0.875rem;
  resize: none;
  outline: none;
  min-height: 60px; /* 增加最小高度 */
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.5;
}

textarea:focus {
  border-color: #4f4f4f;
}

.send-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
  background-color: #2f2f2f;
  border: none;
  width: 3rem;
  height: 40px; /* 增加按钮高度 */
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background-color: #3f3f3f;
}

.disclaimer {
  text-align: center;
  color: #666;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .input-section {
    padding: 0.75rem;
  }

  textarea {
    min-height: 56px; /* 移动端稍微调整一下高度 */
    font-size: 1rem;
    padding: 0.75rem 3.5rem 0.75rem 0.75rem;
  }

  .send-btn {
    right: 0.25rem;
  }
}

/* 适配 iPhone 底部安全区域 */
@supports (padding: max(0px)) {
  .input-section {
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
}

/* 添加新的样式 */
.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.loading {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 8px 12px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #666;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.feature-list {
  text-align: left;
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: #999;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.start-hint {
  color: #999;
  margin-top: 1.5rem;
  font-size: 0.875rem;
}

.example-prompts {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
  background-color: #2f2f2f;
  padding: 1rem;
  border-radius: 0.5rem;
}

.example-prompts p {
  margin-bottom: 0.5rem;
  color: #999;
}

.example-prompts p:last-child {
  margin-bottom: 0;
}
</style>
