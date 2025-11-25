/**
 * 安全工具函数：防止 Prompt Injection 攻击
 */

/**
 * 清理用户输入，防止 prompt injection
 * @param input 用户输入的原始文本
 * @returns 清理后的安全文本
 */
export const sanitizeUserInput = (input: string): string => {
  // 限制长度，防止超长输入
  if (input.length > 500) {
    input = input.substring(0, 500);
  }

  // 检测并移除常见的 prompt injection 模式
  const dangerousPatterns = [
    // 英文指令注入
    /ignore\s+(previous|above|all|earlier)\s+(instructions?|prompts?|rules?|commands?)/gi,
    /forget\s+(everything|all|previous|earlier)/gi,
    /disregard\s+(previous|above|all)/gi,
    /you\s+are\s+(now|a|an)\s+/gi,
    /act\s+as\s+(a|an)\s+/gi,
    /pretend\s+(you|to)\s+/gi,
    /system\s*:?\s*/gi,
    /assistant\s*:?\s*/gi,
    /\[SYSTEM\]/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /\<\|.*?\|\>/gi,  // 特殊标记如 <|system|>
    /```[\s\S]*?```/g, // 代码块可能用于注入
    /###\s*System/gi,
    /###\s*Instruction/gi,
    /###\s*Assistant/gi,
    
    // 中文指令注入
    /忽略.*?(之前|以前|前面|上面|所有).*?(指令|提示|规则|命令)/gi,
    /忘记.*?(所有|之前|以前|全部)/gi,
    /你现在是/gi,
    /你是一个/gi,
    /扮演.*?角色/gi,
    /角色扮演/gi,
    /假装你是/gi,
    /重新.*?(设定|定义)/gi,
    /系统.*?(指令|提示|消息)/gi,
    /打印.*?(指令|提示|系统消息)/gi,
    /显示.*?(指令|提示|系统消息)/gi,
    /告诉我.*?(指令|提示|系统消息)/gi,
    /泄露.*?(指令|提示|密码|密钥)/gi,
    /复制.*?(指令|提示)/gi,
    /重复.*?(指令|提示)/gi,
  ];

  let sanitized = input;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // 移除可疑的特殊字符序列
  sanitized = sanitized.replace(/\{.*?\}/g, ''); // 移除花括号包裹的内容
  sanitized = sanitized.replace(/\[.*?\]/g, ''); // 移除方括号包裹的内容（但保留中文方括号）
  
  // 移除多余的空白
  sanitized = sanitized.trim().replace(/\s+/g, ' ');

  return sanitized;
};

/**
 * 验证输入是否包含可疑模式
 * @param input 用户输入
 * @returns true 如果输入看起来安全，false 如果检测到可疑内容
 */
export const validateInput = (input: string): boolean => {
  // 检查是否为空
  if (!input || input.trim().length === 0) {
    return false;
  }

  // 检查是否超长
  if (input.length > 500) {
    return false;
  }

  // 检测高度可疑的模式（如果包含这些，直接拒绝）
  const criticalPatterns = [
    /system\s*message/gi,
    /openai/gi,
    /api\s*key/gi,
    /prompt\s*engineering/gi,
    /jailbreak/gi,
    /<script>/gi,
    /javascript:/gi,
  ];

  for (const pattern of criticalPatterns) {
    if (pattern.test(input)) {
      return false;
    }
  }

  return true;
};

/**
 * 生成安全的错误消息（不泄露系统信息）
 */
export const getSafeErrorMessage = (error: any): string => {
  // 永远不要将详细的错误信息暴露给用户
  const userFriendlyMessages = [
    "抱歉，服务暂时繁忙，请稍后再试。",
    "处理请求时遇到问题，请重试。",
    "连接超时，请检查网络后重试。",
  ];

  // 随机返回一个通用错误消息
  const randomIndex = Math.floor(Math.random() * userFriendlyMessages.length);
  return userFriendlyMessages[randomIndex];
};

