-- Function to increment likes count for a tool
CREATE OR REPLACE FUNCTION increment_likes(slug_to_update text)
RETURNS void AS $$
BEGIN
  UPDATE tools 
  SET likes_count = COALESCE(likes_count, 0) + 1,
      updated_at = NOW()
  WHERE slug = slug_to_update;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes count for a tool (but not below 0)
CREATE OR REPLACE FUNCTION decrement_likes(slug_to_update text)
RETURNS void AS $$
BEGIN
  UPDATE tools 
  SET likes_count = GREATEST(COALESCE(likes_count, 0) - 1, 0),
      updated_at = NOW()
  WHERE slug = slug_to_update;
END;
$$ LANGUAGE plpgsql;
