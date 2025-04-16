import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Danh sách các route công khai không cần xác thực
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth",
  "/api/auth/signin",
  "/api/auth/signout",
  "/api/auth/callback",
  "/api/auth/session",
  "/api/auth/csrf",
  "/api/auth/providers",
];

// Danh sách các route cần xác thực
const protectedRoutes = [
  /^\/profile(\/.*)?$/, // Bảo vệ tất cả các route bắt đầu với /profile
  "http://localhost:3000/profile",
  "/api/user/*",
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Kiểm tra nếu là route công khai thì cho phép truy cập
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Kiểm tra nếu là route cần xác thực
  if (protectedRoutes.some(route => new RegExp(route).test(pathname))) {
    try {
      // Lấy token từ cookie hoặc header
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET 
      });

      // Nếu không có token -> redirect tới trang đăng nhập
      if (!token) {
        const loginUrl = new URL("/login", request.url);
        // Lưu URL hiện tại để redirect lại sau khi đăng nhập
        loginUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Nếu có token -> cho phép truy cập tiếp
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      // Trong trường hợp lỗi, chuyển hướng về trang đăng nhập
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Cho phép truy cập các route khác
  return NextResponse.next();
}

// Cấu hình route cần bảo vệ
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)", // Đảm bảo các route không bảo vệ đều được bỏ qua
  ],
};
