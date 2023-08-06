import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    if(!username||!email||!password){
        return NextResponse.json({
            message:"field Tidak Boleh Kosong"
        },{
            status:400
        })
    }

    const emailAlready = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailAlready) {
      return NextResponse.json(
        {
          message: "Email Telah Terdaftar",
        },
        { status: 400 }
      );
    }

    const hashingPassword = await bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashingPassword,
        username: username,
      },
    });

    return NextResponse.json({
      message: "User Berhasil Terdaftar",
      username: user.username,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "An error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
