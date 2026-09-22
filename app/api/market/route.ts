import { NextRequest, NextResponse } from "next/server";
import { getMarketSnapshot, normalizeSymbol } from "@/lib/market";
export const runtime="nodejs"; export const revalidate=300;
export async function GET(request:NextRequest){try{const symbol=normalizeSymbol(request.nextUrl.searchParams.get("symbol")),forceDemo=request.nextUrl.searchParams.get("demo")==="1",snapshot=await getMarketSnapshot(symbol,forceDemo);return NextResponse.json(snapshot,{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to load market data."},{status:400});}}
