create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture'
    )
  );
  insert into wallets (user_id) values (new.id);
  return new;
end;
$$;

update profiles
set avatar_url = coalesce(
  profiles.avatar_url,
  auth.users.raw_user_meta_data->>'avatar_url',
  auth.users.raw_user_meta_data->>'picture'
)
from auth.users
where profiles.id = auth.users.id;
