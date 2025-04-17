import { getSession } from "next-auth/react";
import axios from "axios";

const callProtectedAPI = async () => {
  const session = await getSession();
  console.log("Session nhận được:", session);

  if (!session) {
    console.log("Người dùng chưa đăng nhập");
    return;
  }

  const jwtToken = session?.jwt; // LẤY JWT từ session.jwt
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const response = await axios.get(`${baseUrl}/api/protected`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API được bảo vệ:", error);
  }
};
