-- Create profiles table for member information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  id_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chamas table
CREATE TABLE public.chamas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  contribution_amount DECIMAL(10,2) NOT NULL,
  contribution_frequency TEXT NOT NULL CHECK (contribution_frequency IN ('weekly', 'monthly')),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chama_members table
CREATE TABLE public.chama_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chama_id UUID NOT NULL REFERENCES public.chamas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chama_id, user_id)
);

-- Create contributions table
CREATE TABLE public.contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chama_id UUID NOT NULL REFERENCES public.chamas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payhero_transaction_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loans table
CREATE TABLE public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chama_id UUID NOT NULL REFERENCES public.chamas(id) ON DELETE CASCADE,
  borrower_id UUID NOT NULL REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  purpose TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'completed')) DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan_repayments table
CREATE TABLE public.loan_repayments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payhero_transaction_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chamas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chama_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_repayments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chamas policies
CREATE POLICY "Anyone can view chamas" ON public.chamas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create chamas" ON public.chamas FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Chama admins can update their chamas" ON public.chamas FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = chamas.id 
    AND chama_members.user_id = auth.uid() 
    AND chama_members.role = 'admin'
  )
);

-- Chama members policies
CREATE POLICY "Users can view chama members" ON public.chama_members FOR SELECT USING (true);
CREATE POLICY "Chama admins can add members" ON public.chama_members FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chama_members existing
    WHERE existing.chama_id = chama_members.chama_id 
    AND existing.user_id = auth.uid() 
    AND existing.role = 'admin'
  )
);

-- Contributions policies
CREATE POLICY "Members can view chama contributions" ON public.contributions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = contributions.chama_id 
    AND chama_members.user_id = auth.uid()
  )
);
CREATE POLICY "Members can create contributions" ON public.contributions FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = contributions.chama_id 
    AND chama_members.user_id = auth.uid()
  )
);

-- Loans policies
CREATE POLICY "Members can view chama loans" ON public.loans FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = loans.chama_id 
    AND chama_members.user_id = auth.uid()
  )
);
CREATE POLICY "Members can request loans" ON public.loans FOR INSERT WITH CHECK (
  auth.uid() = borrower_id AND
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = loans.chama_id 
    AND chama_members.user_id = auth.uid()
  )
);
CREATE POLICY "Admins can update loans" ON public.loans FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.chama_members 
    WHERE chama_members.chama_id = loans.chama_id 
    AND chama_members.user_id = auth.uid() 
    AND chama_members.role = 'admin'
  )
);

-- Loan repayments policies
CREATE POLICY "Members can view loan repayments" ON public.loan_repayments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.loans
    JOIN public.chama_members ON chama_members.chama_id = loans.chama_id
    WHERE loans.id = loan_repayments.loan_id
    AND chama_members.user_id = auth.uid()
  )
);
CREATE POLICY "Borrowers can create repayments" ON public.loan_repayments FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.loans 
    WHERE loans.id = loan_repayments.loan_id 
    AND loans.borrower_id = auth.uid()
  )
);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chamas_updated_at BEFORE UPDATE ON public.chamas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON public.loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();