
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string, language: string = 'ar') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chatbot-ai', {
        body: { message, language }
      });

      if (error) throw error;
      
      return data.response;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      // Fallback to local responses
      return getLocalResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('سعر') || userInputLower.includes('تكلفة') || userInputLower.includes('price') || userInputLower.includes('cost')) {
      return 'أسعار الخدمات تختلف حسب نوع الخدمة والوقت المطلوب. يمكنك العثور على التفاصيل في صفحة الخدمة المحددة أو التواصل مع الفني مباشرة.';
    } else if (userInputLower.includes('وقت') || userInputLower.includes('متى') || userInputLower.includes('time') || userInputLower.includes('when')) {
      return 'يمكنك حجز موعد في أي وقت من خلال التطبيق، وسيتم تأكيد الموعد من قبل الفني في أقرب وقت ممكن.';
    } else if (userInputLower.includes('مشكلة') || userInputLower.includes('عطل') || userInputLower.includes('problem') || userInputLower.includes('fault')) {
      return 'لتشخيص أفضل للمشكلة، يرجى زيارة قسم "اكتشاف الأعطال" في الصفحة الرئيسية حيث يمكنك وصف المشكلة ورفع صورة لمساعدتك بشكل أفضل.';
    } else if (userInputLower.includes('شكر') || userInputLower.includes('جزيل') || userInputLower.includes('thank') || userInputLower.includes('thanks')) {
      return 'شكراً لك! نحن سعداء لخدمتك. هل هناك شيء آخر يمكننا مساعدتك فيه؟';
    } else {
      return 'شكراً لتواصلك معنا! سيقوم أحد الفنيين بالرد عليك قريباً، أو يمكنك تصفح خدماتنا المتاحة للعثور على ما يناسب احتياجاتك.';
    }
  };

  return { sendMessage, isLoading };
};
