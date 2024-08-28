import { AIService, Image } from '@/services/ai-service/ai-service'

export class FakeAIService implements AIService {
  async getValueFromImage({ filename }: Image): Promise<string> {
    return `Reading value from ${filename}`
  }
}
