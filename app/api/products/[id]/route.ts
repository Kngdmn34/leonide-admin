import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request, {params} : {params: {id:string}}) {
    try{ 

        if(!params.id){ 
            return new NextResponse('Product id is required', {status: 400})

        }
        
        const { id} = params

        const product = await prisma.product.findUnique({
            where: { 
                id,
                
            }
        })
        return NextResponse.json({product})
    }
    catch(error){ 
        return new NextResponse('error')
    }
}

export async function DELETE(req: Request, {params}: { params: { id: string}}) { 
    try {
        const {id} = params

        const deleteproduct = await prisma.product.delete({
            where: { 
                id
            }
        })

        return NextResponse.json({deleteproduct}, { status: 200})

    }
    catch(error){ 
        return new  NextResponse('ERROR')
    }
}