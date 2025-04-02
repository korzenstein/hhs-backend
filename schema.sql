-- Enum for ward colors
CREATE TYPE ward_color AS ENUM ('Red', 'Green', 'Blue', 'Yellow');

-- Wards table
CREATE TABLE IF NOT EXISTS ward (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color ward_color NOT NULL
);

-- Nurses table
CREATE TABLE IF NOT EXISTS nurse (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  employee_id SERIAL UNIQUE,
  ward_id UUID REFERENCES ward(id) ON DELETE SET NULL
);
