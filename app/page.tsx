import { checkUserAction } from "@/actions/auth/check-user";

export default async function Page() {
  const user = await checkUserAction();

  return <div>Hello, {user.name}</div>;
}
