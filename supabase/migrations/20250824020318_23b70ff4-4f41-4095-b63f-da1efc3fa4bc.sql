-- Create feedback_messages table for storing user feedback
CREATE TABLE public.feedback_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  category TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.feedback_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert on feedback_messages" 
ON public.feedback_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select on feedback_messages" 
ON public.feedback_messages 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_feedback_messages_updated_at
BEFORE UPDATE ON public.feedback_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();