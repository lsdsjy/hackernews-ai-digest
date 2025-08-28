const OpenAI = require('openai');
require('dotenv').config({
  path: require('path').join(__dirname, '..', '.env')
});

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY
});

async function testApiKey() {
  if (!process.env.OPEN_ROUTER_API_KEY) {
    console.error('错误: OPEN_ROUTER_API_KEY 环境变量未设置');
    console.log('请按以下步骤设置API key:');
    console.log('1. 复制 .env.example 文件为 .env');
    console.log('2. 在 .env 文件中设置你的 OPEN_ROUTER_API_KEY');
    console.log('3. 重新运行脚本');
    return;
  }

  try {
    console.log('正在测试API key是否能调通模型...');
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        { role: 'system', content: '你是一个有用的AI助手。' },
        { role: 'user', content: '你好，请简单介绍一下你自己。' },
      ]
    }, {
      timeout: 10000
    });

    console.log('✅ API key验证成功！模型调用成功。');
    console.log('模型回复内容:', completion.choices[0].message.content);
  } catch (error) {
    console.error('❌ API key验证失败:', error.message);
    console.log('可能的原因:');
    console.log('- API key无效或已过期');
    console.log('- 网络连接问题');
    console.log('- 模型服务暂时不可用');
  }
}

testApiKey();
