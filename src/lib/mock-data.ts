export type ProductStatus = "new" | "popular" | "recommended" | "sale";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number | null;
  status?: ProductStatus | null;
  imageUrl: string;
  tags: string[];
};

export const categories = [
  "สื่อการสอน",
  "แพลนเนอร์",
  "การ์ดตกแต่ง",
  "โปสเตอร์",
  "สติกเกอร์",
  "เทมเพลต",
  "ไอคอน",
  "พื้นหลัง",
  "แฟลชการ์ด",
  "สื่ออนุบาล",
  "สมุดระบายสี",
  "แบบฝึกหัด",
];

export const products: Product[] = Array.from({ length: 24 }).map((_, idx) => {
  const category = categories[idx % categories.length];
  const statusOptions: ProductStatus[] = ["new", "popular", "recommended", "sale"];
  const status = statusOptions[idx % statusOptions.length];
  const price = 59 + idx * 2;
  const salePrice = status === "sale" ? price - 10 : null;

  return {
    id: `product-${idx + 1}`,
    name: `Kiddo Pack ${idx + 1} - ${category}`,
    category,
    price,
    salePrice,
    status,
    imageUrl: `https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80&sig=${idx}`,
    tags: ["digital", "kiddo", category],
  };
});
