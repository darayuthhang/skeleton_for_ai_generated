import { NextRequest, NextResponse } from "next/server";
import { centralError } from "@/app/lib/error-handler/central-error";
import { isAuthorization } from "@/app/api/apiMiddleware/checkAuthorization";
import { getUserIdAfterAuthorize } from "@/app/api/apiMiddleware/checkAuthorization";
import { rateLimistImageList } from "@/app/api/config/limiter";
import { db } from "@/app/lib/db";

export const maxDuration = 25;
export const dynamic = 'force-dynamic';

export async function GET(request, {params}) {
    const remaining = await rateLimistImageList.removeTokens(1);
    if (remaining < 0) {
        return NextResponse.json({ success: false, error: "Too Many Requests" }, { status: 429 });
    }
    if (!await isAuthorization(request)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = params?.user_id;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    try {
        const result = await db.ImageUrl.findMany({
            where: { user_id: userId },
            select: { image_url: true },
            skip: offset,
            take: limit,
            orderBy: { created_at: 'desc' },

        });
        const allImages = await db.ImageUrl.findMany({
            where: { user_id: userId },
            select: { image_url: true },
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json({ success: true, data: result, allImages }, { status: 200 });
    } catch (error) {
        return centralError(NextResponse, error);
    }
}