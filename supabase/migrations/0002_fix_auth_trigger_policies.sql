create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'name');
  insert into wallets (user_id) values (new.id);
  return new;
end;
$$;

create policy "Profiles insert via trigger" on profiles
  for insert with check (true);

create policy "Wallets insert via trigger" on wallets
  for insert with check (true);
