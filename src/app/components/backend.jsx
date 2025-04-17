"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Backend() {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

        // 🧠 THÊM 2 DÒNG NÀY Ở ĐÂY
        console.log(" Session nhận được:", session);
        console.log(" JWT Token gửi đi:", session?.jwt);

        const callProtectedAPI = async () => {
            const res = await fetch("http://localhost:8080/api/protected", {
                headers: {
                    Authorization: `Bearer ${session.jwt}`,
                },
            });
            const data = await res.json();
            console.log("✅ Phản hồi từ BE:", data);
        };

        callProtectedAPI();
    }, [session]);

    return <div>Check console</div>;
}
