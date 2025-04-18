import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import clientPromise from "../../lib/mongodb";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      phone: user.phone || "",
      address: user.address || ""
    });
  } catch (err) {
    console.error("Lỗi khi lấy user:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
