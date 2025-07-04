<template>
  <!-- 原有模板完全不变 -->
  <div class="chat-container">
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(msg, index) in messages" :key="index"
           :class="['message', msg.role === 'user' ? 'user-message' : 'ai-message']">
        <div class="avatar">
          <el-icon v-if="msg.role === 'ai'"><Connection /></el-icon>
          <el-icon v-else><User /></el-icon>
        </div>
        <div class="message-content">
          <div class="message-text">{{ msg.content }}</div>
          <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
        </div>
      </div>

      <!-- 新增流式消息临时展示 -->
      <div v-if="streamingMessage" class="message ai-message">
        <div class="avatar">
          <el-icon><Connection /></el-icon>
        </div>
        <div class="message-content">
          <div class="message-text">{{ streamingMessage.content }}</div>
          <div class="message-time">{{ formatTime(streamingMessage.timestamp) }}</div>
        </div>
      </div>

      <div v-if="isLoading" class="message ai-message">
        <div class="avatar">
          <el-icon><Connection /></el-icon>
        </div>
        <div class="message-content">
          <div class="message-text">
            <el-icon class="loading-icon"><Loading /></el-icon>
            思考中...
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域保持不变 -->
    <div class="chat-input-area">
      <el-form @submit.prevent="sendMessage">
        <el-form-item>
          <el-input
              v-model="inputMessage"
              type="textarea"
              :rows="3"
              placeholder="请输入问题..."
              @keyup.enter.native="sendMessage"
              :disabled="isLoading"
              clearable>
          </el-input>
        </el-form-item>
        <el-divider />
        <div class="input-actions">
          <el-button
              type="primary"
              @click="sendMessage"
              :loading="isLoading"
              :disabled="!inputMessage.trim()">
            发送
          </el-button>
          <el-button @click="clearChat">清空对话</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Connection, User, Loading } from '@element-plus/icons-vue'
import { useDeepSeekApi } from '@/utils/api'

const api = useDeepSeekApi()
const inputMessage = ref('')
const messagesContainer = ref(null)
const isLoading = ref(false)
const messages = ref([
  {
    role: 'ai',
    content: '你好！我是DeepSeek AI助手，有什么可以帮助你的吗？',
    timestamp: new Date()
  }
])
const streamingMessage = ref(null) // 新增：流式消息临时存储

// 原有方法保持不变
const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const clearChat = () => {
  messages.value = [{
    role: 'ai',
    content: '你好！我是DeepSeek AI助手，有什么可以帮助你的吗？',
    timestamp: new Date()
  }]
}

// 修改sendMessage支持流式
const sendMessage = async () => {
  const content = inputMessage.value.trim()
  if (!content || isLoading.value) return

  // 1. 添加用户消息（原有逻辑）
  messages.value.push({
    role: 'user',
    content,
    timestamp: new Date()
  })

  inputMessage.value = ''
  isLoading.value = true
  scrollToBottom()

  // 2. 初始化流式消息
  streamingMessage.value = {
    role: 'ai',
    content: '',
    timestamp: new Date()
  }

  try {
    // 3. 调用流式API（新增逻辑）
    await api.chatCompletionsStream(
        [
          { role: 'system', content: '你是一个乐于助人的AI助手，用中文回答用户的问题' },
          ...messages.value.map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : msg.role,
            content: msg.content
          }))
        ],
        (chunk) => {
          streamingMessage.value.content += chunk
          scrollToBottom()
        }
    )

    // 4. 流式结束后的处理
    messages.value.push({
      ...streamingMessage.value,
      content: streamingMessage.value.content || '（未收到回复）'
    })
  } catch (error) {
    ElMessage.error('请求失败: ' + (error.message || '未知错误'))
    messages.value.push({
      role: 'ai',
      content: '抱歉，我暂时无法回答这个问题。请稍后再试。',
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
    streamingMessage.value = null
    scrollToBottom()
  }
}

onMounted(() => scrollToBottom())
</script>

<style scoped>
/* 原有样式完全不变 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.message {
  display: flex;
  margin-bottom: 16px;
}

.avatar {
  margin-right: 12px;
}

.avatar .el-icon {
  font-size: 24px;
  padding: 8px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ai-message .avatar .el-icon {
  color: #409eff;
  background-color: #ecf5ff;
}

.user-message .avatar .el-icon {
  color: #67c23a;
  background-color: #f0f9eb;
}

.message-content {
  flex: 1;
  max-width: calc(100% - 50px);
}

.message-text {
  padding: 10px 15px;
  border-radius: 4px;
  line-height: 1.5;
  word-break: break-word;
}

.ai-message .message-text {
  background-color: #fff;
  border-left: 3px solid #409eff;
}

.user-message .message-text {
  background-color: #fff;
  border-left: 3px solid #67c23a;
  text-align: right;
}

.message-time {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.user-message .message-time {
  text-align: right;
}

.chat-input-area {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.loading-icon {
  animation: rotate 2s linear infinite;
  margin-right: 8px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>