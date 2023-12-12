import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

const corsHeaders = { 
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization "
};

export async function OPTIONS() { 
    return NextResponse.json({}, {headers: corsHeaders})
};

export async function GET() {
    try{ 
const allproducts = await prisma.product.findMany()

return NextResponse.json({allproducts}, { headers: corsHeaders})
    }
    catch(error){
return new NextResponse('Error')
    }
}

export async function POST (req:Request ) { 

    try { 

        
      
const body = await req.json()

const { name,description,price,imageId, isFeatured, category } = body

//check if the product is already exsisted 
 
const chkpro = await prisma.product.findUnique({
    where: {
        name,
        
    }
})

if (chkpro?.name) {
    return NextResponse.error()
}

const newProduct = await prisma.product.create({ 
    data: { 
        
        description,
        name,
        category,
        price,
        imageId,
        isFeatured

    }
})
return NextResponse.json({newProduct}, {status: 200})

    }
catch(error){
    console.log('error', error)
throw error
}

}
