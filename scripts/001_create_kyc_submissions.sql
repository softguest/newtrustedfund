-- Create KYC submissions table
create table if not exists public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone_number text not null,
  date_of_birth date not null,
  government_id_type text not null,
  government_id_number text not null,
  address text not null,
  city text not null,
  country text not null,
  postal_code text,
  id_document_url text,
  proof_of_address_url text,
  status text default 'pending',
  submitted_at timestamp with time zone default now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid references auth.users(id),
  rejection_reason text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.kyc_submissions enable row level security;

-- RLS Policies
create policy "Users can view their own KYC submission"
  on public.kyc_submissions for select
  using (auth.uid() = user_id or auth.jwt() ->> 'is_admin' = 'true');

create policy "Users can insert their own KYC submission"
  on public.kyc_submissions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own pending KYC submission"
  on public.kyc_submissions for update
  using (auth.uid() = user_id and status = 'pending');

create policy "Admins can view all KYC submissions"
  on public.kyc_submissions for select
  using (auth.jwt() ->> 'is_admin' = 'true');

create policy "Admins can update KYC submissions"
  on public.kyc_submissions for update
  using (auth.jwt() ->> 'is_admin' = 'true');

-- Index for faster queries
create index if not exists idx_kyc_user_id on public.kyc_submissions(user_id);
create index if not exists idx_kyc_status on public.kyc_submissions(status);
