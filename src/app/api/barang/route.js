import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(){
    const barang=await prisma.barang.findMany()
    return NextResponse.json({
        data:barang
    })
}