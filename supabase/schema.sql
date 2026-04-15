-- ============================================================
-- Vivah App - Supabase PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id        TEXT UNIQUE NOT NULL,
  full_name       TEXT,
  gender          TEXT CHECK (gender IN ('male', 'female', 'other')),
  dob             DATE,
  phone           TEXT,
  location        TEXT,
  religion        TEXT,
  caste           TEXT,
  profession      TEXT,
  education       TEXT,
  about           TEXT,
  profile_photo   TEXT,
  photos          TEXT[] DEFAULT '{}',
  completion_score INTEGER DEFAULT 0 CHECK (completion_score BETWEEN 0 AND 100),
  is_verified     BOOLEAN DEFAULT FALSE,
  is_premium      BOOLEAN DEFAULT FALSE,
  credits         INTEGER DEFAULT 0,
  language        TEXT DEFAULT 'en',
  is_hidden       BOOLEAN DEFAULT FALSE,
  online_status   BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INTERESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS interests (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  icebreaker  TEXT,
  expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (sender_id, receiver_id)
);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REPORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason      TEXT NOT NULL,
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUCCESS STORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS success_stories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  story       TEXT NOT NULL,
  photo       TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan              TEXT NOT NULL CHECK (plan IN ('basic', 'gold', 'platinum')),
  razorpay_order_id TEXT,
  expires_at        TIMESTAMPTZ NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROFILE VIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS profile_views (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  viewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_id        ON profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_profiles_gender          ON profiles(gender);
CREATE INDEX IF NOT EXISTS idx_profiles_religion        ON profiles(religion);
CREATE INDEX IF NOT EXISTS idx_profiles_location        ON profiles(location);
CREATE INDEX IF NOT EXISTS idx_interests_sender         ON interests(sender_id);
CREATE INDEX IF NOT EXISTS idx_interests_receiver       ON interests(receiver_id);
CREATE INDEX IF NOT EXISTS idx_interests_status         ON interests(status);
CREATE INDEX IF NOT EXISTS idx_messages_sender          ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver        ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created         ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user       ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread     ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_reports_reporter         ON reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user       ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires    ON subscriptions(expires_at);
CREATE INDEX IF NOT EXISTS idx_profile_views_viewer     ON profile_views(viewer_id);
CREATE INDEX IF NOT EXISTS idx_profile_views_viewed     ON profile_views(viewed_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests         ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages          ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications     ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports           ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views     ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all non-hidden profiles, edit only their own
CREATE POLICY "profiles_select" ON profiles
  FOR SELECT USING (is_hidden = FALSE OR clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "profiles_insert" ON profiles
  FOR INSERT WITH CHECK (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "profiles_update" ON profiles
  FOR UPDATE USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Success stories: public read for approved, insert by authenticated
CREATE POLICY "stories_select" ON success_stories
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "stories_insert" ON success_stories
  FOR INSERT WITH CHECK (TRUE);
