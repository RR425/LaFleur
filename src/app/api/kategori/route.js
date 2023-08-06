import { NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req) {
  try {
    const kategoriData = await req.json();
    const { nama_kategori } = kategoriData;
    console.log(nama_kategori);

    const createdKategori = await prisma.kategori.create({
      data: {
        nama_kategori,
      },
    });

    return new NextResponse.json(
      {
        kategori: createdKategori,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse.json(
      {
        message: "Error creating kategori",
      },
      { status: 500 }
    );
  }
}
