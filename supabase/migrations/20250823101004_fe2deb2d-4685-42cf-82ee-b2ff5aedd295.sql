-- Create chatbot messages table
CREATE TABLE IF NOT EXISTS public.chatbot_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'bot')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,
  event_action TEXT NOT NULL,
  event_label TEXT,
  event_value INTEGER,
  page_url TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID UNIQUE NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create frequently asked questions table
CREATE TABLE IF NOT EXISTS public.faq_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  question_hash TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 1,
  first_asked TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_asked TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create privacy consent table
CREATE TABLE IF NOT EXISTS public.privacy_consent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  analytics_consent BOOLEAN DEFAULT false,
  chatbot_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_consent ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is portfolio data)
CREATE POLICY "Allow public insert on chatbot_messages" ON public.chatbot_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on chatbot_messages" ON public.chatbot_messages
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on analytics_events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on analytics_events" ON public.analytics_events
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on user_sessions" ON public.user_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on user_sessions" ON public.user_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Allow public select on user_sessions" ON public.user_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on faq_tracking" ON public.faq_tracking
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on faq_tracking" ON public.faq_tracking
  FOR UPDATE USING (true);

CREATE POLICY "Allow public select on faq_tracking" ON public.faq_tracking
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on privacy_consent" ON public.privacy_consent
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on privacy_consent" ON public.privacy_consent
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_session_id ON public.chatbot_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_created_at ON public.chatbot_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type, event_category);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_faq_tracking_hash ON public.faq_tracking(question_hash);
CREATE INDEX IF NOT EXISTS idx_faq_tracking_count ON public.faq_tracking(count DESC);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_chatbot_messages_updated_at BEFORE UPDATE
    ON public.chatbot_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_sessions_updated_at BEFORE UPDATE
    ON public.user_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_tracking_updated_at BEFORE UPDATE
    ON public.faq_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();