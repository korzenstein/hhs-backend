-- enum for Ward colors
CREATE TYPE "WardColor" AS ENUM ('Red', 'Green', 'Blue', 'Yellow');

-- Wards table
CREATE TABLE IF NOT EXISTS "Ward" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color "WardColor" NOT NULL
);

-- Nurses table
CREATE TABLE IF NOT EXISTS "Nurse" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  employeeId SERIAL UNIQUE,
  wardId UUID REFERENCES "Ward"(id) ON DELETE SET NULL
);
