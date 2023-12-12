import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
    try { 
        const allbillboards = await prisma.billboard.findMany()
        return NextResponse.json({allbillboards}, {status: 200})
    }
    catch (error) {
        return new NextResponse('ERROR')
    }
    
}

export async function POST(req: Request) { 
    try  {
        const body = await req.json()
        const {name, description, coverId, price, discount} = body
        
        //check for exsiting billboard
        const check = await prisma.billboard.findUnique({
            where: { 
                name
            }
        })
        if(check){
            return new NextResponse('Already created')
        }

        const newBillboard = await prisma.billboard.create({
            data: { 
                name,
                description,
                coverId,
                price,
                discount
            }
        })
        return NextResponse.json({newBillboard}, { status: 200})

    }
    catch(error){ 
        return new NextResponse('ERROR')
    }
}