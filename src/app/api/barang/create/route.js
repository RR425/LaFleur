import prisma from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "dzez6b0u9",
  api_key: "229299712469426",
  api_secret: "larpco686O3-IttA2ESaDa4OXk4",
});

export const config = { runtime: "experimental-edge" };

export async function POST(request) {
  try {
    let data = await request.formData();
    let imageUrl = "";
    const uploadedFile = data.get("file");
    const namaBarang = data.get("nama_barang");
    const hargaBarang = data.get("harga_barang");
    const deskripsiBarang = data.get("deskripsi_barang");
    const kategori_id = data.get("kategori_id");

    if (uploadedFile) {
      const uploadedBuffer = await uploadedFile.arrayBuffer();
      const buffer = Buffer.from(uploadedBuffer);

      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            public_id: uploadedFile.name,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log(result.secure_url, "url");
              imageUrl = result.secure_url;
              resolve(result);
            }
          }
        );

        uploadStream.write(buffer);
        uploadStream.end();
      });

      const barang = await prisma.barang.create({
        data: {
          nama_barang: namaBarang,
          harga_barang: hargaBarang,
          deskripsi_barang: deskripsiBarang,
          image_url: imageUrl,
          kategori_id : conn
        },
      });

      console.log(barang);

      return NextResponse.json(
        {
          data: barang,
        },
        { status: 200 }
      );
    } else {
      // Handle case when no file is uploaded
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        data: e,
      },
      { status: 500 }
    );
  }
}
