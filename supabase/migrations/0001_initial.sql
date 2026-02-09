create extension if not exists "uuid-ossp";

create type user_role as enum ('customer', 'admin');
create type topup_status as enum ('pending', 'confirmed', 'rejected');
create type topup_method as enum ('promptpay', 'bank_transfer');
create type order_status as enum ('pending', 'paid', 'cancelled');
create type product_status as enum ('new', 'popular', 'recommended', 'sale');

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  role user_role not null default 'customer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists wallets (
  user_id uuid primary key references auth.users on delete cascade,
  balance numeric(10, 2) not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists bank_accounts (
  id uuid primary key default uuid_generate_v4(),
  bank_name text not null,
  icon_url text,
  account_name text not null,
  account_number text not null,
  qr_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  tags text[] not null default '{}',
  status product_status,
  original_price numeric(10, 2) not null,
  sale_price numeric(10, 2),
  is_active boolean not null default true,
  created_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_files (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products on delete cascade,
  image_path text not null,
  pdf_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  product_id uuid not null references products on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  total numeric(10, 2) not null,
  status order_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders on delete cascade,
  product_id uuid not null references products on delete cascade,
  price_paid numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists purchased_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  product_id uuid not null references products on delete cascade,
  order_id uuid references orders on delete set null,
  purchased_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists wallet_topups (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  amount numeric(10, 2) not null,
  method topup_method not null,
  status topup_status not null default 'pending',
  provider_reference text,
  bank_account_id uuid references bank_accounts,
  slip_path text,
  approved_by uuid references auth.users,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists search_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  query text not null,
  created_at timestamptz not null default now()
);

create table if not exists product_clicks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete set null,
  product_id uuid not null references products on delete cascade,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists product_stats (
  product_id uuid primary key references products on delete cascade,
  click_count integer not null default 0,
  add_to_cart_count integer not null default 0,
  sales_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users on delete set null,
  target_user_id uuid references auth.users on delete set null,
  action text not null,
  field text,
  old_value text,
  new_value text,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'name');
  insert into wallets (user_id) values (new.id);
  return new;
end;
$$;

create or replace function increment_wallet_balance(p_user_id uuid, p_amount numeric)
returns void
language plpgsql
security definer
as $$
begin
  update wallets
  set balance = balance + p_amount,
      updated_at = now()
  where user_id = p_user_id;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

alter table profiles enable row level security;
alter table wallets enable row level security;
alter table bank_accounts enable row level security;
alter table products enable row level security;
alter table product_files enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table purchased_items enable row level security;
alter table wallet_topups enable row level security;
alter table search_history enable row level security;
alter table product_clicks enable row level security;
alter table product_stats enable row level security;
alter table audit_logs enable row level security;
alter table notifications enable row level security;

create policy "Profiles are viewable by owner" on profiles
  for select using (auth.uid() = id or is_admin());
create policy "Profiles are updateable by owner" on profiles
  for update using (auth.uid() = id or is_admin());

create policy "Wallets are viewable by owner" on wallets
  for select using (auth.uid() = user_id or is_admin());
create policy "Wallets are updateable by service" on wallets
  for update using (auth.role() = 'service_role' or is_admin());

create policy "Bank accounts are readable" on bank_accounts
  for select using (is_active = true or is_admin());
create policy "Bank accounts admin manage" on bank_accounts
  for all using (is_admin());

create policy "Products are readable" on products
  for select using (is_active = true);
create policy "Products admin manage" on products
  for all using (is_admin());

create policy "Product files readable" on product_files
  for select using (true);
create policy "Product files admin manage" on product_files
  for all using (is_admin());

create policy "Cart items owner manage" on cart_items
  for all using (auth.uid() = user_id);

create policy "Orders owner view" on orders
  for select using (auth.uid() = user_id or is_admin());
create policy "Orders service manage" on orders
  for all using (auth.role() = 'service_role' or is_admin());

create policy "Order items owner view" on order_items
  for select using (
    exists (
      select 1 from orders where id = order_id and user_id = auth.uid()
    ) or is_admin()
  );
create policy "Order items service manage" on order_items
  for all using (auth.role() = 'service_role' or is_admin());

create policy "Purchased items owner view" on purchased_items
  for select using (auth.uid() = user_id or is_admin());
create policy "Purchased items service manage" on purchased_items
  for all using (auth.role() = 'service_role' or is_admin());

create policy "Wallet topups owner view" on wallet_topups
  for select using (auth.uid() = user_id or is_admin());
create policy "Wallet topups owner insert" on wallet_topups
  for insert with check (auth.uid() = user_id);
create policy "Wallet topups admin update" on wallet_topups
  for update using (is_admin() or auth.role() = 'service_role');

create policy "Search history owner" on search_history
  for all using (auth.uid() = user_id or is_admin());

create policy "Product clicks insert" on product_clicks
  for insert with check (auth.uid() = user_id or auth.uid() is null);
create policy "Product clicks admin view" on product_clicks
  for select using (is_admin());

create policy "Product stats readable" on product_stats
  for select using (true);
create policy "Product stats admin update" on product_stats
  for update using (is_admin() or auth.role() = 'service_role');

create policy "Audit logs admin view" on audit_logs
  for select using (is_admin());

create policy "Notifications owner" on notifications
  for all using (auth.uid() = user_id or is_admin());
