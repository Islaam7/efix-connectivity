
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Search, ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

const FaultDetection = () => {
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeIssue = () => {
    if (!description.trim()) {
      toast.error('الرجاء وصف المشكلة');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      const responses = [
        'بناءً على الوصف، قد تكون المشكلة متعلقة بتسرب في الأنابيب. نوصي بإغلاق صمام المياه الرئيسي والاتصال بسباك متخصص. في حالات التسرب البسيطة، يمكن استخدام شريط العزل المؤقت حتى وصول الفني.',
        'يبدو أن المشكلة قد تكون في نظام التبريد. تحقق من تنظيف المرشحات (الفلاتر) أولاً، وتأكد من عدم وجود انسداد في مجرى الهواء. إذا استمرت المشكلة، فقد تحتاج إلى فحص مستوى غاز التبريد.',
        'من المحتمل أن تكون مشكلة كهربائية. قبل أي إجراء، تحقق من قاطع الدائرة (الفيوز). لا تحاول إصلاح المشكلات الكهربائية بنفسك إذا لم تكن لديك خبرة كافية، فقد يكون ذلك خطيرًا.',
        'المشكلة قد تكون بسبب انسداد في التصريف. يمكنك تجربة استخدام منظف مصارف متوفر تجاريًا أو محلول من صودا الخبز والخل. إذا كان الانسداد شديدًا، نوصي بالاستعانة بفني متخصص.',
      ];

      // Select a random response from the array
      const randomIndex = Math.floor(Math.random() * responses.length);
      setResult(responses[randomIndex]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="px-4 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-6">
      <h2 className="text-xl font-bold mb-2">كشف الأعطال بالذكاء الاصطناعي</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        صف المشكلة وارفع صورة للحصول على تشخيص أولي وتوصيات
      </p>

      <div className="space-y-4">
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="صف المشكلة بالتفصيل..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none h-24 bg-white dark:bg-gray-800"
            dir="rtl"
          />
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
          {imagePreview ? (
            <div className="relative w-full">
              <img
                src={imagePreview}
                alt="Problem preview"
                className="w-full h-48 object-contain rounded-lg"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <ImageIcon size={48} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                قم برفع صورة للمشكلة (اختياري)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center"
              >
                <Upload size={16} className="mr-2" />
                اختر صورة
              </Button>
            </>
          )}
        </div>

        <Button
          className="w-full"
          onClick={analyzeIssue}
          disabled={isAnalyzing || !description.trim()}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              جاري التحليل...
            </>
          ) : (
            <>
              <Search size={16} className="mr-2" />
              تحليل المشكلة
            </>
          )}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
              التشخيص والتوصيات:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{result}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaultDetection;
