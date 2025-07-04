// src/utils/api.js
import axios from 'axios';
import { ElMessage } from 'element-plus';

const DEEPSEEK_CONFIG = {
    BASE_URL: import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
    API_KEY: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
    MODEL: 'deepseek-chat',
    TIMEOUT: 30000
};

const deepSeekRequest = axios.create({
    baseURL: DEEPSEEK_CONFIG.BASE_URL,
    timeout: DEEPSEEK_CONFIG.TIMEOUT
});

deepSeekRequest.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
    };
    return config;
});

export const useDeepSeekApi = () => {
    /**
     * 原始普通请求（保持不变）
     */
    const chatCompletions = async (messages) => {
        try {
            const response = await deepSeekRequest.post('/v1/chat/completions', {
                model: DEEPSEEK_CONFIG.MODEL,
                messages: messages.map(msg => ({
                    role: msg.role === 'ai' ? 'assistant' : msg.role,
                    content: msg.content
                })),
                temperature: 0.7,
                max_tokens: 2000,
                stream: false // 明确关闭流式
            });

            if (!response.data?.choices?.[0]?.message?.content) {
                throw new Error('API返回了无效的响应结构');
            }

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API调用错误详情：', error.response?.data || error.message);
            throw error;
        }
    };

    /**
     * 新增流式请求方法
     * @param {Array} messages 消息历史
     * @param {Function} onChunk 流式数据回调 (content: string) => void
     */
    const chatCompletionsStream = async (messages, onChunk) => {
        try {
            const response = await fetch(`${DEEPSEEK_CONFIG.BASE_URL}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
                },
                body: JSON.stringify({
                    model: DEEPSEEK_CONFIG.MODEL,
                    messages: messages.map(msg => ({
                        role: msg.role === 'ai' ? 'assistant' : msg.role,
                        content: msg.content
                    })),
                    temperature: 0.7,
                    max_tokens: 2000,
                    stream: true // 启用流式
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // 保留未完成的行

                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (line.startsWith('data: ')) {
                        const data = line.replace('data: ', '').trim();
                        if (data === '[DONE]') break;

                        try {
                            const parsed = JSON.parse(data);
                            const chunk = parsed.choices[0]?.delta?.content;
                            if (chunk) onChunk(chunk);
                        } catch (e) {
                            console.warn('解析流数据失败:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('流式请求失败:', error);
            throw error;
        }
    };

    return {
        chatCompletions, // 保留原始方法
        chatCompletionsStream // 新增流式方法
    };
};