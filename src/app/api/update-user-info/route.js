import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { phone, address } = body;

  if (!phone || !address) {
    return NextResponse.json({ message: "Thông tin không hợp lệ" }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db();
    const userCollection = db.collection("users");

    const result = await userCollection.updateOne(
      { email: token.email },
      { $set: { phone, address } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lỗi khi cập nhật thông tin:", err);
    return NextResponse.json({ message: "Đã xảy ra lỗi" }, { status: 500 });
  } finally {
    await client.close();
  }
}
