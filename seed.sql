INSERT INTO ward (name, color)
VALUES
  ('Cardiology', 'Red'),
  ('Pediatrics', 'Blue'),
  ('Oncology', 'Green'),
  ('Emergency', 'Yellow'),
  ('Occupational Therapy', 'Yellow'),
  ('Maternity', 'Blue'),
  ('Intensive Care Unit', 'Green'),
  ('Surgery', 'Red'),
  ('Psychiatry', 'Blue'),
  ('Rehabilitation', 'Yellow')
ON CONFLICT (name) DO NOTHING;