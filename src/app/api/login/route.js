import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log (password)
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    
    if (!user) {
      return NextResponse.json({
        message: "User Tidak Ditemukan",
      });
    }
    
    // Ensure that user.password contains the hashed password from the database
    console.log(user);
    
    if (!password || !user.password) {
        return NextResponse.json({
          message: "Invalid password data",
        });
      }
      
      const comparePassword = await bcrypt.compareSync(password, user.password);
      
    
    if (!comparePassword) {
      return NextResponse.json({
        message: "User Atau Password Salah",
      });
    }
    
    const payload = { username: user.username, id: user.id, email: user.email };
    
    const token = jwt.sign(
      {
        data: payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expiration time (1 hour)
      },
      "SECRET" // Replace with your actual secret key
    );
    
    const userVerify = {
      message: "login success",
      access_token: token,
    };
    
    return NextResponse.json(
      {
        data: userVerify,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: error.message || 'An error occurred',
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


