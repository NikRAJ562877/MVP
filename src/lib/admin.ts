export function isAdminAuthorized(searchParams: URLSearchParams): boolean {
    const token = searchParams.get("token");
    const admin = process.env.ADMIN_TOKEN;
    return !!admin && token === admin;
  }
  